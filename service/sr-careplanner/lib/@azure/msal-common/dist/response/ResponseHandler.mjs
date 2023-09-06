/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
import { buildClientInfo } from '../account/ClientInfo.mjs';
import { ClientAuthError } from '../error/ClientAuthError.mjs';
import { ServerError } from '../error/ServerError.mjs';
import { ScopeSet } from '../request/ScopeSet.mjs';
import { AccountEntity } from '../cache/entities/AccountEntity.mjs';
import { IdTokenEntity } from '../cache/entities/IdTokenEntity.mjs';
import { AccessTokenEntity } from '../cache/entities/AccessTokenEntity.mjs';
import { RefreshTokenEntity } from '../cache/entities/RefreshTokenEntity.mjs';
import { InteractionRequiredAuthError } from '../error/InteractionRequiredAuthError.mjs';
import { CacheRecord } from '../cache/entities/CacheRecord.mjs';
import { ProtocolUtils } from '../utils/ProtocolUtils.mjs';
import { Constants, HttpStatus, AuthenticationScheme, THE_FAMILY_ID } from '../utils/Constants.mjs';
import { PopTokenGenerator } from '../crypto/PopTokenGenerator.mjs';
import { AppMetadataEntity } from '../cache/entities/AppMetadataEntity.mjs';
import { TokenCacheContext } from '../cache/persistence/TokenCacheContext.mjs';
import { PerformanceEvents } from '../telemetry/performance/PerformanceEvent.mjs';
import { extractTokenClaims, checkMaxAge } from '../account/AuthToken.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class that handles response parsing.
 * @internal
 */
class ResponseHandler {
    constructor(clientId, cacheStorage, cryptoObj, logger, serializableCache, persistencePlugin, performanceClient) {
        this.clientId = clientId;
        this.cacheStorage = cacheStorage;
        this.cryptoObj = cryptoObj;
        this.logger = logger;
        this.serializableCache = serializableCache;
        this.persistencePlugin = persistencePlugin;
        this.performanceClient = performanceClient;
    }
    /**
     * Function which validates server authorization code response.
     * @param serverResponseHash
     * @param cachedState
     * @param cryptoObj
     */
    validateServerAuthorizationCodeResponse(serverResponseHash, cachedState, cryptoObj) {
        if (!serverResponseHash.state || !cachedState) {
            throw serverResponseHash.state
                ? ClientAuthError.createStateNotFoundError("Cached State")
                : ClientAuthError.createStateNotFoundError("Server State");
        }
        let decodedServerResponseHash;
        let decodedCachedState;
        try {
            decodedServerResponseHash = decodeURIComponent(serverResponseHash.state);
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(serverResponseHash.state, `Server response hash URI could not be decoded`);
        }
        try {
            decodedCachedState = decodeURIComponent(cachedState);
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(serverResponseHash.state, `Cached state URI could not be decoded`);
        }
        if (decodedServerResponseHash !== decodedCachedState) {
            throw ClientAuthError.createStateMismatchError();
        }
        // Check for error
        if (serverResponseHash.error ||
            serverResponseHash.error_description ||
            serverResponseHash.suberror) {
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponseHash.error, serverResponseHash.error_description, serverResponseHash.suberror)) {
                throw new InteractionRequiredAuthError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror, serverResponseHash.timestamp || Constants.EMPTY_STRING, serverResponseHash.trace_id || Constants.EMPTY_STRING, serverResponseHash.correlation_id || Constants.EMPTY_STRING, serverResponseHash.claims || Constants.EMPTY_STRING);
            }
            throw new ServerError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
        }
        if (serverResponseHash.client_info) {
            buildClientInfo(serverResponseHash.client_info, cryptoObj);
        }
    }
    /**
     * Function which validates server authorization token response.
     * @param serverResponse
     * @param refreshAccessToken
     */
    validateTokenResponse(serverResponse, refreshAccessToken) {
        // Check for error
        if (serverResponse.error ||
            serverResponse.error_description ||
            serverResponse.suberror) {
            const errString = `${serverResponse.error_codes} - [${serverResponse.timestamp}]: ${serverResponse.error_description} - Correlation ID: ${serverResponse.correlation_id} - Trace ID: ${serverResponse.trace_id}`;
            const serverError = new ServerError(serverResponse.error, errString, serverResponse.suberror);
            // check if 500 error
            if (refreshAccessToken &&
                serverResponse.status &&
                serverResponse.status >= HttpStatus.SERVER_ERROR_RANGE_START &&
                serverResponse.status <= HttpStatus.SERVER_ERROR_RANGE_END) {
                this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently unavailable and the access token is unable to be refreshed.\n${serverError}`);
                // don't throw an exception, but alert the user via a log that the token was unable to be refreshed
                return;
                // check if 400 error
            }
            else if (refreshAccessToken &&
                serverResponse.status &&
                serverResponse.status >= HttpStatus.CLIENT_ERROR_RANGE_START &&
                serverResponse.status <= HttpStatus.CLIENT_ERROR_RANGE_END) {
                this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently available but is unable to refresh the access token.\n${serverError}`);
                // don't throw an exception, but alert the user via a log that the token was unable to be refreshed
                return;
            }
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
                throw new InteractionRequiredAuthError(serverResponse.error, serverResponse.error_description, serverResponse.suberror, serverResponse.timestamp || Constants.EMPTY_STRING, serverResponse.trace_id || Constants.EMPTY_STRING, serverResponse.correlation_id || Constants.EMPTY_STRING, serverResponse.claims || Constants.EMPTY_STRING);
            }
            throw serverError;
        }
    }
    /**
     * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
     * @param serverTokenResponse
     * @param authority
     */
    async handleServerTokenResponse(serverTokenResponse, authority, reqTimestamp, request, authCodePayload, userAssertionHash, handlingRefreshTokenResponse, forceCacheRefreshTokenResponse, serverRequestId) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.HandleServerTokenResponse, serverTokenResponse.correlation_id);
        // create an idToken object (not entity)
        let idTokenClaims;
        if (serverTokenResponse.id_token) {
            idTokenClaims = extractTokenClaims(serverTokenResponse.id_token || Constants.EMPTY_STRING, this.cryptoObj.base64Decode);
            // token nonce check (TODO: Add a warning if no nonce is given?)
            if (authCodePayload && authCodePayload.nonce) {
                if (idTokenClaims.nonce !== authCodePayload.nonce) {
                    throw ClientAuthError.createNonceMismatchError();
                }
            }
            // token max_age check
            if (request.maxAge || request.maxAge === 0) {
                const authTime = idTokenClaims.auth_time;
                if (!authTime) {
                    throw ClientAuthError.createAuthTimeNotFoundError();
                }
                checkMaxAge(authTime, request.maxAge);
            }
        }
        // generate homeAccountId
        this.homeAccountIdentifier = AccountEntity.generateHomeAccountId(serverTokenResponse.client_info || Constants.EMPTY_STRING, authority.authorityType, this.logger, this.cryptoObj, idTokenClaims);
        // save the response tokens
        let requestStateObj;
        if (!!authCodePayload && !!authCodePayload.state) {
            requestStateObj = ProtocolUtils.parseRequestState(this.cryptoObj, authCodePayload.state);
        }
        // Add keyId from request to serverTokenResponse if defined
        serverTokenResponse.key_id =
            serverTokenResponse.key_id || request.sshKid || undefined;
        const cacheRecord = this.generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenClaims, userAssertionHash, authCodePayload);
        let cacheContext;
        try {
            if (this.persistencePlugin && this.serializableCache) {
                this.logger.verbose("Persistence enabled, calling beforeCacheAccess");
                cacheContext = new TokenCacheContext(this.serializableCache, true);
                await this.persistencePlugin.beforeCacheAccess(cacheContext);
            }
            /*
             * When saving a refreshed tokens to the cache, it is expected that the account that was used is present in the cache.
             * If not present, we should return null, as it's the case that another application called removeAccount in between
             * the calls to getAllAccounts and acquireTokenSilent. We should not overwrite that removal, unless explicitly flagged by
             * the developer, as in the case of refresh token flow used in ADAL Node to MSAL Node migration.
             */
            if (handlingRefreshTokenResponse &&
                !forceCacheRefreshTokenResponse &&
                cacheRecord.account) {
                const key = cacheRecord.account.generateAccountKey();
                const account = this.cacheStorage.getAccount(key);
                if (!account) {
                    this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache");
                    return ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenClaims, requestStateObj, undefined, serverRequestId);
                }
            }
            await this.cacheStorage.saveCacheRecord(cacheRecord, request.storeInCache);
        }
        finally {
            if (this.persistencePlugin &&
                this.serializableCache &&
                cacheContext) {
                this.logger.verbose("Persistence enabled, calling afterCacheAccess");
                await this.persistencePlugin.afterCacheAccess(cacheContext);
            }
        }
        return ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenClaims, requestStateObj, serverTokenResponse, serverRequestId);
    }
    /**
     * Generates CacheRecord
     * @param serverTokenResponse
     * @param idTokenObj
     * @param authority
     */
    generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenClaims, userAssertionHash, authCodePayload) {
        const env = authority.getPreferredCache();
        if (!env) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        // IdToken: non AAD scenarios can have empty realm
        let cachedIdToken;
        let cachedAccount;
        if (serverTokenResponse.id_token && !!idTokenClaims) {
            cachedIdToken = IdTokenEntity.createIdTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.id_token, this.clientId, idTokenClaims.tid || "");
            cachedAccount = AccountEntity.createAccount({
                homeAccountId: this.homeAccountIdentifier,
                idTokenClaims: idTokenClaims,
                clientInfo: serverTokenResponse.client_info,
                cloudGraphHostName: authCodePayload?.cloud_graph_host_name,
                msGraphHost: authCodePayload?.msgraph_host,
            }, authority);
        }
        // AccessToken
        let cachedAccessToken = null;
        if (serverTokenResponse.access_token) {
            // If scopes not returned in server response, use request scopes
            const responseScopes = serverTokenResponse.scope
                ? ScopeSet.fromString(serverTokenResponse.scope)
                : new ScopeSet(request.scopes || []);
            /*
             * Use timestamp calculated before request
             * Server may return timestamps as strings, parse to numbers if so.
             */
            const expiresIn = (typeof serverTokenResponse.expires_in === "string"
                ? parseInt(serverTokenResponse.expires_in, 10)
                : serverTokenResponse.expires_in) || 0;
            const extExpiresIn = (typeof serverTokenResponse.ext_expires_in === "string"
                ? parseInt(serverTokenResponse.ext_expires_in, 10)
                : serverTokenResponse.ext_expires_in) || 0;
            const refreshIn = (typeof serverTokenResponse.refresh_in === "string"
                ? parseInt(serverTokenResponse.refresh_in, 10)
                : serverTokenResponse.refresh_in) || undefined;
            const tokenExpirationSeconds = reqTimestamp + expiresIn;
            const extendedTokenExpirationSeconds = tokenExpirationSeconds + extExpiresIn;
            const refreshOnSeconds = refreshIn && refreshIn > 0
                ? reqTimestamp + refreshIn
                : undefined;
            // non AAD scenarios can have empty realm
            cachedAccessToken = AccessTokenEntity.createAccessTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.access_token || Constants.EMPTY_STRING, this.clientId, idTokenClaims?.tid || authority.tenant, responseScopes.printScopes(), tokenExpirationSeconds, extendedTokenExpirationSeconds, this.cryptoObj, refreshOnSeconds, serverTokenResponse.token_type, userAssertionHash, serverTokenResponse.key_id, request.claims, request.requestedClaimsHash);
        }
        // refreshToken
        let cachedRefreshToken = null;
        if (serverTokenResponse.refresh_token) {
            cachedRefreshToken = RefreshTokenEntity.createRefreshTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.refresh_token || Constants.EMPTY_STRING, this.clientId, serverTokenResponse.foci, userAssertionHash);
        }
        // appMetadata
        let cachedAppMetadata = null;
        if (serverTokenResponse.foci) {
            cachedAppMetadata = AppMetadataEntity.createAppMetadataEntity(this.clientId, env, serverTokenResponse.foci);
        }
        return new CacheRecord(cachedAccount, cachedIdToken, cachedAccessToken, cachedRefreshToken, cachedAppMetadata);
    }
    /**
     * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
     *
     * Optionally takes a state string that is set as-is in the response.
     *
     * @param cacheRecord
     * @param idTokenObj
     * @param fromTokenCache
     * @param stateString
     */
    static async generateAuthenticationResult(cryptoObj, authority, cacheRecord, fromTokenCache, request, idTokenClaims, requestState, serverTokenResponse, requestId) {
        let accessToken = Constants.EMPTY_STRING;
        let responseScopes = [];
        let expiresOn = null;
        let extExpiresOn;
        let refreshOn;
        let familyId = Constants.EMPTY_STRING;
        if (cacheRecord.accessToken) {
            if (cacheRecord.accessToken.tokenType === AuthenticationScheme.POP) {
                const popTokenGenerator = new PopTokenGenerator(cryptoObj);
                const { secret, keyId } = cacheRecord.accessToken;
                if (!keyId) {
                    throw ClientAuthError.createKeyIdMissingError();
                }
                accessToken = await popTokenGenerator.signPopToken(secret, keyId, request);
            }
            else {
                accessToken = cacheRecord.accessToken.secret;
            }
            responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target).asArray();
            expiresOn = new Date(Number(cacheRecord.accessToken.expiresOn) * 1000);
            extExpiresOn = new Date(Number(cacheRecord.accessToken.extendedExpiresOn) * 1000);
            if (cacheRecord.accessToken.refreshOn) {
                refreshOn = new Date(Number(cacheRecord.accessToken.refreshOn) * 1000);
            }
        }
        if (cacheRecord.appMetadata) {
            familyId =
                cacheRecord.appMetadata.familyId === THE_FAMILY_ID
                    ? THE_FAMILY_ID
                    : "";
        }
        const uid = idTokenClaims?.oid || idTokenClaims?.sub || "";
        const tid = idTokenClaims?.tid || "";
        // for hybrid + native bridge enablement, send back the native account Id
        if (serverTokenResponse?.spa_accountid && !!cacheRecord.account) {
            cacheRecord.account.nativeAccountId =
                serverTokenResponse?.spa_accountid;
        }
        return {
            authority: authority.canonicalAuthority,
            uniqueId: uid,
            tenantId: tid,
            scopes: responseScopes,
            account: cacheRecord.account
                ? cacheRecord.account.getAccountInfo()
                : null,
            idToken: cacheRecord?.idToken?.secret || "",
            idTokenClaims: idTokenClaims || {},
            accessToken: accessToken,
            fromCache: fromTokenCache,
            expiresOn: expiresOn,
            extExpiresOn: extExpiresOn,
            refreshOn: refreshOn,
            correlationId: request.correlationId,
            requestId: requestId || Constants.EMPTY_STRING,
            familyId: familyId,
            tokenType: cacheRecord.accessToken?.tokenType || Constants.EMPTY_STRING,
            state: requestState
                ? requestState.userRequestState
                : Constants.EMPTY_STRING,
            cloudGraphHostName: cacheRecord.account?.cloudGraphHostName ||
                Constants.EMPTY_STRING,
            msGraphHost: cacheRecord.account?.msGraphHost || Constants.EMPTY_STRING,
            code: serverTokenResponse?.spa_code,
            fromNativeBroker: false,
        };
    }
}

export { ResponseHandler };
//# sourceMappingURL=ResponseHandler.mjs.map

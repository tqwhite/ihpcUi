/*! @azure/msal-browser v3.1.0 2023-09-05 */
'use strict';
import { AccountEntity, PerformanceEvents, AuthenticationScheme, ClientConfigurationError, StringUtils, UrlString, ServerTelemetryManager, AuthorityFactory } from '@azure/msal-common';
import { version } from '../packageMetadata.mjs';
import { BrowserConstants } from '../utils/BrowserConstants.mjs';
import { BrowserUtils } from '../utils/BrowserUtils.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class BaseInteractionClient {
    constructor(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeMessageHandler, correlationId) {
        this.config = config;
        this.browserStorage = storageImpl;
        this.browserCrypto = browserCrypto;
        this.networkClient = this.config.system.networkClient;
        this.eventHandler = eventHandler;
        this.navigationClient = navigationClient;
        this.nativeMessageHandler = nativeMessageHandler;
        this.correlationId =
            correlationId || this.browserCrypto.createNewGuid();
        this.logger = logger.clone(BrowserConstants.MSAL_SKU, version, this.correlationId);
        this.performanceClient = performanceClient;
    }
    async clearCacheOnLogout(account) {
        if (account) {
            if (AccountEntity.accountInfoIsEqual(account, this.browserStorage.getActiveAccount(), false)) {
                this.logger.verbose("Setting active account to null");
                this.browserStorage.setActiveAccount(null);
            }
            // Clear given account.
            try {
                await this.browserStorage.removeAccount(AccountEntity.generateAccountCacheKey(account));
                this.logger.verbose("Cleared cache items belonging to the account provided in the logout request.");
            }
            catch (error) {
                this.logger.error("Account provided in logout request was not found. Local cache unchanged.");
            }
        }
        else {
            try {
                this.logger.verbose("No account provided in logout request, clearing all cache items.", this.correlationId);
                // Clear all accounts and tokens
                await this.browserStorage.clear();
                // Clear any stray keys from IndexedDB
                await this.browserCrypto.clearKeystore();
            }
            catch (e) {
                this.logger.error("Attempted to clear all MSAL cache items and failed. Local cache unchanged.");
            }
        }
    }
    /**
     * Initializer function for all request APIs
     * @param request
     */
    async initializeBaseRequest(request, account) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.InitializeBaseRequest, request.correlationId);
        this.logger.verbose("Initializing BaseAuthRequest");
        const authority = request.authority || this.config.auth.authority;
        if (account) {
            await this.validateRequestAuthority(authority, account);
        }
        const scopes = [...((request && request.scopes) || [])];
        const validatedRequest = {
            ...request,
            correlationId: this.correlationId,
            authority,
            scopes,
        };
        // Set authenticationScheme to BEARER if not explicitly set in the request
        if (!validatedRequest.authenticationScheme) {
            validatedRequest.authenticationScheme = AuthenticationScheme.BEARER;
            this.logger.verbose('Authentication Scheme wasn\'t explicitly set in request, defaulting to "Bearer" request');
        }
        else {
            if (validatedRequest.authenticationScheme ===
                AuthenticationScheme.SSH) {
                if (!request.sshJwk) {
                    throw ClientConfigurationError.createMissingSshJwkError();
                }
                if (!request.sshKid) {
                    throw ClientConfigurationError.createMissingSshKidError();
                }
            }
            this.logger.verbose(`Authentication Scheme set to "${validatedRequest.authenticationScheme}" as configured in Auth request`);
        }
        // Set requested claims hash if claims-based caching is enabled and claims were requested
        if (this.config.cache.claimsBasedCachingEnabled &&
            request.claims &&
            // Checks for empty stringified object "{}" which doesn't qualify as requested claims
            !StringUtils.isEmptyObj(request.claims)) {
            validatedRequest.requestedClaimsHash =
                await this.browserCrypto.hashString(request.claims);
        }
        return validatedRequest;
    }
    /**
     *
     * Use to get the redirect uri configured in MSAL or null.
     * @param requestRedirectUri
     * @returns Redirect URL
     *
     */
    getRedirectUri(requestRedirectUri) {
        this.logger.verbose("getRedirectUri called");
        const redirectUri = requestRedirectUri ||
            this.config.auth.redirectUri ||
            BrowserUtils.getCurrentUri();
        return UrlString.getAbsoluteUrl(redirectUri, BrowserUtils.getCurrentUri());
    }
    /*
     * If authority provided in the request does not match environment/authority specified
     * in the account or MSAL config, we throw an error.
     */
    async validateRequestAuthority(authority, account) {
        const discoveredAuthority = await this.getDiscoveredAuthority(authority);
        if (!discoveredAuthority.isAlias(account.environment)) {
            throw ClientConfigurationError.createAuthorityMismatchError();
        }
    }
    /**
     *
     * @param apiId
     * @param correlationId
     * @param forceRefresh
     */
    initializeServerTelemetryManager(apiId, forceRefresh) {
        this.logger.verbose("initializeServerTelemetryManager called");
        const telemetryPayload = {
            clientId: this.config.auth.clientId,
            correlationId: this.correlationId,
            apiId: apiId,
            forceRefresh: forceRefresh || false,
            wrapperSKU: this.browserStorage.getWrapperMetadata()[0],
            wrapperVer: this.browserStorage.getWrapperMetadata()[1],
        };
        return new ServerTelemetryManager(telemetryPayload, this.browserStorage);
    }
    /**
     * Used to get a discovered version of the default authority.
     * @param requestAuthority
     * @param requestCorrelationId
     */
    async getDiscoveredAuthority(requestAuthority) {
        this.logger.verbose("getDiscoveredAuthority called");
        const authorityOptions = {
            protocolMode: this.config.auth.protocolMode,
            OIDCOptions: this.config.auth.OIDCOptions,
            knownAuthorities: this.config.auth.knownAuthorities,
            cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
            authorityMetadata: this.config.auth.authorityMetadata,
        };
        if (requestAuthority) {
            this.logger.verbose("Creating discovered authority with request authority");
            return await AuthorityFactory.createDiscoveredInstance(requestAuthority, this.config.system.networkClient, this.browserStorage, authorityOptions, this.logger);
        }
        this.logger.verbose("Creating discovered authority with configured authority");
        return await AuthorityFactory.createDiscoveredInstance(this.config.auth.authority, this.config.system.networkClient, this.browserStorage, authorityOptions, this.logger);
    }
}

export { BaseInteractionClient };
//# sourceMappingURL=BaseInteractionClient.mjs.map

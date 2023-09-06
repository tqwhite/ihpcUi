/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
import { CredentialType, CacheType, Separators, Constants, AuthenticationScheme } from '../../utils/Constants.mjs';
import { ClientAuthError } from '../../error/ClientAuthError.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base type for credentials to be stored in the cache: eg: ACCESS_TOKEN, ID_TOKEN etc
 *
 * Key:Value Schema:
 *
 * Key: <home_account_id*>-<environment>-<credential_type>-<client_id>-<realm*>-<target*>-<requestedClaims*>-<scheme*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, usually only used for refresh tokens
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 *      tokenType: Matches the authentication scheme for which the token was issued (i.e. Bearer or pop)
 *      requestedClaimsHash: Matches the SHA 256 hash of the claims object included in the token request
 *      userAssertionHash: Matches the SHA 256 hash of the obo_assertion for the OBO flow
 * }
 */
class CredentialEntity {
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    generateAccountId() {
        return CredentialEntity.generateAccountIdForCacheKey(this.homeAccountId, this.environment);
    }
    /**
     * Generate Credential Id key component as per the schema: <credential_type>-<client_id>-<realm>
     */
    generateCredentialId() {
        return CredentialEntity.generateCredentialIdForCacheKey(this.credentialType, this.clientId, this.realm, this.familyId);
    }
    /**
     * Generate target key component as per schema: <target>
     */
    generateTarget() {
        return CredentialEntity.generateTargetForCacheKey(this.target);
    }
    /**
     * generates credential key
     */
    generateCredentialKey() {
        return CredentialEntity.generateCredentialCacheKey(this.homeAccountId, this.environment, this.credentialType, this.clientId, this.realm, this.target, this.familyId, this.tokenType, this.requestedClaimsHash);
    }
    /**
     * returns the type of the cache (in this case credential)
     */
    generateType() {
        switch (this.credentialType) {
            case CredentialType.ID_TOKEN:
                return CacheType.ID_TOKEN;
            case CredentialType.ACCESS_TOKEN:
            case CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME:
                return CacheType.ACCESS_TOKEN;
            case CredentialType.REFRESH_TOKEN:
                return CacheType.REFRESH_TOKEN;
            default: {
                throw ClientAuthError.createUnexpectedCredentialTypeError();
            }
        }
    }
    /**
     * generates credential key
     * <home_account_id*>-\<environment>-<credential_type>-<client_id>-<realm\*>-<target\*>-<scheme\*>
     */
    static generateCredentialCacheKey(homeAccountId, environment, credentialType, clientId, realm, target, familyId, tokenType, requestedClaimsHash) {
        const credentialKey = [
            this.generateAccountIdForCacheKey(homeAccountId, environment),
            this.generateCredentialIdForCacheKey(credentialType, clientId, realm, familyId),
            this.generateTargetForCacheKey(target),
            this.generateClaimsHashForCacheKey(requestedClaimsHash),
            this.generateSchemeForCacheKey(tokenType),
        ];
        return credentialKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * generates Account Id for keys
     * @param homeAccountId
     * @param environment
     */
    static generateAccountIdForCacheKey(homeAccountId, environment) {
        const accountId = [homeAccountId, environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Generates Credential Id for keys
     * @param credentialType
     * @param realm
     * @param clientId
     * @param familyId
     */
    static generateCredentialIdForCacheKey(credentialType, clientId, realm, familyId) {
        const clientOrFamilyId = credentialType === CredentialType.REFRESH_TOKEN
            ? familyId || clientId
            : clientId;
        const credentialId = [
            credentialType,
            clientOrFamilyId,
            realm || Constants.EMPTY_STRING,
        ];
        return credentialId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Generate target key component as per schema: <target>
     */
    static generateTargetForCacheKey(scopes) {
        return (scopes || Constants.EMPTY_STRING).toLowerCase();
    }
    /**
     * Generate requested claims key component as per schema: <requestedClaims>
     */
    static generateClaimsHashForCacheKey(requestedClaimsHash) {
        return (requestedClaimsHash || Constants.EMPTY_STRING).toLowerCase();
    }
    /**
     * Generate scheme key componenet as per schema: <scheme>
     */
    static generateSchemeForCacheKey(tokenType) {
        /*
         * PoP Tokens and SSH certs include scheme in cache key
         * Cast to lowercase to handle "bearer" from ADFS
         */
        return tokenType &&
            tokenType.toLowerCase() !==
                AuthenticationScheme.BEARER.toLowerCase()
            ? tokenType.toLowerCase()
            : Constants.EMPTY_STRING;
    }
}

export { CredentialEntity };
//# sourceMappingURL=CredentialEntity.mjs.map

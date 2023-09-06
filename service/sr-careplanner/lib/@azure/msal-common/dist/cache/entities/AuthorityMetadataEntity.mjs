/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
import { AUTHORITY_METADATA_CONSTANTS } from '../../utils/Constants.mjs';
import { TimeUtils } from '../../utils/TimeUtils.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class AuthorityMetadataEntity {
    constructor() {
        this.expiresAt =
            TimeUtils.nowSeconds() +
                AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    }
    /**
     * Update the entity with new aliases, preferred_cache and preferred_network values
     * @param metadata
     * @param fromNetwork
     */
    updateCloudDiscoveryMetadata(metadata, fromNetwork) {
        this.aliases = metadata.aliases;
        this.preferred_cache = metadata.preferred_cache;
        this.preferred_network = metadata.preferred_network;
        this.aliasesFromNetwork = fromNetwork;
    }
    /**
     * Update the entity with new endpoints
     * @param metadata
     * @param fromNetwork
     */
    updateEndpointMetadata(metadata, fromNetwork) {
        this.authorization_endpoint = metadata.authorization_endpoint;
        this.token_endpoint = metadata.token_endpoint;
        this.end_session_endpoint = metadata.end_session_endpoint;
        this.issuer = metadata.issuer;
        this.endpointsFromNetwork = fromNetwork;
        this.jwks_uri = metadata.jwks_uri;
    }
    /**
     * Save the authority that was used to create this cache entry
     * @param authority
     */
    updateCanonicalAuthority(authority) {
        this.canonical_authority = authority;
    }
    /**
     * Reset the exiresAt value
     */
    resetExpiresAt() {
        this.expiresAt =
            TimeUtils.nowSeconds() +
                AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    }
    /**
     * Returns whether or not the data needs to be refreshed
     */
    isExpired() {
        return this.expiresAt <= TimeUtils.nowSeconds();
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAuthorityMetadataEntity(key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) === 0 &&
            entity.hasOwnProperty("aliases") &&
            entity.hasOwnProperty("preferred_cache") &&
            entity.hasOwnProperty("preferred_network") &&
            entity.hasOwnProperty("canonical_authority") &&
            entity.hasOwnProperty("authorization_endpoint") &&
            entity.hasOwnProperty("token_endpoint") &&
            entity.hasOwnProperty("issuer") &&
            entity.hasOwnProperty("aliasesFromNetwork") &&
            entity.hasOwnProperty("endpointsFromNetwork") &&
            entity.hasOwnProperty("expiresAt") &&
            entity.hasOwnProperty("jwks_uri"));
    }
}

export { AuthorityMetadataEntity };
//# sourceMappingURL=AuthorityMetadataEntity.mjs.map

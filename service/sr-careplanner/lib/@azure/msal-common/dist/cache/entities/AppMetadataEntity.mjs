/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
import { Separators, APP_METADATA } from '../../utils/Constants.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * APP_METADATA Cache
 *
 * Key:Value Schema:
 *
 * Key: appmetadata-<environment>-<client_id>
 *
 * Value:
 * {
 *      clientId: client ID of the application
 *      environment: entity that issued the token, represented as a full host
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 * }
 */
class AppMetadataEntity {
    /**
     * Generate AppMetadata Cache Key as per the schema: appmetadata-<environment>-<client_id>
     */
    generateAppMetadataKey() {
        return AppMetadataEntity.generateAppMetadataCacheKey(this.environment, this.clientId);
    }
    /**
     * Generate AppMetadata Cache Key
     */
    static generateAppMetadataCacheKey(environment, clientId) {
        const appMetaDataKeyArray = [
            APP_METADATA,
            environment,
            clientId,
        ];
        return appMetaDataKeyArray
            .join(Separators.CACHE_KEY_SEPARATOR)
            .toLowerCase();
    }
    /**
     * Creates AppMetadataEntity
     * @param clientId
     * @param environment
     * @param familyId
     */
    static createAppMetadataEntity(clientId, environment, familyId) {
        const appMetadata = new AppMetadataEntity();
        appMetadata.clientId = clientId;
        appMetadata.environment = environment;
        if (familyId) {
            appMetadata.familyId = familyId;
        }
        return appMetadata;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAppMetadataEntity(key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(APP_METADATA) === 0 &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("environment"));
    }
}

export { AppMetadataEntity };
//# sourceMappingURL=AppMetadataEntity.mjs.map

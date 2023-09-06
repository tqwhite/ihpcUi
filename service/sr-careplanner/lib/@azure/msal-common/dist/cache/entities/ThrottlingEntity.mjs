/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
import { ThrottlingConstants } from '../../utils/Constants.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ThrottlingEntity {
    /**
     * validates if a given cache entry is "Throttling", parses <key,value>
     * @param key
     * @param entity
     */
    static isThrottlingEntity(key, entity) {
        let validateKey = false;
        if (key) {
            validateKey =
                key.indexOf(ThrottlingConstants.THROTTLING_PREFIX) === 0;
        }
        let validateEntity = true;
        if (entity) {
            validateEntity = entity.hasOwnProperty("throttleTime");
        }
        return validateKey && validateEntity;
    }
}

export { ThrottlingEntity };
//# sourceMappingURL=ThrottlingEntity.mjs.map

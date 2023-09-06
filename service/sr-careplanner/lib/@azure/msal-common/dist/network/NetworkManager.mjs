/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
import { ThrottlingUtils } from './ThrottlingUtils.mjs';
import { AuthError } from '../error/AuthError.mjs';
import { ClientAuthError } from '../error/ClientAuthError.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class NetworkManager {
    constructor(networkClient, cacheManager) {
        this.networkClient = networkClient;
        this.cacheManager = cacheManager;
    }
    /**
     * Wraps sendPostRequestAsync with necessary preflight and postflight logic
     * @param thumbprint
     * @param tokenEndpoint
     * @param options
     */
    async sendPostRequest(thumbprint, tokenEndpoint, options) {
        ThrottlingUtils.preProcess(this.cacheManager, thumbprint);
        let response;
        try {
            response = await this.networkClient.sendPostRequestAsync(tokenEndpoint, options);
        }
        catch (e) {
            if (e instanceof AuthError) {
                throw e;
            }
            else {
                throw ClientAuthError.createNetworkError(tokenEndpoint, e);
            }
        }
        ThrottlingUtils.postProcess(this.cacheManager, thumbprint, response);
        return response;
    }
}

export { NetworkManager };
//# sourceMappingURL=NetworkManager.mjs.map

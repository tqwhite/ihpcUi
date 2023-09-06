/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryErrorResponse(response) {
    return (response.hasOwnProperty("error") &&
        response.hasOwnProperty("error_description"));
}

export { isCloudInstanceDiscoveryErrorResponse };
//# sourceMappingURL=CloudInstanceDiscoveryErrorResponse.mjs.map

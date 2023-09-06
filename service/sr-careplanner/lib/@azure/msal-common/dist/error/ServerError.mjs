/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
import { AuthError } from './AuthError.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
class ServerError extends AuthError {
    constructor(errorCode, errorMessage, subError) {
        super(errorCode, errorMessage, subError);
        this.name = "ServerError";
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}

export { ServerError };
//# sourceMappingURL=ServerError.mjs.map

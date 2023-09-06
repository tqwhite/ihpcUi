/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
'use strict';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const Constants = {
    LIBRARY_NAME: "MSAL.JS",
    SKU: "msal.js.common",
    // Prefix for all library cache entries
    CACHE_PREFIX: "msal",
    // default authority
    DEFAULT_AUTHORITY: "https://login.microsoftonline.com/common/",
    DEFAULT_AUTHORITY_HOST: "login.microsoftonline.com",
    DEFAULT_COMMON_TENANT: "common",
    // ADFS String
    ADFS: "adfs",
    DSTS: "dstsv2",
    // Default AAD Instance Discovery Endpoint
    AAD_INSTANCE_DISCOVERY_ENDPT: "https://login.microsoftonline.com/common/discovery/instance?api-version=1.1&authorization_endpoint=",
    // CIAM URL
    CIAM_AUTH_URL: ".ciamlogin.com",
    AAD_TENANT_DOMAIN_SUFFIX: ".onmicrosoft.com",
    // Resource delimiter - used for certain cache entries
    RESOURCE_DELIM: "|",
    // Placeholder for non-existent account ids/objects
    NO_ACCOUNT: "NO_ACCOUNT",
    // Claims
    CLAIMS: "claims",
    // Consumer UTID
    CONSUMER_UTID: "9188040d-6c67-4c5b-b112-36a304b66dad",
    // Default scopes
    OPENID_SCOPE: "openid",
    PROFILE_SCOPE: "profile",
    OFFLINE_ACCESS_SCOPE: "offline_access",
    EMAIL_SCOPE: "email",
    // Default response type for authorization code flow
    CODE_RESPONSE_TYPE: "code",
    CODE_GRANT_TYPE: "authorization_code",
    RT_GRANT_TYPE: "refresh_token",
    FRAGMENT_RESPONSE_MODE: "fragment",
    S256_CODE_CHALLENGE_METHOD: "S256",
    URL_FORM_CONTENT_TYPE: "application/x-www-form-urlencoded;charset=utf-8",
    AUTHORIZATION_PENDING: "authorization_pending",
    NOT_DEFINED: "not_defined",
    EMPTY_STRING: "",
    NOT_APPLICABLE: "N/A",
    FORWARD_SLASH: "/",
    IMDS_ENDPOINT: "http://169.254.169.254/metadata/instance/compute/location",
    IMDS_VERSION: "2020-06-01",
    IMDS_TIMEOUT: 2000,
    AZURE_REGION_AUTO_DISCOVER_FLAG: "TryAutoDetect",
    REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: "login.microsoft.com",
    REGIONAL_AUTH_NON_MSI_QUERY_STRING: "allowestsrnonmsi=true",
    KNOWN_PUBLIC_CLOUDS: [
        "login.microsoftonline.com",
        "login.windows.net",
        "login.microsoft.com",
        "sts.windows.net",
    ],
    TOKEN_RESPONSE_TYPE: "token",
    ID_TOKEN_RESPONSE_TYPE: "id_token",
    SHR_NONCE_VALIDITY: 240,
    INVALID_INSTANCE: "invalid_instance",
};
const HttpStatus = {
    SUCCESS_RANGE_START: 200,
    SUCCESS_RANGE_END: 299,
    REDIRECT: 302,
    CLIENT_ERROR_RANGE_START: 400,
    CLIENT_ERROR_RANGE_END: 499,
    SERVER_ERROR_RANGE_START: 500,
    SERVER_ERROR_RANGE_END: 599,
};
const OIDC_DEFAULT_SCOPES = [
    Constants.OPENID_SCOPE,
    Constants.PROFILE_SCOPE,
    Constants.OFFLINE_ACCESS_SCOPE,
];
const OIDC_SCOPES = [...OIDC_DEFAULT_SCOPES, Constants.EMAIL_SCOPE];
/**
 * Request header names
 */
const HeaderNames = {
    CONTENT_TYPE: "Content-Type",
    RETRY_AFTER: "Retry-After",
    CCS_HEADER: "X-AnchorMailbox",
    WWWAuthenticate: "WWW-Authenticate",
    AuthenticationInfo: "Authentication-Info",
    X_MS_REQUEST_ID: "x-ms-request-id",
    X_MS_HTTP_VERSION: "x-ms-httpver",
};
/**
 * Persistent cache keys MSAL which stay while user is logged in.
 */
const PersistentCacheKeys = {
    ID_TOKEN: "idtoken",
    CLIENT_INFO: "client.info",
    ADAL_ID_TOKEN: "adal.idtoken",
    ERROR: "error",
    ERROR_DESC: "error.description",
    ACTIVE_ACCOUNT: "active-account",
    ACTIVE_ACCOUNT_FILTERS: "active-account-filters", // new cache entry for active_account for a more robust version for browser
};
/**
 * String constants related to AAD Authority
 */
const AADAuthorityConstants = {
    COMMON: "common",
    ORGANIZATIONS: "organizations",
    CONSUMERS: "consumers",
};
/**
 * Keys in the hashParams sent by AAD Server
 */
const AADServerParamKeys = {
    CLIENT_ID: "client_id",
    REDIRECT_URI: "redirect_uri",
    RESPONSE_TYPE: "response_type",
    RESPONSE_MODE: "response_mode",
    GRANT_TYPE: "grant_type",
    CLAIMS: "claims",
    SCOPE: "scope",
    ERROR: "error",
    ERROR_DESCRIPTION: "error_description",
    ACCESS_TOKEN: "access_token",
    ID_TOKEN: "id_token",
    REFRESH_TOKEN: "refresh_token",
    EXPIRES_IN: "expires_in",
    STATE: "state",
    NONCE: "nonce",
    PROMPT: "prompt",
    SESSION_STATE: "session_state",
    CLIENT_INFO: "client_info",
    CODE: "code",
    CODE_CHALLENGE: "code_challenge",
    CODE_CHALLENGE_METHOD: "code_challenge_method",
    CODE_VERIFIER: "code_verifier",
    CLIENT_REQUEST_ID: "client-request-id",
    X_CLIENT_SKU: "x-client-SKU",
    X_CLIENT_VER: "x-client-VER",
    X_CLIENT_OS: "x-client-OS",
    X_CLIENT_CPU: "x-client-CPU",
    X_CLIENT_CURR_TELEM: "x-client-current-telemetry",
    X_CLIENT_LAST_TELEM: "x-client-last-telemetry",
    X_MS_LIB_CAPABILITY: "x-ms-lib-capability",
    X_APP_NAME: "x-app-name",
    X_APP_VER: "x-app-ver",
    POST_LOGOUT_URI: "post_logout_redirect_uri",
    ID_TOKEN_HINT: "id_token_hint",
    DEVICE_CODE: "device_code",
    CLIENT_SECRET: "client_secret",
    CLIENT_ASSERTION: "client_assertion",
    CLIENT_ASSERTION_TYPE: "client_assertion_type",
    TOKEN_TYPE: "token_type",
    REQ_CNF: "req_cnf",
    OBO_ASSERTION: "assertion",
    REQUESTED_TOKEN_USE: "requested_token_use",
    ON_BEHALF_OF: "on_behalf_of",
    FOCI: "foci",
    CCS_HEADER: "X-AnchorMailbox",
    RETURN_SPA_CODE: "return_spa_code",
    NATIVE_BROKER: "nativebroker",
    LOGOUT_HINT: "logout_hint",
};
/**
 * Claims request keys
 */
const ClaimsRequestKeys = {
    ACCESS_TOKEN: "access_token",
    XMS_CC: "xms_cc",
};
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
const PromptValue = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none",
    CREATE: "create",
    NO_SESSION: "no_session",
};
/**
 * SSO Types - generated to populate hints
 */
const SSOTypes = {
    ACCOUNT: "account",
    SID: "sid",
    LOGIN_HINT: "login_hint",
    ID_TOKEN: "id_token",
    DOMAIN_HINT: "domain_hint",
    ORGANIZATIONS: "organizations",
    CONSUMERS: "consumers",
    ACCOUNT_ID: "accountIdentifier",
    HOMEACCOUNT_ID: "homeAccountIdentifier",
};
/**
 * allowed values for codeVerifier
 */
const CodeChallengeMethodValues = {
    PLAIN: "plain",
    S256: "S256",
};
/**
 * allowed values for server response type
 */
const ServerResponseType = {
    QUERY: "query",
    FRAGMENT: "fragment",
};
/**
 * allowed values for response_mode
 */
const ResponseMode = {
    ...ServerResponseType,
    FORM_POST: "form_post",
};
/**
 * allowed grant_type
 */
const GrantType = {
    IMPLICIT_GRANT: "implicit",
    AUTHORIZATION_CODE_GRANT: "authorization_code",
    CLIENT_CREDENTIALS_GRANT: "client_credentials",
    RESOURCE_OWNER_PASSWORD_GRANT: "password",
    REFRESH_TOKEN_GRANT: "refresh_token",
    DEVICE_CODE_GRANT: "device_code",
    JWT_BEARER: "urn:ietf:params:oauth:grant-type:jwt-bearer",
};
/**
 * Account types in Cache
 */
const CacheAccountType = {
    MSSTS_ACCOUNT_TYPE: "MSSTS",
    ADFS_ACCOUNT_TYPE: "ADFS",
    MSAV1_ACCOUNT_TYPE: "MSA",
    GENERIC_ACCOUNT_TYPE: "Generic", // NTLM, Kerberos, FBA, Basic etc
};
/**
 * Separators used in cache
 */
const Separators = {
    CACHE_KEY_SEPARATOR: "-",
    CLIENT_INFO_SEPARATOR: ".",
};
/**
 * Credential Type stored in the cache
 */
const CredentialType = {
    ID_TOKEN: "IdToken",
    ACCESS_TOKEN: "AccessToken",
    ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
    REFRESH_TOKEN: "RefreshToken",
};
/**
 * Combine all cache types
 */
const CacheType = {
    ADFS: 1001,
    MSA: 1002,
    MSSTS: 1003,
    GENERIC: 1004,
    ACCESS_TOKEN: 2001,
    REFRESH_TOKEN: 2002,
    ID_TOKEN: 2003,
    APP_METADATA: 3001,
    UNDEFINED: 9999,
};
/**
 * More Cache related constants
 */
const APP_METADATA = "appmetadata";
const CLIENT_INFO = "client_info";
const THE_FAMILY_ID = "1";
const AUTHORITY_METADATA_CONSTANTS = {
    CACHE_KEY: "authority-metadata",
    REFRESH_TIME_SECONDS: 3600 * 24, // 24 Hours
};
const AuthorityMetadataSource = {
    CONFIG: "config",
    CACHE: "cache",
    NETWORK: "network",
    HARDCODED_VALUES: "hardcoded_values",
};
const SERVER_TELEM_CONSTANTS = {
    SCHEMA_VERSION: 5,
    MAX_CUR_HEADER_BYTES: 80,
    MAX_LAST_HEADER_BYTES: 330,
    MAX_CACHED_ERRORS: 50,
    CACHE_KEY: "server-telemetry",
    CATEGORY_SEPARATOR: "|",
    VALUE_SEPARATOR: ",",
    OVERFLOW_TRUE: "1",
    OVERFLOW_FALSE: "0",
    UNKNOWN_ERROR: "unknown_error",
};
/**
 * Type of the authentication request
 */
const AuthenticationScheme = {
    BEARER: "Bearer",
    POP: "pop",
    SSH: "ssh-cert",
};
/**
 * Constants related to throttling
 */
const ThrottlingConstants = {
    // Default time to throttle RequestThumbprint in seconds
    DEFAULT_THROTTLE_TIME_SECONDS: 60,
    // Default maximum time to throttle in seconds, overrides what the server sends back
    DEFAULT_MAX_THROTTLE_TIME_SECONDS: 3600,
    // Prefix for storing throttling entries
    THROTTLING_PREFIX: "throttling",
    // Value assigned to the x-ms-lib-capability header to indicate to the server the library supports throttling
    X_MS_LIB_CAPABILITY_VALUE: "retry-after, h429",
};
const Errors = {
    INVALID_GRANT_ERROR: "invalid_grant",
    CLIENT_MISMATCH_ERROR: "client_mismatch",
};
/**
 * Password grant parameters
 */
const PasswordGrantConstants = {
    username: "username",
    password: "password",
};
/**
 * Response codes
 */
const ResponseCodes = {
    httpSuccess: 200,
    httpBadRequest: 400,
};
/**
 * Region Discovery Sources
 */
const RegionDiscoverySources = {
    FAILED_AUTO_DETECTION: "1",
    INTERNAL_CACHE: "2",
    ENVIRONMENT_VARIABLE: "3",
    IMDS: "4",
};
/**
 * Region Discovery Outcomes
 */
const RegionDiscoveryOutcomes = {
    CONFIGURED_MATCHES_DETECTED: "1",
    CONFIGURED_NO_AUTO_DETECTION: "2",
    CONFIGURED_NOT_DETECTED: "3",
    AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
    AUTO_DETECTION_REQUESTED_FAILED: "5",
};
const CacheOutcome = {
    NO_CACHE_HIT: "0",
    FORCE_REFRESH: "1",
    NO_CACHED_ACCESS_TOKEN: "2",
    CACHED_ACCESS_TOKEN_EXPIRED: "3",
    REFRESH_CACHED_ACCESS_TOKEN: "4",
};
const JsonTypes = {
    Jwt: "JWT",
    Jwk: "JWK",
    Pop: "pop",
};
const ONE_DAY_IN_MS = 86400000;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * AuthErrorMessage class containing string constants used by error codes and messages.
 */
const AuthErrorMessage = {
    unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication.",
    },
    postRequestFailed: {
        code: "post_request_failed",
        desc: "Post request failed from the network, could be a 4xx/5xx or a network unavailability. Please check the exact error code for details.",
    },
};
/**
 * General error class thrown by the MSAL.js library.
 */
class AuthError extends Error {
    constructor(errorCode, errorMessage, suberror) {
        const errorString = errorMessage
            ? `${errorCode}: ${errorMessage}`
            : errorCode;
        super(errorString);
        Object.setPrototypeOf(this, AuthError.prototype);
        this.errorCode = errorCode || Constants.EMPTY_STRING;
        this.errorMessage = errorMessage || Constants.EMPTY_STRING;
        this.subError = suberror || Constants.EMPTY_STRING;
        this.name = "AuthError";
    }
    setCorrelationId(correlationId) {
        this.correlationId = correlationId;
    }
    /**
     * Creates an error that is thrown when something unexpected happens in the library.
     * @param errDesc
     */
    static createUnexpectedError(errDesc) {
        return new AuthError(AuthErrorMessage.unexpectedError.code, `${AuthErrorMessage.unexpectedError.desc}: ${errDesc}`);
    }
    /**
     * Creates an error for post request failures.
     * @param errDesc
     * @returns
     */
    static createPostRequestFailed(errDesc) {
        return new AuthError(AuthErrorMessage.postRequestFailed.code, `${AuthErrorMessage.postRequestFailed.desc}: ${errDesc}`);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const DEFAULT_CRYPTO_IMPLEMENTATION = {
    createNewGuid: () => {
        const notImplErr = "Crypto interface - createNewGuid() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Decode: () => {
        const notImplErr = "Crypto interface - base64Decode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Encode: () => {
        const notImplErr = "Crypto interface - base64Encode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async generatePkceCodes() {
        const notImplErr = "Crypto interface - generatePkceCodes() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async getPublicKeyThumbprint() {
        const notImplErr = "Crypto interface - getPublicKeyThumbprint() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async removeTokenBindingKey() {
        const notImplErr = "Crypto interface - removeTokenBindingKey() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async clearKeystore() {
        const notImplErr = "Crypto interface - clearKeystore() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async signJwt() {
        const notImplErr = "Crypto interface - signJwt() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async hashString() {
        const notImplErr = "Crypto interface - hashString() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Log message level.
 */
exports.LogLevel = void 0;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    LogLevel[LogLevel["Trace"] = 4] = "Trace";
})(exports.LogLevel || (exports.LogLevel = {}));
/**
 * Class which facilitates logging of messages to a specific place.
 */
class Logger {
    constructor(loggerOptions, packageName, packageVersion) {
        // Current log level, defaults to info.
        this.level = exports.LogLevel.Info;
        const defaultLoggerCallback = () => {
            return;
        };
        const setLoggerOptions = loggerOptions || Logger.createDefaultLoggerOptions();
        this.localCallback =
            setLoggerOptions.loggerCallback || defaultLoggerCallback;
        this.piiLoggingEnabled = setLoggerOptions.piiLoggingEnabled || false;
        this.level =
            typeof setLoggerOptions.logLevel === "number"
                ? setLoggerOptions.logLevel
                : exports.LogLevel.Info;
        this.correlationId =
            setLoggerOptions.correlationId || Constants.EMPTY_STRING;
        this.packageName = packageName || Constants.EMPTY_STRING;
        this.packageVersion = packageVersion || Constants.EMPTY_STRING;
    }
    static createDefaultLoggerOptions() {
        return {
            loggerCallback: () => {
                // allow users to not set loggerCallback
            },
            piiLoggingEnabled: false,
            logLevel: exports.LogLevel.Info,
        };
    }
    /**
     * Create new Logger with existing configurations.
     */
    clone(packageName, packageVersion, correlationId) {
        return new Logger({
            loggerCallback: this.localCallback,
            piiLoggingEnabled: this.piiLoggingEnabled,
            logLevel: this.level,
            correlationId: correlationId || this.correlationId,
        }, packageName, packageVersion);
    }
    /**
     * Log message with required options.
     */
    logMessage(logMessage, options) {
        if (options.logLevel > this.level ||
            (!this.piiLoggingEnabled && options.containsPii)) {
            return;
        }
        const timestamp = new Date().toUTCString();
        // Add correlationId to logs if set, correlationId provided on log messages take precedence
        const logHeader = `[${timestamp}] : [${options.correlationId || this.correlationId || ""}]`;
        const log = `${logHeader} : ${this.packageName}@${this.packageVersion} : ${exports.LogLevel[options.logLevel]} - ${logMessage}`;
        // debug(`msal:${LogLevel[options.logLevel]}${options.containsPii ? "-Pii": Constants.EMPTY_STRING}${options.context ? `:${options.context}` : Constants.EMPTY_STRING}`)(logMessage);
        this.executeCallback(options.logLevel, log, options.containsPii || false);
    }
    /**
     * Execute callback with message.
     */
    executeCallback(level, message, containsPii) {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    }
    /**
     * Logs error messages.
     */
    error(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Error,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs error messages with PII.
     */
    errorPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Error,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs warning messages.
     */
    warning(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Warning,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs warning messages with PII.
     */
    warningPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Warning,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs info messages.
     */
    info(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Info,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs info messages with PII.
     */
    infoPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Info,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs verbose messages.
     */
    verbose(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Verbose,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs verbose messages with PII.
     */
    verbosePii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Verbose,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs trace messages.
     */
    trace(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Trace,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs trace messages with PII.
     */
    tracePii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Trace,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Returns whether PII Logging is enabled or not.
     */
    isPiiLoggingEnabled() {
        return this.piiLoggingEnabled || false;
    }
}

/* eslint-disable header/header */
const name = "@azure/msal-common";
const version = "14.0.3";

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const AzureCloudInstance = {
    // AzureCloudInstance is not specified.
    None: "none",
    // Microsoft Azure public cloud
    AzurePublic: "https://login.microsoftonline.com",
    // Microsoft PPE
    AzurePpe: "https://login.windows-ppe.net",
    // Microsoft Chinese national/regional cloud
    AzureChina: "https://login.chinacloudapi.cn",
    // Microsoft German national/regional cloud ("Black Forest")
    AzureGermany: "https://login.microsoftonline.de",
    // US Government cloud
    AzureUsGovernment: "https://login.microsoftonline.us",
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
const ClientAuthErrorMessage = {
    clientInfoDecodingError: {
        code: "client_info_decoding_error",
        desc: "The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause.",
    },
    clientInfoEmptyError: {
        code: "client_info_empty_error",
        desc: "The client info was empty. Please review the trace to determine the root cause.",
    },
    tokenParsingError: {
        code: "token_parsing_error",
        desc: "Token cannot be parsed. Please review stack trace to determine root cause.",
    },
    nullOrEmptyToken: {
        code: "null_or_empty_token",
        desc: "The token is null or empty. Please review the trace to determine the root cause.",
    },
    endpointResolutionError: {
        code: "endpoints_resolution_error",
        desc: "Error: could not resolve endpoints. Please check network and try again.",
    },
    networkError: {
        code: "network_error",
        desc: "Network request failed. Please check network trace to determine root cause.",
    },
    unableToGetOpenidConfigError: {
        code: "openid_config_error",
        desc: "Could not retrieve endpoints. Check your authority and verify the .well-known/openid-configuration endpoint returns the required endpoints.",
    },
    hashNotDeserialized: {
        code: "hash_not_deserialized",
        desc: "The hash parameters could not be deserialized. Please review the trace to determine the root cause.",
    },
    blankGuidGenerated: {
        code: "blank_guid_generated",
        desc: "The guid generated was blank. Please review the trace to determine the root cause.",
    },
    invalidStateError: {
        code: "invalid_state",
        desc: "State was not the expected format. Please check the logs to determine whether the request was sent using ProtocolUtils.setRequestState().",
    },
    stateMismatchError: {
        code: "state_mismatch",
        desc: "State mismatch error. Please check your network. Continued requests may cause cache overflow.",
    },
    stateNotFoundError: {
        code: "state_not_found",
        desc: "State not found",
    },
    nonceMismatchError: {
        code: "nonce_mismatch",
        desc: "Nonce mismatch error. This may be caused by a race condition in concurrent requests.",
    },
    nonceNotFoundError: {
        code: "nonce_not_found",
        desc: "nonce not found",
    },
    authTimeNotFoundError: {
        code: "auth_time_not_found",
        desc: "Max Age was requested and the ID token is missing the auth_time variable." +
            " auth_time is an optional claim and is not enabled by default - it must be enabled." +
            " See https://aka.ms/msaljs/optional-claims for more information.",
    },
    maxAgeTranspiredError: {
        code: "max_age_transpired",
        desc: "Max Age is set to 0, or too much time has elapsed since the last end-user authentication.",
    },
    noTokensFoundError: {
        code: "no_tokens_found",
        desc: "No tokens were found for the given scopes, and no authorization code was passed to acquireToken. You must retrieve an authorization code before making a call to acquireToken().",
    },
    multipleMatchingTokens: {
        code: "multiple_matching_tokens",
        desc: "The cache contains multiple tokens satisfying the requirements. " +
            "Call AcquireToken again providing more requirements such as authority or account.",
    },
    multipleMatchingAccounts: {
        code: "multiple_matching_accounts",
        desc: "The cache contains multiple accounts satisfying the given parameters. Please pass more info to obtain the correct account",
    },
    multipleMatchingAppMetadata: {
        code: "multiple_matching_appMetadata",
        desc: "The cache contains multiple appMetadata satisfying the given parameters. Please pass more info to obtain the correct appMetadata",
    },
    tokenRequestCannotBeMade: {
        code: "request_cannot_be_made",
        desc: "Token request cannot be made without authorization code or refresh token.",
    },
    appendEmptyScopeError: {
        code: "cannot_append_empty_scope",
        desc: "Cannot append null or empty scope to ScopeSet. Please check the stack trace for more info.",
    },
    removeEmptyScopeError: {
        code: "cannot_remove_empty_scope",
        desc: "Cannot remove null or empty scope from ScopeSet. Please check the stack trace for more info.",
    },
    appendScopeSetError: {
        code: "cannot_append_scopeset",
        desc: "Cannot append ScopeSet due to error.",
    },
    emptyInputScopeSetError: {
        code: "empty_input_scopeset",
        desc: "Empty input ScopeSet cannot be processed.",
    },
    DeviceCodePollingCancelled: {
        code: "device_code_polling_cancelled",
        desc: "Caller has cancelled token endpoint polling during device code flow by setting DeviceCodeRequest.cancel = true.",
    },
    DeviceCodeExpired: {
        code: "device_code_expired",
        desc: "Device code is expired.",
    },
    DeviceCodeUnknownError: {
        code: "device_code_unknown_error",
        desc: "Device code stopped polling for unknown reasons.",
    },
    NoAccountInSilentRequest: {
        code: "no_account_in_silent_request",
        desc: "Please pass an account object, silent flow is not supported without account information",
    },
    invalidCacheRecord: {
        code: "invalid_cache_record",
        desc: "Cache record object was null or undefined.",
    },
    invalidCacheEnvironment: {
        code: "invalid_cache_environment",
        desc: "Invalid environment when attempting to create cache entry",
    },
    noAccountFound: {
        code: "no_account_found",
        desc: "No account found in cache for given key.",
    },
    CachePluginError: {
        code: "no cache plugin set on CacheManager",
        desc: "ICachePlugin needs to be set before using readFromStorage or writeFromStorage",
    },
    noCryptoObj: {
        code: "no_crypto_object",
        desc: "No crypto object detected. This is required for the following operation: ",
    },
    invalidCacheType: {
        code: "invalid_cache_type",
        desc: "Invalid cache type",
    },
    unexpectedAccountType: {
        code: "unexpected_account_type",
        desc: "Unexpected account type.",
    },
    unexpectedCredentialType: {
        code: "unexpected_credential_type",
        desc: "Unexpected credential type.",
    },
    invalidAssertion: {
        code: "invalid_assertion",
        desc: "Client assertion must meet requirements described in https://tools.ietf.org/html/rfc7515",
    },
    invalidClientCredential: {
        code: "invalid_client_credential",
        desc: "Client credential (secret, certificate, or assertion) must not be empty when creating a confidential client. An application should at most have one credential",
    },
    tokenRefreshRequired: {
        code: "token_refresh_required",
        desc: "Cannot return token from cache because it must be refreshed. This may be due to one of the following reasons: forceRefresh parameter is set to true, claims have been requested, there is no cached access token or it is expired.",
    },
    userTimeoutReached: {
        code: "user_timeout_reached",
        desc: "User defined timeout for device code polling reached",
    },
    tokenClaimsRequired: {
        code: "token_claims_cnf_required_for_signedjwt",
        desc: "Cannot generate a POP jwt if the token_claims are not populated",
    },
    noAuthorizationCodeFromServer: {
        code: "authorization_code_missing_from_server_response",
        desc: "Server response does not contain an authorization code to proceed",
    },
    noAzureRegionDetected: {
        code: "no_azure_region_detected",
        desc: "No azure region was detected and no fallback was made available",
    },
    accessTokenEntityNullError: {
        code: "access_token_entity_null",
        desc: "Access token entity is null, please check logs and cache to ensure a valid access token is present.",
    },
    bindingKeyNotRemovedError: {
        code: "binding_key_not_removed",
        desc: "Could not remove the credential's binding key from storage.",
    },
    logoutNotSupported: {
        code: "end_session_endpoint_not_supported",
        desc: "Provided authority does not support logout.",
    },
    keyIdMissing: {
        code: "key_id_missing",
        desc: "A keyId value is missing from the requested bound token's cache record and is required to match the token to it's stored binding key.",
    },
    noNetworkConnectivity: {
        code: "no_network_connectivity",
        desc: "No network connectivity. Check your internet connection.",
    },
    userCanceledError: {
        code: "user_canceled",
        desc: "User canceled the flow.",
    },
    missingTenantIdError: {
        code: "missing_tenant_id_error",
        desc: "A tenant id - not common, organizations, or consumers - must be specified when using the client_credentials flow.",
    },
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
class ClientAuthError extends AuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "ClientAuthError";
        Object.setPrototypeOf(this, ClientAuthError.prototype);
    }
    /**
     * Creates an error thrown when client info object doesn't decode correctly.
     * @param caughtError
     */
    static createClientInfoDecodingError(caughtError) {
        return new ClientAuthError(ClientAuthErrorMessage.clientInfoDecodingError.code, `${ClientAuthErrorMessage.clientInfoDecodingError.desc} Failed with error: ${caughtError}`);
    }
    /**
     * Creates an error thrown if the client info is empty.
     * @param rawClientInfo
     */
    static createClientInfoEmptyError() {
        return new ClientAuthError(ClientAuthErrorMessage.clientInfoEmptyError.code, `${ClientAuthErrorMessage.clientInfoEmptyError.desc}`);
    }
    /**
     * Creates an error thrown when the id token extraction errors out.
     * @param err
     */
    static createTokenParsingError(caughtExtractionError) {
        return new ClientAuthError(ClientAuthErrorMessage.tokenParsingError.code, `${ClientAuthErrorMessage.tokenParsingError.desc} Failed with error: ${caughtExtractionError}`);
    }
    /**
     * Creates an error thrown when the id token string is null or empty.
     * @param invalidRawTokenString
     */
    static createTokenNullOrEmptyError(invalidRawTokenString) {
        return new ClientAuthError(ClientAuthErrorMessage.nullOrEmptyToken.code, `${ClientAuthErrorMessage.nullOrEmptyToken.desc} Raw Token Value: ${invalidRawTokenString}`);
    }
    /**
     * Creates an error thrown when the endpoint discovery doesn't complete correctly.
     */
    static createEndpointDiscoveryIncompleteError(errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.endpointResolutionError.code, `${ClientAuthErrorMessage.endpointResolutionError.desc} Detail: ${errDetail}`);
    }
    /**
     * Creates an error thrown when the fetch client throws
     */
    static createNetworkError(endpoint, errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.networkError.code, `${ClientAuthErrorMessage.networkError.desc} | Fetch client threw: ${errDetail} | Attempted to reach: ${endpoint.split("?")[0]}`);
    }
    /**
     * Creates an error thrown when the openid-configuration endpoint cannot be reached or does not contain the required data
     */
    static createUnableToGetOpenidConfigError(errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.unableToGetOpenidConfigError.code, `${ClientAuthErrorMessage.unableToGetOpenidConfigError.desc} Attempted to retrieve endpoints from: ${errDetail}`);
    }
    /**
     * Creates an error thrown when the hash cannot be deserialized.
     * @param hashParamObj
     */
    static createHashNotDeserializedError(hashParamObj) {
        return new ClientAuthError(ClientAuthErrorMessage.hashNotDeserialized.code, `${ClientAuthErrorMessage.hashNotDeserialized.desc} Given Object: ${hashParamObj}`);
    }
    /**
     * Creates an error thrown when the state cannot be parsed.
     * @param invalidState
     */
    static createInvalidStateError(invalidState, errorString) {
        return new ClientAuthError(ClientAuthErrorMessage.invalidStateError.code, `${ClientAuthErrorMessage.invalidStateError.desc} Invalid State: ${invalidState}, Root Err: ${errorString}`);
    }
    /**
     * Creates an error thrown when two states do not match.
     */
    static createStateMismatchError() {
        return new ClientAuthError(ClientAuthErrorMessage.stateMismatchError.code, ClientAuthErrorMessage.stateMismatchError.desc);
    }
    /**
     * Creates an error thrown when the state is not present
     * @param missingState
     */
    static createStateNotFoundError(missingState) {
        return new ClientAuthError(ClientAuthErrorMessage.stateNotFoundError.code, `${ClientAuthErrorMessage.stateNotFoundError.desc}:  ${missingState}`);
    }
    /**
     * Creates an error thrown when the nonce does not match.
     */
    static createNonceMismatchError() {
        return new ClientAuthError(ClientAuthErrorMessage.nonceMismatchError.code, ClientAuthErrorMessage.nonceMismatchError.desc);
    }
    /**
     * Creates an error thrown when max_age was provided in the request, but auth_time is not in the token claims
     * @param missingNonce
     */
    static createAuthTimeNotFoundError() {
        return new ClientAuthError(ClientAuthErrorMessage.authTimeNotFoundError.code, ClientAuthErrorMessage.authTimeNotFoundError.desc);
    }
    /**
     * Creates an error thrown when too much time has elapsed since the last end-user authentication
     */
    static createMaxAgeTranspiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.maxAgeTranspiredError.code, ClientAuthErrorMessage.maxAgeTranspiredError.desc);
    }
    /**
     * Creates an error thrown when the mnonce is not present
     * @param missingNonce
     */
    static createNonceNotFoundError(missingNonce) {
        return new ClientAuthError(ClientAuthErrorMessage.nonceNotFoundError.code, `${ClientAuthErrorMessage.nonceNotFoundError.desc}:  ${missingNonce}`);
    }
    /**
     * Throws error when multiple tokens are in cache.
     */
    static createMultipleMatchingTokensInCacheError() {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingTokens.code, `${ClientAuthErrorMessage.multipleMatchingTokens.desc}.`);
    }
    /**
     * Throws error when multiple accounts are in cache for the given params
     */
    static createMultipleMatchingAccountsInCacheError() {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingAccounts.code, ClientAuthErrorMessage.multipleMatchingAccounts.desc);
    }
    /**
     * Throws error when multiple appMetada are in cache for the given clientId.
     */
    static createMultipleMatchingAppMetadataInCacheError() {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingAppMetadata.code, ClientAuthErrorMessage.multipleMatchingAppMetadata.desc);
    }
    /**
     * Throws error when no auth code or refresh token is given to ServerTokenRequestParameters.
     */
    static createTokenRequestCannotBeMadeError() {
        return new ClientAuthError(ClientAuthErrorMessage.tokenRequestCannotBeMade.code, ClientAuthErrorMessage.tokenRequestCannotBeMade.desc);
    }
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createAppendEmptyScopeToSetError(givenScope) {
        return new ClientAuthError(ClientAuthErrorMessage.appendEmptyScopeError.code, `${ClientAuthErrorMessage.appendEmptyScopeError.desc} Given Scope: ${givenScope}`);
    }
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createRemoveEmptyScopeFromSetError(givenScope) {
        return new ClientAuthError(ClientAuthErrorMessage.removeEmptyScopeError.code, `${ClientAuthErrorMessage.removeEmptyScopeError.desc} Given Scope: ${givenScope}`);
    }
    /**
     * Throws error when attempting to append null or empty ScopeSet.
     * @param appendError
     */
    static createAppendScopeSetError(appendError) {
        return new ClientAuthError(ClientAuthErrorMessage.appendScopeSetError.code, `${ClientAuthErrorMessage.appendScopeSetError.desc} Detail Error: ${appendError}`);
    }
    /**
     * Throws error if ScopeSet is null or undefined.
     * @param givenScopeSet
     */
    static createEmptyInputScopeSetError() {
        return new ClientAuthError(ClientAuthErrorMessage.emptyInputScopeSetError.code, `${ClientAuthErrorMessage.emptyInputScopeSetError.desc}`);
    }
    /**
     * Throws error if user sets CancellationToken.cancel = true during polling of token endpoint during device code flow
     */
    static createDeviceCodeCancelledError() {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodePollingCancelled.code, `${ClientAuthErrorMessage.DeviceCodePollingCancelled.desc}`);
    }
    /**
     * Throws error if device code is expired
     */
    static createDeviceCodeExpiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodeExpired.code, `${ClientAuthErrorMessage.DeviceCodeExpired.desc}`);
    }
    /**
     * Throws error if device code is expired
     */
    static createDeviceCodeUnknownError() {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodeUnknownError.code, `${ClientAuthErrorMessage.DeviceCodeUnknownError.desc}`);
    }
    /**
     * Throws error when silent requests are made without an account object
     */
    static createNoAccountInSilentRequestError() {
        return new ClientAuthError(ClientAuthErrorMessage.NoAccountInSilentRequest.code, `${ClientAuthErrorMessage.NoAccountInSilentRequest.desc}`);
    }
    /**
     * Throws error when cache record is null or undefined.
     */
    static createNullOrUndefinedCacheRecord() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheRecord.code, ClientAuthErrorMessage.invalidCacheRecord.desc);
    }
    /**
     * Throws error when provided environment is not part of the CloudDiscoveryMetadata object
     */
    static createInvalidCacheEnvironmentError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheEnvironment.code, ClientAuthErrorMessage.invalidCacheEnvironment.desc);
    }
    /**
     * Throws error when account is not found in cache.
     */
    static createNoAccountFoundError() {
        return new ClientAuthError(ClientAuthErrorMessage.noAccountFound.code, ClientAuthErrorMessage.noAccountFound.desc);
    }
    /**
     * Throws error if ICachePlugin not set on CacheManager.
     */
    static createCachePluginError() {
        return new ClientAuthError(ClientAuthErrorMessage.CachePluginError.code, `${ClientAuthErrorMessage.CachePluginError.desc}`);
    }
    /**
     * Throws error if crypto object not found.
     * @param operationName
     */
    static createNoCryptoObjectError(operationName) {
        return new ClientAuthError(ClientAuthErrorMessage.noCryptoObj.code, `${ClientAuthErrorMessage.noCryptoObj.desc}${operationName}`);
    }
    /**
     * Throws error if cache type is invalid.
     */
    static createInvalidCacheTypeError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheType.code, `${ClientAuthErrorMessage.invalidCacheType.desc}`);
    }
    /**
     * Throws error if unexpected account type.
     */
    static createUnexpectedAccountTypeError() {
        return new ClientAuthError(ClientAuthErrorMessage.unexpectedAccountType.code, `${ClientAuthErrorMessage.unexpectedAccountType.desc}`);
    }
    /**
     * Throws error if unexpected credential type.
     */
    static createUnexpectedCredentialTypeError() {
        return new ClientAuthError(ClientAuthErrorMessage.unexpectedCredentialType.code, `${ClientAuthErrorMessage.unexpectedCredentialType.desc}`);
    }
    /**
     * Throws error if client assertion is not valid.
     */
    static createInvalidAssertionError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidAssertion.code, `${ClientAuthErrorMessage.invalidAssertion.desc}`);
    }
    /**
     * Throws error if client assertion is not valid.
     */
    static createInvalidCredentialError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidClientCredential.code, `${ClientAuthErrorMessage.invalidClientCredential.desc}`);
    }
    /**
     * Throws error if token cannot be retrieved from cache due to refresh being required.
     */
    static createRefreshRequiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.tokenRefreshRequired.code, ClientAuthErrorMessage.tokenRefreshRequired.desc);
    }
    /**
     * Throws error if the user defined timeout is reached.
     */
    static createUserTimeoutReachedError() {
        return new ClientAuthError(ClientAuthErrorMessage.userTimeoutReached.code, ClientAuthErrorMessage.userTimeoutReached.desc);
    }
    /*
     * Throws error if token claims are not populated for a signed jwt generation
     */
    static createTokenClaimsRequiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.tokenClaimsRequired.code, ClientAuthErrorMessage.tokenClaimsRequired.desc);
    }
    /**
     * Throws error when the authorization code is missing from the server response
     */
    static createNoAuthCodeInServerResponseError() {
        return new ClientAuthError(ClientAuthErrorMessage.noAuthorizationCodeFromServer.code, ClientAuthErrorMessage.noAuthorizationCodeFromServer.desc);
    }
    static createBindingKeyNotRemovedError() {
        return new ClientAuthError(ClientAuthErrorMessage.bindingKeyNotRemovedError.code, ClientAuthErrorMessage.bindingKeyNotRemovedError.desc);
    }
    /**
     * Thrown when logout is attempted for an authority that doesnt have an end_session_endpoint
     */
    static createLogoutNotSupportedError() {
        return new ClientAuthError(ClientAuthErrorMessage.logoutNotSupported.code, ClientAuthErrorMessage.logoutNotSupported.desc);
    }
    /**
     * Create an error when kid attribute is missing from a PoP token's cache record
     */
    static createKeyIdMissingError() {
        return new ClientAuthError(ClientAuthErrorMessage.keyIdMissing.code, ClientAuthErrorMessage.keyIdMissing.desc);
    }
    /**
     * Create an error when the client does not have network connectivity
     */
    static createNoNetworkConnectivityError() {
        return new ClientAuthError(ClientAuthErrorMessage.noNetworkConnectivity.code, ClientAuthErrorMessage.noNetworkConnectivity.desc);
    }
    /**
     * Create an error when the user cancels the flow
     */
    static createUserCanceledError() {
        return new ClientAuthError(ClientAuthErrorMessage.userCanceledError.code, ClientAuthErrorMessage.userCanceledError.desc);
    }
    /**
     * Creates an error for during acquireTokenByClientCredential when TenantId is set to "common" or "organizations"
     */
    static createMissingTenantIdError() {
        return new AuthError(ClientAuthErrorMessage.missingTenantIdError.code, ClientAuthErrorMessage.missingTenantIdError.desc);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientConfigurationErrorMessage class containing string constants used by error codes and messages.
 */
const ClientConfigurationErrorMessage = {
    redirectUriNotSet: {
        code: "redirect_uri_empty",
        desc: "A redirect URI is required for all calls, and none has been set.",
    },
    postLogoutUriNotSet: {
        code: "post_logout_uri_empty",
        desc: "A post logout redirect has not been set.",
    },
    claimsRequestParsingError: {
        code: "claims_request_parsing_error",
        desc: "Could not parse the given claims request object.",
    },
    authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https.  Please see here for valid authority configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options",
    },
    urlParseError: {
        code: "url_parse_error",
        desc: "URL could not be parsed into appropriate segments.",
    },
    urlEmptyError: {
        code: "empty_url_error",
        desc: "URL was empty or null.",
    },
    emptyScopesError: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as null, undefined or empty array because they are required to obtain an access token.",
    },
    nonArrayScopesError: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array.",
    },
    clientIdSingleScopeError: {
        code: "clientid_input_scopes_error",
        desc: "Client ID can only be provided as a single scope.",
    },
    invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent', 'create', 'none' and 'no_session'.  Please see here for valid configuration options: https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_common.html#commonauthorizationurlrequest",
    },
    invalidClaimsRequest: {
        code: "invalid_claims",
        desc: "Given claims parameter must be a stringified JSON object.",
    },
    tokenRequestEmptyError: {
        code: "token_request_empty",
        desc: "Token request was empty and not found in cache.",
    },
    logoutRequestEmptyError: {
        code: "logout_request_empty",
        desc: "The logout request was null or undefined.",
    },
    invalidCodeChallengeMethod: {
        code: "invalid_code_challenge_method",
        desc: 'code_challenge_method passed is invalid. Valid values are "plain" and "S256".',
    },
    invalidCodeChallengeParams: {
        code: "pkce_params_missing",
        desc: "Both params: code_challenge and code_challenge_method are to be passed if to be sent in the request",
    },
    invalidCloudDiscoveryMetadata: {
        code: "invalid_cloud_discovery_metadata",
        desc: "Invalid cloudDiscoveryMetadata provided. Must be a stringified JSON object containing tenant_discovery_endpoint and metadata fields",
    },
    invalidAuthorityMetadata: {
        code: "invalid_authority_metadata",
        desc: "Invalid authorityMetadata provided. Must by a stringified JSON object containing authorization_endpoint, token_endpoint, issuer fields.",
    },
    untrustedAuthority: {
        code: "untrusted_authority",
        desc: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter.",
    },
    invalidAzureCloudInstance: {
        code: "invalid_azure_cloud_instance",
        desc: "Invalid AzureCloudInstance provided. Please refer MSAL JS docs: aks.ms/msaljs/azure_cloud_instance for valid values",
    },
    missingSshJwk: {
        code: "missing_ssh_jwk",
        desc: "Missing sshJwk in SSH certificate request. A stringified JSON Web Key is required when using the SSH authentication scheme.",
    },
    missingSshKid: {
        code: "missing_ssh_kid",
        desc: "Missing sshKid in SSH certificate request. A string that uniquely identifies the public SSH key is required when using the SSH authentication scheme.",
    },
    missingNonceAuthenticationHeader: {
        code: "missing_nonce_authentication_header",
        desc: "Unable to find an authentication header containing server nonce. Either the Authentication-Info or WWW-Authenticate headers must be present in order to obtain a server nonce.",
    },
    invalidAuthenticationHeader: {
        code: "invalid_authentication_header",
        desc: "Invalid authentication header provided",
    },
    cannotSetOIDCOptions: {
        code: "cannot_set_OIDCOptions",
        desc: "Cannot set OIDCOptions parameter. Please change the protocol mode to OIDC or use a non-Microsoft authority.",
    },
    cannotAllowNativeBroker: {
        code: "cannot_allow_native_broker",
        desc: "Cannot set allowNativeBroker parameter to true when not in AAD protocol mode.",
    },
    authorityMismatch: {
        code: "authority_mismatch",
        desc: "Authority mismatch error. Authority provided in login request or PublicClientApplication config does not match the environment of the provided account. Please use a matching account or make an interactive request to login to this authority.",
    },
};
/**
 * Error thrown when there is an error in configuration of the MSAL.js library.
 */
class ClientConfigurationError extends ClientAuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "ClientConfigurationError";
        Object.setPrototypeOf(this, ClientConfigurationError.prototype);
    }
    /**
     * Creates an error thrown when the redirect uri is empty (not set by caller)
     */
    static createRedirectUriEmptyError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.redirectUriNotSet.code, ClientConfigurationErrorMessage.redirectUriNotSet.desc);
    }
    /**
     * Creates an error thrown when the post-logout redirect uri is empty (not set by caller)
     */
    static createPostLogoutRedirectUriEmptyError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.postLogoutUriNotSet.code, ClientConfigurationErrorMessage.postLogoutUriNotSet.desc);
    }
    /**
     * Creates an error thrown when the claims request could not be successfully parsed
     */
    static createClaimsRequestParsingError(claimsRequestParseError) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.claimsRequestParsingError.code, `${ClientConfigurationErrorMessage.claimsRequestParsingError.desc} Given value: ${claimsRequestParseError}`);
    }
    /**
     * Creates an error thrown if authority uri is given an insecure protocol.
     * @param urlString
     */
    static createInsecureAuthorityUriError(urlString) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.authorityUriInsecure.code, `${ClientConfigurationErrorMessage.authorityUriInsecure.desc} Given URI: ${urlString}`);
    }
    /**
     * Creates an error thrown if URL string does not parse into separate segments.
     * @param urlString
     */
    static createUrlParseError(urlParseError) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlParseError.code, `${ClientConfigurationErrorMessage.urlParseError.desc} Given Error: ${urlParseError}`);
    }
    /**
     * Creates an error thrown if URL string is empty or null.
     * @param urlString
     */
    static createUrlEmptyError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlEmptyError.code, ClientConfigurationErrorMessage.urlEmptyError.desc);
    }
    /**
     * Error thrown when scopes are empty.
     * @param scopesValue
     */
    static createEmptyScopesArrayError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopesError.code, `${ClientConfigurationErrorMessage.emptyScopesError.desc}`);
    }
    /**
     * Error thrown when client id scope is not provided as single scope.
     * @param inputScopes
     */
    static createClientIdSingleScopeError(inputScopes) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.clientIdSingleScopeError.code, `${ClientConfigurationErrorMessage.clientIdSingleScopeError.desc} Given Scopes: ${inputScopes}`);
    }
    /**
     * Error thrown when prompt is not an allowed type.
     * @param promptValue
     */
    static createInvalidPromptError(promptValue) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code, `${ClientConfigurationErrorMessage.invalidPrompt.desc} Given value: ${promptValue}`);
    }
    /**
     * Creates error thrown when claims parameter is not a stringified JSON object
     */
    static createInvalidClaimsRequestError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidClaimsRequest.code, ClientConfigurationErrorMessage.invalidClaimsRequest.desc);
    }
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    static createEmptyLogoutRequestError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.logoutRequestEmptyError.code, ClientConfigurationErrorMessage.logoutRequestEmptyError.desc);
    }
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    static createEmptyTokenRequestError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.tokenRequestEmptyError.code, ClientConfigurationErrorMessage.tokenRequestEmptyError.desc);
    }
    /**
     * Throws error when an invalid code_challenge_method is passed by the user
     */
    static createInvalidCodeChallengeMethodError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCodeChallengeMethod.code, ClientConfigurationErrorMessage.invalidCodeChallengeMethod.desc);
    }
    /**
     * Throws error when both params: code_challenge and code_challenge_method are not passed together
     */
    static createInvalidCodeChallengeParamsError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCodeChallengeParams.code, ClientConfigurationErrorMessage.invalidCodeChallengeParams.desc);
    }
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    static createInvalidCloudDiscoveryMetadataError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.code, ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.desc);
    }
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    static createInvalidAuthorityMetadataError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthorityMetadata.code, ClientConfigurationErrorMessage.invalidAuthorityMetadata.desc);
    }
    /**
     * Throws error when provided authority is not a member of the trusted host list
     */
    static createUntrustedAuthorityError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.untrustedAuthority.code, ClientConfigurationErrorMessage.untrustedAuthority.desc);
    }
    /**
     * Throws error when the AzureCloudInstance is set to an invalid value
     */
    static createInvalidAzureCloudInstanceError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAzureCloudInstance.code, ClientConfigurationErrorMessage.invalidAzureCloudInstance.desc);
    }
    /**
     * Throws an error when the authentication scheme is set to SSH but the SSH public key is omitted from the request
     */
    static createMissingSshJwkError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.missingSshJwk.code, ClientConfigurationErrorMessage.missingSshJwk.desc);
    }
    /**
     * Throws an error when the authentication scheme is set to SSH but the SSH public key ID is omitted from the request
     */
    static createMissingSshKidError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.missingSshKid.code, ClientConfigurationErrorMessage.missingSshKid.desc);
    }
    /**
     * Throws error when provided headers don't contain a header that a server nonce can be extracted from
     */
    static createMissingNonceAuthenticationHeadersError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.missingNonceAuthenticationHeader.code, ClientConfigurationErrorMessage.missingNonceAuthenticationHeader.desc);
    }
    /**
     * Throws error when a provided header is invalid in any way
     */
    static createInvalidAuthenticationHeaderError(invalidHeaderName, details) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthenticationHeader.code, `${ClientConfigurationErrorMessage.invalidAuthenticationHeader.desc}. Invalid header: ${invalidHeaderName}. Details: ${details}`);
    }
    /**
     * Throws error when provided non-default OIDCOptions when not in OIDC protocol mode
     */
    static createCannotSetOIDCOptionsError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.cannotSetOIDCOptions.code, ClientConfigurationErrorMessage.cannotSetOIDCOptions.desc);
    }
    /**
     * Throws error when allowNativeBroker is set to true when not in AAD protocol mode
     */
    static createCannotAllowNativeBrokerError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.cannotAllowNativeBroker.code, ClientConfigurationErrorMessage.cannotAllowNativeBroker.desc);
    }
    /**
     * Create an error when the authority provided in request does not match authority provided in account or MSAL.js configuration.
     */
    static createAuthorityMismatchError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.authorityMismatch.code, ClientConfigurationErrorMessage.authorityMismatch.desc);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
class StringUtils {
    /**
     * Check if stringified object is empty
     * @param strObj
     */
    static isEmptyObj(strObj) {
        if (strObj) {
            try {
                const obj = JSON.parse(strObj);
                return Object.keys(obj).length === 0;
            }
            catch (e) { }
        }
        return true;
    }
    static startsWith(str, search) {
        return str.indexOf(search) === 0;
    }
    static endsWith(str, search) {
        return (str.length >= search.length &&
            str.lastIndexOf(search) === str.length - search.length);
    }
    /**
     * Parses string into an object.
     *
     * @param query
     */
    static queryStringToObject(query) {
        const obj = {};
        const params = query.split("&");
        const decode = (s) => decodeURIComponent(s.replace(/\+/g, " "));
        params.forEach((pair) => {
            if (pair.trim()) {
                const [key, value] = pair.split(/=(.+)/g, 2); // Split on the first occurence of the '=' character
                if (key && value) {
                    obj[decode(key)] = decode(value);
                }
            }
        });
        return obj;
    }
    /**
     * Trims entries in an array.
     *
     * @param arr
     */
    static trimArrayEntries(arr) {
        return arr.map((entry) => entry.trim());
    }
    /**
     * Removes empty strings from array
     * @param arr
     */
    static removeEmptyStringsFromArray(arr) {
        return arr.filter((entry) => {
            return !!entry;
        });
    }
    /**
     * Attempts to parse a string into JSON
     * @param str
     */
    static jsonParseHelper(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    }
    /**
     * Tests if a given string matches a given pattern, with support for wildcards and queries.
     * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
     * @param input String to match against
     */
    static matchPattern(pattern, input) {
        /**
         * Wildcard support: https://stackoverflow.com/a/3117248/4888559
         * Queries: replaces "?" in string with escaped "\?" for regex test
         */
        // eslint-disable-next-line security/detect-non-literal-regexp
        const regex = new RegExp(pattern
            .replace(/\\/g, "\\\\")
            .replace(/\*/g, "[^ ]*")
            .replace(/\?/g, "\\?"));
        return regex.test(input);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The ScopeSet class creates a set of scopes. Scopes are case-insensitive, unique values, so the Set object in JS makes
 * the most sense to implement for this class. All scopes are trimmed and converted to lower case strings in intersection and union functions
 * to ensure uniqueness of strings.
 */
class ScopeSet {
    constructor(inputScopes) {
        // Filter empty string and null/undefined array items
        const scopeArr = inputScopes
            ? StringUtils.trimArrayEntries([...inputScopes])
            : [];
        const filteredInput = scopeArr
            ? StringUtils.removeEmptyStringsFromArray(scopeArr)
            : [];
        // Validate and filter scopes (validate function throws if validation fails)
        this.validateInputScopes(filteredInput);
        this.scopes = new Set(); // Iterator in constructor not supported by IE11
        filteredInput.forEach((scope) => this.scopes.add(scope));
    }
    /**
     * Factory method to create ScopeSet from space-delimited string
     * @param inputScopeString
     * @param appClientId
     * @param scopesRequired
     */
    static fromString(inputScopeString) {
        const scopeString = inputScopeString || Constants.EMPTY_STRING;
        const inputScopes = scopeString.split(" ");
        return new ScopeSet(inputScopes);
    }
    /**
     * Creates the set of scopes to search for in cache lookups
     * @param inputScopeString
     * @returns
     */
    static createSearchScopes(inputScopeString) {
        const scopeSet = new ScopeSet(inputScopeString);
        if (!scopeSet.containsOnlyOIDCScopes()) {
            scopeSet.removeOIDCScopes();
        }
        else {
            scopeSet.removeScope(Constants.OFFLINE_ACCESS_SCOPE);
        }
        return scopeSet;
    }
    /**
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} inputScopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     */
    validateInputScopes(inputScopes) {
        // Check if scopes are required but not given or is an empty array
        if (!inputScopes || inputScopes.length < 1) {
            throw ClientConfigurationError.createEmptyScopesArrayError();
        }
    }
    /**
     * Check if a given scope is present in this set of scopes.
     * @param scope
     */
    containsScope(scope) {
        const lowerCaseScopes = this.printScopesLowerCase().split(" ");
        const lowerCaseScopesSet = new ScopeSet(lowerCaseScopes);
        // compare lowercase scopes
        return scope
            ? lowerCaseScopesSet.scopes.has(scope.toLowerCase())
            : false;
    }
    /**
     * Check if a set of scopes is present in this set of scopes.
     * @param scopeSet
     */
    containsScopeSet(scopeSet) {
        if (!scopeSet || scopeSet.scopes.size <= 0) {
            return false;
        }
        return (this.scopes.size >= scopeSet.scopes.size &&
            scopeSet.asArray().every((scope) => this.containsScope(scope)));
    }
    /**
     * Check if set of scopes contains only the defaults
     */
    containsOnlyOIDCScopes() {
        let defaultScopeCount = 0;
        OIDC_SCOPES.forEach((defaultScope) => {
            if (this.containsScope(defaultScope)) {
                defaultScopeCount += 1;
            }
        });
        return this.scopes.size === defaultScopeCount;
    }
    /**
     * Appends single scope if passed
     * @param newScope
     */
    appendScope(newScope) {
        if (newScope) {
            this.scopes.add(newScope.trim());
        }
    }
    /**
     * Appends multiple scopes if passed
     * @param newScopes
     */
    appendScopes(newScopes) {
        try {
            newScopes.forEach((newScope) => this.appendScope(newScope));
        }
        catch (e) {
            throw ClientAuthError.createAppendScopeSetError(e);
        }
    }
    /**
     * Removes element from set of scopes.
     * @param scope
     */
    removeScope(scope) {
        if (!scope) {
            throw ClientAuthError.createRemoveEmptyScopeFromSetError(scope);
        }
        this.scopes.delete(scope.trim());
    }
    /**
     * Removes default scopes from set of scopes
     * Primarily used to prevent cache misses if the default scopes are not returned from the server
     */
    removeOIDCScopes() {
        OIDC_SCOPES.forEach((defaultScope) => {
            this.scopes.delete(defaultScope);
        });
    }
    /**
     * Combines an array of scopes with the current set of scopes.
     * @param otherScopes
     */
    unionScopeSets(otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        const unionScopes = new Set(); // Iterator in constructor not supported in IE11
        otherScopes.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
        this.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
        return unionScopes;
    }
    /**
     * Check if scopes intersect between this set and another.
     * @param otherScopes
     */
    intersectingScopeSets(otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        // Do not allow OIDC scopes to be the only intersecting scopes
        if (!otherScopes.containsOnlyOIDCScopes()) {
            otherScopes.removeOIDCScopes();
        }
        const unionScopes = this.unionScopeSets(otherScopes);
        const sizeOtherScopes = otherScopes.getScopeCount();
        const sizeThisScopes = this.getScopeCount();
        const sizeUnionScopes = unionScopes.size;
        return sizeUnionScopes < sizeThisScopes + sizeOtherScopes;
    }
    /**
     * Returns size of set of scopes.
     */
    getScopeCount() {
        return this.scopes.size;
    }
    /**
     * Returns the scopes as an array of string values
     */
    asArray() {
        const array = [];
        this.scopes.forEach((val) => array.push(val));
        return array;
    }
    /**
     * Prints scopes into a space-delimited string
     */
    printScopes() {
        if (this.scopes) {
            const scopeArr = this.asArray();
            return scopeArr.join(" ");
        }
        return Constants.EMPTY_STRING;
    }
    /**
     * Prints scopes into a space-delimited lower-case string (used for caching)
     */
    printScopesLowerCase() {
        return this.printScopes().toLowerCase();
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Function to build a client info object from server clientInfo string
 * @param rawClientInfo
 * @param crypto
 */
function buildClientInfo(rawClientInfo, crypto) {
    if (!rawClientInfo) {
        throw ClientAuthError.createClientInfoEmptyError();
    }
    try {
        const decodedClientInfo = crypto.base64Decode(rawClientInfo);
        return JSON.parse(decodedClientInfo);
    }
    catch (e) {
        throw ClientAuthError.createClientInfoDecodingError(e.message);
    }
}
/**
 * Function to build a client info object from cached homeAccountId string
 * @param homeAccountId
 */
function buildClientInfoFromHomeAccountId(homeAccountId) {
    if (!homeAccountId) {
        throw ClientAuthError.createClientInfoDecodingError("Home account ID was empty.");
    }
    const clientInfoParts = homeAccountId.split(Separators.CLIENT_INFO_SEPARATOR, 2);
    return {
        uid: clientInfoParts[0],
        utid: clientInfoParts.length < 2
            ? Constants.EMPTY_STRING
            : clientInfoParts[1],
    };
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Authority types supported by MSAL.
 */
const AuthorityType = {
    Default: 0,
    Adfs: 1,
    Dsts: 2,
    Ciam: 3,
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Protocol modes supported by MSAL.
 */
const ProtocolMode = {
    AAD: "AAD",
    OIDC: "OIDC",
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Type that defines required and optional parameters for an Account field (based on universal cache schema implemented by all MSALs).
 *
 * Key : Value Schema
 *
 * Key: <home_account_id>-<environment>-<realm*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      localAccountId: Original tenant-specific accountID, usually used for legacy cases
 *      username: primary username that represents the user, usually corresponds to preferred_username in the v2 endpt
 *      authorityType: Accounts authority type as a string
 *      name: Full name for the account, including given name and family name,
 *      lastModificationTime: last time this entity was modified in the cache
 *      lastModificationApp:
 *      idTokenClaims: Object containing claims parsed from ID token
 *      nativeAccountId: Account identifier on the native device
 * }
 * @internal
 */
class AccountEntity {
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    generateAccountId() {
        const accountId = [this.homeAccountId, this.environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Generate Account Cache Key as per the schema: <home_account_id>-<environment>-<realm*>
     */
    generateAccountKey() {
        return AccountEntity.generateAccountCacheKey({
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
        });
    }
    /**
     * Returns the AccountInfo interface for this account.
     */
    getAccountInfo() {
        return {
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
            name: this.name,
            idTokenClaims: this.idTokenClaims,
            nativeAccountId: this.nativeAccountId,
            authorityType: this.authorityType,
        };
    }
    /**
     * Generates account key from interface
     * @param accountInterface
     */
    static generateAccountCacheKey(accountInterface) {
        const accountKey = [
            accountInterface.homeAccountId,
            accountInterface.environment || Constants.EMPTY_STRING,
            accountInterface.tenantId || Constants.EMPTY_STRING,
        ];
        return accountKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Build Account cache from IdToken, clientInfo and authority/policy. Associated with AAD.
     * @param accountDetails
     */
    static createAccount(accountDetails, authority) {
        const account = new AccountEntity();
        if (authority.authorityType === AuthorityType.Adfs) {
            account.authorityType = CacheAccountType.ADFS_ACCOUNT_TYPE;
        }
        else if (authority.protocolMode === ProtocolMode.AAD) {
            account.authorityType = CacheAccountType.MSSTS_ACCOUNT_TYPE;
        }
        else {
            account.authorityType = CacheAccountType.GENERIC_ACCOUNT_TYPE;
        }
        account.clientInfo = accountDetails.clientInfo;
        account.homeAccountId = accountDetails.homeAccountId;
        account.nativeAccountId = accountDetails.nativeAccountId;
        const env = accountDetails.environment ||
            (authority && authority.getPreferredCache());
        if (!env) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        account.environment = env;
        // non AAD scenarios can have empty realm
        account.realm =
            accountDetails.idTokenClaims.tid || Constants.EMPTY_STRING;
        account.idTokenClaims = accountDetails.idTokenClaims;
        // How do you account for MSA CID here?
        account.localAccountId =
            accountDetails.idTokenClaims.oid ||
                accountDetails.idTokenClaims.sub ||
                Constants.EMPTY_STRING;
        /*
         * In B2C scenarios the emails claim is used instead of preferred_username and it is an array.
         * In most cases it will contain a single email. This field should not be relied upon if a custom
         * policy is configured to return more than 1 email.
         */
        const preferredUsername = accountDetails.idTokenClaims.preferred_username ||
            accountDetails.idTokenClaims.upn;
        const email = accountDetails.idTokenClaims.emails
            ? accountDetails.idTokenClaims.emails[0]
            : null;
        account.username = preferredUsername || email || Constants.EMPTY_STRING;
        account.name = accountDetails.idTokenClaims.name;
        account.cloudGraphHostName = accountDetails.cloudGraphHostName;
        account.msGraphHost = accountDetails.msGraphHost;
        return account;
    }
    /**
     * Creates an AccountEntity object from AccountInfo
     * @param accountInfo
     * @param cloudGraphHostName
     * @param msGraphHost
     * @returns
     */
    static createFromAccountInfo(accountInfo, cloudGraphHostName, msGraphHost) {
        const account = new AccountEntity();
        account.authorityType =
            accountInfo.authorityType || CacheAccountType.GENERIC_ACCOUNT_TYPE;
        account.homeAccountId = accountInfo.homeAccountId;
        account.localAccountId = accountInfo.localAccountId;
        account.nativeAccountId = accountInfo.nativeAccountId;
        account.realm = accountInfo.tenantId;
        account.environment = accountInfo.environment;
        account.username = accountInfo.username;
        account.name = accountInfo.name;
        account.idTokenClaims = accountInfo.idTokenClaims;
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        return account;
    }
    /**
     * Generate HomeAccountId from server response
     * @param serverClientInfo
     * @param authType
     */
    static generateHomeAccountId(serverClientInfo, authType, logger, cryptoObj, idTokenClaims) {
        const accountId = idTokenClaims?.sub
            ? idTokenClaims.sub
            : Constants.EMPTY_STRING;
        // since ADFS does not have tid and does not set client_info
        if (authType === AuthorityType.Adfs ||
            authType === AuthorityType.Dsts) {
            return accountId;
        }
        // for cases where there is clientInfo
        if (serverClientInfo) {
            try {
                const clientInfo = buildClientInfo(serverClientInfo, cryptoObj);
                if (clientInfo.uid && clientInfo.utid) {
                    return `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`;
                }
            }
            catch (e) { }
        }
        // default to "sub" claim
        logger.verbose("No client info in response");
        return accountId;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAccountEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("localAccountId") &&
            entity.hasOwnProperty("username") &&
            entity.hasOwnProperty("authorityType"));
    }
    /**
     * Helper function to determine whether 2 accountInfo objects represent the same account
     * @param accountA
     * @param accountB
     * @param compareClaims - If set to true idTokenClaims will also be compared to determine account equality
     */
    static accountInfoIsEqual(accountA, accountB, compareClaims) {
        if (!accountA || !accountB) {
            return false;
        }
        let claimsMatch = true; // default to true so as to not fail comparison below if compareClaims: false
        if (compareClaims) {
            const accountAClaims = (accountA.idTokenClaims ||
                {});
            const accountBClaims = (accountB.idTokenClaims ||
                {});
            // issued at timestamp and nonce are expected to change each time a new id token is acquired
            claimsMatch =
                accountAClaims.iat === accountBClaims.iat &&
                    accountAClaims.nonce === accountBClaims.nonce;
        }
        return (accountA.homeAccountId === accountB.homeAccountId &&
            accountA.localAccountId === accountB.localAccountId &&
            accountA.username === accountB.username &&
            accountA.tenantId === accountB.tenantId &&
            accountA.environment === accountB.environment &&
            accountA.nativeAccountId === accountB.nativeAccountId &&
            claimsMatch);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Extract token by decoding the rawToken
 *
 * @param encodedToken
 */
function extractTokenClaims(encodedToken, base64Decode) {
    const jswPayload = getJWSPayload(encodedToken);
    // token will be decoded to get the username
    try {
        // base64Decode() should throw an error if there is an issue
        const base64Decoded = base64Decode(jswPayload);
        return JSON.parse(base64Decoded);
    }
    catch (err) {
        throw ClientAuthError.createTokenParsingError(err);
    }
}
/**
 * decode a JWT
 *
 * @param authToken
 */
function getJWSPayload(authToken) {
    if (!authToken) {
        throw ClientAuthError.createTokenNullOrEmptyError(authToken);
    }
    const tokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
    const matches = tokenPartsRegex.exec(authToken);
    if (!matches || matches.length < 4) {
        throw ClientAuthError.createTokenParsingError(`Given token is malformed: ${JSON.stringify(authToken)}`);
    }
    /**
     * const crackedToken = {
     *  header: matches[1],
     *  JWSPayload: matches[2],
     *  JWSSig: matches[3],
     * };
     */
    return matches[2];
}
/**
 * Determine if the token's max_age has transpired
 */
function checkMaxAge(authTime, maxAge) {
    /*
     * per https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
     * To force an immediate re-authentication: If an app requires that a user re-authenticate prior to access,
     * provide a value of 0 for the max_age parameter and the AS will force a fresh login.
     */
    const fiveMinuteSkew = 300000; // five minutes in milliseconds
    if (maxAge === 0 || Date.now() - fiveMinuteSkew > authTime + maxAge) {
        throw ClientAuthError.createMaxAgeTranspiredError();
    }
}

var AuthToken = /*#__PURE__*/Object.freeze({
    __proto__: null,
    checkMaxAge: checkMaxAge,
    extractTokenClaims: extractTokenClaims,
    getJWSPayload: getJWSPayload
});

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Interface class which implement cache storage functions used by MSAL to perform validity checks, and store tokens.
 * @internal
 */
class CacheManager {
    constructor(clientId, cryptoImpl, logger) {
        this.clientId = clientId;
        this.cryptoImpl = cryptoImpl;
        this.commonLogger = logger.clone(name, version);
    }
    /**
     * Returns all accounts in cache
     */
    getAllAccounts() {
        const allAccountKeys = this.getAccountKeys();
        if (allAccountKeys.length < 1) {
            return [];
        }
        const accountEntities = allAccountKeys.reduce((accounts, key) => {
            const entity = this.getAccount(key);
            if (!entity) {
                return accounts;
            }
            accounts.push(entity);
            return accounts;
        }, []);
        if (accountEntities.length < 1) {
            return [];
        }
        else {
            const allAccounts = accountEntities.map((accountEntity) => {
                return this.getAccountInfoFromEntity(accountEntity);
            });
            return allAccounts;
        }
    }
    /**
     * Gets accountInfo object based on provided filters
     */
    getAccountInfoFilteredBy(accountFilter) {
        const allAccounts = this.getAccountsFilteredBy(accountFilter);
        if (allAccounts.length > 0) {
            return this.getAccountInfoFromEntity(allAccounts[0]);
        }
        else {
            return null;
        }
    }
    getAccountInfoFromEntity(accountEntity) {
        const accountInfo = accountEntity.getAccountInfo();
        const idToken = this.getIdToken(accountInfo);
        if (idToken) {
            accountInfo.idToken = idToken.secret;
            accountInfo.idTokenClaims = extractTokenClaims(idToken.secret, this.cryptoImpl.base64Decode);
        }
        return accountInfo;
    }
    /**
     * saves a cache record
     * @param cacheRecord
     */
    async saveCacheRecord(cacheRecord, storeInCache) {
        if (!cacheRecord) {
            throw ClientAuthError.createNullOrUndefinedCacheRecord();
        }
        if (!!cacheRecord.account) {
            this.setAccount(cacheRecord.account);
        }
        if (!!cacheRecord.idToken && storeInCache?.idToken !== false) {
            this.setIdTokenCredential(cacheRecord.idToken);
        }
        if (!!cacheRecord.accessToken && storeInCache?.accessToken !== false) {
            await this.saveAccessToken(cacheRecord.accessToken);
        }
        if (!!cacheRecord.refreshToken &&
            storeInCache?.refreshToken !== false) {
            this.setRefreshTokenCredential(cacheRecord.refreshToken);
        }
        if (!!cacheRecord.appMetadata) {
            this.setAppMetadata(cacheRecord.appMetadata);
        }
    }
    /**
     * saves access token credential
     * @param credential
     */
    async saveAccessToken(credential) {
        const accessTokenFilter = {
            clientId: credential.clientId,
            credentialType: credential.credentialType,
            environment: credential.environment,
            homeAccountId: credential.homeAccountId,
            realm: credential.realm,
            tokenType: credential.tokenType,
            requestedClaimsHash: credential.requestedClaimsHash,
        };
        const tokenKeys = this.getTokenKeys();
        const currentScopes = ScopeSet.fromString(credential.target);
        const removedAccessTokens = [];
        tokenKeys.accessToken.forEach((key) => {
            if (!this.accessTokenKeyMatchesFilter(key, accessTokenFilter, false)) {
                return;
            }
            const tokenEntity = this.getAccessTokenCredential(key);
            if (tokenEntity &&
                this.credentialMatchesFilter(tokenEntity, accessTokenFilter)) {
                const tokenScopeSet = ScopeSet.fromString(tokenEntity.target);
                if (tokenScopeSet.intersectingScopeSets(currentScopes)) {
                    removedAccessTokens.push(this.removeAccessToken(key));
                }
            }
        });
        await Promise.all(removedAccessTokens);
        this.setAccessTokenCredential(credential);
    }
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    getAccountsFilteredBy(accountFilter) {
        const allAccountKeys = this.getAccountKeys();
        const matchingAccounts = [];
        allAccountKeys.forEach((cacheKey) => {
            if (!this.isAccountKey(cacheKey, accountFilter.homeAccountId, accountFilter.realm)) {
                // Don't parse value if the key doesn't match the account filters
                return;
            }
            const entity = this.getAccount(cacheKey);
            if (!entity) {
                return;
            }
            if (!!accountFilter.homeAccountId &&
                !this.matchHomeAccountId(entity, accountFilter.homeAccountId)) {
                return;
            }
            if (!!accountFilter.localAccountId &&
                !this.matchLocalAccountId(entity, accountFilter.localAccountId)) {
                return;
            }
            if (!!accountFilter.username &&
                !this.matchUsername(entity, accountFilter.username)) {
                return;
            }
            if (!!accountFilter.environment &&
                !this.matchEnvironment(entity, accountFilter.environment)) {
                return;
            }
            if (!!accountFilter.realm &&
                !this.matchRealm(entity, accountFilter.realm)) {
                return;
            }
            if (!!accountFilter.nativeAccountId &&
                !this.matchNativeAccountId(entity, accountFilter.nativeAccountId)) {
                return;
            }
            matchingAccounts.push(entity);
        });
        return matchingAccounts;
    }
    /**
     * Returns true if the given key matches our account key schema. Also matches homeAccountId and/or tenantId if provided
     * @param key
     * @param homeAccountId
     * @param tenantId
     * @returns
     */
    isAccountKey(key, homeAccountId, tenantId) {
        if (key.split(Separators.CACHE_KEY_SEPARATOR).length < 3) {
            // Account cache keys contain 3 items separated by '-' (each item may also contain '-')
            return false;
        }
        if (homeAccountId &&
            !key.toLowerCase().includes(homeAccountId.toLowerCase())) {
            return false;
        }
        if (tenantId && !key.toLowerCase().includes(tenantId.toLowerCase())) {
            return false;
        }
        // Do not check environment as aliasing can cause false negatives
        return true;
    }
    /**
     * Returns true if the given key matches our credential key schema.
     * @param key
     */
    isCredentialKey(key) {
        if (key.split(Separators.CACHE_KEY_SEPARATOR).length < 6) {
            // Credential cache keys contain 6 items separated by '-' (each item may also contain '-')
            return false;
        }
        const lowerCaseKey = key.toLowerCase();
        // Credential keys must indicate what credential type they represent
        if (lowerCaseKey.indexOf(CredentialType.ID_TOKEN.toLowerCase()) ===
            -1 &&
            lowerCaseKey.indexOf(CredentialType.ACCESS_TOKEN.toLowerCase()) ===
                -1 &&
            lowerCaseKey.indexOf(CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) === -1 &&
            lowerCaseKey.indexOf(CredentialType.REFRESH_TOKEN.toLowerCase()) ===
                -1) {
            return false;
        }
        if (lowerCaseKey.indexOf(CredentialType.REFRESH_TOKEN.toLowerCase()) >
            -1) {
            // Refresh tokens must contain the client id or family id
            const clientIdValidation = `${CredentialType.REFRESH_TOKEN}${Separators.CACHE_KEY_SEPARATOR}${this.clientId}${Separators.CACHE_KEY_SEPARATOR}`;
            const familyIdValidation = `${CredentialType.REFRESH_TOKEN}${Separators.CACHE_KEY_SEPARATOR}${THE_FAMILY_ID}${Separators.CACHE_KEY_SEPARATOR}`;
            if (lowerCaseKey.indexOf(clientIdValidation.toLowerCase()) === -1 &&
                lowerCaseKey.indexOf(familyIdValidation.toLowerCase()) === -1) {
                return false;
            }
        }
        else if (lowerCaseKey.indexOf(this.clientId.toLowerCase()) === -1) {
            // Tokens must contain the clientId
            return false;
        }
        return true;
    }
    /**
     * Returns whether or not the given credential entity matches the filter
     * @param entity
     * @param filter
     * @returns
     */
    credentialMatchesFilter(entity, filter) {
        if (!!filter.clientId && !this.matchClientId(entity, filter.clientId)) {
            return false;
        }
        if (!!filter.userAssertionHash &&
            !this.matchUserAssertionHash(entity, filter.userAssertionHash)) {
            return false;
        }
        /*
         * homeAccountId can be undefined, and we want to filter out cached items that have a homeAccountId of ""
         * because we don't want a client_credential request to return a cached token that has a homeAccountId
         */
        if (typeof filter.homeAccountId === "string" &&
            !this.matchHomeAccountId(entity, filter.homeAccountId)) {
            return false;
        }
        if (!!filter.environment &&
            !this.matchEnvironment(entity, filter.environment)) {
            return false;
        }
        if (!!filter.realm && !this.matchRealm(entity, filter.realm)) {
            return false;
        }
        if (!!filter.credentialType &&
            !this.matchCredentialType(entity, filter.credentialType)) {
            return false;
        }
        if (!!filter.familyId && !this.matchFamilyId(entity, filter.familyId)) {
            return false;
        }
        /*
         * idTokens do not have "target", target specific refreshTokens do exist for some types of authentication
         * Resource specific refresh tokens case will be added when the support is deemed necessary
         */
        if (!!filter.target && !this.matchTarget(entity, filter.target)) {
            return false;
        }
        // If request OR cached entity has requested Claims Hash, check if they match
        if (filter.requestedClaimsHash || entity.requestedClaimsHash) {
            // Don't match if either is undefined or they are different
            if (entity.requestedClaimsHash !== filter.requestedClaimsHash) {
                return false;
            }
        }
        // Access Token with Auth Scheme specific matching
        if (entity.credentialType ===
            CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME) {
            if (!!filter.tokenType &&
                !this.matchTokenType(entity, filter.tokenType)) {
                return false;
            }
            // KeyId (sshKid) in request must match cached SSH certificate keyId because SSH cert is bound to a specific key
            if (filter.tokenType === AuthenticationScheme.SSH) {
                if (filter.keyId && !this.matchKeyId(entity, filter.keyId)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
     * @param filter
     */
    getAppMetadataFilteredBy(filter) {
        return this.getAppMetadataFilteredByInternal(filter.environment, filter.clientId);
    }
    /**
     * Support function to help match appMetadata
     * @param environment
     * @param clientId
     */
    getAppMetadataFilteredByInternal(environment, clientId) {
        const allCacheKeys = this.getKeys();
        const matchingAppMetadata = {};
        allCacheKeys.forEach((cacheKey) => {
            // don't parse any non-appMetadata type cache entities
            if (!this.isAppMetadata(cacheKey)) {
                return;
            }
            // Attempt retrieval
            const entity = this.getAppMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (!!environment && !this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!clientId && !this.matchClientId(entity, clientId)) {
                return;
            }
            matchingAppMetadata[cacheKey] = entity;
        });
        return matchingAppMetadata;
    }
    /**
     * retrieve authorityMetadata that contains a matching alias
     * @param filter
     */
    getAuthorityMetadataByAlias(host) {
        const allCacheKeys = this.getAuthorityMetadataKeys();
        let matchedEntity = null;
        allCacheKeys.forEach((cacheKey) => {
            // don't parse any non-authorityMetadata type cache entities
            if (!this.isAuthorityMetadata(cacheKey) ||
                cacheKey.indexOf(this.clientId) === -1) {
                return;
            }
            // Attempt retrieval
            const entity = this.getAuthorityMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (entity.aliases.indexOf(host) === -1) {
                return;
            }
            matchedEntity = entity;
        });
        return matchedEntity;
    }
    /**
     * Removes all accounts and related tokens from cache.
     */
    async removeAllAccounts() {
        const allAccountKeys = this.getAccountKeys();
        const removedAccounts = [];
        allAccountKeys.forEach((cacheKey) => {
            removedAccounts.push(this.removeAccount(cacheKey));
        });
        await Promise.all(removedAccounts);
    }
    /**
     * Removes the account and related tokens for a given account key
     * @param account
     */
    async removeAccount(accountKey) {
        const account = this.getAccount(accountKey);
        if (!account) {
            return;
        }
        await this.removeAccountContext(account);
        this.removeItem(accountKey);
    }
    /**
     * Removes credentials associated with the provided account
     * @param account
     */
    async removeAccountContext(account) {
        const allTokenKeys = this.getTokenKeys();
        const accountId = account.generateAccountId();
        const removedCredentials = [];
        allTokenKeys.idToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                this.removeIdToken(key);
            }
        });
        allTokenKeys.accessToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                removedCredentials.push(this.removeAccessToken(key));
            }
        });
        allTokenKeys.refreshToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                this.removeRefreshToken(key);
            }
        });
        await Promise.all(removedCredentials);
    }
    /**
     * returns a boolean if the given credential is removed
     * @param credential
     */
    async removeAccessToken(key) {
        const credential = this.getAccessTokenCredential(key);
        if (!credential) {
            return;
        }
        // Remove Token Binding Key from key store for PoP Tokens Credentials
        if (credential.credentialType.toLowerCase() ===
            CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) {
            if (credential.tokenType === AuthenticationScheme.POP) {
                const accessTokenWithAuthSchemeEntity = credential;
                const kid = accessTokenWithAuthSchemeEntity.keyId;
                if (kid) {
                    try {
                        await this.cryptoImpl.removeTokenBindingKey(kid);
                    }
                    catch (error) {
                        throw ClientAuthError.createBindingKeyNotRemovedError();
                    }
                }
            }
        }
        return this.removeItem(key);
    }
    /**
     * Removes all app metadata objects from cache.
     */
    removeAppMetadata() {
        const allCacheKeys = this.getKeys();
        allCacheKeys.forEach((cacheKey) => {
            if (this.isAppMetadata(cacheKey)) {
                this.removeItem(cacheKey);
            }
        });
        return true;
    }
    /**
     * Retrieve the cached credentials into a cacherecord
     * @param account
     * @param clientId
     * @param scopes
     * @param environment
     * @param authScheme
     */
    readCacheRecord(account, request, environment) {
        const tokenKeys = this.getTokenKeys();
        const cachedAccount = this.readAccountFromCache(account);
        const cachedIdToken = this.getIdToken(account, tokenKeys);
        const cachedAccessToken = this.getAccessToken(account, request, tokenKeys);
        const cachedRefreshToken = this.getRefreshToken(account, false, tokenKeys);
        const cachedAppMetadata = this.readAppMetadataFromCache(environment);
        if (cachedAccount && cachedIdToken) {
            cachedAccount.idTokenClaims = extractTokenClaims(cachedIdToken.secret, this.cryptoImpl.base64Decode);
        }
        return {
            account: cachedAccount,
            idToken: cachedIdToken,
            accessToken: cachedAccessToken,
            refreshToken: cachedRefreshToken,
            appMetadata: cachedAppMetadata,
        };
    }
    /**
     * Retrieve AccountEntity from cache
     * @param account
     */
    readAccountFromCache(account) {
        const accountKey = AccountEntity.generateAccountCacheKey(account);
        return this.getAccount(accountKey);
    }
    /**
     * Retrieve IdTokenEntity from cache
     * @param clientId
     * @param account
     * @param inputRealm
     */
    getIdToken(account, tokenKeys) {
        this.commonLogger.trace("CacheManager - getIdToken called");
        const idTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.ID_TOKEN,
            clientId: this.clientId,
            realm: account.tenantId,
        };
        const idTokens = this.getIdTokensByFilter(idTokenFilter, tokenKeys);
        const numIdTokens = idTokens.length;
        if (numIdTokens < 1) {
            this.commonLogger.info("CacheManager:getIdToken - No token found");
            return null;
        }
        else if (numIdTokens > 1) {
            this.commonLogger.info("CacheManager:getIdToken - Multiple id tokens found, clearing them");
            idTokens.forEach((idToken) => {
                this.removeIdToken(idToken.generateCredentialKey());
            });
            return null;
        }
        this.commonLogger.info("CacheManager:getIdToken - Returning id token");
        return idTokens[0];
    }
    /**
     * Gets all idTokens matching the given filter
     * @param filter
     * @returns
     */
    getIdTokensByFilter(filter, tokenKeys) {
        const idTokenKeys = (tokenKeys && tokenKeys.idToken) || this.getTokenKeys().idToken;
        const idTokens = [];
        idTokenKeys.forEach((key) => {
            if (!this.idTokenKeyMatchesFilter(key, {
                clientId: this.clientId,
                ...filter,
            })) {
                return;
            }
            const idToken = this.getIdTokenCredential(key);
            if (idToken && this.credentialMatchesFilter(idToken, filter)) {
                idTokens.push(idToken);
            }
        });
        return idTokens;
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     * @returns
     */
    idTokenKeyMatchesFilter(inputKey, filter) {
        const key = inputKey.toLowerCase();
        if (filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        return true;
    }
    /**
     * Removes idToken from the cache
     * @param key
     */
    removeIdToken(key) {
        this.removeItem(key);
    }
    /**
     * Removes refresh token from the cache
     * @param key
     */
    removeRefreshToken(key) {
        this.removeItem(key);
    }
    /**
     * Retrieve AccessTokenEntity from cache
     * @param clientId
     * @param account
     * @param scopes
     * @param authScheme
     */
    getAccessToken(account, request, tokenKeys) {
        this.commonLogger.trace("CacheManager - getAccessToken called");
        const scopes = ScopeSet.createSearchScopes(request.scopes);
        const authScheme = request.authenticationScheme || AuthenticationScheme.BEARER;
        /*
         * Distinguish between Bearer and PoP/SSH token cache types
         * Cast to lowercase to handle "bearer" from ADFS
         */
        const credentialType = authScheme &&
            authScheme.toLowerCase() !==
                AuthenticationScheme.BEARER.toLowerCase()
            ? CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME
            : CredentialType.ACCESS_TOKEN;
        const accessTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: credentialType,
            clientId: this.clientId,
            realm: account.tenantId,
            target: scopes,
            tokenType: authScheme,
            keyId: request.sshKid,
            requestedClaimsHash: request.requestedClaimsHash,
        };
        const accessTokenKeys = (tokenKeys && tokenKeys.accessToken) ||
            this.getTokenKeys().accessToken;
        const accessTokens = [];
        accessTokenKeys.forEach((key) => {
            // Validate key
            if (this.accessTokenKeyMatchesFilter(key, accessTokenFilter, true)) {
                const accessToken = this.getAccessTokenCredential(key);
                // Validate value
                if (accessToken &&
                    this.credentialMatchesFilter(accessToken, accessTokenFilter)) {
                    accessTokens.push(accessToken);
                }
            }
        });
        const numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
            this.commonLogger.info("CacheManager:getAccessToken - No token found");
            return null;
        }
        else if (numAccessTokens > 1) {
            this.commonLogger.info("CacheManager:getAccessToken - Multiple access tokens found, clearing them");
            accessTokens.forEach((accessToken) => {
                void this.removeAccessToken(accessToken.generateCredentialKey());
            });
            return null;
        }
        this.commonLogger.info("CacheManager:getAccessToken - Returning access token");
        return accessTokens[0];
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     * @param keyMustContainAllScopes
     * @returns
     */
    accessTokenKeyMatchesFilter(inputKey, filter, keyMustContainAllScopes) {
        const key = inputKey.toLowerCase();
        if (filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.realm && key.indexOf(filter.realm.toLowerCase()) === -1) {
            return false;
        }
        if (filter.requestedClaimsHash &&
            key.indexOf(filter.requestedClaimsHash.toLowerCase()) === -1) {
            return false;
        }
        if (filter.target) {
            const scopes = filter.target.asArray();
            for (let i = 0; i < scopes.length; i++) {
                if (keyMustContainAllScopes &&
                    !key.includes(scopes[i].toLowerCase())) {
                    // When performing a cache lookup a missing scope would be a cache miss
                    return false;
                }
                else if (!keyMustContainAllScopes &&
                    key.includes(scopes[i].toLowerCase())) {
                    // When performing a cache write, any token with a subset of requested scopes should be replaced
                    return true;
                }
            }
        }
        return true;
    }
    /**
     * Gets all access tokens matching the filter
     * @param filter
     * @returns
     */
    getAccessTokensByFilter(filter) {
        const tokenKeys = this.getTokenKeys();
        const accessTokens = [];
        tokenKeys.accessToken.forEach((key) => {
            if (!this.accessTokenKeyMatchesFilter(key, filter, true)) {
                return;
            }
            const accessToken = this.getAccessTokenCredential(key);
            if (accessToken &&
                this.credentialMatchesFilter(accessToken, filter)) {
                accessTokens.push(accessToken);
            }
        });
        return accessTokens;
    }
    /**
     * Helper to retrieve the appropriate refresh token from cache
     * @param clientId
     * @param account
     * @param familyRT
     */
    getRefreshToken(account, familyRT, tokenKeys) {
        this.commonLogger.trace("CacheManager - getRefreshToken called");
        const id = familyRT ? THE_FAMILY_ID : undefined;
        const refreshTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.REFRESH_TOKEN,
            clientId: this.clientId,
            familyId: id,
        };
        const refreshTokenKeys = (tokenKeys && tokenKeys.refreshToken) ||
            this.getTokenKeys().refreshToken;
        const refreshTokens = [];
        refreshTokenKeys.forEach((key) => {
            // Validate key
            if (this.refreshTokenKeyMatchesFilter(key, refreshTokenFilter)) {
                const refreshToken = this.getRefreshTokenCredential(key);
                // Validate value
                if (refreshToken &&
                    this.credentialMatchesFilter(refreshToken, refreshTokenFilter)) {
                    refreshTokens.push(refreshToken);
                }
            }
        });
        const numRefreshTokens = refreshTokens.length;
        if (numRefreshTokens < 1) {
            this.commonLogger.info("CacheManager:getRefreshToken - No refresh token found.");
            return null;
        }
        // address the else case after remove functions address environment aliases
        this.commonLogger.info("CacheManager:getRefreshToken - returning refresh token");
        return refreshTokens[0];
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     */
    refreshTokenKeyMatchesFilter(inputKey, filter) {
        const key = inputKey.toLowerCase();
        if (filter.familyId &&
            key.indexOf(filter.familyId.toLowerCase()) === -1) {
            return false;
        }
        // If familyId is used, clientId is not in the key
        if (!filter.familyId &&
            filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        return true;
    }
    /**
     * Retrieve AppMetadataEntity from cache
     */
    readAppMetadataFromCache(environment) {
        const appMetadataFilter = {
            environment,
            clientId: this.clientId,
        };
        const appMetadata = this.getAppMetadataFilteredBy(appMetadataFilter);
        const appMetadataEntries = Object.keys(appMetadata).map((key) => appMetadata[key]);
        const numAppMetadata = appMetadataEntries.length;
        if (numAppMetadata < 1) {
            return null;
        }
        else if (numAppMetadata > 1) {
            throw ClientAuthError.createMultipleMatchingAppMetadataInCacheError();
        }
        return appMetadataEntries[0];
    }
    /**
     * Return the family_id value associated  with FOCI
     * @param environment
     * @param clientId
     */
    isAppMetadataFOCI(environment) {
        const appMetadata = this.readAppMetadataFromCache(environment);
        return !!(appMetadata && appMetadata.familyId === THE_FAMILY_ID);
    }
    /**
     * helper to match account ids
     * @param value
     * @param homeAccountId
     */
    matchHomeAccountId(entity, homeAccountId) {
        return !!(typeof entity.homeAccountId === "string" &&
            homeAccountId === entity.homeAccountId);
    }
    /**
     * helper to match account ids
     * @param entity
     * @param localAccountId
     * @returns
     */
    matchLocalAccountId(entity, localAccountId) {
        return !!(typeof entity.localAccountId === "string" &&
            localAccountId === entity.localAccountId);
    }
    /**
     * helper to match usernames
     * @param entity
     * @param username
     * @returns
     */
    matchUsername(entity, username) {
        return !!(typeof entity.username === "string" &&
            username.toLowerCase() === entity.username.toLowerCase());
    }
    /**
     * helper to match assertion
     * @param value
     * @param oboAssertion
     */
    matchUserAssertionHash(entity, userAssertionHash) {
        return !!(entity.userAssertionHash &&
            userAssertionHash === entity.userAssertionHash);
    }
    /**
     * helper to match environment
     * @param value
     * @param environment
     */
    matchEnvironment(entity, environment) {
        const cloudMetadata = this.getAuthorityMetadataByAlias(environment);
        if (cloudMetadata &&
            cloudMetadata.aliases.indexOf(entity.environment) > -1) {
            return true;
        }
        return false;
    }
    /**
     * helper to match credential type
     * @param entity
     * @param credentialType
     */
    matchCredentialType(entity, credentialType) {
        return (entity.credentialType &&
            credentialType.toLowerCase() === entity.credentialType.toLowerCase());
    }
    /**
     * helper to match client ids
     * @param entity
     * @param clientId
     */
    matchClientId(entity, clientId) {
        return !!(entity.clientId && clientId === entity.clientId);
    }
    /**
     * helper to match family ids
     * @param entity
     * @param familyId
     */
    matchFamilyId(entity, familyId) {
        return !!(entity.familyId && familyId === entity.familyId);
    }
    /**
     * helper to match realm
     * @param entity
     * @param realm
     */
    matchRealm(entity, realm) {
        return !!(entity.realm && realm === entity.realm);
    }
    /**
     * helper to match nativeAccountId
     * @param entity
     * @param nativeAccountId
     * @returns boolean indicating the match result
     */
    matchNativeAccountId(entity, nativeAccountId) {
        return !!(entity.nativeAccountId && nativeAccountId === entity.nativeAccountId);
    }
    /**
     * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
     * @param entity
     * @param target
     */
    matchTarget(entity, target) {
        const isNotAccessTokenCredential = entity.credentialType !== CredentialType.ACCESS_TOKEN &&
            entity.credentialType !==
                CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
        if (isNotAccessTokenCredential || !entity.target) {
            return false;
        }
        const entityScopeSet = ScopeSet.fromString(entity.target);
        return entityScopeSet.containsScopeSet(target);
    }
    /**
     * Returns true if the credential's tokenType or Authentication Scheme matches the one in the request, false otherwise
     * @param entity
     * @param tokenType
     */
    matchTokenType(entity, tokenType) {
        return !!(entity.tokenType && entity.tokenType === tokenType);
    }
    /**
     * Returns true if the credential's keyId matches the one in the request, false otherwise
     * @param entity
     * @param tokenType
     */
    matchKeyId(entity, keyId) {
        return !!(entity.keyId && entity.keyId === keyId);
    }
    /**
     * returns if a given cache entity is of the type appmetadata
     * @param key
     */
    isAppMetadata(key) {
        return key.indexOf(APP_METADATA) !== -1;
    }
    /**
     * returns if a given cache entity is of the type authoritymetadata
     * @param key
     */
    isAuthorityMetadata(key) {
        return key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) !== -1;
    }
    /**
     * returns cache key used for cloud instance metadata
     */
    generateAuthorityMetadataCacheKey(authority) {
        return `${AUTHORITY_METADATA_CONSTANTS.CACHE_KEY}-${this.clientId}-${authority}`;
    }
    /**
     * Helper to convert serialized data to object
     * @param obj
     * @param json
     */
    static toObject(obj, json) {
        for (const propertyName in json) {
            obj[propertyName] = json[propertyName];
        }
        return obj;
    }
}
/** @internal */
class DefaultStorageClass extends CacheManager {
    setAccount() {
        const notImplErr = "Storage interface - setAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAccount() {
        const notImplErr = "Storage interface - getAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setIdTokenCredential() {
        const notImplErr = "Storage interface - setIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getIdTokenCredential() {
        const notImplErr = "Storage interface - getIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setAccessTokenCredential() {
        const notImplErr = "Storage interface - setAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAccessTokenCredential() {
        const notImplErr = "Storage interface - getAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setRefreshTokenCredential() {
        const notImplErr = "Storage interface - setRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getRefreshTokenCredential() {
        const notImplErr = "Storage interface - getRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setAppMetadata() {
        const notImplErr = "Storage interface - setAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAppMetadata() {
        const notImplErr = "Storage interface - getAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setServerTelemetry() {
        const notImplErr = "Storage interface - setServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getServerTelemetry() {
        const notImplErr = "Storage interface - getServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setAuthorityMetadata() {
        const notImplErr = "Storage interface - setAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAuthorityMetadata() {
        const notImplErr = "Storage interface - getAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAuthorityMetadataKeys() {
        const notImplErr = "Storage interface - getAuthorityMetadataKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setThrottlingCache() {
        const notImplErr = "Storage interface - setThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getThrottlingCache() {
        const notImplErr = "Storage interface - getThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    removeItem() {
        const notImplErr = "Storage interface - removeItem() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    containsKey() {
        const notImplErr = "Storage interface - containsKey() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getKeys() {
        const notImplErr = "Storage interface - getKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAccountKeys() {
        const notImplErr = "Storage interface - getAccountKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getTokenKeys() {
        const notImplErr = "Storage interface - getTokenKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    async clear() {
        const notImplErr = "Storage interface - clear() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    updateCredentialCacheKey() {
        const notImplErr = "Storage interface - updateCredentialCacheKey() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Token renewal offset default in seconds
const DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;
const DEFAULT_SYSTEM_OPTIONS = {
    tokenRenewalOffsetSeconds: DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
    preventCorsPreflight: false,
};
const DEFAULT_LOGGER_IMPLEMENTATION = {
    loggerCallback: () => {
        // allow users to not set loggerCallback
    },
    piiLoggingEnabled: false,
    logLevel: exports.LogLevel.Info,
    correlationId: Constants.EMPTY_STRING,
};
const DEFAULT_CACHE_OPTIONS = {
    claimsBasedCachingEnabled: false,
};
const DEFAULT_NETWORK_IMPLEMENTATION = {
    async sendGetRequestAsync() {
        const notImplErr = "Network interface - sendGetRequestAsync() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async sendPostRequestAsync() {
        const notImplErr = "Network interface - sendPostRequestAsync() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
};
const DEFAULT_LIBRARY_INFO = {
    sku: Constants.SKU,
    version: version,
    cpu: Constants.EMPTY_STRING,
    os: Constants.EMPTY_STRING,
};
const DEFAULT_CLIENT_CREDENTIALS = {
    clientSecret: Constants.EMPTY_STRING,
    clientAssertion: undefined,
};
const DEFAULT_AZURE_CLOUD_OPTIONS = {
    azureCloudInstance: AzureCloudInstance.None,
    tenant: `${Constants.DEFAULT_COMMON_TENANT}`,
};
const DEFAULT_TELEMETRY_OPTIONS = {
    application: {
        appName: "",
        appVersion: "",
    },
};
/**
 * Function that sets the default options when not explicitly configured from app developer
 *
 * @param Configuration
 *
 * @returns Configuration
 */
function buildClientConfiguration({ authOptions: userAuthOptions, systemOptions: userSystemOptions, loggerOptions: userLoggerOption, cacheOptions: userCacheOptions, storageInterface: storageImplementation, networkInterface: networkImplementation, cryptoInterface: cryptoImplementation, clientCredentials: clientCredentials, libraryInfo: libraryInfo, telemetry: telemetry, serverTelemetryManager: serverTelemetryManager, persistencePlugin: persistencePlugin, serializableCache: serializableCache, }) {
    const loggerOptions = {
        ...DEFAULT_LOGGER_IMPLEMENTATION,
        ...userLoggerOption,
    };
    return {
        authOptions: buildAuthOptions(userAuthOptions),
        systemOptions: { ...DEFAULT_SYSTEM_OPTIONS, ...userSystemOptions },
        loggerOptions: loggerOptions,
        cacheOptions: { ...DEFAULT_CACHE_OPTIONS, ...userCacheOptions },
        storageInterface: storageImplementation ||
            new DefaultStorageClass(userAuthOptions.clientId, DEFAULT_CRYPTO_IMPLEMENTATION, new Logger(loggerOptions)),
        networkInterface: networkImplementation || DEFAULT_NETWORK_IMPLEMENTATION,
        cryptoInterface: cryptoImplementation || DEFAULT_CRYPTO_IMPLEMENTATION,
        clientCredentials: clientCredentials || DEFAULT_CLIENT_CREDENTIALS,
        libraryInfo: { ...DEFAULT_LIBRARY_INFO, ...libraryInfo },
        telemetry: { ...DEFAULT_TELEMETRY_OPTIONS, ...telemetry },
        serverTelemetryManager: serverTelemetryManager || null,
        persistencePlugin: persistencePlugin || null,
        serializableCache: serializableCache || null,
    };
}
/**
 * Construct authoptions from the client and platform passed values
 * @param authOptions
 */
function buildAuthOptions(authOptions) {
    return {
        clientCapabilities: [],
        azureCloudOptions: DEFAULT_AZURE_CLOUD_OPTIONS,
        skipAuthorityMetadataCache: false,
        ...authOptions,
    };
}
/**
 * Returns true if config has protocolMode set to ProtocolMode.OIDC, false otherwise
 * @param ClientConfiguration
 */
function isOidcProtocolMode(config) {
    return (config.authOptions.authority.options.protocolMode === ProtocolMode.OIDC);
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class ThrottlingUtils {
    /**
     * Prepares a RequestThumbprint to be stored as a key.
     * @param thumbprint
     */
    static generateThrottlingStorageKey(thumbprint) {
        return `${ThrottlingConstants.THROTTLING_PREFIX}.${JSON.stringify(thumbprint)}`;
    }
    /**
     * Performs necessary throttling checks before a network request.
     * @param cacheManager
     * @param thumbprint
     */
    static preProcess(cacheManager, thumbprint) {
        const key = ThrottlingUtils.generateThrottlingStorageKey(thumbprint);
        const value = cacheManager.getThrottlingCache(key);
        if (value) {
            if (value.throttleTime < Date.now()) {
                cacheManager.removeItem(key);
                return;
            }
            throw new ServerError(value.errorCodes?.join(" ") || Constants.EMPTY_STRING, value.errorMessage, value.subError);
        }
    }
    /**
     * Performs necessary throttling checks after a network request.
     * @param cacheManager
     * @param thumbprint
     * @param response
     */
    static postProcess(cacheManager, thumbprint, response) {
        if (ThrottlingUtils.checkResponseStatus(response) ||
            ThrottlingUtils.checkResponseForRetryAfter(response)) {
            const thumbprintValue = {
                throttleTime: ThrottlingUtils.calculateThrottleTime(parseInt(response.headers[HeaderNames.RETRY_AFTER])),
                error: response.body.error,
                errorCodes: response.body.error_codes,
                errorMessage: response.body.error_description,
                subError: response.body.suberror,
            };
            cacheManager.setThrottlingCache(ThrottlingUtils.generateThrottlingStorageKey(thumbprint), thumbprintValue);
        }
    }
    /**
     * Checks a NetworkResponse object's status codes against 429 or 5xx
     * @param response
     */
    static checkResponseStatus(response) {
        return (response.status === 429 ||
            (response.status >= 500 && response.status < 600));
    }
    /**
     * Checks a NetworkResponse object's RetryAfter header
     * @param response
     */
    static checkResponseForRetryAfter(response) {
        if (response.headers) {
            return (response.headers.hasOwnProperty(HeaderNames.RETRY_AFTER) &&
                (response.status < 200 || response.status >= 300));
        }
        return false;
    }
    /**
     * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
     * @param throttleTime
     */
    static calculateThrottleTime(throttleTime) {
        const time = throttleTime <= 0 ? 0 : throttleTime;
        const currentSeconds = Date.now() / 1000;
        return Math.floor(Math.min(currentSeconds +
            (time || ThrottlingConstants.DEFAULT_THROTTLE_TIME_SECONDS), currentSeconds +
            ThrottlingConstants.DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1000);
    }
    static removeThrottle(cacheManager, clientId, request, homeAccountIdentifier) {
        const thumbprint = {
            clientId: clientId,
            authority: request.authority,
            scopes: request.scopes,
            homeAccountIdentifier: homeAccountIdentifier,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        const key = this.generateThrottlingStorageKey(thumbprint);
        cacheManager.removeItem(key);
    }
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const CcsCredentialType = {
    HOME_ACCOUNT_ID: "home_account_id",
    UPN: "UPN",
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Validates server consumable params from the "request" objects
 */
class RequestValidator {
    /**
     * Utility to check if the `redirectUri` in the request is a non-null value
     * @param redirectUri
     */
    static validateRedirectUri(redirectUri) {
        if (!redirectUri) {
            throw ClientConfigurationError.createRedirectUriEmptyError();
        }
    }
    /**
     * Utility to validate prompt sent by the user in the request
     * @param prompt
     */
    static validatePrompt(prompt) {
        const promptValues = [];
        for (const value in PromptValue) {
            promptValues.push(PromptValue[value]);
        }
        if (promptValues.indexOf(prompt) < 0) {
            throw ClientConfigurationError.createInvalidPromptError(prompt);
        }
    }
    static validateClaims(claims) {
        try {
            JSON.parse(claims);
        }
        catch (e) {
            throw ClientConfigurationError.createInvalidClaimsRequestError();
        }
    }
    /**
     * Utility to validate code_challenge and code_challenge_method
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    static validateCodeChallengeParams(codeChallenge, codeChallengeMethod) {
        if (!codeChallenge || !codeChallengeMethod) {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
        else {
            this.validateCodeChallengeMethod(codeChallengeMethod);
        }
    }
    /**
     * Utility to validate code_challenge_method
     * @param codeChallengeMethod
     */
    static validateCodeChallengeMethod(codeChallengeMethod) {
        if ([
            CodeChallengeMethodValues.PLAIN,
            CodeChallengeMethodValues.S256,
        ].indexOf(codeChallengeMethod) < 0) {
            throw ClientConfigurationError.createInvalidCodeChallengeMethodError();
        }
    }
    /**
     * Removes unnecessary, duplicate, and empty string query parameters from extraQueryParameters
     * @param request
     */
    static sanitizeEQParams(eQParams, queryParams) {
        if (!eQParams) {
            return {};
        }
        // Remove any query parameters already included in SSO params
        queryParams.forEach((_value, key) => {
            if (eQParams[key]) {
                delete eQParams[key];
            }
        });
        // remove empty string parameters
        return Object.fromEntries(Object.entries(eQParams).filter((kv) => kv[1] !== ""));
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class RequestParameterBuilder {
    constructor() {
        this.parameters = new Map();
    }
    /**
     * add response_type = code
     */
    addResponseTypeCode() {
        this.parameters.set(AADServerParamKeys.RESPONSE_TYPE, encodeURIComponent(Constants.CODE_RESPONSE_TYPE));
    }
    /**
     * add response_type = token id_token
     */
    addResponseTypeForTokenAndIdToken() {
        this.parameters.set(AADServerParamKeys.RESPONSE_TYPE, encodeURIComponent(`${Constants.TOKEN_RESPONSE_TYPE} ${Constants.ID_TOKEN_RESPONSE_TYPE}`));
    }
    /**
     * add response_mode. defaults to query.
     * @param responseMode
     */
    addResponseMode(responseMode) {
        this.parameters.set(AADServerParamKeys.RESPONSE_MODE, encodeURIComponent(responseMode ? responseMode : ResponseMode.QUERY));
    }
    /**
     * Add flag to indicate STS should attempt to use WAM if available
     */
    addNativeBroker() {
        this.parameters.set(AADServerParamKeys.NATIVE_BROKER, encodeURIComponent("1"));
    }
    /**
     * add scopes. set addOidcScopes to false to prevent default scopes in non-user scenarios
     * @param scopeSet
     * @param addOidcScopes
     */
    addScopes(scopes, addOidcScopes = true, defaultScopes = OIDC_DEFAULT_SCOPES) {
        // Always add openid to the scopes when adding OIDC scopes
        if (addOidcScopes &&
            !defaultScopes.includes("openid") &&
            !scopes.includes("openid")) {
            defaultScopes.push("openid");
        }
        const requestScopes = addOidcScopes
            ? [...(scopes || []), ...defaultScopes]
            : scopes || [];
        const scopeSet = new ScopeSet(requestScopes);
        this.parameters.set(AADServerParamKeys.SCOPE, encodeURIComponent(scopeSet.printScopes()));
    }
    /**
     * add clientId
     * @param clientId
     */
    addClientId(clientId) {
        this.parameters.set(AADServerParamKeys.CLIENT_ID, encodeURIComponent(clientId));
    }
    /**
     * add redirect_uri
     * @param redirectUri
     */
    addRedirectUri(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.REDIRECT_URI, encodeURIComponent(redirectUri));
    }
    /**
     * add post logout redirectUri
     * @param redirectUri
     */
    addPostLogoutRedirectUri(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.POST_LOGOUT_URI, encodeURIComponent(redirectUri));
    }
    /**
     * add id_token_hint to logout request
     * @param idTokenHint
     */
    addIdTokenHint(idTokenHint) {
        this.parameters.set(AADServerParamKeys.ID_TOKEN_HINT, encodeURIComponent(idTokenHint));
    }
    /**
     * add domain_hint
     * @param domainHint
     */
    addDomainHint(domainHint) {
        this.parameters.set(SSOTypes.DOMAIN_HINT, encodeURIComponent(domainHint));
    }
    /**
     * add login_hint
     * @param loginHint
     */
    addLoginHint(loginHint) {
        this.parameters.set(SSOTypes.LOGIN_HINT, encodeURIComponent(loginHint));
    }
    /**
     * Adds the CCS (Cache Credential Service) query parameter for login_hint
     * @param loginHint
     */
    addCcsUpn(loginHint) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent(`UPN:${loginHint}`));
    }
    /**
     * Adds the CCS (Cache Credential Service) query parameter for account object
     * @param loginHint
     */
    addCcsOid(clientInfo) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent(`Oid:${clientInfo.uid}@${clientInfo.utid}`));
    }
    /**
     * add sid
     * @param sid
     */
    addSid(sid) {
        this.parameters.set(SSOTypes.SID, encodeURIComponent(sid));
    }
    /**
     * add claims
     * @param claims
     */
    addClaims(claims, clientCapabilities) {
        const mergedClaims = this.addClientCapabilitiesToClaims(claims, clientCapabilities);
        RequestValidator.validateClaims(mergedClaims);
        this.parameters.set(AADServerParamKeys.CLAIMS, encodeURIComponent(mergedClaims));
    }
    /**
     * add correlationId
     * @param correlationId
     */
    addCorrelationId(correlationId) {
        this.parameters.set(AADServerParamKeys.CLIENT_REQUEST_ID, encodeURIComponent(correlationId));
    }
    /**
     * add library info query params
     * @param libraryInfo
     */
    addLibraryInfo(libraryInfo) {
        // Telemetry Info
        this.parameters.set(AADServerParamKeys.X_CLIENT_SKU, libraryInfo.sku);
        this.parameters.set(AADServerParamKeys.X_CLIENT_VER, libraryInfo.version);
        if (libraryInfo.os) {
            this.parameters.set(AADServerParamKeys.X_CLIENT_OS, libraryInfo.os);
        }
        if (libraryInfo.cpu) {
            this.parameters.set(AADServerParamKeys.X_CLIENT_CPU, libraryInfo.cpu);
        }
    }
    /**
     * Add client telemetry parameters
     * @param appTelemetry
     */
    addApplicationTelemetry(appTelemetry) {
        if (appTelemetry?.appName) {
            this.parameters.set(AADServerParamKeys.X_APP_NAME, appTelemetry.appName);
        }
        if (appTelemetry?.appVersion) {
            this.parameters.set(AADServerParamKeys.X_APP_VER, appTelemetry.appVersion);
        }
    }
    /**
     * add prompt
     * @param prompt
     */
    addPrompt(prompt) {
        RequestValidator.validatePrompt(prompt);
        this.parameters.set(`${AADServerParamKeys.PROMPT}`, encodeURIComponent(prompt));
    }
    /**
     * add state
     * @param state
     */
    addState(state) {
        if (state) {
            this.parameters.set(AADServerParamKeys.STATE, encodeURIComponent(state));
        }
    }
    /**
     * add nonce
     * @param nonce
     */
    addNonce(nonce) {
        this.parameters.set(AADServerParamKeys.NONCE, encodeURIComponent(nonce));
    }
    /**
     * add code_challenge and code_challenge_method
     * - throw if either of them are not passed
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    addCodeChallengeParams(codeChallenge, codeChallengeMethod) {
        RequestValidator.validateCodeChallengeParams(codeChallenge, codeChallengeMethod);
        if (codeChallenge && codeChallengeMethod) {
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE, encodeURIComponent(codeChallenge));
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE_METHOD, encodeURIComponent(codeChallengeMethod));
        }
        else {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
    }
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    addAuthorizationCode(code) {
        this.parameters.set(AADServerParamKeys.CODE, encodeURIComponent(code));
    }
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    addDeviceCode(code) {
        this.parameters.set(AADServerParamKeys.DEVICE_CODE, encodeURIComponent(code));
    }
    /**
     * add the `refreshToken` passed by the user
     * @param refreshToken
     */
    addRefreshToken(refreshToken) {
        this.parameters.set(AADServerParamKeys.REFRESH_TOKEN, encodeURIComponent(refreshToken));
    }
    /**
     * add the `code_verifier` passed by the user to exchange for a token
     * @param codeVerifier
     */
    addCodeVerifier(codeVerifier) {
        this.parameters.set(AADServerParamKeys.CODE_VERIFIER, encodeURIComponent(codeVerifier));
    }
    /**
     * add client_secret
     * @param clientSecret
     */
    addClientSecret(clientSecret) {
        this.parameters.set(AADServerParamKeys.CLIENT_SECRET, encodeURIComponent(clientSecret));
    }
    /**
     * add clientAssertion for confidential client flows
     * @param clientAssertion
     */
    addClientAssertion(clientAssertion) {
        if (clientAssertion) {
            this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION, encodeURIComponent(clientAssertion));
        }
    }
    /**
     * add clientAssertionType for confidential client flows
     * @param clientAssertionType
     */
    addClientAssertionType(clientAssertionType) {
        if (clientAssertionType) {
            this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION_TYPE, encodeURIComponent(clientAssertionType));
        }
    }
    /**
     * add OBO assertion for confidential client flows
     * @param clientAssertion
     */
    addOboAssertion(oboAssertion) {
        this.parameters.set(AADServerParamKeys.OBO_ASSERTION, encodeURIComponent(oboAssertion));
    }
    /**
     * add grant type
     * @param grantType
     */
    addRequestTokenUse(tokenUse) {
        this.parameters.set(AADServerParamKeys.REQUESTED_TOKEN_USE, encodeURIComponent(tokenUse));
    }
    /**
     * add grant type
     * @param grantType
     */
    addGrantType(grantType) {
        this.parameters.set(AADServerParamKeys.GRANT_TYPE, encodeURIComponent(grantType));
    }
    /**
     * add client info
     *
     */
    addClientInfo() {
        this.parameters.set(CLIENT_INFO, "1");
    }
    /**
     * add extraQueryParams
     * @param eQParams
     */
    addExtraQueryParameters(eQParams) {
        const sanitizedEQParams = RequestValidator.sanitizeEQParams(eQParams, this.parameters);
        Object.keys(sanitizedEQParams).forEach((key) => {
            this.parameters.set(key, eQParams[key]);
        });
    }
    addClientCapabilitiesToClaims(claims, clientCapabilities) {
        let mergedClaims;
        // Parse provided claims into JSON object or initialize empty object
        if (!claims) {
            mergedClaims = {};
        }
        else {
            try {
                mergedClaims = JSON.parse(claims);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidClaimsRequestError();
            }
        }
        if (clientCapabilities && clientCapabilities.length > 0) {
            if (!mergedClaims.hasOwnProperty(ClaimsRequestKeys.ACCESS_TOKEN)) {
                // Add access_token key to claims object
                mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN] = {};
            }
            // Add xms_cc claim with provided clientCapabilities to access_token key
            mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN][ClaimsRequestKeys.XMS_CC] = {
                values: clientCapabilities,
            };
        }
        return JSON.stringify(mergedClaims);
    }
    /**
     * adds `username` for Password Grant flow
     * @param username
     */
    addUsername(username) {
        this.parameters.set(PasswordGrantConstants.username, encodeURIComponent(username));
    }
    /**
     * adds `password` for Password Grant flow
     * @param password
     */
    addPassword(password) {
        this.parameters.set(PasswordGrantConstants.password, encodeURIComponent(password));
    }
    /**
     * add pop_jwk to query params
     * @param cnfString
     */
    addPopToken(cnfString) {
        if (cnfString) {
            this.parameters.set(AADServerParamKeys.TOKEN_TYPE, AuthenticationScheme.POP);
            this.parameters.set(AADServerParamKeys.REQ_CNF, encodeURIComponent(cnfString));
        }
    }
    /**
     * add SSH JWK and key ID to query params
     */
    addSshJwk(sshJwkString) {
        if (sshJwkString) {
            this.parameters.set(AADServerParamKeys.TOKEN_TYPE, AuthenticationScheme.SSH);
            this.parameters.set(AADServerParamKeys.REQ_CNF, encodeURIComponent(sshJwkString));
        }
    }
    /**
     * add server telemetry fields
     * @param serverTelemetryManager
     */
    addServerTelemetry(serverTelemetryManager) {
        this.parameters.set(AADServerParamKeys.X_CLIENT_CURR_TELEM, serverTelemetryManager.generateCurrentRequestHeaderValue());
        this.parameters.set(AADServerParamKeys.X_CLIENT_LAST_TELEM, serverTelemetryManager.generateLastRequestHeaderValue());
    }
    /**
     * Adds parameter that indicates to the server that throttling is supported
     */
    addThrottling() {
        this.parameters.set(AADServerParamKeys.X_MS_LIB_CAPABILITY, ThrottlingConstants.X_MS_LIB_CAPABILITY_VALUE);
    }
    /**
     * Adds logout_hint parameter for "silent" logout which prevent server account picker
     */
    addLogoutHint(logoutHint) {
        this.parameters.set(AADServerParamKeys.LOGOUT_HINT, encodeURIComponent(logoutHint));
    }
    /**
     * Utility to create a URL from the params map
     */
    createQueryString() {
        const queryParameterArray = new Array();
        this.parameters.forEach((value, key) => {
            queryParameterArray.push(`${key}=${value}`);
        });
        return queryParameterArray.join("&");
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Enumeration of operations that are instrumented by have their performance measured by the PerformanceClient.
 *
 * @export
 * @enum {number}
 */
const PerformanceEvents = {
    /**
     * acquireTokenByCode API (msal-browser and msal-node).
     * Used to acquire tokens by trading an authorization code against the token endpoint.
     */
    AcquireTokenByCode: "acquireTokenByCode",
    /**
     * acquireTokenByRefreshToken API (msal-browser and msal-node).
     * Used to renew an access token using a refresh token against the token endpoint.
     */
    AcquireTokenByRefreshToken: "acquireTokenByRefreshToken",
    /**
     * acquireTokenSilent API (msal-browser and msal-node).
     * Used to silently acquire a new access token (from the cache or the network).
     */
    AcquireTokenSilent: "acquireTokenSilent",
    /**
     * acquireTokenSilentAsync (msal-browser).
     * Internal API for acquireTokenSilent.
     */
    AcquireTokenSilentAsync: "acquireTokenSilentAsync",
    /**
     * acquireTokenPopup (msal-browser).
     * Used to acquire a new access token interactively through pop ups
     */
    AcquireTokenPopup: "acquireTokenPopup",
    /**
     * getPublicKeyThumbprint API in CryptoOpts class (msal-browser).
     * Used to generate a public/private keypair and generate a public key thumbprint for pop requests.
     */
    CryptoOptsGetPublicKeyThumbprint: "cryptoOptsGetPublicKeyThumbprint",
    /**
     * signJwt API in CryptoOpts class (msal-browser).
     * Used to signed a pop token.
     */
    CryptoOptsSignJwt: "cryptoOptsSignJwt",
    /**
     * acquireToken API in the SilentCacheClient class (msal-browser).
     * Used to read access tokens from the cache.
     */
    SilentCacheClientAcquireToken: "silentCacheClientAcquireToken",
    /**
     * acquireToken API in the SilentIframeClient class (msal-browser).
     * Used to acquire a new set of tokens from the authorize endpoint in a hidden iframe.
     */
    SilentIframeClientAcquireToken: "silentIframeClientAcquireToken",
    /**
     * acquireToken API in SilentRereshClient (msal-browser).
     * Used to acquire a new set of tokens from the token endpoint using a refresh token.
     */
    SilentRefreshClientAcquireToken: "silentRefreshClientAcquireToken",
    /**
     * ssoSilent API (msal-browser).
     * Used to silently acquire an authorization code and set of tokens using a hidden iframe.
     */
    SsoSilent: "ssoSilent",
    /**
     * getDiscoveredAuthority API in StandardInteractionClient class (msal-browser).
     * Used to load authority metadata for a request.
     */
    StandardInteractionClientGetDiscoveredAuthority: "standardInteractionClientGetDiscoveredAuthority",
    /**
     * acquireToken APIs in msal-browser.
     * Used to make an /authorize endpoint call with native brokering enabled.
     */
    FetchAccountIdWithNativeBroker: "fetchAccountIdWithNativeBroker",
    /**
     * acquireToken API in NativeInteractionClient class (msal-browser).
     * Used to acquire a token from Native component when native brokering is enabled.
     */
    NativeInteractionClientAcquireToken: "nativeInteractionClientAcquireToken",
    /**
     * Time spent creating default headers for requests to token endpoint
     */
    BaseClientCreateTokenRequestHeaders: "baseClientCreateTokenRequestHeaders",
    /**
     * Time spent sending/waiting for the response of a request to the token endpoint
     */
    BaseClientExecutePostToTokenEndpoint: "baseClientExecutePostToTokenEndpoint",
    /**
     * Used to measure the time taken for completing embedded-broker handshake (PW-Broker).
     */
    BrokerHandhshake: "brokerHandshake",
    /**
     * acquireTokenByRefreshToken API in BrokerClientApplication (PW-Broker) .
     */
    AcquireTokenByRefreshTokenInBroker: "acquireTokenByRefreshTokenInBroker",
    /**
     * Time taken for token acquisition by broker
     */
    AcquireTokenByBroker: "acquireTokenByBroker",
    /**
     * Time spent on the network for refresh token acquisition
     */
    RefreshTokenClientExecuteTokenRequest: "refreshTokenClientExecuteTokenRequest",
    /**
     * Time taken for acquiring refresh token , records RT size
     */
    RefreshTokenClientAcquireToken: "refreshTokenClientAcquireToken",
    /**
     * Time taken for acquiring cached refresh token
     */
    RefreshTokenClientAcquireTokenWithCachedRefreshToken: "refreshTokenClientAcquireTokenWithCachedRefreshToken",
    /**
     * acquireTokenByRefreshToken API in RefreshTokenClient (msal-common).
     */
    RefreshTokenClientAcquireTokenByRefreshToken: "refreshTokenClientAcquireTokenByRefreshToken",
    /**
     * Helper function to create token request body in RefreshTokenClient (msal-common).
     */
    RefreshTokenClientCreateTokenRequestBody: "refreshTokenClientCreateTokenRequestBody",
    /**
     * acquireTokenFromCache (msal-browser).
     * Internal API for acquiring token from cache
     */
    AcquireTokenFromCache: "acquireTokenFromCache",
    /**
     * acquireTokenBySilentIframe (msal-browser).
     * Internal API for acquiring token by silent Iframe
     */
    AcquireTokenBySilentIframe: "acquireTokenBySilentIframe",
    /**
     * Internal API for initializing base request in BaseInteractionClient (msal-browser)
     */
    InitializeBaseRequest: "initializeBaseRequest",
    /**
     * Internal API for initializing silent request in SilentCacheClient (msal-browser)
     */
    InitializeSilentRequest: "initializeSilentRequest",
    InitializeClientApplication: "initializeClientApplication",
    /**
     * Helper function in SilentIframeClient class (msal-browser).
     */
    SilentIframeClientTokenHelper: "silentIframeClientTokenHelper",
    /**
     * SilentHandler
     */
    SilentHandlerInitiateAuthRequest: "silentHandlerInitiateAuthRequest",
    SilentHandlerMonitorIframeForHash: "silentHandlerMonitorIframeForHash",
    SilentHandlerLoadFrame: "silentHandlerLoadFrame",
    /**
     * Helper functions in StandardInteractionClient class (msal-browser)
     */
    StandardInteractionClientCreateAuthCodeClient: "standardInteractionClientCreateAuthCodeClient",
    StandardInteractionClientGetClientConfiguration: "standardInteractionClientGetClientConfiguration",
    StandardInteractionClientInitializeAuthorizationRequest: "standardInteractionClientInitializeAuthorizationRequest",
    StandardInteractionClientInitializeAuthorizationCodeRequest: "standardInteractionClientInitializeAuthorizationCodeRequest",
    /**
     * getAuthCodeUrl API (msal-browser and msal-node).
     */
    GetAuthCodeUrl: "getAuthCodeUrl",
    /**
     * Functions from InteractionHandler (msal-browser)
     */
    HandleCodeResponseFromServer: "handleCodeResponseFromServer",
    HandleCodeResponseFromHash: "handleCodeResponseFromHash",
    UpdateTokenEndpointAuthority: "updateTokenEndpointAuthority",
    /**
     * APIs in Authorization Code Client (msal-common)
     */
    AuthClientAcquireToken: "authClientAcquireToken",
    AuthClientExecuteTokenRequest: "authClientExecuteTokenRequest",
    AuthClientCreateTokenRequestBody: "authClientCreateTokenRequestBody",
    AuthClientCreateQueryString: "authClientCreateQueryString",
    /**
     * Generate functions in PopTokenGenerator (msal-common)
     */
    PopTokenGenerateCnf: "popTokenGenerateCnf",
    PopTokenGenerateKid: "popTokenGenerateKid",
    /**
     * handleServerTokenResponse API in ResponseHandler (msal-common)
     */
    HandleServerTokenResponse: "handleServerTokenResponse",
    /**
     * Authority functions
     */
    AuthorityFactoryCreateDiscoveredInstance: "authorityFactoryCreateDiscoveredInstance",
    AuthorityResolveEndpointsAsync: "authorityResolveEndpointsAsync",
    AuthorityGetCloudDiscoveryMetadataFromNetwork: "authorityGetCloudDiscoveryMetadataFromNetwork",
    AuthorityUpdateCloudDiscoveryMetadata: "authorityUpdateCloudDiscoveryMetadata",
    AuthorityGetEndpointMetadataFromNetwork: "authorityGetEndpointMetadataFromNetwork",
    AuthorityUpdateEndpointMetadata: "authorityUpdateEndpointMetadata",
    AuthorityUpdateMetadataWithRegionalInformation: "authorityUpdateMetadataWithRegionalInformation",
    /**
     * Region Discovery functions
     */
    RegionDiscoveryDetectRegion: "regionDiscoveryDetectRegion",
    RegionDiscoveryGetRegionFromIMDS: "regionDiscoveryGetRegionFromIMDS",
    RegionDiscoveryGetCurrentVersion: "regionDiscoveryGetCurrentVersion",
    AcquireTokenByCodeAsync: "acquireTokenByCodeAsync",
    GetEndpointMetadataFromNetwork: "getEndpointMetadataFromNetwork",
    GetCloudDiscoveryMetadataFromNetworkMeasurement: "getCloudDiscoveryMetadataFromNetworkMeasurement",
    HandleRedirectPromiseMeasurement: "handleRedirectPromiseMeasurement",
    UpdateCloudDiscoveryMetadataMeasurement: "updateCloudDiscoveryMetadataMeasurement",
    UsernamePasswordClientAcquireToken: "usernamePasswordClientAcquireToken",
    NativeMessageHandlerHandshake: "nativeMessageHandlerHandshake",
    NativeGenerateAuthResult: "nativeGenerateAuthResult",
    /**
     * Cache operations
     */
    ClearTokensAndKeysWithClaims: "clearTokensAndKeysWithClaims",
};
/**
 * State of the performance event.
 *
 * @export
 * @enum {number}
 */
const PerformanceEventStatus = {
    NotStarted: 0,
    InProgress: 1,
    Completed: 2,
};
const IntFields = new Set([
    "accessTokenSize",
    "durationMs",
    "idTokenSize",
    "matsSilentStatus",
    "matsHttpStatus",
    "refreshTokenSize",
    "queuedTimeMs",
    "startTimeMs",
    "status",
]);

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base application class which will construct requests to send to and handle responses from the Microsoft STS using the authorization code flow.
 * @internal
 */
class BaseClient {
    constructor(configuration, performanceClient) {
        // Set the configuration
        this.config = buildClientConfiguration(configuration);
        // Initialize the logger
        this.logger = new Logger(this.config.loggerOptions, name, version);
        // Initialize crypto
        this.cryptoUtils = this.config.cryptoInterface;
        // Initialize storage interface
        this.cacheManager = this.config.storageInterface;
        // Set the network interface
        this.networkClient = this.config.networkInterface;
        // Set the NetworkManager
        this.networkManager = new NetworkManager(this.networkClient, this.cacheManager);
        // Set TelemetryManager
        this.serverTelemetryManager = this.config.serverTelemetryManager;
        // set Authority
        this.authority = this.config.authOptions.authority;
        // set performance telemetry client
        this.performanceClient = performanceClient;
    }
    /**
     * Creates default headers for requests to token endpoint
     */
    createTokenRequestHeaders(ccsCred) {
        const headers = {};
        headers[HeaderNames.CONTENT_TYPE] = Constants.URL_FORM_CONTENT_TYPE;
        if (!this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        headers[HeaderNames.CCS_HEADER] = `Oid:${clientInfo.uid}@${clientInfo.utid}`;
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    headers[HeaderNames.CCS_HEADER] = `UPN: ${ccsCred.credential}`;
                    break;
            }
        }
        return headers;
    }
    /**
     * Http post to token endpoint
     * @param tokenEndpoint
     * @param queryString
     * @param headers
     * @param thumbprint
     */
    async executePostToTokenEndpoint(tokenEndpoint, queryString, headers, thumbprint, correlationId) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.BaseClientCreateTokenRequestHeaders, correlationId);
        const response = await this.networkManager.sendPostRequest(thumbprint, tokenEndpoint, { body: queryString, headers: headers });
        this.performanceClient?.addFields({
            refreshTokenSize: response.body.refresh_token?.length || 0,
            httpVerToken: response.headers?.[HeaderNames.X_MS_HTTP_VERSION] || "",
        }, correlationId);
        if (this.config.serverTelemetryManager &&
            response.status < 500 &&
            response.status !== 429) {
            // Telemetry data successfully logged by server, clear Telemetry cache
            this.config.serverTelemetryManager.clearTelemetryCache();
        }
        return response;
    }
    /**
     * Updates the authority object of the client. Endpoint discovery must be completed.
     * @param updatedAuthority
     */
    updateAuthority(updatedAuthority) {
        if (!updatedAuthority.discoveryComplete()) {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Updated authority has not completed endpoint discovery.");
        }
        this.authority = updatedAuthority;
    }
    /**
     * Creates query string for the /token request
     * @param request
     */
    createTokenQueryParameters(request) {
        const parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
    }
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ID_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-idtoken-clientId-contoso.com-
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      realm: Full tenant or organizational identifier that the account belongs to
 * }
 */
class IdTokenEntity extends CredentialEntity {
    /**
     * Create IdTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    static createIdTokenEntity(homeAccountId, environment, idToken, clientId, tenantId) {
        const idTokenEntity = new IdTokenEntity();
        idTokenEntity.credentialType = CredentialType.ID_TOKEN;
        idTokenEntity.homeAccountId = homeAccountId;
        idTokenEntity.environment = environment;
        idTokenEntity.clientId = clientId;
        idTokenEntity.secret = idToken;
        idTokenEntity.realm = tenantId;
        return idTokenEntity;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isIdTokenEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === CredentialType.ID_TOKEN);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class which exposes functions for managing date and time operations.
 */
class TimeUtils {
    /**
     * return the current time in Unix time (seconds).
     */
    static nowSeconds() {
        // Date.getTime() returns in milliseconds.
        return Math.round(new Date().getTime() / 1000.0);
    }
    /**
     * check if a token is expired based on given UTC time in seconds.
     * @param expiresOn
     */
    static isTokenExpired(expiresOn, offset) {
        // check for access token expiry
        const expirationSec = Number(expiresOn) || 0;
        const offsetCurrentTimeSec = TimeUtils.nowSeconds() + offset;
        // If current time + offset is greater than token expiration time, then token is expired.
        return offsetCurrentTimeSec > expirationSec;
    }
    /**
     * If the current time is earlier than the time that a token was cached at, we must discard the token
     * i.e. The system clock was turned back after acquiring the cached token
     * @param cachedAt
     * @param offset
     */
    static wasClockTurnedBack(cachedAt) {
        const cachedAtSec = Number(cachedAt);
        return cachedAtSec > TimeUtils.nowSeconds();
    }
    /**
     * Waits for t number of milliseconds
     * @param t number
     * @param value T
     */
    static delay(t, value) {
        return new Promise((resolve) => setTimeout(() => resolve(value), t));
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ACCESS_TOKEN Credential Type
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-accesstoken-clientId-contoso.com-user.read
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
 *      cachedAt: Absolute device time when entry was created in the cache.
 *      expiresOn: Token expiry time, calculated based on current UTC time in seconds. Represented as a string.
 *      extendedExpiresOn: Additional extended expiry time until when token is valid in case of server-side outage. Represented as string in UTC seconds.
 *      keyId: used for POP and SSH tokenTypes
 *      tokenType: Type of the token issued. Usually "Bearer"
 * }
 */
class AccessTokenEntity extends CredentialEntity {
    /**
     * Create AccessTokenEntity
     * @param homeAccountId
     * @param environment
     * @param accessToken
     * @param clientId
     * @param tenantId
     * @param scopes
     * @param expiresOn
     * @param extExpiresOn
     */
    static createAccessTokenEntity(homeAccountId, environment, accessToken, clientId, tenantId, scopes, expiresOn, extExpiresOn, cryptoUtils, refreshOn, tokenType, userAssertionHash, keyId, requestedClaims, requestedClaimsHash) {
        const atEntity = new AccessTokenEntity();
        atEntity.homeAccountId = homeAccountId;
        atEntity.credentialType = CredentialType.ACCESS_TOKEN;
        atEntity.secret = accessToken;
        const currentTime = TimeUtils.nowSeconds();
        atEntity.cachedAt = currentTime.toString();
        /*
         * Token expiry time.
         * This value should be  calculated based on the current UTC time measured locally and the value  expires_in Represented as a string in JSON.
         */
        atEntity.expiresOn = expiresOn.toString();
        atEntity.extendedExpiresOn = extExpiresOn.toString();
        if (refreshOn) {
            atEntity.refreshOn = refreshOn.toString();
        }
        atEntity.environment = environment;
        atEntity.clientId = clientId;
        atEntity.realm = tenantId;
        atEntity.target = scopes;
        atEntity.userAssertionHash = userAssertionHash;
        atEntity.tokenType = tokenType || AuthenticationScheme.BEARER;
        if (requestedClaims) {
            atEntity.requestedClaims = requestedClaims;
            atEntity.requestedClaimsHash = requestedClaimsHash;
        }
        /*
         * Create Access Token With Auth Scheme instead of regular access token
         * Cast to lower to handle "bearer" from ADFS
         */
        if (atEntity.tokenType?.toLowerCase() !==
            AuthenticationScheme.BEARER.toLowerCase()) {
            atEntity.credentialType =
                CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
            switch (atEntity.tokenType) {
                case AuthenticationScheme.POP:
                    // Make sure keyId is present and add it to credential
                    const tokenClaims = extractTokenClaims(accessToken, cryptoUtils.base64Decode);
                    if (!tokenClaims?.cnf?.kid) {
                        throw ClientAuthError.createTokenClaimsRequiredError();
                    }
                    atEntity.keyId = tokenClaims.cnf.kid;
                    break;
                case AuthenticationScheme.SSH:
                    atEntity.keyId = keyId;
            }
        }
        return atEntity;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAccessTokenEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity.hasOwnProperty("target") &&
            (entity["credentialType"] === CredentialType.ACCESS_TOKEN ||
                entity["credentialType"] ===
                    CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME));
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * REFRESH_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-refreshtoken-clientId--
 *
 * Value:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 * }
 */
class RefreshTokenEntity extends CredentialEntity {
    /**
     * Create RefreshTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    static createRefreshTokenEntity(homeAccountId, environment, refreshToken, clientId, familyId, userAssertionHash) {
        const rtEntity = new RefreshTokenEntity();
        rtEntity.clientId = clientId;
        rtEntity.credentialType = CredentialType.REFRESH_TOKEN;
        rtEntity.environment = environment;
        rtEntity.homeAccountId = homeAccountId;
        rtEntity.secret = refreshToken;
        rtEntity.userAssertionHash = userAssertionHash;
        if (familyId)
            rtEntity.familyId = familyId;
        return rtEntity;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isRefreshTokenEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === CredentialType.REFRESH_TOKEN);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * InteractionRequiredServerErrorMessage contains string constants used by error codes and messages returned by the server indicating interaction is required
 */
const InteractionRequiredServerErrorMessage = [
    "interaction_required",
    "consent_required",
    "login_required",
];
const InteractionRequiredAuthSubErrorMessage = [
    "message_only",
    "additional_action",
    "basic_action",
    "user_password_expired",
    "consent_required",
];
/**
 * Interaction required errors defined by the SDK
 */
const InteractionRequiredAuthErrorMessage = {
    noTokensFoundError: {
        code: "no_tokens_found",
        desc: "No refresh token found in the cache. Please sign-in.",
    },
    native_account_unavailable: {
        code: "native_account_unavailable",
        desc: "The requested account is not available in the native broker. It may have been deleted or logged out. Please sign-in again using an interactive API.",
    },
};
/**
 * Error thrown when user interaction is required.
 */
class InteractionRequiredAuthError extends AuthError {
    constructor(errorCode, errorMessage, subError, timestamp, traceId, correlationId, claims) {
        super(errorCode, errorMessage, subError);
        Object.setPrototypeOf(this, InteractionRequiredAuthError.prototype);
        this.timestamp = timestamp || Constants.EMPTY_STRING;
        this.traceId = traceId || Constants.EMPTY_STRING;
        this.correlationId = correlationId || Constants.EMPTY_STRING;
        this.claims = claims || Constants.EMPTY_STRING;
        this.name = "InteractionRequiredAuthError";
    }
    /**
     * Helper function used to determine if an error thrown by the server requires interaction to resolve
     * @param errorCode
     * @param errorString
     * @param subError
     */
    static isInteractionRequiredError(errorCode, errorString, subError) {
        const isInteractionRequiredErrorCode = !!errorCode &&
            InteractionRequiredServerErrorMessage.indexOf(errorCode) > -1;
        const isInteractionRequiredSubError = !!subError &&
            InteractionRequiredAuthSubErrorMessage.indexOf(subError) > -1;
        const isInteractionRequiredErrorDesc = !!errorString &&
            InteractionRequiredServerErrorMessage.some((irErrorCode) => {
                return errorString.indexOf(irErrorCode) > -1;
            });
        return (isInteractionRequiredErrorCode ||
            isInteractionRequiredErrorDesc ||
            isInteractionRequiredSubError);
    }
    /**
     * Creates an error thrown when the authorization code required for a token request is null or empty.
     */
    static createNoTokensFoundError() {
        return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.noTokensFoundError.code, InteractionRequiredAuthErrorMessage.noTokensFoundError.desc);
    }
    /**
     * Creates an error thrown when the native broker returns ACCOUNT_UNAVAILABLE status, indicating that the account was removed and interactive sign-in is required
     * @returns
     */
    static createNativeAccountUnavailableError() {
        return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.native_account_unavailable.code, InteractionRequiredAuthErrorMessage.native_account_unavailable.desc);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class CacheRecord {
    constructor(accountEntity, idTokenEntity, accessTokenEntity, refreshTokenEntity, appMetadataEntity) {
        this.account = accountEntity || null;
        this.idToken = idTokenEntity || null;
        this.accessToken = accessTokenEntity || null;
        this.refreshToken = refreshTokenEntity || null;
        this.appMetadata = appMetadataEntity || null;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which provides helpers for OAuth 2.0 protocol specific values
 */
class ProtocolUtils {
    /**
     * Appends user state with random guid, or returns random guid.
     * @param userState
     * @param randomGuid
     */
    static setRequestState(cryptoObj, userState, meta) {
        const libraryState = ProtocolUtils.generateLibraryState(cryptoObj, meta);
        return userState
            ? `${libraryState}${Constants.RESOURCE_DELIM}${userState}`
            : libraryState;
    }
    /**
     * Generates the state value used by the common library.
     * @param randomGuid
     * @param cryptoObj
     */
    static generateLibraryState(cryptoObj, meta) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("generateLibraryState");
        }
        // Create a state object containing a unique id and the timestamp of the request creation
        const stateObj = {
            id: cryptoObj.createNewGuid(),
        };
        if (meta) {
            stateObj.meta = meta;
        }
        const stateString = JSON.stringify(stateObj);
        return cryptoObj.base64Encode(stateString);
    }
    /**
     * Parses the state into the RequestStateObject, which contains the LibraryState info and the state passed by the user.
     * @param state
     * @param cryptoObj
     */
    static parseRequestState(cryptoObj, state) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("parseRequestState");
        }
        if (!state) {
            throw ClientAuthError.createInvalidStateError(state, "Null, undefined or empty state");
        }
        try {
            // Split the state between library state and user passed state and decode them separately
            const splitState = state.split(Constants.RESOURCE_DELIM);
            const libraryState = splitState[0];
            const userState = splitState.length > 1
                ? splitState.slice(1).join(Constants.RESOURCE_DELIM)
                : Constants.EMPTY_STRING;
            const libraryStateString = cryptoObj.base64Decode(libraryState);
            const libraryStateObj = JSON.parse(libraryStateString);
            return {
                userRequestState: userState || Constants.EMPTY_STRING,
                libraryState: libraryStateObj,
            };
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(state, e);
        }
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Url object class which can perform various transformations on url strings.
 */
class UrlString {
    get urlString() {
        return this._urlString;
    }
    constructor(url) {
        this._urlString = url;
        if (!this._urlString) {
            // Throws error if url is empty
            throw ClientConfigurationError.createUrlEmptyError();
        }
        if (!this.getHash()) {
            this._urlString = UrlString.canonicalizeUri(url);
        }
    }
    /**
     * Ensure urls are lower case and end with a / character.
     * @param url
     */
    static canonicalizeUri(url) {
        if (url) {
            let lowerCaseUrl = url.toLowerCase();
            if (StringUtils.endsWith(lowerCaseUrl, "?")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -1);
            }
            else if (StringUtils.endsWith(lowerCaseUrl, "?/")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -2);
            }
            if (!StringUtils.endsWith(lowerCaseUrl, "/")) {
                lowerCaseUrl += "/";
            }
            return lowerCaseUrl;
        }
        return url;
    }
    /**
     * Throws if urlString passed is not a valid authority URI string.
     */
    validateAsUri() {
        // Attempts to parse url for uri components
        let components;
        try {
            components = this.getUrlComponents();
        }
        catch (e) {
            throw ClientConfigurationError.createUrlParseError(e);
        }
        // Throw error if URI or path segments are not parseable.
        if (!components.HostNameAndPort || !components.PathSegments) {
            throw ClientConfigurationError.createUrlParseError(`Given url string: ${this.urlString}`);
        }
        // Throw error if uri is insecure.
        if (!components.Protocol ||
            components.Protocol.toLowerCase() !== "https:") {
            throw ClientConfigurationError.createInsecureAuthorityUriError(this.urlString);
        }
    }
    /**
     * Given a url and a query string return the url with provided query string appended
     * @param url
     * @param queryString
     */
    static appendQueryString(url, queryString) {
        if (!queryString) {
            return url;
        }
        return url.indexOf("?") < 0
            ? `${url}?${queryString}`
            : `${url}&${queryString}`;
    }
    /**
     * Returns a url with the hash removed
     * @param url
     */
    static removeHashFromUrl(url) {
        return UrlString.canonicalizeUri(url.split("#")[0]);
    }
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    replaceTenantPath(tenantId) {
        const urlObject = this.getUrlComponents();
        const pathArray = urlObject.PathSegments;
        if (tenantId &&
            pathArray.length !== 0 &&
            (pathArray[0] === AADAuthorityConstants.COMMON ||
                pathArray[0] === AADAuthorityConstants.ORGANIZATIONS)) {
            pathArray[0] = tenantId;
        }
        return UrlString.constructAuthorityUriFromObject(urlObject);
    }
    /**
     * Returns the anchor part(#) of the URL
     */
    getHash() {
        return UrlString.parseHash(this.urlString);
    }
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    getUrlComponents() {
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        const regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        // If url string does not match regEx, we throw an error
        const match = this.urlString.match(regEx);
        if (!match) {
            throw ClientConfigurationError.createUrlParseError(`Given url string: ${this.urlString}`);
        }
        // Url component object
        const urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5],
            QueryString: match[7],
        };
        let pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter((val) => val && val.length > 0); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        if (urlComponents.QueryString &&
            urlComponents.QueryString.endsWith("/")) {
            urlComponents.QueryString = urlComponents.QueryString.substring(0, urlComponents.QueryString.length - 1);
        }
        return urlComponents;
    }
    static getDomainFromUrl(url) {
        const regEx = RegExp("^([^:/?#]+://)?([^/?#]*)");
        const match = url.match(regEx);
        if (!match) {
            throw ClientConfigurationError.createUrlParseError(`Given url string: ${url}`);
        }
        return match[2];
    }
    static getAbsoluteUrl(relativeUrl, baseUrl) {
        if (relativeUrl[0] === Constants.FORWARD_SLASH) {
            const url = new UrlString(baseUrl);
            const baseComponents = url.getUrlComponents();
            return (baseComponents.Protocol +
                "//" +
                baseComponents.HostNameAndPort +
                relativeUrl);
        }
        return relativeUrl;
    }
    /**
     * Parses hash string from given string. Returns empty string if no hash symbol is found.
     * @param hashString
     */
    static parseHash(hashString) {
        const hashIndex1 = hashString.indexOf("#");
        const hashIndex2 = hashString.indexOf("#/");
        if (hashIndex2 > -1) {
            return hashString.substring(hashIndex2 + 2);
        }
        else if (hashIndex1 > -1) {
            return hashString.substring(hashIndex1 + 1);
        }
        return Constants.EMPTY_STRING;
    }
    /**
     * Parses query string from given string. Returns empty string if no query symbol is found.
     * @param queryString
     */
    static parseQueryString(queryString) {
        const queryIndex1 = queryString.indexOf("?");
        const queryIndex2 = queryString.indexOf("/?");
        if (queryIndex2 > -1) {
            return queryString.substring(queryIndex2 + 2);
        }
        else if (queryIndex1 > -1) {
            return queryString.substring(queryIndex1 + 1);
        }
        return Constants.EMPTY_STRING;
    }
    /**
     * Parses query server response string from given string.
     * Extract hash between '?code=' and '#' if trailing '# is present.
     * Returns empty string if no query symbol is found.
     * @param queryString
     */
    static parseQueryServerResponse(queryString) {
        const queryIndex1 = queryString.indexOf("?code");
        const queryIndex2 = queryString.indexOf("/?code");
        const hashIndex = queryString.indexOf("#");
        if (queryIndex2 > -1 && hashIndex > -1) {
            return queryString.substring(queryIndex2 + 2, hashIndex);
        }
        else if (queryIndex2 > -1) {
            return queryString.substring(queryIndex2 + 2);
        }
        else if (queryIndex1 > -1 && hashIndex > -1) {
            return queryString.substring(queryIndex1 + 1, hashIndex);
        }
        else if (queryIndex1 > -1) {
            return queryString.substring(queryIndex1 + 1);
        }
        return Constants.EMPTY_STRING;
    }
    static constructAuthorityUriFromObject(urlObject) {
        return new UrlString(urlObject.Protocol +
            "//" +
            urlObject.HostNameAndPort +
            "/" +
            urlObject.PathSegments.join("/"));
    }
    /**
     * Returns URL hash as server auth code response object.
     */
    static getDeserializedHash(hash) {
        // Check if given hash is empty
        if (!hash) {
            return {};
        }
        // Strip the # symbol if present
        const parsedHash = UrlString.parseHash(hash);
        // If # symbol was not present, above will return empty string, so give original hash value
        const deserializedHash = StringUtils.queryStringToObject(parsedHash || hash);
        // Check if deserialization didn't work
        if (!deserializedHash) {
            throw ClientAuthError.createHashNotDeserializedError(JSON.stringify(deserializedHash));
        }
        return deserializedHash;
    }
    /**
     * Returns URL query string as server auth code response object.
     */
    static getDeserializedQueryString(query) {
        // Check if given query is empty
        if (!query) {
            return {};
        }
        // Strip the ? symbol if present
        const parsedQueryString = UrlString.parseQueryString(query);
        // If ? symbol was not present, above will return empty string, so give original query value
        const deserializedQueryString = StringUtils.queryStringToObject(parsedQueryString || query);
        // Check if deserialization didn't work
        if (!deserializedQueryString) {
            throw ClientAuthError.createHashNotDeserializedError(JSON.stringify(deserializedQueryString));
        }
        return deserializedQueryString;
    }
    /**
     * Returns either deserialized query string or deserialized hash, depending on the serverResponseType
     * as a server auth code response object.
     */
    static getDeserializedCodeResponse(serverResponseType, hashFragment) {
        const hashUrlString = new UrlString(hashFragment);
        let serverParams;
        if (serverResponseType === ServerResponseType.QUERY) {
            serverParams = UrlString.getDeserializedQueryString(hashFragment);
        }
        else {
            serverParams = UrlString.getDeserializedHash(hashUrlString.getHash());
        }
        return serverParams;
    }
    /**
     * Check if the hash of the URL string contains known properties
     */
    static hashContainsKnownProperties(hash) {
        if (!hash || hash.indexOf("=") < 0) {
            // Hash doesn't contain key/value pairs
            return false;
        }
        const parameters = UrlString.getDeserializedHash(hash);
        return !!(parameters.code ||
            parameters.error_description ||
            parameters.error ||
            parameters.state);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const KeyLocation = {
    SW: "sw",
    UHW: "uhw",
};
/** @internal */
class PopTokenGenerator {
    constructor(cryptoUtils, performanceClient) {
        this.cryptoUtils = cryptoUtils;
        this.performanceClient = performanceClient;
    }
    /**
     * Generates the req_cnf validated at the RP in the POP protocol for SHR parameters
     * and returns an object containing the keyid, the full req_cnf string and the req_cnf string hash
     * @param request
     * @returns
     */
    async generateCnf(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.PopTokenGenerateCnf, request.correlationId);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.PopTokenGenerateKid, request.correlationId);
        const reqCnf = await this.generateKid(request);
        const reqCnfString = this.cryptoUtils.base64Encode(JSON.stringify(reqCnf));
        return {
            kid: reqCnf.kid,
            reqCnfString,
            reqCnfHash: await this.cryptoUtils.hashString(reqCnfString),
        };
    }
    /**
     * Generates key_id for a SHR token request
     * @param request
     * @returns
     */
    async generateKid(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.PopTokenGenerateKid, request.correlationId);
        const kidThumbprint = await this.cryptoUtils.getPublicKeyThumbprint(request);
        return {
            kid: kidThumbprint,
            xms_ksl: KeyLocation.SW,
        };
    }
    /**
     * Signs the POP access_token with the local generated key-pair
     * @param accessToken
     * @param request
     * @returns
     */
    async signPopToken(accessToken, keyId, request) {
        return this.signPayload(accessToken, keyId, request);
    }
    /**
     * Utility function to generate the signed JWT for an access_token
     * @param payload
     * @param kid
     * @param request
     * @param claims
     * @returns
     */
    async signPayload(payload, keyId, request, claims) {
        // Deconstruct request to extract SHR parameters
        const { resourceRequestMethod, resourceRequestUri, shrClaims, shrNonce, } = request;
        const resourceUrlString = resourceRequestUri
            ? new UrlString(resourceRequestUri)
            : undefined;
        const resourceUrlComponents = resourceUrlString?.getUrlComponents();
        return await this.cryptoUtils.signJwt({
            at: payload,
            ts: TimeUtils.nowSeconds(),
            m: resourceRequestMethod?.toUpperCase(),
            u: resourceUrlComponents?.HostNameAndPort,
            nonce: shrNonce || this.cryptoUtils.createNewGuid(),
            p: resourceUrlComponents?.AbsolutePath,
            q: resourceUrlComponents?.QueryString
                ? [[], resourceUrlComponents.QueryString]
                : undefined,
            client_claims: shrClaims || undefined,
            ...claims,
        }, keyId, request.correlationId);
    }
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class instance helps track the memory changes facilitating
 * decisions to read from and write to the persistent cache
 */ class TokenCacheContext {
    constructor(tokenCache, hasChanged) {
        this.cache = tokenCache;
        this.hasChanged = hasChanged;
    }
    /**
     * boolean which indicates the changes in cache
     */
    get cacheHasChanged() {
        return this.hasChanged;
    }
    /**
     * function to retrieve the token cache
     */
    get tokenCache() {
        return this.cache;
    }
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Wraps a function with a performance measurement.
 * Usage: invoke(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invoke = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace(`Executing function ${eventName}`);
        const inProgressEvent = telemetryClient?.startMeasurement(eventName, correlationId);
        telemetryClient?.setPreQueueTime(eventName, correlationId);
        try {
            const result = callback(...args);
            inProgressEvent?.end({
                success: true,
            });
            logger.trace(`Returning result from ${eventName}`);
            return result;
        }
        catch (e) {
            logger.trace(`Error occurred in ${eventName}`);
            try {
                logger.trace(JSON.stringify(e));
            }
            catch (e) {
                logger.trace("Unable to print error message.");
            }
            inProgressEvent?.end({
                success: false,
            });
            throw e;
        }
    };
};
/**
 * Wraps an async function with a performance measurement.
 * Usage: invokeAsync(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invokeAsync = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace(`Executing function ${eventName}`);
        const inProgressEvent = telemetryClient?.startMeasurement(eventName, correlationId);
        telemetryClient?.setPreQueueTime(eventName, correlationId);
        return callback(...args)
            .then((response) => {
            logger.trace(`Returning result from ${eventName}`);
            inProgressEvent?.end({
                success: true,
            });
            return response;
        })
            .catch((e) => {
            logger.trace(`Error occurred in ${eventName}`);
            try {
                logger.trace(JSON.stringify(e));
            }
            catch (e) {
                logger.trace("Unable to print error message.");
            }
            inProgressEvent?.end({
                success: false,
            });
            throw e;
        });
    };
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Authorization Code client
 * @internal
 */
class AuthorizationCodeClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
        // Flag to indicate if client is for hybrid spa auth code redemption
        this.includeRedirectUri = true;
        this.oidcDefaultScopes =
            this.config.authOptions.authority.options.OIDCOptions?.defaultScopes;
    }
    /**
     * Creates the URL of the authorization request letting the user input credentials and consent to the
     * application. The URL target the /authorize endpoint of the authority configured in the
     * application object.
     *
     * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
     * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
     * acquireToken(AuthorizationCodeRequest)
     * @param request
     */
    async getAuthCodeUrl(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.GetAuthCodeUrl, request.correlationId);
        const queryString = await invokeAsync(this.createAuthCodeUrlQueryString.bind(this), PerformanceEvents.AuthClientCreateQueryString, this.logger, this.performanceClient, request.correlationId)(request);
        return UrlString.appendQueryString(this.authority.authorizationEndpoint, queryString);
    }
    /**
     * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
     * authorization_code_grant
     * @param request
     */
    async acquireToken(request, authCodePayload) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientAcquireToken, request.correlationId);
        if (!request.code) {
            throw ClientAuthError.createTokenRequestCannotBeMadeError();
        }
        const reqTimestamp = TimeUtils.nowSeconds();
        const response = await invokeAsync(this.executeTokenRequest.bind(this), PerformanceEvents.AuthClientExecuteTokenRequest, this.logger, this.performanceClient, request.correlationId)(this.authority, request);
        // Retrieve requestId from response headers
        const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin, this.performanceClient);
        // Validate response. This function throws a server error if an error is returned by the server.
        responseHandler.validateTokenResponse(response.body);
        return invokeAsync(responseHandler.handleServerTokenResponse.bind(responseHandler), PerformanceEvents.HandleServerTokenResponse, this.logger, this.performanceClient, request.correlationId)(response.body, this.authority, reqTimestamp, request, authCodePayload, undefined, undefined, undefined, requestId);
    }
    /**
     * Handles the hash fragment response from public client code request. Returns a code response used by
     * the client to exchange for a token in acquireToken.
     * @param hashFragment
     */
    handleFragmentResponse(hashFragment, cachedState) {
        // Handle responses.
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, null, null);
        const serverParams = UrlString.getDeserializedCodeResponse(this.config.authOptions.authority.options.OIDCOptions
            ?.serverResponseType, hashFragment);
        // Get code response
        responseHandler.validateServerAuthorizationCodeResponse(serverParams, cachedState, this.cryptoUtils);
        // throw when there is no auth code in the response
        if (!serverParams.code) {
            throw ClientAuthError.createNoAuthCodeInServerResponseError();
        }
        return {
            ...serverParams,
            // Code param is optional in ServerAuthorizationCodeResponse but required in AuthorizationCodePaylod
            code: serverParams.code,
        };
    }
    /**
     * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param authorityUri
     */
    getLogoutUri(logoutRequest) {
        // Throw error if logoutRequest is null/undefined
        if (!logoutRequest) {
            throw ClientConfigurationError.createEmptyLogoutRequestError();
        }
        const queryString = this.createLogoutUrlQueryString(logoutRequest);
        // Construct logout URI
        return UrlString.appendQueryString(this.authority.endSessionEndpoint, queryString);
    }
    /**
     * Executes POST request to token endpoint
     * @param authority
     * @param request
     */
    async executeTokenRequest(authority, request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientExecuteTokenRequest, request.correlationId);
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await invokeAsync(this.createTokenRequestBody.bind(this), PerformanceEvents.AuthClientCreateTokenRequestBody, this.logger, this.performanceClient, request.correlationId)(request);
        let ccsCredential = undefined;
        if (request.clientInfo) {
            try {
                const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                ccsCredential = {
                    credential: `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
                    type: CcsCredentialType.HOME_ACCOUNT_ID,
                };
            }
            catch (e) {
                this.logger.verbose("Could not parse client info for CCS Header: " + e);
            }
        }
        const headers = this.createTokenRequestHeaders(ccsCredential || request.ccsCredential);
        const thumbprint = {
            clientId: this.config.authOptions.clientId,
            authority: authority.canonicalAuthority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        return invokeAsync(this.executePostToTokenEndpoint.bind(this), PerformanceEvents.BaseClientExecutePostToTokenEndpoint, this.logger, this.performanceClient, request.correlationId)(endpoint, requestBody, headers, thumbprint, request.correlationId);
    }
    /**
     * Generates a map for all the params to be sent to the service
     * @param request
     */
    async createTokenRequestBody(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientCreateTokenRequestBody, request.correlationId);
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(request.tokenBodyParameters?.[AADServerParamKeys.CLIENT_ID] ||
            this.config.authOptions.clientId);
        /*
         * For hybrid spa flow, there will be a code but no verifier
         * In this scenario, don't include redirect uri as auth code will not be bound to redirect URI
         */
        if (!this.includeRedirectUri) {
            // Just validate
            RequestValidator.validateRedirectUri(request.redirectUri);
        }
        else {
            // Validate and include redirect uri
            parameterBuilder.addRedirectUri(request.redirectUri);
        }
        // Add scope array, parameter builder will add default scopes and dedupe
        parameterBuilder.addScopes(request.scopes, true, this.oidcDefaultScopes);
        // add code: user set, not validated
        parameterBuilder.addAuthorizationCode(request.code);
        // Add library metadata
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        // add code_verifier if passed
        if (request.codeVerifier) {
            parameterBuilder.addCodeVerifier(request.codeVerifier);
        }
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            const clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        parameterBuilder.addGrantType(GrantType.AUTHORIZATION_CODE_GRANT);
        parameterBuilder.addClientInfo();
        if (request.authenticationScheme === AuthenticationScheme.POP) {
            const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
            this.performanceClient?.setPreQueueTime(PerformanceEvents.PopTokenGenerateCnf, request.correlationId);
            const reqCnfData = await popTokenGenerator.generateCnf(request);
            // SPA PoP requires full Base64Url encoded req_cnf string (unhashed)
            parameterBuilder.addPopToken(reqCnfData.reqCnfString);
        }
        else if (request.authenticationScheme === AuthenticationScheme.SSH) {
            if (request.sshJwk) {
                parameterBuilder.addSshJwk(request.sshJwk);
            }
            else {
                throw ClientConfigurationError.createMissingSshJwkError();
            }
        }
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        let ccsCred = undefined;
        if (request.clientInfo) {
            try {
                const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                ccsCred = {
                    credential: `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
                    type: CcsCredentialType.HOME_ACCOUNT_ID,
                };
            }
            catch (e) {
                this.logger.verbose("Could not parse client info for CCS Header: " + e);
            }
        }
        else {
            ccsCred = request.ccsCredential;
        }
        // Adds these as parameters in the request instead of headers to prevent CORS preflight request
        if (this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    parameterBuilder.addCcsUpn(ccsCred.credential);
                    break;
            }
        }
        if (request.tokenBodyParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenBodyParameters);
        }
        // Add hybrid spa parameters if not already provided
        if (request.enableSpaAuthorizationCode &&
            (!request.tokenBodyParameters ||
                !request.tokenBodyParameters[AADServerParamKeys.RETURN_SPA_CODE])) {
            parameterBuilder.addExtraQueryParameters({
                [AADServerParamKeys.RETURN_SPA_CODE]: "1",
            });
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * This API validates the `AuthorizationCodeUrlRequest` and creates a URL
     * @param request
     */
    async createAuthCodeUrlQueryString(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientCreateQueryString, request.correlationId);
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(request.extraQueryParameters?.[AADServerParamKeys.CLIENT_ID] ||
            this.config.authOptions.clientId);
        const requestScopes = [
            ...(request.scopes || []),
            ...(request.extraScopesToConsent || []),
        ];
        parameterBuilder.addScopes(requestScopes, true, this.oidcDefaultScopes);
        // validate the redirectUri (to be a non null value)
        parameterBuilder.addRedirectUri(request.redirectUri);
        // generate the correlationId if not set by the user and add
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        // add response_mode. If not passed in it defaults to query.
        parameterBuilder.addResponseMode(request.responseMode);
        // add response_type = code
        parameterBuilder.addResponseTypeCode();
        // add library info parameters
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        if (!isOidcProtocolMode(this.config)) {
            parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        }
        // add client_info=1
        parameterBuilder.addClientInfo();
        if (request.codeChallenge && request.codeChallengeMethod) {
            parameterBuilder.addCodeChallengeParams(request.codeChallenge, request.codeChallengeMethod);
        }
        if (request.prompt) {
            parameterBuilder.addPrompt(request.prompt);
        }
        if (request.domainHint) {
            parameterBuilder.addDomainHint(request.domainHint);
        }
        // Add sid or loginHint with preference for login_hint claim (in request) -> sid -> loginHint (upn/email) -> username of AccountInfo object
        if (request.prompt !== PromptValue.SELECT_ACCOUNT) {
            // AAD will throw if prompt=select_account is passed with an account hint
            if (request.sid && request.prompt === PromptValue.NONE) {
                // SessionID is only used in silent calls
                this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request");
                parameterBuilder.addSid(request.sid);
            }
            else if (request.account) {
                const accountSid = this.extractAccountSid(request.account);
                const accountLoginHintClaim = this.extractLoginHint(request.account);
                // If login_hint claim is present, use it over sid/username
                if (accountLoginHintClaim) {
                    this.logger.verbose("createAuthCodeUrlQueryString: login_hint claim present on account");
                    parameterBuilder.addLoginHint(accountLoginHintClaim);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
                else if (accountSid && request.prompt === PromptValue.NONE) {
                    /*
                     * If account and loginHint are provided, we will check account first for sid before adding loginHint
                     * SessionId is only used in silent calls
                     */
                    this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account");
                    parameterBuilder.addSid(accountSid);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
                else if (request.loginHint) {
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from request");
                    parameterBuilder.addLoginHint(request.loginHint);
                    parameterBuilder.addCcsUpn(request.loginHint);
                }
                else if (request.account.username) {
                    // Fallback to account username if provided
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from account");
                    parameterBuilder.addLoginHint(request.account.username);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
            }
            else if (request.loginHint) {
                this.logger.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request");
                parameterBuilder.addLoginHint(request.loginHint);
                parameterBuilder.addCcsUpn(request.loginHint);
            }
        }
        else {
            this.logger.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints");
        }
        if (request.nonce) {
            parameterBuilder.addNonce(request.nonce);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (request.claims ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (request.extraQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
        if (request.nativeBroker) {
            // signal ests that this is a WAM call
            parameterBuilder.addNativeBroker();
            // pass the req_cnf for POP
            if (request.authenticationScheme === AuthenticationScheme.POP) {
                const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                // to reduce the URL length, it is recommended to send the hash of the req_cnf instead of the whole string
                const reqCnfData = await popTokenGenerator.generateCnf(request);
                parameterBuilder.addPopToken(reqCnfData.reqCnfHash);
            }
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * This API validates the `EndSessionRequest` and creates a URL
     * @param request
     */
    createLogoutUrlQueryString(request) {
        const parameterBuilder = new RequestParameterBuilder();
        if (request.postLogoutRedirectUri) {
            parameterBuilder.addPostLogoutRedirectUri(request.postLogoutRedirectUri);
        }
        if (request.correlationId) {
            parameterBuilder.addCorrelationId(request.correlationId);
        }
        if (request.idTokenHint) {
            parameterBuilder.addIdTokenHint(request.idTokenHint);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (request.logoutHint) {
            parameterBuilder.addLogoutHint(request.logoutHint);
        }
        if (request.extraQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * Helper to get sid from account. Returns null if idTokenClaims are not present or sid is not present.
     * @param account
     */
    extractAccountSid(account) {
        return account.idTokenClaims?.sid || null;
    }
    extractLoginHint(account) {
        return account.idTokenClaims?.login_hint || null;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 refresh token client
 * @internal
 */
class RefreshTokenClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
    }
    async acquireToken(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireToken, request.correlationId);
        const atsMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.RefreshTokenClientAcquireToken, request.correlationId);
        this.logger.verbose("RefreshTokenClientAcquireToken called", request.correlationId);
        const reqTimestamp = TimeUtils.nowSeconds();
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientExecuteTokenRequest, request.correlationId);
        const response = await this.executeTokenRequest(request, this.authority);
        // Retrieve requestId from response headers
        const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
        responseHandler.validateTokenResponse(response.body);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.HandleServerTokenResponse, request.correlationId);
        return responseHandler
            .handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, undefined, undefined, true, request.forceCache, requestId)
            .then((result) => {
            atsMeasurement?.end({
                success: true,
            });
            return result;
        })
            .catch((error) => {
            this.logger.verbose("Error in fetching refresh token", request.correlationId);
            atsMeasurement?.end({
                errorCode: error.errorCode,
                subErrorCode: error.subError,
                success: false,
            });
            throw error;
        });
    }
    /**
     * Gets cached refresh token and attaches to request, then calls acquireToken API
     * @param request
     */
    async acquireTokenByRefreshToken(request) {
        // Cannot renew token if no request object is given.
        if (!request) {
            throw ClientConfigurationError.createEmptyTokenRequestError();
        }
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenByRefreshToken, request.correlationId);
        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
        if (!request.account) {
            throw ClientAuthError.createNoAccountInSilentRequestError();
        }
        // try checking if FOCI is enabled for the given application
        const isFOCI = this.cacheManager.isAppMetadataFOCI(request.account.environment);
        // if the app is part of the family, retrive a Family refresh token if present and make a refreshTokenRequest
        if (isFOCI) {
            try {
                this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
                return this.acquireTokenWithCachedRefreshToken(request, true);
            }
            catch (e) {
                const noFamilyRTInCache = e instanceof InteractionRequiredAuthError &&
                    e.errorCode ===
                        InteractionRequiredAuthErrorMessage.noTokensFoundError
                            .code;
                const clientMismatchErrorWithFamilyRT = e instanceof ServerError &&
                    e.errorCode === Errors.INVALID_GRANT_ERROR &&
                    e.subError === Errors.CLIENT_MISMATCH_ERROR;
                // if family Refresh Token (FRT) cache acquisition fails or if client_mismatch error is seen with FRT, reattempt with application Refresh Token (ART)
                if (noFamilyRTInCache || clientMismatchErrorWithFamilyRT) {
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
                    return this.acquireTokenWithCachedRefreshToken(request, false);
                    // throw in all other cases
                }
                else {
                    throw e;
                }
            }
        }
        // fall back to application refresh token acquisition
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
        return this.acquireTokenWithCachedRefreshToken(request, false);
    }
    /**
     * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
     * @param request
     */
    async acquireTokenWithCachedRefreshToken(request, foci) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
        // fetches family RT or application RT based on FOCI value
        const atsMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
        this.logger.verbose("RefreshTokenClientAcquireTokenWithCachedRefreshToken called", request.correlationId);
        const refreshToken = this.cacheManager.getRefreshToken(request.account, foci);
        if (!refreshToken) {
            atsMeasurement?.discard();
            throw InteractionRequiredAuthError.createNoTokensFoundError();
        }
        // attach cached RT size to the current measurement
        atsMeasurement?.end({
            success: true,
        });
        const refreshTokenRequest = {
            ...request,
            refreshToken: refreshToken.secret,
            authenticationScheme: request.authenticationScheme || AuthenticationScheme.BEARER,
            ccsCredential: {
                credential: request.account.homeAccountId,
                type: CcsCredentialType.HOME_ACCOUNT_ID,
            },
        };
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireToken, request.correlationId);
        return this.acquireToken(refreshTokenRequest);
    }
    /**
     * Constructs the network message and makes a NW call to the underlying secure token service
     * @param request
     * @param authority
     */
    async executeTokenRequest(request, authority) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientExecuteTokenRequest, request.correlationId);
        const acquireTokenMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.RefreshTokenClientExecuteTokenRequest, request.correlationId);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientCreateTokenRequestBody, request.correlationId);
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await this.createTokenRequestBody(request);
        const headers = this.createTokenRequestHeaders(request.ccsCredential);
        const thumbprint = {
            clientId: this.config.authOptions.clientId,
            authority: authority.canonicalAuthority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        return this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId)
            .then((result) => {
            acquireTokenMeasurement?.end({
                success: true,
            });
            return result;
        })
            .catch((error) => {
            acquireTokenMeasurement?.end({
                success: false,
            });
            throw error;
        });
    }
    /**
     * Helper function to create the token request body
     * @param request
     */
    async createTokenRequestBody(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientCreateTokenRequestBody, request.correlationId);
        const correlationId = request.correlationId;
        const acquireTokenMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.BaseClientCreateTokenRequestHeaders, correlationId);
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes, true, this.config.authOptions.authority.options.OIDCOptions?.defaultScopes);
        parameterBuilder.addGrantType(GrantType.REFRESH_TOKEN_GRANT);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        parameterBuilder.addCorrelationId(correlationId);
        parameterBuilder.addRefreshToken(request.refreshToken);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            const clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (request.authenticationScheme === AuthenticationScheme.POP) {
            const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
            this.performanceClient?.setPreQueueTime(PerformanceEvents.PopTokenGenerateCnf, request.correlationId);
            const reqCnfData = await popTokenGenerator.generateCnf(request);
            // SPA PoP requires full Base64Url encoded req_cnf string (unhashed)
            parameterBuilder.addPopToken(reqCnfData.reqCnfString);
        }
        else if (request.authenticationScheme === AuthenticationScheme.SSH) {
            if (request.sshJwk) {
                parameterBuilder.addSshJwk(request.sshJwk);
            }
            else {
                acquireTokenMeasurement?.end({
                    success: false,
                });
                throw ClientConfigurationError.createMissingSshJwkError();
            }
        }
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (this.config.systemOptions.preventCorsPreflight &&
            request.ccsCredential) {
            switch (request.ccsCredential.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.ccsCredential.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    parameterBuilder.addCcsUpn(request.ccsCredential.credential);
                    break;
            }
        }
        acquireTokenMeasurement?.end({
            success: true,
        });
        return parameterBuilder.createQueryString();
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class SilentFlowClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
    }
    /**
     * Retrieves a token from cache if it is still valid, or uses the cached refresh token to renew
     * the given token and returns the renewed token
     * @param request
     */
    async acquireToken(request) {
        try {
            return await this.acquireCachedToken(request);
        }
        catch (e) {
            if (e instanceof ClientAuthError &&
                e.errorCode === ClientAuthErrorMessage.tokenRefreshRequired.code) {
                const refreshTokenClient = new RefreshTokenClient(this.config, this.performanceClient);
                return refreshTokenClient.acquireTokenByRefreshToken(request);
            }
            else {
                throw e;
            }
        }
    }
    /**
     * Retrieves token from cache or throws an error if it must be refreshed.
     * @param request
     */
    async acquireCachedToken(request) {
        // Cannot renew token if no request object is given.
        if (!request) {
            throw ClientConfigurationError.createEmptyTokenRequestError();
        }
        if (request.forceRefresh) {
            // Must refresh due to present force_refresh flag.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.FORCE_REFRESH);
            this.logger.info("SilentFlowClient:acquireCachedToken - Skipping cache because forceRefresh is true.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        else if (!this.config.cacheOptions.claimsBasedCachingEnabled &&
            !StringUtils.isEmptyObj(request.claims)) {
            // Must refresh due to request parameters.
            this.logger.info("SilentFlowClient:acquireCachedToken - Skipping cache because claims-based caching is disabled and claims were requested.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
        if (!request.account) {
            throw ClientAuthError.createNoAccountInSilentRequestError();
        }
        const environment = request.authority || this.authority.getPreferredCache();
        const cacheRecord = this.cacheManager.readCacheRecord(request.account, request, environment);
        if (!cacheRecord.accessToken) {
            // Must refresh due to non-existent access_token.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
            this.logger.info("SilentFlowClient:acquireCachedToken - No access token found in cache for the given properties.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        else if (TimeUtils.wasClockTurnedBack(cacheRecord.accessToken.cachedAt) ||
            TimeUtils.isTokenExpired(cacheRecord.accessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
            // Must refresh due to expired access_token.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
            this.logger.info(`SilentFlowClient:acquireCachedToken - Cached access token is expired or will expire within ${this.config.systemOptions.tokenRenewalOffsetSeconds} seconds.`);
            throw ClientAuthError.createRefreshRequiredError();
        }
        else if (cacheRecord.accessToken.refreshOn &&
            TimeUtils.isTokenExpired(cacheRecord.accessToken.refreshOn, 0)) {
            // Must refresh due to the refresh_in value.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.REFRESH_CACHED_ACCESS_TOKEN);
            this.logger.info("SilentFlowClient:acquireCachedToken - Cached access token's refreshOn property has been exceeded'.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        if (this.config.serverTelemetryManager) {
            this.config.serverTelemetryManager.incrementCacheHits();
        }
        return await this.generateResultFromCacheRecord(cacheRecord, request);
    }
    /**
     * Helper function to build response object from the CacheRecord
     * @param cacheRecord
     */
    async generateResultFromCacheRecord(cacheRecord, request) {
        let idTokenClaims;
        if (cacheRecord.idToken) {
            idTokenClaims = extractTokenClaims(cacheRecord.idToken.secret, this.config.cryptoInterface.base64Decode);
        }
        // token max_age check
        if (request.maxAge || request.maxAge === 0) {
            const authTime = idTokenClaims?.auth_time;
            if (!authTime) {
                throw ClientAuthError.createAuthTimeNotFoundError();
            }
            checkMaxAge(authTime, request.maxAge);
        }
        return await ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, cacheRecord, true, request, idTokenClaims);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isOpenIdConfigResponse(response) {
    return (response.hasOwnProperty("authorization_endpoint") &&
        response.hasOwnProperty("token_endpoint") &&
        response.hasOwnProperty("issuer") &&
        response.hasOwnProperty("jwks_uri"));
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const rawMetdataJSON = {
    endpointMetadata: {
        "https://login.microsoftonline.com/common/": {
            token_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.com/common/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.com/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.com/common/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.com",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pas.windows.net",
        },
        "https://login.chinacloudapi.cn/common/": {
            token_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.chinacloudapi.cn/common/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.partner.microsoftonline.cn/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://microsoftgraph.chinacloudapi.cn/oidc/userinfo",
            authorization_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.chinacloudapi.cn/common/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "partner.microsoftonline.cn",
            cloud_graph_host_name: "graph.chinacloudapi.cn",
            msgraph_host: "microsoftgraph.chinacloudapi.cn",
            rbac_url: "https://pas.chinacloudapi.cn",
        },
        "https://login.microsoftonline.us/common/": {
            token_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.us/common/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.us/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.us/common/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.us",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pasff.usgovcloudapi.net",
        },
        "https://login.microsoftonline.com/consumers/": {
            token_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.com/consumers/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.com/consumers/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.com",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pas.windows.net",
        },
        "https://login.chinacloudapi.cn/consumers/": {
            token_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.chinacloudapi.cn/consumers/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.partner.microsoftonline.cn/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://microsoftgraph.chinacloudapi.cn/oidc/userinfo",
            authorization_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.chinacloudapi.cn/consumers/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "partner.microsoftonline.cn",
            cloud_graph_host_name: "graph.chinacloudapi.cn",
            msgraph_host: "microsoftgraph.chinacloudapi.cn",
            rbac_url: "https://pas.chinacloudapi.cn",
        },
        "https://login.microsoftonline.us/consumers/": {
            token_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.us/consumers/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.us/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.us/consumers/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.us",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pasff.usgovcloudapi.net",
        },
        "https://login.microsoftonline.com/organizations/": {
            token_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.com/organizations/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.com/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.com/organizations/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.com",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pas.windows.net",
        },
        "https://login.chinacloudapi.cn/organizations/": {
            token_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.chinacloudapi.cn/organizations/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.partner.microsoftonline.cn/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://microsoftgraph.chinacloudapi.cn/oidc/userinfo",
            authorization_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.chinacloudapi.cn/organizations/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "partner.microsoftonline.cn",
            cloud_graph_host_name: "graph.chinacloudapi.cn",
            msgraph_host: "microsoftgraph.chinacloudapi.cn",
            rbac_url: "https://pas.chinacloudapi.cn",
        },
        "https://login.microsoftonline.us/organizations/": {
            token_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.us/organizations/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.us/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.us/organizations/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.us",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pasff.usgovcloudapi.net",
        },
    },
    instanceDiscoveryMetadata: {
        "https://login.microsoftonline.com/common/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.chinacloudapi.cn/common/": {
            tenant_discovery_endpoint: "https://login.chinacloudapi.cn/common/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.us/common/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.us/common/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.com/consumers/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.chinacloudapi.cn/consumers/": {
            tenant_discovery_endpoint: "https://login.chinacloudapi.cn/consumers/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.us/consumers/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.us/consumers/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.com/organizations/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.chinacloudapi.cn/organizations/": {
            tenant_discovery_endpoint: "https://login.chinacloudapi.cn/organizations/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.us/organizations/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.us/organizations/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
    },
};
const EndpointMetadata = rawMetdataJSON.endpointMetadata;
const InstanceDiscoveryMetadata = rawMetdataJSON.instanceDiscoveryMetadata;
const InstanceDiscoveryMetadataAliases = new Set();
for (const key in InstanceDiscoveryMetadata) {
    for (const metadata of InstanceDiscoveryMetadata[key].metadata) {
        for (const alias of metadata.aliases) {
            InstanceDiscoveryMetadataAliases.add(alias);
        }
    }
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryResponse(response) {
    return (response.hasOwnProperty("tenant_discovery_endpoint") &&
        response.hasOwnProperty("metadata"));
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryErrorResponse(response) {
    return (response.hasOwnProperty("error") &&
        response.hasOwnProperty("error_description"));
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class RegionDiscovery {
    constructor(networkInterface, performanceClient, correlationId) {
        this.networkInterface = networkInterface;
        this.performanceClient = performanceClient;
        this.correlationId = correlationId;
    }
    /**
     * Detect the region from the application's environment.
     *
     * @returns Promise<string | null>
     */
    async detectRegion(environmentRegion, regionDiscoveryMetadata) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryDetectRegion, this.correlationId);
        // Initialize auto detected region with the region from the envrionment
        let autodetectedRegionName = environmentRegion;
        // Check if a region was detected from the environment, if not, attempt to get the region from IMDS
        if (!autodetectedRegionName) {
            const options = RegionDiscovery.IMDS_OPTIONS;
            try {
                this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.correlationId);
                const localIMDSVersionResponse = await this.getRegionFromIMDS(Constants.IMDS_VERSION, options);
                if (localIMDSVersionResponse.status ===
                    ResponseCodes.httpSuccess) {
                    autodetectedRegionName = localIMDSVersionResponse.body;
                    regionDiscoveryMetadata.region_source =
                        RegionDiscoverySources.IMDS;
                }
                // If the response using the local IMDS version failed, try to fetch the current version of IMDS and retry.
                if (localIMDSVersionResponse.status ===
                    ResponseCodes.httpBadRequest) {
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryGetCurrentVersion, this.correlationId);
                    const currentIMDSVersion = await this.getCurrentVersion(options);
                    if (!currentIMDSVersion) {
                        regionDiscoveryMetadata.region_source =
                            RegionDiscoverySources.FAILED_AUTO_DETECTION;
                        return null;
                    }
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.correlationId);
                    const currentIMDSVersionResponse = await this.getRegionFromIMDS(currentIMDSVersion, options);
                    if (currentIMDSVersionResponse.status ===
                        ResponseCodes.httpSuccess) {
                        autodetectedRegionName =
                            currentIMDSVersionResponse.body;
                        regionDiscoveryMetadata.region_source =
                            RegionDiscoverySources.IMDS;
                    }
                }
            }
            catch (e) {
                regionDiscoveryMetadata.region_source =
                    RegionDiscoverySources.FAILED_AUTO_DETECTION;
                return null;
            }
        }
        else {
            regionDiscoveryMetadata.region_source =
                RegionDiscoverySources.ENVIRONMENT_VARIABLE;
        }
        // If no region was auto detected from the environment or from the IMDS endpoint, mark the attempt as a FAILED_AUTO_DETECTION
        if (!autodetectedRegionName) {
            regionDiscoveryMetadata.region_source =
                RegionDiscoverySources.FAILED_AUTO_DETECTION;
        }
        return autodetectedRegionName || null;
    }
    /**
     * Make the call to the IMDS endpoint
     *
     * @param imdsEndpointUrl
     * @returns Promise<NetworkResponse<string>>
     */
    async getRegionFromIMDS(version, options) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.correlationId);
        return this.networkInterface.sendGetRequestAsync(`${Constants.IMDS_ENDPOINT}?api-version=${version}&format=text`, options, Constants.IMDS_TIMEOUT);
    }
    /**
     * Get the most recent version of the IMDS endpoint available
     *
     * @returns Promise<string | null>
     */
    async getCurrentVersion(options) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryGetCurrentVersion, this.correlationId);
        try {
            const response = await this.networkInterface.sendGetRequestAsync(`${Constants.IMDS_ENDPOINT}?format=json`, options);
            // When IMDS endpoint is called without the api version query param, bad request response comes back with latest version.
            if (response.status === ResponseCodes.httpBadRequest &&
                response.body &&
                response.body["newest-versions"] &&
                response.body["newest-versions"].length > 0) {
                return response.body["newest-versions"][0];
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }
}
// Options for the IMDS endpoint request
RegionDiscovery.IMDS_OPTIONS = {
    headers: {
        Metadata: "true",
    },
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The authority class validates the authority URIs used by the user, and retrieves the OpenID Configuration Data from the
 * endpoint. It will store the pertinent config data in this object for use during token calls.
 * @internal
 */
class Authority {
    constructor(authority, networkInterface, cacheManager, authorityOptions, logger, performanceClient, correlationId) {
        this.canonicalAuthority = authority;
        this._canonicalAuthority.validateAsUri();
        this.networkInterface = networkInterface;
        this.cacheManager = cacheManager;
        this.authorityOptions = authorityOptions;
        this.regionDiscoveryMetadata = {
            region_used: undefined,
            region_source: undefined,
            region_outcome: undefined,
        };
        this.logger = logger;
        this.performanceClient = performanceClient;
        this.correlationId = correlationId;
        this.regionDiscovery = new RegionDiscovery(networkInterface, this.performanceClient, this.correlationId);
    }
    /**
     * Get {@link AuthorityType}
     * @param authorityUri {@link IUri}
     * @private
     */
    getAuthorityType(authorityUri) {
        // CIAM auth url pattern is being standardized as: <tenant>.ciamlogin.com
        if (authorityUri.HostNameAndPort.endsWith(Constants.CIAM_AUTH_URL)) {
            return AuthorityType.Ciam;
        }
        const pathSegments = authorityUri.PathSegments;
        if (pathSegments.length) {
            switch (pathSegments[0].toLowerCase()) {
                case Constants.ADFS:
                    return AuthorityType.Adfs;
                case Constants.DSTS:
                    return AuthorityType.Dsts;
            }
        }
        return AuthorityType.Default;
    }
    // See above for AuthorityType
    get authorityType() {
        return this.getAuthorityType(this.canonicalAuthorityUrlComponents);
    }
    /**
     * ProtocolMode enum representing the way endpoints are constructed.
     */
    get protocolMode() {
        return this.authorityOptions.protocolMode;
    }
    /**
     * Returns authorityOptions which can be used to reinstantiate a new authority instance
     */
    get options() {
        return this.authorityOptions;
    }
    /**
     * A URL that is the authority set by the developer
     */
    get canonicalAuthority() {
        return this._canonicalAuthority.urlString;
    }
    /**
     * Sets canonical authority.
     */
    set canonicalAuthority(url) {
        this._canonicalAuthority = new UrlString(url);
        this._canonicalAuthority.validateAsUri();
        this._canonicalAuthorityUrlComponents = null;
    }
    /**
     * Get authority components.
     */
    get canonicalAuthorityUrlComponents() {
        if (!this._canonicalAuthorityUrlComponents) {
            this._canonicalAuthorityUrlComponents =
                this._canonicalAuthority.getUrlComponents();
        }
        return this._canonicalAuthorityUrlComponents;
    }
    /**
     * Get hostname and port i.e. login.microsoftonline.com
     */
    get hostnameAndPort() {
        return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
    }
    /**
     * Get tenant for authority.
     */
    get tenant() {
        return this.canonicalAuthorityUrlComponents.PathSegments[0];
    }
    /**
     * OAuth /authorize endpoint for requests
     */
    get authorizationEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.authorization_endpoint);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * OAuth /token endpoint for requests
     */
    get tokenEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.token_endpoint);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    get deviceCodeEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * OAuth logout endpoint for requests
     */
    get endSessionEndpoint() {
        if (this.discoveryComplete()) {
            // ROPC policies may not have end_session_endpoint set
            if (!this.metadata.end_session_endpoint) {
                throw ClientAuthError.createLogoutNotSupportedError();
            }
            return this.replacePath(this.metadata.end_session_endpoint);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * OAuth issuer for requests
     */
    get selfSignedJwtAudience() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.issuer);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * Jwks_uri for token signing keys
     */
    get jwksUri() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.jwks_uri);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
     * @param authorityUri {@link IUri}
     * @private
     */
    canReplaceTenant(authorityUri) {
        return (authorityUri.PathSegments.length === 1 &&
            !Authority.reservedTenantDomains.has(authorityUri.PathSegments[0]) &&
            this.getAuthorityType(authorityUri) === AuthorityType.Default &&
            this.protocolMode === ProtocolMode.AAD);
    }
    /**
     * Replaces tenant in url path with current tenant. Defaults to common.
     * @param urlString
     */
    replaceTenant(urlString) {
        return urlString.replace(/{tenant}|{tenantid}/g, this.tenant);
    }
    /**
     * Replaces path such as tenant or policy with the current tenant or policy.
     * @param urlString
     */
    replacePath(urlString) {
        let endpoint = urlString;
        const cachedAuthorityUrl = new UrlString(this.metadata.canonical_authority);
        const cachedAuthorityUrlComponents = cachedAuthorityUrl.getUrlComponents();
        const cachedAuthorityParts = cachedAuthorityUrlComponents.PathSegments;
        const currentAuthorityParts = this.canonicalAuthorityUrlComponents.PathSegments;
        currentAuthorityParts.forEach((currentPart, index) => {
            let cachedPart = cachedAuthorityParts[index];
            if (index === 0 &&
                this.canReplaceTenant(cachedAuthorityUrlComponents)) {
                const tenantId = new UrlString(this.metadata.authorization_endpoint).getUrlComponents().PathSegments[0];
                /**
                 * Check if AAD canonical authority contains tenant domain name, for example "testdomain.onmicrosoft.com",
                 * by comparing its first path segment to the corresponding authorization endpoint path segment, which is
                 * always resolved with tenant id by OIDC.
                 */
                if (cachedPart !== tenantId) {
                    this.logger.verbose(`Replacing tenant domain name ${cachedPart} with id ${tenantId}`);
                    cachedPart = tenantId;
                }
            }
            if (currentPart !== cachedPart) {
                endpoint = endpoint.replace(`/${cachedPart}/`, `/${currentPart}/`);
            }
        });
        return this.replaceTenant(endpoint);
    }
    /**
     * The default open id configuration endpoint for any canonical authority.
     */
    get defaultOpenIdConfigurationEndpoint() {
        const canonicalAuthorityHost = this.hostnameAndPort;
        if (this.authorityType === AuthorityType.Adfs ||
            (this.protocolMode !== ProtocolMode.AAD &&
                !this.isAliasOfKnownMicrosoftAuthority(canonicalAuthorityHost))) {
            return `${this.canonicalAuthority}.well-known/openid-configuration`;
        }
        return `${this.canonicalAuthority}v2.0/.well-known/openid-configuration`;
    }
    /**
     * Boolean that returns whethr or not tenant discovery has been completed.
     */
    discoveryComplete() {
        return !!this.metadata;
    }
    /**
     * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
     * and the /authorize, /token and logout endpoints.
     */
    async resolveEndpointsAsync() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityResolveEndpointsAsync, this.correlationId);
        let metadataEntity = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort);
        if (!metadataEntity) {
            metadataEntity = new AuthorityMetadataEntity();
            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
        }
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateCloudDiscoveryMetadata, this.correlationId);
        const cloudDiscoverySource = await this.updateCloudDiscoveryMetadata(metadataEntity);
        this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, metadataEntity.preferred_network);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateEndpointMetadata, this.correlationId);
        const endpointSource = await this.updateEndpointMetadata(metadataEntity);
        if (cloudDiscoverySource !== AuthorityMetadataSource.CACHE &&
            endpointSource !== AuthorityMetadataSource.CACHE) {
            // Reset the expiration time unless both values came from a successful cache lookup
            metadataEntity.resetExpiresAt();
            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
        }
        const cacheKey = this.cacheManager.generateAuthorityMetadataCacheKey(metadataEntity.preferred_cache);
        this.cacheManager.setAuthorityMetadata(cacheKey, metadataEntity);
        this.metadata = metadataEntity;
    }
    /**
     * Update AuthorityMetadataEntity with new endpoints and return where the information came from
     * @param metadataEntity
     */
    async updateEndpointMetadata(metadataEntity) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateEndpointMetadata, this.correlationId);
        this.logger.verbose("Attempting to get endpoint metadata from authority configuration");
        let metadata = this.getEndpointMetadataFromConfig();
        if (metadata) {
            this.logger.verbose("Found endpoint metadata in authority configuration");
            metadataEntity.updateEndpointMetadata(metadata, false);
            return AuthorityMetadataSource.CONFIG;
        }
        this.logger.verbose("Did not find endpoint metadata in the config... Attempting to get endpoint metadata from the hardcoded values.");
        // skipAuthorityMetadataCache is used to bypass hardcoded authority metadata and force a network metadata cache lookup and network metadata request if no cached response is available.
        if (this.authorityOptions.skipAuthorityMetadataCache) {
            this.logger.verbose("Skipping hardcoded metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get endpoint metadata from the network metadata cache.");
        }
        else {
            let hardcodedMetadata = this.getEndpointMetadataFromHardcodedValues();
            if (hardcodedMetadata) {
                this.logger.verbose("Found endpoint metadata from hardcoded values.");
                // If the user prefers to use an azure region replace the global endpoints with regional information.
                if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
                    this.logger.verbose("Found azure region configuration. Updating endpoints with regional information.");
                    hardcodedMetadata =
                        await this.updateMetadataWithRegionalInformation(hardcodedMetadata);
                }
                metadataEntity.updateEndpointMetadata(hardcodedMetadata, false);
                return AuthorityMetadataSource.HARDCODED_VALUES;
            }
            else {
                this.logger.verbose("Did not find endpoint metadata in hardcoded values... Attempting to get endpoint metadata from the network metadata cache.");
            }
        }
        // Check cached metadata entity expiration status
        const metadataEntityExpired = metadataEntity.isExpired();
        if (this.isAuthoritySameType(metadataEntity) &&
            metadataEntity.endpointsFromNetwork &&
            !metadataEntityExpired) {
            // No need to update
            this.logger.verbose("Found endpoint metadata in the cache.");
            return AuthorityMetadataSource.CACHE;
        }
        else if (metadataEntityExpired) {
            this.logger.verbose("The metadata entity is expired.");
        }
        this.logger.verbose("Did not find cached endpoint metadata... Attempting to get endpoint metadata from the network.");
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
        metadata = await this.getEndpointMetadataFromNetwork();
        if (metadata) {
            this.logger.verbose("Endpoint metadata was successfully returned from getEndpointMetadataFromNetwork()");
            // If the user prefers to use an azure region replace the global endpoints with regional information.
            if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
                this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
                this.logger.verbose("Found azure region configuration. Updating endpoints with regional information.");
                metadata = await this.updateMetadataWithRegionalInformation(metadata);
            }
            metadataEntity.updateEndpointMetadata(metadata, true);
            return AuthorityMetadataSource.NETWORK;
        }
        else {
            // Metadata could not be obtained from the config, cache, network or hardcoded values
            this.logger.error("Did not find endpoint metadata from network... Metadata could not be obtained from config, cache, network or hardcoded values. Throwing Untrusted Authority Error.");
            throw ClientAuthError.createUnableToGetOpenidConfigError(this.defaultOpenIdConfigurationEndpoint);
        }
    }
    /**
     * Compares the number of url components after the domain to determine if the cached
     * authority metadata can be used for the requested authority. Protects against same domain different
     * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
     * @param metadataEntity
     */
    isAuthoritySameType(metadataEntity) {
        const cachedAuthorityUrl = new UrlString(metadataEntity.canonical_authority);
        const cachedParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        return (cachedParts.length ===
            this.canonicalAuthorityUrlComponents.PathSegments.length);
    }
    /**
     * Parse authorityMetadata config option
     */
    getEndpointMetadataFromConfig() {
        if (this.authorityOptions.authorityMetadata) {
            try {
                return JSON.parse(this.authorityOptions.authorityMetadata);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidAuthorityMetadataError();
            }
        }
        return null;
    }
    /**
     * Gets OAuth endpoints from the given OpenID configuration endpoint.
     *
     * @param hasHardcodedMetadata boolean
     */
    async getEndpointMetadataFromNetwork() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
        const perfEvent = this.performanceClient?.startMeasurement(PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
        const options = {};
        /*
         * TODO: Add a timeout if the authority exists in our library's
         * hardcoded list of metadata
         */
        const openIdConfigurationEndpoint = this.defaultOpenIdConfigurationEndpoint;
        this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: attempting to retrieve OAuth endpoints from ${openIdConfigurationEndpoint}`);
        try {
            const response = await this.networkInterface.sendGetRequestAsync(openIdConfigurationEndpoint, options);
            const isValidResponse = isOpenIdConfigResponse(response.body);
            if (isValidResponse) {
                perfEvent?.end({ success: true });
                return response.body;
            }
            else {
                perfEvent?.end({
                    success: false,
                    errorCode: "invalid_response",
                });
                this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: could not parse response as OpenID configuration`);
                return null;
            }
        }
        catch (e) {
            perfEvent?.end({
                success: false,
                errorCode: "request_failure",
            });
            this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: ${e}`);
            return null;
        }
    }
    /**
     * Get OAuth endpoints for common authorities.
     */
    getEndpointMetadataFromHardcodedValues() {
        if (this.canonicalAuthority in EndpointMetadata) {
            return EndpointMetadata[this.canonicalAuthority];
        }
        return null;
    }
    /**
     * Update the retrieved metadata with regional information.
     * User selected Azure region will be used if configured.
     */
    async updateMetadataWithRegionalInformation(metadata) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
        const userConfiguredAzureRegion = this.authorityOptions.azureRegionConfiguration?.azureRegion;
        if (userConfiguredAzureRegion) {
            if (userConfiguredAzureRegion !==
                Constants.AZURE_REGION_AUTO_DISCOVER_FLAG) {
                this.regionDiscoveryMetadata.region_outcome =
                    RegionDiscoveryOutcomes.CONFIGURED_NO_AUTO_DETECTION;
                this.regionDiscoveryMetadata.region_used =
                    userConfiguredAzureRegion;
                return Authority.replaceWithRegionalInformation(metadata, userConfiguredAzureRegion);
            }
            this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryDetectRegion, this.correlationId);
            const autodetectedRegionName = await this.regionDiscovery.detectRegion(this.authorityOptions.azureRegionConfiguration
                ?.environmentRegion, this.regionDiscoveryMetadata);
            if (autodetectedRegionName) {
                this.regionDiscoveryMetadata.region_outcome =
                    RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_SUCCESSFUL;
                this.regionDiscoveryMetadata.region_used =
                    autodetectedRegionName;
                return Authority.replaceWithRegionalInformation(metadata, autodetectedRegionName);
            }
            this.regionDiscoveryMetadata.region_outcome =
                RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_FAILED;
        }
        return metadata;
    }
    /**
     * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache
     * and returns where the information was retrieved from
     * @param metadataEntity
     * @returns AuthorityMetadataSource
     */
    async updateCloudDiscoveryMetadata(metadataEntity) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateCloudDiscoveryMetadata, this.correlationId);
        this.logger.verbose("Attempting to get cloud discovery metadata  from authority configuration");
        this.logger.verbosePii(`Known Authorities: ${this.authorityOptions.knownAuthorities ||
            Constants.NOT_APPLICABLE}`);
        this.logger.verbosePii(`Authority Metadata: ${this.authorityOptions.authorityMetadata ||
            Constants.NOT_APPLICABLE}`);
        this.logger.verbosePii(`Canonical Authority: ${metadataEntity.canonical_authority || Constants.NOT_APPLICABLE}`);
        let metadata = this.getCloudDiscoveryMetadataFromConfig();
        if (metadata) {
            this.logger.verbose("Found cloud discovery metadata in authority configuration");
            metadataEntity.updateCloudDiscoveryMetadata(metadata, false);
            return AuthorityMetadataSource.CONFIG;
        }
        // If the cached metadata came from config but that config was not passed to this instance, we must go to hardcoded values
        this.logger.verbose("Did not find cloud discovery metadata in the config... Attempting to get cloud discovery metadata from the hardcoded values.");
        if (this.options.skipAuthorityMetadataCache) {
            this.logger.verbose("Skipping hardcoded cloud discovery metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get cloud discovery metadata from the network metadata cache.");
        }
        else {
            const hardcodedMetadata = this.getCloudDiscoveryMetadataFromHardcodedValues();
            if (hardcodedMetadata) {
                this.logger.verbose("Found cloud discovery metadata from hardcoded values.");
                metadataEntity.updateCloudDiscoveryMetadata(hardcodedMetadata, false);
                return AuthorityMetadataSource.HARDCODED_VALUES;
            }
            this.logger.verbose("Did not find cloud discovery metadata in hardcoded values... Attempting to get cloud discovery metadata from the network metadata cache.");
        }
        const metadataEntityExpired = metadataEntity.isExpired();
        if (this.isAuthoritySameType(metadataEntity) &&
            metadataEntity.aliasesFromNetwork &&
            !metadataEntityExpired) {
            this.logger.verbose("Found cloud discovery metadata in the cache.");
            // No need to update
            return AuthorityMetadataSource.CACHE;
        }
        else if (metadataEntityExpired) {
            this.logger.verbose("The metadata entity is expired.");
        }
        this.logger.verbose("Did not find cloud discovery metadata in the cache... Attempting to get cloud discovery metadata from the network.");
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.correlationId);
        metadata = await this.getCloudDiscoveryMetadataFromNetwork();
        if (metadata) {
            this.logger.verbose("cloud discovery metadata was successfully returned from getCloudDiscoveryMetadataFromNetwork()");
            metadataEntity.updateCloudDiscoveryMetadata(metadata, true);
            return AuthorityMetadataSource.NETWORK;
        }
        // Metadata could not be obtained from the config, cache, network or hardcoded values
        this.logger.error("Did not find cloud discovery metadata from network... Metadata could not be obtained from config, cache, network or hardcoded values. Throwing Untrusted Authority Error.");
        throw ClientConfigurationError.createUntrustedAuthorityError();
    }
    /**
     * Parse cloudDiscoveryMetadata config or check knownAuthorities
     */
    getCloudDiscoveryMetadataFromConfig() {
        // CIAM does not support cloud discovery metadata
        if (this.authorityType === AuthorityType.Ciam) {
            this.logger.verbose("CIAM authorities do not support cloud discovery metadata, generate the aliases from authority host.");
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        // Check if network response was provided in config
        if (this.authorityOptions.cloudDiscoveryMetadata) {
            this.logger.verbose("The cloud discovery metadata has been provided as a network response, in the config.");
            try {
                this.logger.verbose("Attempting to parse the cloud discovery metadata.");
                const parsedResponse = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata);
                const metadata = Authority.getCloudDiscoveryMetadataFromNetworkResponse(parsedResponse.metadata, this.hostnameAndPort);
                this.logger.verbose("Parsed the cloud discovery metadata.");
                if (metadata) {
                    this.logger.verbose("There is returnable metadata attached to the parsed cloud discovery metadata.");
                    return metadata;
                }
                else {
                    this.logger.verbose("There is no metadata attached to the parsed cloud discovery metadata.");
                }
            }
            catch (e) {
                this.logger.verbose("Unable to parse the cloud discovery metadata. Throwing Invalid Cloud Discovery Metadata Error.");
                throw ClientConfigurationError.createInvalidCloudDiscoveryMetadataError();
            }
        }
        // If cloudDiscoveryMetadata is empty or does not contain the host, check knownAuthorities
        if (this.isInKnownAuthorities()) {
            this.logger.verbose("The host is included in knownAuthorities. Creating new cloud discovery metadata from the host.");
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return null;
    }
    /**
     * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
     *
     * @param hasHardcodedMetadata boolean
     */
    async getCloudDiscoveryMetadataFromNetwork() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.correlationId);
        const instanceDiscoveryEndpoint = `${Constants.AAD_INSTANCE_DISCOVERY_ENDPT}${this.canonicalAuthority}oauth2/v2.0/authorize`;
        const options = {};
        /*
         * TODO: Add a timeout if the authority exists in our library's
         * hardcoded list of metadata
         */
        let match = null;
        try {
            const response = await this.networkInterface.sendGetRequestAsync(instanceDiscoveryEndpoint, options);
            let typedResponseBody;
            let metadata;
            if (isCloudInstanceDiscoveryResponse(response.body)) {
                typedResponseBody =
                    response.body;
                metadata = typedResponseBody.metadata;
                this.logger.verbosePii(`tenant_discovery_endpoint is: ${typedResponseBody.tenant_discovery_endpoint}`);
            }
            else if (isCloudInstanceDiscoveryErrorResponse(response.body)) {
                this.logger.warning(`A CloudInstanceDiscoveryErrorResponse was returned. The cloud instance discovery network request's status code is: ${response.status}`);
                typedResponseBody =
                    response.body;
                if (typedResponseBody.error === Constants.INVALID_INSTANCE) {
                    this.logger.error("The CloudInstanceDiscoveryErrorResponse error is invalid_instance.");
                    return null;
                }
                this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error is ${typedResponseBody.error}`);
                this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error description is ${typedResponseBody.error_description}`);
                this.logger.warning("Setting the value of the CloudInstanceDiscoveryMetadata (returned from the network) to []");
                metadata = [];
            }
            else {
                this.logger.error("AAD did not return a CloudInstanceDiscoveryResponse or CloudInstanceDiscoveryErrorResponse");
                return null;
            }
            this.logger.verbose("Attempting to find a match between the developer's authority and the CloudInstanceDiscoveryMetadata returned from the network request.");
            match = Authority.getCloudDiscoveryMetadataFromNetworkResponse(metadata, this.hostnameAndPort);
        }
        catch (error) {
            if (error instanceof AuthError) {
                this.logger.error(`There was a network error while attempting to get the cloud discovery instance metadata.\nError: ${error.errorCode}\nError Description: ${error.errorMessage}`);
            }
            else {
                const typedError = error;
                this.logger.error(`A non-MSALJS error was thrown while attempting to get the cloud instance discovery metadata.\nError: ${typedError.name}\nError Description: ${typedError.message}`);
            }
            return null;
        }
        // Custom Domain scenario, host is trusted because Instance Discovery call succeeded
        if (!match) {
            this.logger.warning("The developer's authority was not found within the CloudInstanceDiscoveryMetadata returned from the network request.");
            this.logger.verbose("Creating custom Authority for custom domain scenario.");
            match = Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return match;
    }
    /**
     * Get cloud discovery metadata for common authorities
     */
    getCloudDiscoveryMetadataFromHardcodedValues() {
        if (this.canonicalAuthority in InstanceDiscoveryMetadata) {
            const hardcodedMetadataResponse = InstanceDiscoveryMetadata[this.canonicalAuthority];
            const metadata = Authority.getCloudDiscoveryMetadataFromNetworkResponse(hardcodedMetadataResponse.metadata, this.hostnameAndPort);
            return metadata;
        }
        return null;
    }
    /**
     * Helper function to determine if this host is included in the knownAuthorities config option
     */
    isInKnownAuthorities() {
        const matches = this.authorityOptions.knownAuthorities.filter((authority) => {
            return (UrlString.getDomainFromUrl(authority).toLowerCase() ===
                this.hostnameAndPort);
        });
        return matches.length > 0;
    }
    /**
     * helper function to populate the authority based on azureCloudOptions
     * @param authorityString
     * @param azureCloudOptions
     */
    static generateAuthority(authorityString, azureCloudOptions) {
        let authorityAzureCloudInstance;
        if (azureCloudOptions &&
            azureCloudOptions.azureCloudInstance !== AzureCloudInstance.None) {
            const tenant = azureCloudOptions.tenant
                ? azureCloudOptions.tenant
                : Constants.DEFAULT_COMMON_TENANT;
            authorityAzureCloudInstance = `${azureCloudOptions.azureCloudInstance}/${tenant}/`;
        }
        return authorityAzureCloudInstance
            ? authorityAzureCloudInstance
            : authorityString;
    }
    /**
     * Creates cloud discovery metadata object from a given host
     * @param host
     */
    static createCloudDiscoveryMetadataFromHost(host) {
        return {
            preferred_network: host,
            preferred_cache: host,
            aliases: [host],
        };
    }
    /**
     * Searches instance discovery network response for the entry that contains the host in the aliases list
     * @param response
     * @param authority
     */
    static getCloudDiscoveryMetadataFromNetworkResponse(response, authority) {
        for (let i = 0; i < response.length; i++) {
            const metadata = response[i];
            if (metadata.aliases.indexOf(authority) > -1) {
                return metadata;
            }
        }
        return null;
    }
    /**
     * helper function to generate environment from authority object
     */
    getPreferredCache() {
        if (this.discoveryComplete()) {
            return this.metadata.preferred_cache;
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * Returns whether or not the provided host is an alias of this authority instance
     * @param host
     */
    isAlias(host) {
        return this.metadata.aliases.indexOf(host) > -1;
    }
    /**
     * Returns whether or not the provided host is an alias of a known Microsoft authority for purposes of endpoint discovery
     * @param host
     */
    isAliasOfKnownMicrosoftAuthority(host) {
        return InstanceDiscoveryMetadataAliases.has(host);
    }
    /**
     * Checks whether the provided host is that of a public cloud authority
     *
     * @param authority string
     * @returns bool
     */
    static isPublicCloudAuthority(host) {
        return Constants.KNOWN_PUBLIC_CLOUDS.indexOf(host) >= 0;
    }
    /**
     * Rebuild the authority string with the region
     *
     * @param host string
     * @param region string
     */
    static buildRegionalAuthorityString(host, region, queryString) {
        // Create and validate a Url string object with the initial authority string
        const authorityUrlInstance = new UrlString(host);
        authorityUrlInstance.validateAsUri();
        const authorityUrlParts = authorityUrlInstance.getUrlComponents();
        let hostNameAndPort = `${region}.${authorityUrlParts.HostNameAndPort}`;
        if (this.isPublicCloudAuthority(authorityUrlParts.HostNameAndPort)) {
            hostNameAndPort = `${region}.${Constants.REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX}`;
        }
        // Include the query string portion of the url
        const url = UrlString.constructAuthorityUriFromObject({
            ...authorityUrlInstance.getUrlComponents(),
            HostNameAndPort: hostNameAndPort,
        }).urlString;
        // Add the query string if a query string was provided
        if (queryString)
            return `${url}?${queryString}`;
        return url;
    }
    /**
     * Replace the endpoints in the metadata object with their regional equivalents.
     *
     * @param metadata OpenIdConfigResponse
     * @param azureRegion string
     */
    static replaceWithRegionalInformation(metadata, azureRegion) {
        const regionalMetadata = { ...metadata };
        regionalMetadata.authorization_endpoint =
            Authority.buildRegionalAuthorityString(regionalMetadata.authorization_endpoint, azureRegion);
        // TODO: Enquire on whether we should leave the query string or remove it before releasing the feature
        regionalMetadata.token_endpoint =
            Authority.buildRegionalAuthorityString(regionalMetadata.token_endpoint, azureRegion, Constants.REGIONAL_AUTH_NON_MSI_QUERY_STRING);
        if (regionalMetadata.end_session_endpoint) {
            regionalMetadata.end_session_endpoint =
                Authority.buildRegionalAuthorityString(regionalMetadata.end_session_endpoint, azureRegion);
        }
        return regionalMetadata;
    }
    /**
     * Transform CIAM_AUTHORIY as per the below rules:
     * If no path segments found and it is a CIAM authority (hostname ends with .ciamlogin.com), then transform it
     *
     * NOTE: The transformation path should go away once STS supports CIAM with the format: `tenantIdorDomain.ciamlogin.com`
     * `ciamlogin.com` can also change in the future and we should accommodate the same
     *
     * @param authority
     */
    static transformCIAMAuthority(authority) {
        let ciamAuthority = authority.endsWith(Constants.FORWARD_SLASH)
            ? authority
            : `${authority}${Constants.FORWARD_SLASH}`;
        const authorityUrl = new UrlString(authority);
        const authorityUrlComponents = authorityUrl.getUrlComponents();
        // check if transformation is needed
        if (authorityUrlComponents.PathSegments.length === 0 &&
            authorityUrlComponents.HostNameAndPort.endsWith(Constants.CIAM_AUTH_URL)) {
            const tenantIdOrDomain = authorityUrlComponents.HostNameAndPort.split(".")[0];
            ciamAuthority = `${ciamAuthority}${tenantIdOrDomain}${Constants.AAD_TENANT_DOMAIN_SUFFIX}`;
        }
        return ciamAuthority;
    }
}
// Reserved tenant domain names that will not be replaced with tenant id
Authority.reservedTenantDomains = new Set([
    "{tenant}",
    "{tenantid}",
    AADAuthorityConstants.COMMON,
    AADAuthorityConstants.CONSUMERS,
    AADAuthorityConstants.ORGANIZATIONS,
]);

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class AuthorityFactory {
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Also performs endpoint discovery.
     *
     * @param authorityUri
     * @param networkClient
     * @param protocolMode
     */
    static async createDiscoveredInstance(authorityUri, networkClient, cacheManager, authorityOptions, logger, performanceClient, correlationId) {
        performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityFactoryCreateDiscoveredInstance, correlationId);
        const authorityUriFinal = Authority.transformCIAMAuthority(authorityUri);
        // Initialize authority and perform discovery endpoint check.
        const acquireTokenAuthority = AuthorityFactory.createInstance(authorityUriFinal, networkClient, cacheManager, authorityOptions, logger, performanceClient, correlationId);
        try {
            performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityResolveEndpointsAsync, correlationId);
            await acquireTokenAuthority.resolveEndpointsAsync();
            return acquireTokenAuthority;
        }
        catch (e) {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError(e);
        }
    }
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Does not perform endpoint discovery.
     *
     * @param authorityUrl
     * @param networkInterface
     * @param protocolMode
     */
    static createInstance(authorityUrl, networkInterface, cacheManager, authorityOptions, logger, performanceClient, correlationId) {
        // Throw error if authority url is empty
        if (!authorityUrl) {
            throw ClientConfigurationError.createUrlEmptyError();
        }
        return new Authority(authorityUrl, networkInterface, cacheManager, authorityOptions, logger, performanceClient, correlationId);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ServerTelemetryEntity {
    constructor() {
        this.failedRequests = [];
        this.errors = [];
        this.cacheHits = 0;
    }
    /**
     * validates if a given cache entry is "Telemetry", parses <key,value>
     * @param key
     * @param entity
     */
    static isServerTelemetryEntity(key, entity) {
        const validateKey = key.indexOf(SERVER_TELEM_CONSTANTS.CACHE_KEY) === 0;
        let validateEntity = true;
        if (entity) {
            validateEntity =
                entity.hasOwnProperty("failedRequests") &&
                    entity.hasOwnProperty("errors") &&
                    entity.hasOwnProperty("cacheHits");
        }
        return validateKey && validateEntity;
    }
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const StubbedNetworkModule = {
    sendGetRequestAsync: () => {
        const notImplErr = "Network interface - sendGetRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    },
    sendPostRequestAsync: () => {
        const notImplErr = "Network interface - sendPostRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    },
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
const JoseHeaderErrorMessage = {
    missingKidError: {
        code: "missing_kid_error",
        desc: "The JOSE Header for the requested JWT, JWS or JWK object requires a keyId to be configured as the 'kid' header claim. No 'kid' value was provided.",
    },
    missingAlgError: {
        code: "missing_alg_error",
        desc: "The JOSE Header for the requested JWT, JWS or JWK object requires an algorithm to be specified as the 'alg' header claim. No 'alg' value was provided.",
    },
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
class JoseHeaderError extends AuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "JoseHeaderError";
        Object.setPrototypeOf(this, JoseHeaderError.prototype);
    }
    /**
     * Creates an error thrown when keyId isn't set on JOSE header.
     */
    static createMissingKidError() {
        return new JoseHeaderError(JoseHeaderErrorMessage.missingKidError.code, JoseHeaderErrorMessage.missingKidError.desc);
    }
    /**
     * Creates an error thrown when algorithm isn't set on JOSE header.
     */
    static createMissingAlgError() {
        return new JoseHeaderError(JoseHeaderErrorMessage.missingAlgError.code, JoseHeaderErrorMessage.missingAlgError.desc);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class JoseHeader {
    constructor(options) {
        this.typ = options.typ;
        this.alg = options.alg;
        this.kid = options.kid;
    }
    /**
     * Builds SignedHttpRequest formatted JOSE Header from the
     * JOSE Header options provided or previously set on the object and returns
     * the stringified header object.
     * Throws if keyId or algorithm aren't provided since they are required for Access Token Binding.
     * @param shrHeaderOptions
     * @returns
     */
    static getShrHeaderString(shrHeaderOptions) {
        // KeyID is required on the SHR header
        if (!shrHeaderOptions.kid) {
            throw JoseHeaderError.createMissingKidError();
        }
        // Alg is required on the SHR header
        if (!shrHeaderOptions.alg) {
            throw JoseHeaderError.createMissingAlgError();
        }
        const shrHeader = new JoseHeader({
            // Access Token PoP headers must have type pop, but the type header can be overriden for special cases
            typ: shrHeaderOptions.typ || JsonTypes.Pop,
            kid: shrHeaderOptions.kid,
            alg: shrHeaderOptions.alg,
        });
        return JSON.stringify(shrHeader);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This is a helper class that parses supported HTTP response authentication headers to extract and return
 * header challenge values that can be used outside the basic authorization flows.
 */
class AuthenticationHeaderParser {
    constructor(headers) {
        this.headers = headers;
    }
    /**
     * This method parses the SHR nonce value out of either the Authentication-Info or WWW-Authenticate authentication headers.
     * @returns
     */
    getShrNonce() {
        // Attempt to parse nonce from Authentiacation-Info
        const authenticationInfo = this.headers[HeaderNames.AuthenticationInfo];
        if (authenticationInfo) {
            const authenticationInfoChallenges = this.parseChallenges(authenticationInfo);
            if (authenticationInfoChallenges.nextnonce) {
                return authenticationInfoChallenges.nextnonce;
            }
            throw ClientConfigurationError.createInvalidAuthenticationHeaderError(HeaderNames.AuthenticationInfo, "nextnonce challenge is missing.");
        }
        // Attempt to parse nonce from WWW-Authenticate
        const wwwAuthenticate = this.headers[HeaderNames.WWWAuthenticate];
        if (wwwAuthenticate) {
            const wwwAuthenticateChallenges = this.parseChallenges(wwwAuthenticate);
            if (wwwAuthenticateChallenges.nonce) {
                return wwwAuthenticateChallenges.nonce;
            }
            throw ClientConfigurationError.createInvalidAuthenticationHeaderError(HeaderNames.WWWAuthenticate, "nonce challenge is missing.");
        }
        // If neither header is present, throw missing headers error
        throw ClientConfigurationError.createMissingNonceAuthenticationHeadersError();
    }
    /**
     * Parses an HTTP header's challenge set into a key/value map.
     * @param header
     * @returns
     */
    parseChallenges(header) {
        const schemeSeparator = header.indexOf(" ");
        const challenges = header.substr(schemeSeparator + 1).split(",");
        const challengeMap = {};
        challenges.forEach((challenge) => {
            const [key, value] = challenge.split("=");
            // Remove escaped quotation marks (', ") from challenge string to keep only the challenge value
            challengeMap[key] = unescape(value.replace(/['"]+/g, Constants.EMPTY_STRING));
        });
        return challengeMap;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/** @internal */
class ServerTelemetryManager {
    constructor(telemetryRequest, cacheManager) {
        this.cacheOutcome = CacheOutcome.NO_CACHE_HIT;
        this.cacheManager = cacheManager;
        this.apiId = telemetryRequest.apiId;
        this.correlationId = telemetryRequest.correlationId;
        this.wrapperSKU = telemetryRequest.wrapperSKU || Constants.EMPTY_STRING;
        this.wrapperVer = telemetryRequest.wrapperVer || Constants.EMPTY_STRING;
        this.telemetryCacheKey =
            SERVER_TELEM_CONSTANTS.CACHE_KEY +
                Separators.CACHE_KEY_SEPARATOR +
                telemetryRequest.clientId;
    }
    /**
     * API to add MSER Telemetry to request
     */
    generateCurrentRequestHeaderValue() {
        const request = `${this.apiId}${SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR}${this.cacheOutcome}`;
        const platformFields = [this.wrapperSKU, this.wrapperVer].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const regionDiscoveryFields = this.getRegionDiscoveryFields();
        const requestWithRegionDiscoveryFields = [
            request,
            regionDiscoveryFields,
        ].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [
            SERVER_TELEM_CONSTANTS.SCHEMA_VERSION,
            requestWithRegionDiscoveryFields,
            platformFields,
        ].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    }
    /**
     * API to add MSER Telemetry for the last failed request
     */
    generateLastRequestHeaderValue() {
        const lastRequests = this.getLastRequests();
        const maxErrors = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        const failedRequests = lastRequests.failedRequests
            .slice(0, 2 * maxErrors)
            .join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const errors = lastRequests.errors
            .slice(0, maxErrors)
            .join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const errorCount = lastRequests.errors.length;
        // Indicate whether this header contains all data or partial data
        const overflow = maxErrors < errorCount
            ? SERVER_TELEM_CONSTANTS.OVERFLOW_TRUE
            : SERVER_TELEM_CONSTANTS.OVERFLOW_FALSE;
        const platformFields = [errorCount, overflow].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [
            SERVER_TELEM_CONSTANTS.SCHEMA_VERSION,
            lastRequests.cacheHits,
            failedRequests,
            errors,
            platformFields,
        ].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    }
    /**
     * API to cache token failures for MSER data capture
     * @param error
     */
    cacheFailedRequest(error) {
        const lastRequests = this.getLastRequests();
        if (lastRequests.errors.length >=
            SERVER_TELEM_CONSTANTS.MAX_CACHED_ERRORS) {
            // Remove a cached error to make room, first in first out
            lastRequests.failedRequests.shift(); // apiId
            lastRequests.failedRequests.shift(); // correlationId
            lastRequests.errors.shift();
        }
        lastRequests.failedRequests.push(this.apiId, this.correlationId);
        if (error instanceof Error && !!error && error.toString()) {
            if (error instanceof AuthError) {
                if (error.subError) {
                    lastRequests.errors.push(error.subError);
                }
                else if (error.errorCode) {
                    lastRequests.errors.push(error.errorCode);
                }
                else {
                    lastRequests.errors.push(error.toString());
                }
            }
            else {
                lastRequests.errors.push(error.toString());
            }
        }
        else {
            lastRequests.errors.push(SERVER_TELEM_CONSTANTS.UNKNOWN_ERROR);
        }
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return;
    }
    /**
     * Update server telemetry cache entry by incrementing cache hit counter
     */
    incrementCacheHits() {
        const lastRequests = this.getLastRequests();
        lastRequests.cacheHits += 1;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return lastRequests.cacheHits;
    }
    /**
     * Get the server telemetry entity from cache or initialize a new one
     */
    getLastRequests() {
        const initialValue = new ServerTelemetryEntity();
        const lastRequests = this.cacheManager.getServerTelemetry(this.telemetryCacheKey);
        return lastRequests || initialValue;
    }
    /**
     * Remove server telemetry cache entry
     */
    clearTelemetryCache() {
        const lastRequests = this.getLastRequests();
        const numErrorsFlushed = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        const errorCount = lastRequests.errors.length;
        if (numErrorsFlushed === errorCount) {
            // All errors were sent on last request, clear Telemetry cache
            this.cacheManager.removeItem(this.telemetryCacheKey);
        }
        else {
            // Partial data was flushed to server, construct a new telemetry cache item with errors that were not flushed
            const serverTelemEntity = new ServerTelemetryEntity();
            serverTelemEntity.failedRequests =
                lastRequests.failedRequests.slice(numErrorsFlushed * 2); // failedRequests contains 2 items for each error
            serverTelemEntity.errors =
                lastRequests.errors.slice(numErrorsFlushed);
            this.cacheManager.setServerTelemetry(this.telemetryCacheKey, serverTelemEntity);
        }
    }
    /**
     * Returns the maximum number of errors that can be flushed to the server in the next network request
     * @param serverTelemetryEntity
     */
    static maxErrorsToSend(serverTelemetryEntity) {
        let i;
        let maxErrors = 0;
        let dataSize = 0;
        const errorCount = serverTelemetryEntity.errors.length;
        for (i = 0; i < errorCount; i++) {
            // failedRequests parameter contains pairs of apiId and correlationId, multiply index by 2 to preserve pairs
            const apiId = serverTelemetryEntity.failedRequests[2 * i] ||
                Constants.EMPTY_STRING;
            const correlationId = serverTelemetryEntity.failedRequests[2 * i + 1] ||
                Constants.EMPTY_STRING;
            const errorCode = serverTelemetryEntity.errors[i] || Constants.EMPTY_STRING;
            // Count number of characters that would be added to header, each character is 1 byte. Add 3 at the end to account for separators
            dataSize +=
                apiId.toString().length +
                    correlationId.toString().length +
                    errorCode.length +
                    3;
            if (dataSize < SERVER_TELEM_CONSTANTS.MAX_LAST_HEADER_BYTES) {
                // Adding this entry to the header would still keep header size below the limit
                maxErrors += 1;
            }
            else {
                break;
            }
        }
        return maxErrors;
    }
    /**
     * Get the region discovery fields
     *
     * @returns string
     */
    getRegionDiscoveryFields() {
        const regionDiscoveryFields = [];
        regionDiscoveryFields.push(this.regionUsed || Constants.EMPTY_STRING);
        regionDiscoveryFields.push(this.regionSource || Constants.EMPTY_STRING);
        regionDiscoveryFields.push(this.regionOutcome || Constants.EMPTY_STRING);
        return regionDiscoveryFields.join(",");
    }
    /**
     * Update the region discovery metadata
     *
     * @param regionDiscoveryMetadata
     * @returns void
     */
    updateRegionDiscoveryMetadata(regionDiscoveryMetadata) {
        this.regionUsed = regionDiscoveryMetadata.region_used;
        this.regionSource = regionDiscoveryMetadata.region_source;
        this.regionOutcome = regionDiscoveryMetadata.region_outcome;
    }
    /**
     * Set cache outcome
     */
    setCacheOutcome(cacheOutcome) {
        this.cacheOutcome = cacheOutcome;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class PerformanceClient {
    /**
     * Creates an instance of PerformanceClient,
     * an abstract class containing core performance telemetry logic.
     *
     * @constructor
     * @param {string} clientId Client ID of the application
     * @param {string} authority Authority used by the application
     * @param {Logger} logger Logger used by the application
     * @param {string} libraryName Name of the library
     * @param {string} libraryVersion Version of the library
     * @param {ApplicationTelemetry} applicationTelemetry application name and version
     * @param {Set<String>} intFields integer fields to be truncated
     */
    constructor(clientId, authority, logger, libraryName, libraryVersion, applicationTelemetry, intFields) {
        this.authority = authority;
        this.libraryName = libraryName;
        this.libraryVersion = libraryVersion;
        this.applicationTelemetry = applicationTelemetry;
        this.clientId = clientId;
        this.logger = logger;
        this.callbacks = new Map();
        this.eventsByCorrelationId = new Map();
        this.queueMeasurements = new Map();
        this.preQueueTimeByCorrelationId = new Map();
        this.intFields = intFields || new Set();
        for (const item of IntFields) {
            this.intFields.add(item);
        }
    }
    /**
     * Starts and returns an platform-specific implementation of IPerformanceMeasurement.
     * Note: this function can be changed to abstract at the next major version bump.
     *
     * @param {string} measureName
     * @param {string} correlationId
     * @returns {IPerformanceMeasurement}
     */
    startPerformanceMeasurement(measureName, // eslint-disable-line @typescript-eslint/no-unused-vars
    correlationId // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
        return {};
    }
    /**
     * Gets map of pre-queue times by correlation Id
     *
     * @param {PerformanceEvents} eventName
     * @param {string} correlationId
     * @returns {number}
     */
    getPreQueueTime(eventName, correlationId) {
        const preQueueEvent = this.preQueueTimeByCorrelationId.get(correlationId);
        if (!preQueueEvent) {
            this.logger.trace(`PerformanceClient.getPreQueueTime: no pre-queue times found for correlationId: ${correlationId}, unable to add queue measurement`);
            return;
        }
        else if (preQueueEvent.name !== eventName) {
            this.logger.trace(`PerformanceClient.getPreQueueTime: no pre-queue time found for ${eventName}, unable to add queue measurement`);
            return;
        }
        return preQueueEvent.time;
    }
    /**
     * Calculates the difference between current time and time when function was queued.
     * Note: It is possible to have 0 as the queue time if the current time and the queued time was the same.
     *
     * @param {number} preQueueTime
     * @param {number} currentTime
     * @returns {number}
     */
    calculateQueuedTime(preQueueTime, currentTime) {
        if (preQueueTime < 1) {
            this.logger.trace(`PerformanceClient: preQueueTime should be a positive integer and not ${preQueueTime}`);
            return 0;
        }
        if (currentTime < 1) {
            this.logger.trace(`PerformanceClient: currentTime should be a positive integer and not ${currentTime}`);
            return 0;
        }
        if (currentTime < preQueueTime) {
            this.logger.trace("PerformanceClient: currentTime is less than preQueueTime, check how time is being retrieved");
            return 0;
        }
        return currentTime - preQueueTime;
    }
    /**
     * Adds queue measurement time to QueueMeasurements array for given correlation ID.
     *
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @param {?number} queueTime
     * @param {?boolean} manuallyCompleted - indicator for manually completed queue measurements
     * @returns
     */
    addQueueMeasurement(eventName, correlationId, queueTime, manuallyCompleted) {
        if (!correlationId) {
            this.logger.trace(`PerformanceClient.addQueueMeasurement: correlationId not provided for ${eventName}, cannot add queue measurement`);
            return;
        }
        if (queueTime === 0) {
            // Possible for there to be no queue time after calculation
            this.logger.trace(`PerformanceClient.addQueueMeasurement: queue time provided for ${eventName} is ${queueTime}`);
        }
        else if (!queueTime) {
            this.logger.trace(`PerformanceClient.addQueueMeasurement: no queue time provided for ${eventName}`);
            return;
        }
        const queueMeasurement = {
            eventName,
            queueTime,
            manuallyCompleted,
        };
        // Adds to existing correlation Id if present in queueMeasurements
        const existingMeasurements = this.queueMeasurements.get(correlationId);
        if (existingMeasurements) {
            existingMeasurements.push(queueMeasurement);
            this.queueMeasurements.set(correlationId, existingMeasurements);
        }
        else {
            // Sets new correlation Id if not present in queueMeasurements
            this.logger.trace(`PerformanceClient.addQueueMeasurement: adding correlationId ${correlationId} to queue measurements`);
            const measurementArray = [queueMeasurement];
            this.queueMeasurements.set(correlationId, measurementArray);
        }
        // Delete processed pre-queue event.
        this.preQueueTimeByCorrelationId.delete(correlationId);
    }
    /**
     * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
     *
     * @param {PerformanceEvents} measureName
     * @param {?string} [correlationId]
     * @returns {InProgressPerformanceEvent}
     */
    startMeasurement(measureName, correlationId) {
        // Generate a placeholder correlation if the request does not provide one
        const eventCorrelationId = correlationId || this.generateId();
        if (!correlationId) {
            this.logger.info(`PerformanceClient: No correlation id provided for ${measureName}, generating`, eventCorrelationId);
        }
        this.logger.trace(`PerformanceClient: Performance measurement started for ${measureName}`, eventCorrelationId);
        const performanceMeasurement = this.startPerformanceMeasurement(measureName, eventCorrelationId);
        performanceMeasurement.startMeasurement();
        const inProgressEvent = {
            eventId: this.generateId(),
            status: PerformanceEventStatus.InProgress,
            authority: this.authority,
            libraryName: this.libraryName,
            libraryVersion: this.libraryVersion,
            clientId: this.clientId,
            name: measureName,
            startTimeMs: Date.now(),
            correlationId: eventCorrelationId,
            appName: this.applicationTelemetry?.appName,
            appVersion: this.applicationTelemetry?.appVersion,
        };
        // Store in progress events so they can be discarded if not ended properly
        this.cacheEventByCorrelationId(inProgressEvent);
        // Return the event and functions the caller can use to properly end/flush the measurement
        return {
            end: (event) => {
                return this.endMeasurement({
                    // Initial set of event properties
                    ...inProgressEvent,
                    // Properties set when event ends
                    ...event,
                }, performanceMeasurement);
            },
            discard: () => {
                return this.discardMeasurements(inProgressEvent.correlationId);
            },
            add: (fields) => {
                return this.addFields(fields, inProgressEvent.correlationId);
            },
            increment: (fields) => {
                return this.incrementFields(fields, inProgressEvent.correlationId);
            },
            measurement: performanceMeasurement,
            event: inProgressEvent,
        };
    }
    /**
     * Stops measuring the performance for an operation. Should only be called directly by PerformanceClient classes,
     * as consumers should instead use the function returned by startMeasurement.
     * Adds a new field named as "[event name]DurationMs" for sub-measurements, completes and emits an event
     * otherwise.
     *
     * @param {PerformanceEvent} event
     * @param {IPerformanceMeasurement} measurement
     * @returns {(PerformanceEvent | null)}
     */
    endMeasurement(event, measurement) {
        const rootEvent = this.eventsByCorrelationId.get(event.correlationId);
        if (!rootEvent) {
            this.logger.trace(`PerformanceClient: Measurement not found for ${event.eventId}`, event.correlationId);
            return null;
        }
        const isRoot = event.eventId === rootEvent.eventId;
        let queueInfo = {
            totalQueueTime: 0,
            totalQueueCount: 0,
            manuallyCompletedCount: 0,
        };
        if (isRoot) {
            queueInfo = this.getQueueInfo(event.correlationId);
            this.discardCache(rootEvent.correlationId);
        }
        else {
            rootEvent.incompleteSubMeasurements?.delete(event.eventId);
        }
        measurement?.endMeasurement();
        const durationMs = measurement?.flushMeasurement();
        // null indicates no measurement was taken (e.g. needed performance APIs not present)
        if (!durationMs) {
            this.logger.trace("PerformanceClient: Performance measurement not taken", rootEvent.correlationId);
            return null;
        }
        this.logger.trace(`PerformanceClient: Performance measurement ended for ${event.name}: ${durationMs} ms`, event.correlationId);
        // Add sub-measurement attribute to root event.
        if (!isRoot) {
            rootEvent[event.name + "DurationMs"] = Math.floor(durationMs);
            return { ...rootEvent };
        }
        let finalEvent = { ...rootEvent, ...event };
        let incompleteSubsCount = 0;
        // Incomplete sub-measurements are discarded. They are likely an instrumentation bug that should be fixed.
        finalEvent.incompleteSubMeasurements?.forEach((subMeasurement) => {
            this.logger.trace(`PerformanceClient: Incomplete submeasurement ${subMeasurement.name} found for ${event.name}`, finalEvent.correlationId);
            incompleteSubsCount++;
        });
        finalEvent.incompleteSubMeasurements = undefined;
        finalEvent = {
            ...finalEvent,
            durationMs: Math.round(durationMs),
            queuedTimeMs: queueInfo.totalQueueTime,
            queuedCount: queueInfo.totalQueueCount,
            queuedManuallyCompletedCount: queueInfo.manuallyCompletedCount,
            status: PerformanceEventStatus.Completed,
            incompleteSubsCount,
        };
        this.truncateIntegralFields(finalEvent);
        this.emitEvents([finalEvent], event.correlationId);
        return finalEvent;
    }
    /**
     * Saves extra information to be emitted when the measurements are flushed
     * @param fields
     * @param correlationId
     */
    addFields(fields, correlationId) {
        this.logger.trace("PerformanceClient: Updating static fields");
        const event = this.eventsByCorrelationId.get(correlationId);
        if (event) {
            this.eventsByCorrelationId.set(correlationId, {
                ...event,
                ...fields,
            });
        }
        else {
            this.logger.trace("PerformanceClient: Event not found for", correlationId);
        }
    }
    /**
     * Increment counters to be emitted when the measurements are flushed
     * @param fields {string[]}
     * @param correlationId {string} correlation identifier
     */
    incrementFields(fields, correlationId) {
        this.logger.trace("PerformanceClient: Updating counters");
        const event = this.eventsByCorrelationId.get(correlationId);
        if (event) {
            for (const counter in fields) {
                if (!event.hasOwnProperty(counter)) {
                    event[counter] = 0;
                }
                else if (isNaN(Number(event[counter]))) {
                    return;
                }
                event[counter] += fields[counter];
            }
        }
        else {
            this.logger.trace("PerformanceClient: Event not found for", correlationId);
        }
    }
    /**
     * Upserts event into event cache.
     * First key is the correlation id, second key is the event id.
     * Allows for events to be grouped by correlation id,
     * and to easily allow for properties on them to be updated.
     *
     * @private
     * @param {PerformanceEvent} event
     */
    cacheEventByCorrelationId(event) {
        const rootEvent = this.eventsByCorrelationId.get(event.correlationId);
        if (rootEvent) {
            this.logger.trace(`PerformanceClient: Performance measurement for ${event.name} added/updated`, event.correlationId);
            rootEvent.incompleteSubMeasurements =
                rootEvent.incompleteSubMeasurements || new Map();
            rootEvent.incompleteSubMeasurements.set(event.eventId, {
                name: event.name,
                startTimeMs: event.startTimeMs,
            });
        }
        else {
            this.logger.trace(`PerformanceClient: Performance measurement for ${event.name} started`, event.correlationId);
            this.eventsByCorrelationId.set(event.correlationId, { ...event });
        }
    }
    getQueueInfo(correlationId) {
        const queueMeasurementForCorrelationId = this.queueMeasurements.get(correlationId);
        if (!queueMeasurementForCorrelationId) {
            this.logger.trace(`PerformanceClient: no queue measurements found for for correlationId: ${correlationId}`);
        }
        let totalQueueTime = 0;
        let totalQueueCount = 0;
        let manuallyCompletedCount = 0;
        queueMeasurementForCorrelationId?.forEach((measurement) => {
            totalQueueTime += measurement.queueTime;
            totalQueueCount++;
            manuallyCompletedCount += measurement.manuallyCompleted ? 1 : 0;
        });
        return {
            totalQueueTime,
            totalQueueCount,
            manuallyCompletedCount,
        };
    }
    /**
     * Removes measurements for a given correlation id.
     *
     * @param {string} correlationId
     */
    discardMeasurements(correlationId) {
        this.logger.trace("PerformanceClient: Performance measurements discarded", correlationId);
        this.eventsByCorrelationId.delete(correlationId);
    }
    /**
     * Removes cache for a given correlation id.
     *
     * @param {string} correlationId correlation identifier
     */
    discardCache(correlationId) {
        this.discardMeasurements(correlationId);
        this.logger.trace("PerformanceClient: QueueMeasurements discarded", correlationId);
        this.queueMeasurements.delete(correlationId);
        this.logger.trace("PerformanceClient: Pre-queue times discarded", correlationId);
        this.preQueueTimeByCorrelationId.delete(correlationId);
    }
    /**
     * Registers a callback function to receive performance events.
     *
     * @param {PerformanceCallbackFunction} callback
     * @returns {string}
     */
    addPerformanceCallback(callback) {
        const callbackId = this.generateId();
        this.callbacks.set(callbackId, callback);
        this.logger.verbose(`PerformanceClient: Performance callback registered with id: ${callbackId}`);
        return callbackId;
    }
    /**
     * Removes a callback registered with addPerformanceCallback.
     *
     * @param {string} callbackId
     * @returns {boolean}
     */
    removePerformanceCallback(callbackId) {
        const result = this.callbacks.delete(callbackId);
        if (result) {
            this.logger.verbose(`PerformanceClient: Performance callback ${callbackId} removed.`);
        }
        else {
            this.logger.verbose(`PerformanceClient: Performance callback ${callbackId} not removed.`);
        }
        return result;
    }
    /**
     * Emits events to all registered callbacks.
     *
     * @param {PerformanceEvent[]} events
     * @param {?string} [correlationId]
     */
    emitEvents(events, correlationId) {
        this.logger.verbose("PerformanceClient: Emitting performance events", correlationId);
        this.callbacks.forEach((callback, callbackId) => {
            this.logger.trace(`PerformanceClient: Emitting event to callback ${callbackId}`, correlationId);
            callback.apply(null, [events]);
        });
    }
    /**
     * Enforce truncation of integral fields in performance event.
     * @param {PerformanceEvent} event performance event to update.
     * @param {Set<string>} intFields integral fields.
     */
    truncateIntegralFields(event) {
        this.intFields.forEach((key) => {
            if (key in event && typeof event[key] === "number") {
                event[key] = Math.floor(event[key]);
            }
        });
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class StubPerformanceMeasurement {
    startMeasurement() {
        return;
    }
    endMeasurement() {
        return;
    }
    flushMeasurement() {
        return null;
    }
}
class StubPerformanceClient {
    generateId() {
        return "callback-id";
    }
    startMeasurement(measureName, correlationId) {
        return {
            end: () => null,
            discard: () => { },
            add: () => { },
            increment: () => { },
            event: {
                eventId: this.generateId(),
                status: PerformanceEventStatus.InProgress,
                authority: "",
                libraryName: "",
                libraryVersion: "",
                clientId: "",
                name: measureName,
                startTimeMs: Date.now(),
                correlationId: correlationId || "",
            },
            measurement: new StubPerformanceMeasurement(),
        };
    }
    startPerformanceMeasurement() {
        return new StubPerformanceMeasurement();
    }
    calculateQueuedTime() {
        return 0;
    }
    addQueueMeasurement() {
        return;
    }
    setPreQueueTime() {
        return;
    }
    endMeasurement() {
        return null;
    }
    discardMeasurements() {
        return;
    }
    removePerformanceCallback() {
        return true;
    }
    addPerformanceCallback() {
        return "";
    }
    emitEvents() {
        return;
    }
    addFields() {
        return;
    }
    incrementFields() {
        return;
    }
    cacheEventByCorrelationId() {
        return;
    }
}

exports.AADAuthorityConstants = AADAuthorityConstants;
exports.AADServerParamKeys = AADServerParamKeys;
exports.AccessTokenEntity = AccessTokenEntity;
exports.AccountEntity = AccountEntity;
exports.AppMetadataEntity = AppMetadataEntity;
exports.AuthError = AuthError;
exports.AuthErrorMessage = AuthErrorMessage;
exports.AuthToken = AuthToken;
exports.AuthenticationHeaderParser = AuthenticationHeaderParser;
exports.AuthenticationScheme = AuthenticationScheme;
exports.Authority = Authority;
exports.AuthorityFactory = AuthorityFactory;
exports.AuthorityMetadataEntity = AuthorityMetadataEntity;
exports.AuthorityType = AuthorityType;
exports.AuthorizationCodeClient = AuthorizationCodeClient;
exports.AzureCloudInstance = AzureCloudInstance;
exports.BaseClient = BaseClient;
exports.CacheAccountType = CacheAccountType;
exports.CacheManager = CacheManager;
exports.CacheOutcome = CacheOutcome;
exports.CacheRecord = CacheRecord;
exports.CacheType = CacheType;
exports.CcsCredentialType = CcsCredentialType;
exports.ClaimsRequestKeys = ClaimsRequestKeys;
exports.ClientAuthError = ClientAuthError;
exports.ClientAuthErrorMessage = ClientAuthErrorMessage;
exports.ClientConfigurationError = ClientConfigurationError;
exports.ClientConfigurationErrorMessage = ClientConfigurationErrorMessage;
exports.CodeChallengeMethodValues = CodeChallengeMethodValues;
exports.Constants = Constants;
exports.CredentialEntity = CredentialEntity;
exports.CredentialType = CredentialType;
exports.DEFAULT_CRYPTO_IMPLEMENTATION = DEFAULT_CRYPTO_IMPLEMENTATION;
exports.DEFAULT_SYSTEM_OPTIONS = DEFAULT_SYSTEM_OPTIONS;
exports.DefaultStorageClass = DefaultStorageClass;
exports.Errors = Errors;
exports.GrantType = GrantType;
exports.HeaderNames = HeaderNames;
exports.HttpStatus = HttpStatus;
exports.IdTokenEntity = IdTokenEntity;
exports.IntFields = IntFields;
exports.InteractionRequiredAuthError = InteractionRequiredAuthError;
exports.InteractionRequiredAuthErrorMessage = InteractionRequiredAuthErrorMessage;
exports.JoseHeader = JoseHeader;
exports.Logger = Logger;
exports.NetworkManager = NetworkManager;
exports.OIDC_DEFAULT_SCOPES = OIDC_DEFAULT_SCOPES;
exports.ONE_DAY_IN_MS = ONE_DAY_IN_MS;
exports.PasswordGrantConstants = PasswordGrantConstants;
exports.PerformanceClient = PerformanceClient;
exports.PerformanceEventStatus = PerformanceEventStatus;
exports.PerformanceEvents = PerformanceEvents;
exports.PersistentCacheKeys = PersistentCacheKeys;
exports.PopTokenGenerator = PopTokenGenerator;
exports.PromptValue = PromptValue;
exports.ProtocolMode = ProtocolMode;
exports.ProtocolUtils = ProtocolUtils;
exports.RefreshTokenClient = RefreshTokenClient;
exports.RefreshTokenEntity = RefreshTokenEntity;
exports.RequestParameterBuilder = RequestParameterBuilder;
exports.ResponseHandler = ResponseHandler;
exports.ResponseMode = ResponseMode;
exports.SSOTypes = SSOTypes;
exports.ScopeSet = ScopeSet;
exports.ServerError = ServerError;
exports.ServerResponseType = ServerResponseType;
exports.ServerTelemetryEntity = ServerTelemetryEntity;
exports.ServerTelemetryManager = ServerTelemetryManager;
exports.SilentFlowClient = SilentFlowClient;
exports.StringUtils = StringUtils;
exports.StubPerformanceClient = StubPerformanceClient;
exports.StubbedNetworkModule = StubbedNetworkModule;
exports.THE_FAMILY_ID = THE_FAMILY_ID;
exports.ThrottlingConstants = ThrottlingConstants;
exports.ThrottlingEntity = ThrottlingEntity;
exports.ThrottlingUtils = ThrottlingUtils;
exports.TimeUtils = TimeUtils;
exports.TokenCacheContext = TokenCacheContext;
exports.UrlString = UrlString;
exports.buildClientInfo = buildClientInfo;
exports.buildClientInfoFromHomeAccountId = buildClientInfoFromHomeAccountId;
exports.invoke = invoke;
exports.invokeAsync = invokeAsync;
exports.version = version;
//# sourceMappingURL=index.cjs.map

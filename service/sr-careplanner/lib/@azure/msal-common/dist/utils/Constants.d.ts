export declare const Constants: {
    LIBRARY_NAME: string;
    SKU: string;
    CACHE_PREFIX: string;
    DEFAULT_AUTHORITY: string;
    DEFAULT_AUTHORITY_HOST: string;
    DEFAULT_COMMON_TENANT: string;
    ADFS: string;
    DSTS: string;
    AAD_INSTANCE_DISCOVERY_ENDPT: string;
    CIAM_AUTH_URL: string;
    AAD_TENANT_DOMAIN_SUFFIX: string;
    RESOURCE_DELIM: string;
    NO_ACCOUNT: string;
    CLAIMS: string;
    CONSUMER_UTID: string;
    OPENID_SCOPE: string;
    PROFILE_SCOPE: string;
    OFFLINE_ACCESS_SCOPE: string;
    EMAIL_SCOPE: string;
    CODE_RESPONSE_TYPE: string;
    CODE_GRANT_TYPE: string;
    RT_GRANT_TYPE: string;
    FRAGMENT_RESPONSE_MODE: string;
    S256_CODE_CHALLENGE_METHOD: string;
    URL_FORM_CONTENT_TYPE: string;
    AUTHORIZATION_PENDING: string;
    NOT_DEFINED: string;
    EMPTY_STRING: string;
    NOT_APPLICABLE: string;
    FORWARD_SLASH: string;
    IMDS_ENDPOINT: string;
    IMDS_VERSION: string;
    IMDS_TIMEOUT: number;
    AZURE_REGION_AUTO_DISCOVER_FLAG: string;
    REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: string;
    REGIONAL_AUTH_NON_MSI_QUERY_STRING: string;
    KNOWN_PUBLIC_CLOUDS: string[];
    TOKEN_RESPONSE_TYPE: string;
    ID_TOKEN_RESPONSE_TYPE: string;
    SHR_NONCE_VALIDITY: number;
    INVALID_INSTANCE: string;
};
export declare const HttpStatus: {
    readonly SUCCESS_RANGE_START: 200;
    readonly SUCCESS_RANGE_END: 299;
    readonly REDIRECT: 302;
    readonly CLIENT_ERROR_RANGE_START: 400;
    readonly CLIENT_ERROR_RANGE_END: 499;
    readonly SERVER_ERROR_RANGE_START: 500;
    readonly SERVER_ERROR_RANGE_END: 599;
};
export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];
export declare const OIDC_DEFAULT_SCOPES: string[];
export declare const OIDC_SCOPES: string[];
/**
 * Request header names
 */
export declare const HeaderNames: {
    readonly CONTENT_TYPE: "Content-Type";
    readonly RETRY_AFTER: "Retry-After";
    readonly CCS_HEADER: "X-AnchorMailbox";
    readonly WWWAuthenticate: "WWW-Authenticate";
    readonly AuthenticationInfo: "Authentication-Info";
    readonly X_MS_REQUEST_ID: "x-ms-request-id";
    readonly X_MS_HTTP_VERSION: "x-ms-httpver";
};
export type HeaderNames = (typeof HeaderNames)[keyof typeof HeaderNames];
/**
 * Persistent cache keys MSAL which stay while user is logged in.
 */
export declare const PersistentCacheKeys: {
    readonly ID_TOKEN: "idtoken";
    readonly CLIENT_INFO: "client.info";
    readonly ADAL_ID_TOKEN: "adal.idtoken";
    readonly ERROR: "error";
    readonly ERROR_DESC: "error.description";
    readonly ACTIVE_ACCOUNT: "active-account";
    readonly ACTIVE_ACCOUNT_FILTERS: "active-account-filters";
};
export type PersistentCacheKeys = (typeof PersistentCacheKeys)[keyof typeof PersistentCacheKeys];
/**
 * String constants related to AAD Authority
 */
export declare const AADAuthorityConstants: {
    readonly COMMON: "common";
    readonly ORGANIZATIONS: "organizations";
    readonly CONSUMERS: "consumers";
};
export type AADAuthorityConstants = (typeof AADAuthorityConstants)[keyof typeof AADAuthorityConstants];
/**
 * Keys in the hashParams sent by AAD Server
 */
export declare const AADServerParamKeys: {
    readonly CLIENT_ID: "client_id";
    readonly REDIRECT_URI: "redirect_uri";
    readonly RESPONSE_TYPE: "response_type";
    readonly RESPONSE_MODE: "response_mode";
    readonly GRANT_TYPE: "grant_type";
    readonly CLAIMS: "claims";
    readonly SCOPE: "scope";
    readonly ERROR: "error";
    readonly ERROR_DESCRIPTION: "error_description";
    readonly ACCESS_TOKEN: "access_token";
    readonly ID_TOKEN: "id_token";
    readonly REFRESH_TOKEN: "refresh_token";
    readonly EXPIRES_IN: "expires_in";
    readonly STATE: "state";
    readonly NONCE: "nonce";
    readonly PROMPT: "prompt";
    readonly SESSION_STATE: "session_state";
    readonly CLIENT_INFO: "client_info";
    readonly CODE: "code";
    readonly CODE_CHALLENGE: "code_challenge";
    readonly CODE_CHALLENGE_METHOD: "code_challenge_method";
    readonly CODE_VERIFIER: "code_verifier";
    readonly CLIENT_REQUEST_ID: "client-request-id";
    readonly X_CLIENT_SKU: "x-client-SKU";
    readonly X_CLIENT_VER: "x-client-VER";
    readonly X_CLIENT_OS: "x-client-OS";
    readonly X_CLIENT_CPU: "x-client-CPU";
    readonly X_CLIENT_CURR_TELEM: "x-client-current-telemetry";
    readonly X_CLIENT_LAST_TELEM: "x-client-last-telemetry";
    readonly X_MS_LIB_CAPABILITY: "x-ms-lib-capability";
    readonly X_APP_NAME: "x-app-name";
    readonly X_APP_VER: "x-app-ver";
    readonly POST_LOGOUT_URI: "post_logout_redirect_uri";
    readonly ID_TOKEN_HINT: "id_token_hint";
    readonly DEVICE_CODE: "device_code";
    readonly CLIENT_SECRET: "client_secret";
    readonly CLIENT_ASSERTION: "client_assertion";
    readonly CLIENT_ASSERTION_TYPE: "client_assertion_type";
    readonly TOKEN_TYPE: "token_type";
    readonly REQ_CNF: "req_cnf";
    readonly OBO_ASSERTION: "assertion";
    readonly REQUESTED_TOKEN_USE: "requested_token_use";
    readonly ON_BEHALF_OF: "on_behalf_of";
    readonly FOCI: "foci";
    readonly CCS_HEADER: "X-AnchorMailbox";
    readonly RETURN_SPA_CODE: "return_spa_code";
    readonly NATIVE_BROKER: "nativebroker";
    readonly LOGOUT_HINT: "logout_hint";
};
export type AADServerParamKeys = (typeof AADServerParamKeys)[keyof typeof AADServerParamKeys];
/**
 * Claims request keys
 */
export declare const ClaimsRequestKeys: {
    readonly ACCESS_TOKEN: "access_token";
    readonly XMS_CC: "xms_cc";
};
export type ClaimsRequestKeys = (typeof ClaimsRequestKeys)[keyof typeof ClaimsRequestKeys];
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
export declare const PromptValue: {
    LOGIN: string;
    SELECT_ACCOUNT: string;
    CONSENT: string;
    NONE: string;
    CREATE: string;
    NO_SESSION: string;
};
/**
 * SSO Types - generated to populate hints
 */
export declare const SSOTypes: {
    readonly ACCOUNT: "account";
    readonly SID: "sid";
    readonly LOGIN_HINT: "login_hint";
    readonly ID_TOKEN: "id_token";
    readonly DOMAIN_HINT: "domain_hint";
    readonly ORGANIZATIONS: "organizations";
    readonly CONSUMERS: "consumers";
    readonly ACCOUNT_ID: "accountIdentifier";
    readonly HOMEACCOUNT_ID: "homeAccountIdentifier";
};
export type SSOTypes = (typeof SSOTypes)[keyof typeof SSOTypes];
/**
 * allowed values for codeVerifier
 */
export declare const CodeChallengeMethodValues: {
    PLAIN: string;
    S256: string;
};
/**
 * allowed values for server response type
 */
export declare const ServerResponseType: {
    readonly QUERY: "query";
    readonly FRAGMENT: "fragment";
};
export type ServerResponseType = (typeof ServerResponseType)[keyof typeof ServerResponseType];
/**
 * allowed values for response_mode
 */
export declare const ResponseMode: {
    readonly FORM_POST: "form_post";
    readonly QUERY: "query";
    readonly FRAGMENT: "fragment";
};
export type ResponseMode = (typeof ResponseMode)[keyof typeof ResponseMode];
/**
 * allowed grant_type
 */
export declare const GrantType: {
    readonly IMPLICIT_GRANT: "implicit";
    readonly AUTHORIZATION_CODE_GRANT: "authorization_code";
    readonly CLIENT_CREDENTIALS_GRANT: "client_credentials";
    readonly RESOURCE_OWNER_PASSWORD_GRANT: "password";
    readonly REFRESH_TOKEN_GRANT: "refresh_token";
    readonly DEVICE_CODE_GRANT: "device_code";
    readonly JWT_BEARER: "urn:ietf:params:oauth:grant-type:jwt-bearer";
};
export type GrantType = (typeof GrantType)[keyof typeof GrantType];
/**
 * Account types in Cache
 */
export declare const CacheAccountType: {
    readonly MSSTS_ACCOUNT_TYPE: "MSSTS";
    readonly ADFS_ACCOUNT_TYPE: "ADFS";
    readonly MSAV1_ACCOUNT_TYPE: "MSA";
    readonly GENERIC_ACCOUNT_TYPE: "Generic";
};
export type CacheAccountType = (typeof CacheAccountType)[keyof typeof CacheAccountType];
/**
 * Separators used in cache
 */
export declare const Separators: {
    readonly CACHE_KEY_SEPARATOR: "-";
    readonly CLIENT_INFO_SEPARATOR: ".";
};
export type Separators = (typeof Separators)[keyof typeof Separators];
/**
 * Credential Type stored in the cache
 */
export declare const CredentialType: {
    readonly ID_TOKEN: "IdToken";
    readonly ACCESS_TOKEN: "AccessToken";
    readonly ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme";
    readonly REFRESH_TOKEN: "RefreshToken";
};
export type CredentialType = (typeof CredentialType)[keyof typeof CredentialType];
/**
 * Combine all cache types
 */
export declare const CacheType: {
    readonly ADFS: 1001;
    readonly MSA: 1002;
    readonly MSSTS: 1003;
    readonly GENERIC: 1004;
    readonly ACCESS_TOKEN: 2001;
    readonly REFRESH_TOKEN: 2002;
    readonly ID_TOKEN: 2003;
    readonly APP_METADATA: 3001;
    readonly UNDEFINED: 9999;
};
export type CacheType = (typeof CacheType)[keyof typeof CacheType];
/**
 * More Cache related constants
 */
export declare const APP_METADATA = "appmetadata";
export declare const CLIENT_INFO = "client_info";
export declare const THE_FAMILY_ID = "1";
export declare const AUTHORITY_METADATA_CONSTANTS: {
    CACHE_KEY: string;
    REFRESH_TIME_SECONDS: number;
};
export declare const AuthorityMetadataSource: {
    readonly CONFIG: "config";
    readonly CACHE: "cache";
    readonly NETWORK: "network";
    readonly HARDCODED_VALUES: "hardcoded_values";
};
export type AuthorityMetadataSource = (typeof AuthorityMetadataSource)[keyof typeof AuthorityMetadataSource];
export declare const SERVER_TELEM_CONSTANTS: {
    SCHEMA_VERSION: number;
    MAX_CUR_HEADER_BYTES: number;
    MAX_LAST_HEADER_BYTES: number;
    MAX_CACHED_ERRORS: number;
    CACHE_KEY: string;
    CATEGORY_SEPARATOR: string;
    VALUE_SEPARATOR: string;
    OVERFLOW_TRUE: string;
    OVERFLOW_FALSE: string;
    UNKNOWN_ERROR: string;
};
/**
 * Type of the authentication request
 */
export declare const AuthenticationScheme: {
    readonly BEARER: "Bearer";
    readonly POP: "pop";
    readonly SSH: "ssh-cert";
};
export type AuthenticationScheme = (typeof AuthenticationScheme)[keyof typeof AuthenticationScheme];
/**
 * Constants related to throttling
 */
export declare const ThrottlingConstants: {
    DEFAULT_THROTTLE_TIME_SECONDS: number;
    DEFAULT_MAX_THROTTLE_TIME_SECONDS: number;
    THROTTLING_PREFIX: string;
    X_MS_LIB_CAPABILITY_VALUE: string;
};
export declare const Errors: {
    INVALID_GRANT_ERROR: string;
    CLIENT_MISMATCH_ERROR: string;
};
/**
 * Password grant parameters
 */
export declare const PasswordGrantConstants: {
    readonly username: "username";
    readonly password: "password";
};
export type PasswordGrantConstants = (typeof PasswordGrantConstants)[keyof typeof PasswordGrantConstants];
/**
 * Response codes
 */
export declare const ResponseCodes: {
    readonly httpSuccess: 200;
    readonly httpBadRequest: 400;
};
export type ResponseCodes = (typeof ResponseCodes)[keyof typeof ResponseCodes];
/**
 * Region Discovery Sources
 */
export declare const RegionDiscoverySources: {
    readonly FAILED_AUTO_DETECTION: "1";
    readonly INTERNAL_CACHE: "2";
    readonly ENVIRONMENT_VARIABLE: "3";
    readonly IMDS: "4";
};
export type RegionDiscoverySources = (typeof RegionDiscoverySources)[keyof typeof RegionDiscoverySources];
/**
 * Region Discovery Outcomes
 */
export declare const RegionDiscoveryOutcomes: {
    readonly CONFIGURED_MATCHES_DETECTED: "1";
    readonly CONFIGURED_NO_AUTO_DETECTION: "2";
    readonly CONFIGURED_NOT_DETECTED: "3";
    readonly AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4";
    readonly AUTO_DETECTION_REQUESTED_FAILED: "5";
};
export type RegionDiscoveryOutcomes = (typeof RegionDiscoveryOutcomes)[keyof typeof RegionDiscoveryOutcomes];
export declare const CacheOutcome: {
    readonly NO_CACHE_HIT: "0";
    readonly FORCE_REFRESH: "1";
    readonly NO_CACHED_ACCESS_TOKEN: "2";
    readonly CACHED_ACCESS_TOKEN_EXPIRED: "3";
    readonly REFRESH_CACHED_ACCESS_TOKEN: "4";
};
export type CacheOutcome = (typeof CacheOutcome)[keyof typeof CacheOutcome];
export declare const JsonTypes: {
    readonly Jwt: "JWT";
    readonly Jwk: "JWK";
    readonly Pop: "pop";
};
export type JsonTypes = (typeof JsonTypes)[keyof typeof JsonTypes];
export declare const ONE_DAY_IN_MS = 86400000;
//# sourceMappingURL=Constants.d.ts.map
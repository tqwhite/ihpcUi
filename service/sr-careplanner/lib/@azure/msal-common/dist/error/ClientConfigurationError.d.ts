import { ClientAuthError } from "./ClientAuthError";
/**
 * ClientConfigurationErrorMessage class containing string constants used by error codes and messages.
 */
export declare const ClientConfigurationErrorMessage: {
    redirectUriNotSet: {
        code: string;
        desc: string;
    };
    postLogoutUriNotSet: {
        code: string;
        desc: string;
    };
    claimsRequestParsingError: {
        code: string;
        desc: string;
    };
    authorityUriInsecure: {
        code: string;
        desc: string;
    };
    urlParseError: {
        code: string;
        desc: string;
    };
    urlEmptyError: {
        code: string;
        desc: string;
    };
    emptyScopesError: {
        code: string;
        desc: string;
    };
    nonArrayScopesError: {
        code: string;
        desc: string;
    };
    clientIdSingleScopeError: {
        code: string;
        desc: string;
    };
    invalidPrompt: {
        code: string;
        desc: string;
    };
    invalidClaimsRequest: {
        code: string;
        desc: string;
    };
    tokenRequestEmptyError: {
        code: string;
        desc: string;
    };
    logoutRequestEmptyError: {
        code: string;
        desc: string;
    };
    invalidCodeChallengeMethod: {
        code: string;
        desc: string;
    };
    invalidCodeChallengeParams: {
        code: string;
        desc: string;
    };
    invalidCloudDiscoveryMetadata: {
        code: string;
        desc: string;
    };
    invalidAuthorityMetadata: {
        code: string;
        desc: string;
    };
    untrustedAuthority: {
        code: string;
        desc: string;
    };
    invalidAzureCloudInstance: {
        code: string;
        desc: string;
    };
    missingSshJwk: {
        code: string;
        desc: string;
    };
    missingSshKid: {
        code: string;
        desc: string;
    };
    missingNonceAuthenticationHeader: {
        code: string;
        desc: string;
    };
    invalidAuthenticationHeader: {
        code: string;
        desc: string;
    };
    cannotSetOIDCOptions: {
        code: string;
        desc: string;
    };
    cannotAllowNativeBroker: {
        code: string;
        desc: string;
    };
    authorityMismatch: {
        code: string;
        desc: string;
    };
};
/**
 * Error thrown when there is an error in configuration of the MSAL.js library.
 */
export declare class ClientConfigurationError extends ClientAuthError {
    constructor(errorCode: string, errorMessage?: string);
    /**
     * Creates an error thrown when the redirect uri is empty (not set by caller)
     */
    static createRedirectUriEmptyError(): ClientConfigurationError;
    /**
     * Creates an error thrown when the post-logout redirect uri is empty (not set by caller)
     */
    static createPostLogoutRedirectUriEmptyError(): ClientConfigurationError;
    /**
     * Creates an error thrown when the claims request could not be successfully parsed
     */
    static createClaimsRequestParsingError(claimsRequestParseError: string): ClientConfigurationError;
    /**
     * Creates an error thrown if authority uri is given an insecure protocol.
     * @param urlString
     */
    static createInsecureAuthorityUriError(urlString: string): ClientConfigurationError;
    /**
     * Creates an error thrown if URL string does not parse into separate segments.
     * @param urlString
     */
    static createUrlParseError(urlParseError: string): ClientConfigurationError;
    /**
     * Creates an error thrown if URL string is empty or null.
     * @param urlString
     */
    static createUrlEmptyError(): ClientConfigurationError;
    /**
     * Error thrown when scopes are empty.
     * @param scopesValue
     */
    static createEmptyScopesArrayError(): ClientConfigurationError;
    /**
     * Error thrown when client id scope is not provided as single scope.
     * @param inputScopes
     */
    static createClientIdSingleScopeError(inputScopes: Array<string>): ClientConfigurationError;
    /**
     * Error thrown when prompt is not an allowed type.
     * @param promptValue
     */
    static createInvalidPromptError(promptValue: string): ClientConfigurationError;
    /**
     * Creates error thrown when claims parameter is not a stringified JSON object
     */
    static createInvalidClaimsRequestError(): ClientConfigurationError;
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    static createEmptyLogoutRequestError(): ClientConfigurationError;
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    static createEmptyTokenRequestError(): ClientConfigurationError;
    /**
     * Throws error when an invalid code_challenge_method is passed by the user
     */
    static createInvalidCodeChallengeMethodError(): ClientConfigurationError;
    /**
     * Throws error when both params: code_challenge and code_challenge_method are not passed together
     */
    static createInvalidCodeChallengeParamsError(): ClientConfigurationError;
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    static createInvalidCloudDiscoveryMetadataError(): ClientConfigurationError;
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    static createInvalidAuthorityMetadataError(): ClientConfigurationError;
    /**
     * Throws error when provided authority is not a member of the trusted host list
     */
    static createUntrustedAuthorityError(): ClientConfigurationError;
    /**
     * Throws error when the AzureCloudInstance is set to an invalid value
     */
    static createInvalidAzureCloudInstanceError(): ClientConfigurationError;
    /**
     * Throws an error when the authentication scheme is set to SSH but the SSH public key is omitted from the request
     */
    static createMissingSshJwkError(): ClientConfigurationError;
    /**
     * Throws an error when the authentication scheme is set to SSH but the SSH public key ID is omitted from the request
     */
    static createMissingSshKidError(): ClientConfigurationError;
    /**
     * Throws error when provided headers don't contain a header that a server nonce can be extracted from
     */
    static createMissingNonceAuthenticationHeadersError(): ClientConfigurationError;
    /**
     * Throws error when a provided header is invalid in any way
     */
    static createInvalidAuthenticationHeaderError(invalidHeaderName: string, details: string): ClientConfigurationError;
    /**
     * Throws error when provided non-default OIDCOptions when not in OIDC protocol mode
     */
    static createCannotSetOIDCOptionsError(): ClientConfigurationError;
    /**
     * Throws error when allowNativeBroker is set to true when not in AAD protocol mode
     */
    static createCannotAllowNativeBrokerError(): ClientConfigurationError;
    /**
     * Create an error when the authority provided in request does not match authority provided in account or MSAL.js configuration.
     */
    static createAuthorityMismatchError(): ClientConfigurationError;
}
//# sourceMappingURL=ClientConfigurationError.d.ts.map
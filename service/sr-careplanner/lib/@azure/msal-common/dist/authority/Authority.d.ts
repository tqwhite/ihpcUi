import { AuthorityType } from "./AuthorityType";
import { OpenIdConfigResponse } from "./OpenIdConfigResponse";
import { IUri } from "../url/IUri";
import { INetworkModule } from "../network/INetworkModule";
import { ProtocolMode } from "./ProtocolMode";
import { ICacheManager } from "../cache/interface/ICacheManager";
import { AuthorityOptions } from "./AuthorityOptions";
import { CloudDiscoveryMetadata } from "./CloudDiscoveryMetadata";
import { RegionDiscoveryMetadata } from "./RegionDiscoveryMetadata";
import { AzureCloudOptions } from "../config/ClientConfiguration";
import { Logger } from "../logger/Logger";
import { IPerformanceClient } from "../telemetry/performance/IPerformanceClient";
/**
 * The authority class validates the authority URIs used by the user, and retrieves the OpenID Configuration Data from the
 * endpoint. It will store the pertinent config data in this object for use during token calls.
 * @internal
 */
export declare class Authority {
    private _canonicalAuthority;
    private _canonicalAuthorityUrlComponents;
    protected networkInterface: INetworkModule;
    protected cacheManager: ICacheManager;
    private authorityOptions;
    private metadata;
    private regionDiscovery;
    regionDiscoveryMetadata: RegionDiscoveryMetadata;
    private logger;
    protected performanceClient: IPerformanceClient | undefined;
    protected correlationId: string | undefined;
    private static reservedTenantDomains;
    constructor(authority: string, networkInterface: INetworkModule, cacheManager: ICacheManager, authorityOptions: AuthorityOptions, logger: Logger, performanceClient?: IPerformanceClient, correlationId?: string);
    /**
     * Get {@link AuthorityType}
     * @param authorityUri {@link IUri}
     * @private
     */
    private getAuthorityType;
    get authorityType(): AuthorityType;
    /**
     * ProtocolMode enum representing the way endpoints are constructed.
     */
    get protocolMode(): ProtocolMode;
    /**
     * Returns authorityOptions which can be used to reinstantiate a new authority instance
     */
    get options(): AuthorityOptions;
    /**
     * A URL that is the authority set by the developer
     */
    get canonicalAuthority(): string;
    /**
     * Sets canonical authority.
     */
    set canonicalAuthority(url: string);
    /**
     * Get authority components.
     */
    get canonicalAuthorityUrlComponents(): IUri;
    /**
     * Get hostname and port i.e. login.microsoftonline.com
     */
    get hostnameAndPort(): string;
    /**
     * Get tenant for authority.
     */
    get tenant(): string;
    /**
     * OAuth /authorize endpoint for requests
     */
    get authorizationEndpoint(): string;
    /**
     * OAuth /token endpoint for requests
     */
    get tokenEndpoint(): string;
    get deviceCodeEndpoint(): string;
    /**
     * OAuth logout endpoint for requests
     */
    get endSessionEndpoint(): string;
    /**
     * OAuth issuer for requests
     */
    get selfSignedJwtAudience(): string;
    /**
     * Jwks_uri for token signing keys
     */
    get jwksUri(): string;
    /**
     * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
     * @param authorityUri {@link IUri}
     * @private
     */
    private canReplaceTenant;
    /**
     * Replaces tenant in url path with current tenant. Defaults to common.
     * @param urlString
     */
    private replaceTenant;
    /**
     * Replaces path such as tenant or policy with the current tenant or policy.
     * @param urlString
     */
    private replacePath;
    /**
     * The default open id configuration endpoint for any canonical authority.
     */
    protected get defaultOpenIdConfigurationEndpoint(): string;
    /**
     * Boolean that returns whethr or not tenant discovery has been completed.
     */
    discoveryComplete(): boolean;
    /**
     * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
     * and the /authorize, /token and logout endpoints.
     */
    resolveEndpointsAsync(): Promise<void>;
    /**
     * Update AuthorityMetadataEntity with new endpoints and return where the information came from
     * @param metadataEntity
     */
    private updateEndpointMetadata;
    /**
     * Compares the number of url components after the domain to determine if the cached
     * authority metadata can be used for the requested authority. Protects against same domain different
     * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
     * @param metadataEntity
     */
    private isAuthoritySameType;
    /**
     * Parse authorityMetadata config option
     */
    private getEndpointMetadataFromConfig;
    /**
     * Gets OAuth endpoints from the given OpenID configuration endpoint.
     *
     * @param hasHardcodedMetadata boolean
     */
    private getEndpointMetadataFromNetwork;
    /**
     * Get OAuth endpoints for common authorities.
     */
    private getEndpointMetadataFromHardcodedValues;
    /**
     * Update the retrieved metadata with regional information.
     * User selected Azure region will be used if configured.
     */
    private updateMetadataWithRegionalInformation;
    /**
     * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache
     * and returns where the information was retrieved from
     * @param metadataEntity
     * @returns AuthorityMetadataSource
     */
    private updateCloudDiscoveryMetadata;
    /**
     * Parse cloudDiscoveryMetadata config or check knownAuthorities
     */
    private getCloudDiscoveryMetadataFromConfig;
    /**
     * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
     *
     * @param hasHardcodedMetadata boolean
     */
    private getCloudDiscoveryMetadataFromNetwork;
    /**
     * Get cloud discovery metadata for common authorities
     */
    private getCloudDiscoveryMetadataFromHardcodedValues;
    /**
     * Helper function to determine if this host is included in the knownAuthorities config option
     */
    private isInKnownAuthorities;
    /**
     * helper function to populate the authority based on azureCloudOptions
     * @param authorityString
     * @param azureCloudOptions
     */
    static generateAuthority(authorityString: string, azureCloudOptions?: AzureCloudOptions): string;
    /**
     * Creates cloud discovery metadata object from a given host
     * @param host
     */
    static createCloudDiscoveryMetadataFromHost(host: string): CloudDiscoveryMetadata;
    /**
     * Searches instance discovery network response for the entry that contains the host in the aliases list
     * @param response
     * @param authority
     */
    static getCloudDiscoveryMetadataFromNetworkResponse(response: CloudDiscoveryMetadata[], authority: string): CloudDiscoveryMetadata | null;
    /**
     * helper function to generate environment from authority object
     */
    getPreferredCache(): string;
    /**
     * Returns whether or not the provided host is an alias of this authority instance
     * @param host
     */
    isAlias(host: string): boolean;
    /**
     * Returns whether or not the provided host is an alias of a known Microsoft authority for purposes of endpoint discovery
     * @param host
     */
    isAliasOfKnownMicrosoftAuthority(host: string): boolean;
    /**
     * Checks whether the provided host is that of a public cloud authority
     *
     * @param authority string
     * @returns bool
     */
    static isPublicCloudAuthority(host: string): boolean;
    /**
     * Rebuild the authority string with the region
     *
     * @param host string
     * @param region string
     */
    static buildRegionalAuthorityString(host: string, region: string, queryString?: string): string;
    /**
     * Replace the endpoints in the metadata object with their regional equivalents.
     *
     * @param metadata OpenIdConfigResponse
     * @param azureRegion string
     */
    static replaceWithRegionalInformation(metadata: OpenIdConfigResponse, azureRegion: string): OpenIdConfigResponse;
    /**
     * Transform CIAM_AUTHORIY as per the below rules:
     * If no path segments found and it is a CIAM authority (hostname ends with .ciamlogin.com), then transform it
     *
     * NOTE: The transformation path should go away once STS supports CIAM with the format: `tenantIdorDomain.ciamlogin.com`
     * `ciamlogin.com` can also change in the future and we should accommodate the same
     *
     * @param authority
     */
    static transformCIAMAuthority(authority: string): string;
}
//# sourceMappingURL=Authority.d.ts.map
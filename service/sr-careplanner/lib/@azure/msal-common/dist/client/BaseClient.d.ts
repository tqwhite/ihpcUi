import { ClientConfiguration, CommonClientConfiguration } from "../config/ClientConfiguration";
import { INetworkModule } from "../network/INetworkModule";
import { NetworkManager, NetworkResponse } from "../network/NetworkManager";
import { ICrypto } from "../crypto/ICrypto";
import { Authority } from "../authority/Authority";
import { Logger } from "../logger/Logger";
import { ServerAuthorizationTokenResponse } from "../response/ServerAuthorizationTokenResponse";
import { CacheManager } from "../cache/CacheManager";
import { ServerTelemetryManager } from "../telemetry/server/ServerTelemetryManager";
import { RequestThumbprint } from "../network/RequestThumbprint";
import { CcsCredential } from "../account/CcsCredential";
import { IPerformanceClient } from "../telemetry/performance/IPerformanceClient";
import { BaseAuthRequest } from "../request/BaseAuthRequest";
/**
 * Base application class which will construct requests to send to and handle responses from the Microsoft STS using the authorization code flow.
 * @internal
 */
export declare abstract class BaseClient {
    logger: Logger;
    protected config: CommonClientConfiguration;
    protected cryptoUtils: ICrypto;
    protected cacheManager: CacheManager;
    protected networkClient: INetworkModule;
    protected serverTelemetryManager: ServerTelemetryManager | null;
    protected networkManager: NetworkManager;
    authority: Authority;
    protected performanceClient?: IPerformanceClient;
    protected constructor(configuration: ClientConfiguration, performanceClient?: IPerformanceClient);
    /**
     * Creates default headers for requests to token endpoint
     */
    protected createTokenRequestHeaders(ccsCred?: CcsCredential): Record<string, string>;
    /**
     * Http post to token endpoint
     * @param tokenEndpoint
     * @param queryString
     * @param headers
     * @param thumbprint
     */
    protected executePostToTokenEndpoint(tokenEndpoint: string, queryString: string, headers: Record<string, string>, thumbprint: RequestThumbprint, correlationId: string): Promise<NetworkResponse<ServerAuthorizationTokenResponse>>;
    /**
     * Updates the authority object of the client. Endpoint discovery must be completed.
     * @param updatedAuthority
     */
    updateAuthority(updatedAuthority: Authority): void;
    /**
     * Creates query string for the /token request
     * @param request
     */
    createTokenQueryParameters(request: BaseAuthRequest): string;
}
//# sourceMappingURL=BaseClient.d.ts.map
import { INetworkModule, NetworkRequestOptions } from "./INetworkModule";
import { RequestThumbprint } from "./RequestThumbprint";
import { CacheManager } from "../cache/CacheManager";
import { ServerAuthorizationTokenResponse } from "../response/ServerAuthorizationTokenResponse";
export type NetworkResponse<T> = {
    headers: Record<string, string>;
    body: T;
    status: number;
};
export type UrlToHttpRequestOptions = {
    protocol: string;
    hostname: string;
    hash: string;
    search: string;
    pathname: string;
    path: string;
    href: string;
    port?: number;
    auth?: string;
};
/** @internal */
export declare class NetworkManager {
    private networkClient;
    private cacheManager;
    constructor(networkClient: INetworkModule, cacheManager: CacheManager);
    /**
     * Wraps sendPostRequestAsync with necessary preflight and postflight logic
     * @param thumbprint
     * @param tokenEndpoint
     * @param options
     */
    sendPostRequest<T extends ServerAuthorizationTokenResponse>(thumbprint: RequestThumbprint, tokenEndpoint: string, options: NetworkRequestOptions): Promise<NetworkResponse<T>>;
}
//# sourceMappingURL=NetworkManager.d.ts.map
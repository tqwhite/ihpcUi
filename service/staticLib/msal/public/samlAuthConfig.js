/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
 
 
// LOG MESSAGES FROM THIS ARE SEEN IN THE BROWSER CONSOLE
// This is called as part of the Sign In page process
 
 
const msalConfig = {
    auth: {
        // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        clientId: "1c3b4392-c123-4f88-b1ba-b32255b18141",
        // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
        authority: "https://login.microsoftonline.com/bba67e09-06e0-4d07-9123-acdb7a262a91/",
        redirectUri: "https://xxx.comSSO/spaApi",
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO.
        storeAuthStateInCookie: false, // set this to true if you have to support IE
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const protectedResources = {
    todolistApi: {
        scopes: {
            read: ['https://graph.microsoft.com/User.Read'],
            write: ['https://graph.microsoft.com/User.Read.All'],
        },
    },
};

// REDIRECT URL IS SPECIFIED IN AZURE APP: 83a03

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
    scopes: [...protectedResources.todolistApi.scopes.read, ...protectedResources.todolistApi.scopes.write],
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */

// const silentRequest = {
//   scopes: ["openid", "profile"],
//   loginHint: "example@domain.net"
// };

// exporting config object for jest
if (typeof exports !== 'undefined') {
    module.exports = {
        msalConfig,
        loginRequest,
        protectedResources,
    };
}

console.log(`=-=X:==   .../staticLib/msal/public/authConfig.js locahost:5001`);


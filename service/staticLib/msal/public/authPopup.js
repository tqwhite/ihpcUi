// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = '';

function selectAccount() {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();
    if (!currentAccounts || currentAccounts.length < 1) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn('Multiple accounts detected.');
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        
//         console.log('redirect A'); //tqii
//         window.location.href=`/SSO`; //tqii
        welcomeUser(username);
        updateTable(currentAccounts[0]);
    }
}



async function handleResponse(response) {
    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        username = response.account.username;
        
        const districtId=window.location.pathname.match(/\/([^\/]*?)$/)[1];


        
		await setIhpcTokenCookie(); // accesses msal for data, .../ui/system/code/service/staticLib/msal/public/fetch.js

        console.log(`redirect BC /SSO/${districtId}`); //tqii
        
        window.open(`/SSO/${districtId}`);
        
        
 //       window.location.href=`/SSO/${districtId}`; //ssoApi is tanant's application name in Entra, eventually needs to be goot from Mongo
//         welcomeUser(username);
//         updateTable(response.account);
    } else {
        selectAccount();
    }
}

function signIn() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj
        .loginPopup({
            ...loginRequest,
            redirectUri: '/SSO/dmschools.org',
        })
        .then(handleResponse)
        .catch((error) => {
            console.log(error);
        });
}


function getTokenPopup(request) {
    /**
     * See here for more information on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);
    return myMSALObj.acquireTokenSilent(request).catch((error) => {
        console.warn(error);
        console.warn('silent token acquisition fails. acquiring token using popup');
        if (error instanceof msal.InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            return myMSALObj
                .acquireTokenPopup(request)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.warn(error);
        }
    });
}

function signOut() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    // Choose which account to logout from by passing a username.
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
    };
    myMSALObj.logoutPopup(logoutRequest).then(() => {
        window.location.href='/'; //tqii
    });
}

selectAccount();

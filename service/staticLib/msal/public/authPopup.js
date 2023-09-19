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








/*



Next:

add cookie to carry the login info (first user, pw)
then find the token and send that to the UI 
then add the token to the flow into the API
then add msal to the API (did I add @azure crap previously that needs removing?)








*/







async function handleResponse(response) {
    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        username = response.account.username;
        
        
        
		await setIhpcTokenCookie()

        console.log('redirect B'); //tqii
        window.location.href=`/SSO/ssoApi`; //tqii
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
            redirectUri: '/SSO',
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

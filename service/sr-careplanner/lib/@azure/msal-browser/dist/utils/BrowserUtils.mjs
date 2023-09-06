/*! @azure/msal-browser v3.1.0 2023-09-05 */
'use strict';
import { Constants, UrlString } from '@azure/msal-common';
import { createBrowserAuthError } from '../error/BrowserAuthError.mjs';
import { BrowserConstants, InteractionType } from './BrowserConstants.mjs';
import { blockIframeReload, redirectInIframe, blockNestedPopups, nonBrowserEnvironment, uninitializedPublicClientApplication } from '../error/BrowserAuthErrorCodes.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class for browser specific functions
 */
class BrowserUtils {
    // #region Window Navigation and URL management
    /**
     * Clears hash from window url.
     */
    static clearHash(contentWindow) {
        // Office.js sets history.replaceState to null
        contentWindow.location.hash = Constants.EMPTY_STRING;
        if (typeof contentWindow.history.replaceState === "function") {
            // Full removes "#" from url
            contentWindow.history.replaceState(null, Constants.EMPTY_STRING, `${contentWindow.location.origin}${contentWindow.location.pathname}${contentWindow.location.search}`);
        }
    }
    /**
     * Replaces current hash with hash from provided url
     */
    static replaceHash(url) {
        const urlParts = url.split("#");
        urlParts.shift(); // Remove part before the hash
        window.location.hash =
            urlParts.length > 0 ? urlParts.join("#") : Constants.EMPTY_STRING;
    }
    /**
     * Returns boolean of whether the current window is in an iframe or not.
     */
    static isInIframe() {
        return window.parent !== window;
    }
    /**
     * Returns boolean of whether or not the current window is a popup opened by msal
     */
    static isInPopup() {
        return (typeof window !== "undefined" &&
            !!window.opener &&
            window.opener !== window &&
            typeof window.name === "string" &&
            window.name.indexOf(`${BrowserConstants.POPUP_NAME_PREFIX}.`) === 0);
    }
    // #endregion
    /**
     * Returns current window URL as redirect uri
     */
    static getCurrentUri() {
        return window.location.href.split("?")[0].split("#")[0];
    }
    /**
     * Gets the homepage url for the current window location.
     */
    static getHomepage() {
        const currentUrl = new UrlString(window.location.href);
        const urlComponents = currentUrl.getUrlComponents();
        return `${urlComponents.Protocol}//${urlComponents.HostNameAndPort}/`;
    }
    /**
     * Throws error if we have completed an auth and are
     * attempting another auth request inside an iframe.
     */
    static blockReloadInHiddenIframes() {
        const isResponseHash = UrlString.hashContainsKnownProperties(window.location.hash);
        // return an error if called from the hidden iframe created by the msal js silent calls
        if (isResponseHash && BrowserUtils.isInIframe()) {
            throw createBrowserAuthError(blockIframeReload);
        }
    }
    /**
     * Block redirect operations in iframes unless explicitly allowed
     * @param interactionType Interaction type for the request
     * @param allowRedirectInIframe Config value to allow redirects when app is inside an iframe
     */
    static blockRedirectInIframe(interactionType, allowRedirectInIframe) {
        const isIframedApp = BrowserUtils.isInIframe();
        if (interactionType === InteractionType.Redirect &&
            isIframedApp &&
            !allowRedirectInIframe) {
            // If we are not in top frame, we shouldn't redirect. This is also handled by the service.
            throw createBrowserAuthError(redirectInIframe);
        }
    }
    /**
     * Block redirectUri loaded in popup from calling AcquireToken APIs
     */
    static blockAcquireTokenInPopups() {
        // Popups opened by msal popup APIs are given a name that starts with "msal."
        if (BrowserUtils.isInPopup()) {
            throw createBrowserAuthError(blockNestedPopups);
        }
    }
    /**
     * Throws error if token requests are made in non-browser environment
     * @param isBrowserEnvironment Flag indicating if environment is a browser.
     */
    static blockNonBrowserEnvironment(isBrowserEnvironment) {
        if (!isBrowserEnvironment) {
            throw createBrowserAuthError(nonBrowserEnvironment);
        }
    }
    /**
     * Throws error if initialize hasn't been called
     * @param initialized
     */
    static blockAPICallsBeforeInitialize(initialized) {
        if (!initialized) {
            throw createBrowserAuthError(uninitializedPublicClientApplication);
        }
    }
}

export { BrowserUtils };
//# sourceMappingURL=BrowserUtils.mjs.map

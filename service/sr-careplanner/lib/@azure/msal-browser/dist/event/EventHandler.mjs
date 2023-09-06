/*! @azure/msal-browser v3.1.0 2023-09-05 */
'use strict';
import { AccountEntity, CacheManager } from '@azure/msal-common';
import { EventType } from './EventType.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class EventHandler {
    constructor(logger, browserCrypto) {
        this.eventCallbacks = new Map();
        this.logger = logger;
        this.browserCrypto = browserCrypto;
        this.listeningToStorageEvents = false;
        this.handleAccountCacheChange =
            this.handleAccountCacheChange.bind(this);
    }
    /**
     * Adds event callbacks to array
     * @param callback
     */
    addEventCallback(callback) {
        if (typeof window !== "undefined") {
            const callbackId = this.browserCrypto.createNewGuid();
            this.eventCallbacks.set(callbackId, callback);
            this.logger.verbose(`Event callback registered with id: ${callbackId}`);
            return callbackId;
        }
        return null;
    }
    /**
     * Removes callback with provided id from callback array
     * @param callbackId
     */
    removeEventCallback(callbackId) {
        this.eventCallbacks.delete(callbackId);
        this.logger.verbose(`Event callback ${callbackId} removed.`);
    }
    /**
     * Adds event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    enableAccountStorageEvents() {
        if (typeof window === "undefined") {
            return;
        }
        if (!this.listeningToStorageEvents) {
            this.logger.verbose("Adding account storage listener.");
            this.listeningToStorageEvents = true;
            window.addEventListener("storage", this.handleAccountCacheChange);
        }
        else {
            this.logger.verbose("Account storage listener already registered.");
        }
    }
    /**
     * Removes event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    disableAccountStorageEvents() {
        if (typeof window === "undefined") {
            return;
        }
        if (this.listeningToStorageEvents) {
            this.logger.verbose("Removing account storage listener.");
            window.removeEventListener("storage", this.handleAccountCacheChange);
            this.listeningToStorageEvents = false;
        }
        else {
            this.logger.verbose("No account storage listener registered.");
        }
    }
    /**
     * Emits events by calling callback with event message
     * @param eventType
     * @param interactionType
     * @param payload
     * @param error
     */
    emitEvent(eventType, interactionType, payload, error) {
        if (typeof window !== "undefined") {
            const message = {
                eventType: eventType,
                interactionType: interactionType || null,
                payload: payload || null,
                error: error || null,
                timestamp: Date.now(),
            };
            this.logger.info(`Emitting event: ${eventType}`);
            this.eventCallbacks.forEach((callback, callbackId) => {
                this.logger.verbose(`Emitting event to callback ${callbackId}: ${eventType}`);
                callback.apply(null, [message]);
            });
        }
    }
    /**
     * Emit account added/removed events when cached accounts are changed in a different tab or frame
     */
    handleAccountCacheChange(e) {
        try {
            const cacheValue = e.newValue || e.oldValue;
            if (!cacheValue) {
                return;
            }
            const parsedValue = JSON.parse(cacheValue);
            if (typeof parsedValue !== "object" ||
                !AccountEntity.isAccountEntity(parsedValue)) {
                return;
            }
            const accountEntity = CacheManager.toObject(new AccountEntity(), parsedValue);
            const accountInfo = accountEntity.getAccountInfo();
            if (!e.oldValue && e.newValue) {
                this.logger.info("Account was added to cache in a different window");
                this.emitEvent(EventType.ACCOUNT_ADDED, undefined, accountInfo);
            }
            else if (!e.newValue && e.oldValue) {
                this.logger.info("Account was removed from cache in a different window");
                this.emitEvent(EventType.ACCOUNT_REMOVED, undefined, accountInfo);
            }
        }
        catch (e) {
            return;
        }
    }
}

export { EventHandler };
//# sourceMappingURL=EventHandler.mjs.map

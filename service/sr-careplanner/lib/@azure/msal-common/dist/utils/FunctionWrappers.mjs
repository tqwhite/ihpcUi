/*! @azure/msal-common v14.0.3 2023-09-05 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Wraps a function with a performance measurement.
 * Usage: invoke(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invoke = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace(`Executing function ${eventName}`);
        const inProgressEvent = telemetryClient?.startMeasurement(eventName, correlationId);
        telemetryClient?.setPreQueueTime(eventName, correlationId);
        try {
            const result = callback(...args);
            inProgressEvent?.end({
                success: true,
            });
            logger.trace(`Returning result from ${eventName}`);
            return result;
        }
        catch (e) {
            logger.trace(`Error occurred in ${eventName}`);
            try {
                logger.trace(JSON.stringify(e));
            }
            catch (e) {
                logger.trace("Unable to print error message.");
            }
            inProgressEvent?.end({
                success: false,
            });
            throw e;
        }
    };
};
/**
 * Wraps an async function with a performance measurement.
 * Usage: invokeAsync(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invokeAsync = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace(`Executing function ${eventName}`);
        const inProgressEvent = telemetryClient?.startMeasurement(eventName, correlationId);
        telemetryClient?.setPreQueueTime(eventName, correlationId);
        return callback(...args)
            .then((response) => {
            logger.trace(`Returning result from ${eventName}`);
            inProgressEvent?.end({
                success: true,
            });
            return response;
        })
            .catch((e) => {
            logger.trace(`Error occurred in ${eventName}`);
            try {
                logger.trace(JSON.stringify(e));
            }
            catch (e) {
                logger.trace("Unable to print error message.");
            }
            inProgressEvent?.end({
                success: false,
            });
            throw e;
        });
    };
};

export { invoke, invokeAsync };
//# sourceMappingURL=FunctionWrappers.mjs.map

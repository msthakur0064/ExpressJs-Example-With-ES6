import statusCodes from './statusCodes.js';

/**
 * success API response
 *
 * @param code
 * @param message
 * @param data
 * @returns {{}}
 */
export function apiSuccessHandler(code = 200, message = null, data = {}) {
    let apiResponse = {};
    let status = statusCodes.data.find((data) => data.code === code);
    if (typeof status === 'undefined') {
        status = {
            'code': 200,
            'message': 'Success',
        };
    }

    apiResponse.status = status.code;
    apiResponse.message = (message) ? message : status.message;
    apiResponse.data = data;
    return apiResponse;
}

/**
 * fail API response
 *
 * @param code
 * @param message
 * @param data
 * @returns {{}}
 */
export function apiFailureHandler(code = 400, message = null, data = {}) {
    let apiResponse = {};
    let status = statusCodes.data.find((data) => data.code === code);
    if (typeof status === 'undefined') {
        status = {
            'code': 400,
            'message': 'Error',
        };
    }

    apiResponse.status = status.code;
    apiResponse.message = (message) ? message : status.message;
    apiResponse.data = data;
    return apiResponse;
}

export default {apiSuccessHandler, apiFailureHandler};
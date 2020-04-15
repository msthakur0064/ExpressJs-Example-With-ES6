import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import {apiFailureHandler} from '../helpers/global.helper.js';
import config from "../../config/config.js";
import configuredDB from '../../config/database.js';

const {Users} = configuredDB;

/**
 * encode password
 *
 * @param salt
 * @param password
 * @returns {string|boolean}
 */
export function passwordEncode(salt, password) {

    if (salt && password) {
        const hashMd5 = crypto.createHash('md5').update(salt + password).digest("hex");
        const hasSha1 = crypto.createHash('sha1').update(hashMd5).digest("hex");

        return hasSha1;
    }
    return false;
}

/**
 * encode password
 *
 * @param salt
 * @param password
 * @returns {string|boolean}
 */
export function generateJwtToken(user) {
    if (user) {
        let userData = {};
        userData.id = user.id;
        userData.email = user.email;
        userData.firstName = user.firstName;
        userData.lastName = user.lastName;
        return jwt.sign(userData, config.jwt.secretKey, {expiresIn: config.jwt.expire});
    }
    return false;
}

/**
 *  verify JWT token
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<{}>}
 */
export async function verifyJwtToken(req, res, next) {
    try {
        // Gather the jwt access token from the request header
        const authHeader = req.headers.authorization;
        const authToken = authHeader && authHeader.split(' ');

        if (!authToken || authToken.length !== 2) {
            return apiFailureHandler(res, 401, 'Format for Authorization: Bearer [token].',);
        }

        const scheme = authToken[0];
        const token = authToken[1];
        if (scheme !== "Bearer") {
            return apiFailureHandler(res, 401, 'Format for Authorization: Bearer [token].',);
        }

        // if there isn't any token
        if (token == null) {
            return apiFailureHandler(res, 401, 'Token is empty. Format for Authorization: Bearer [token].');
        }

        await jwt.verify(token, config.jwt.secretKey, async (err, user) => {
            if (err) {
                return apiFailureHandler(res, 403, err.message);
            }

            if (user.id && Number.isInteger(parseInt(user.id))) {
                // check user is valid or not
                await Users.findOne({
                    where: {
                        id: user.id
                    },
                    attributes: {exclude: ['salt', 'password']},
                    raw: true
                }).then((result) => {
                    if (result) {
                        req.userId = user.id;
                        req.user = result;
                        next();
                    } else {
                        return apiFailureHandler(res, 400, 'Token is invalid.');
                    }
                });

            } else {
                return apiFailureHandler(res, 400, 'Token is invalid.');
            }
        });
    } catch (error) {
        return apiFailureHandler(res, 500, null, error);
    }
}

export default {passwordEncode, generateJwtToken, verifyJwtToken};
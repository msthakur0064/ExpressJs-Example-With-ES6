import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import config from "../config/config";

/**
 * encode password
 *
 * @param salt
 * @param password
 * @returns {string|boolean}
 */
const passwordEncode = (salt, password) => {
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
const generateJwtToken = (user) => {
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

export default {
    passwordEncode,
    generateJwtToken
};
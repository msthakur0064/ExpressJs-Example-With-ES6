import crypto from 'crypto';

import globalHelper from '../helpers/global.helper';
import authHelper from '../helpers/auth.helper';
import model from '../config/model';

const {apiSuccessHandler, apiFailureHandler} = globalHelper;
const {passwordEncode, generateJwtToken} = authHelper;
const {Users} = model;

/**
 * login by user
 *
 * @param req
 * @param res
 */
const login = async (req, res) => {
    const {body} = req;
    let {email, password} = body;
    try {
        if (!email || !password) {
            return apiFailureHandler(res, 400, 'Field required: email and password.');
        }
        Users.findOne({
            where: {email},
            raw: true
        }).then(async (result) => {
            if (!result) {
                return apiFailureHandler(res, 400, 'Invalid credential.');
            }
            const {password: oldPassword, salt} = result;
            password = await passwordEncode(salt, password);
            if (oldPassword === password) {
                delete result.salt;
                delete result.password;
                result.token = await generateJwtToken(result);
                return apiSuccessHandler(res, 200, 'You are login successfully.', result);
            }
            return apiFailureHandler(res, 400, 'Invalid credential.');
        });
    } catch (error) {
        return apiFailureHandler(res, 500, null, error);
    }
}

/**
 * registration for new user
 *
 * @param req
 * @param res
 */
const registration = async (req, res) => {
    try {
        const {body} = req;
        let {firstName, lastName, email, password} = body;
        if (!firstName || !lastName || !email || !password) {
            return apiFailureHandler(res, 400, 'Field required: firstName, lastName, email and password.');
        }
        // encrypt password
        const salt = crypto.randomBytes(128).toString('base64');
        password = await passwordEncode(salt, password);
        // insert data
        Users.findOrCreate({
            where: {email},
            defaults: {firstName, lastName, email, salt, password},
        }).then((result) => {
            if (result[1]) {
                delete result[0].dataValues.salt;
                delete result[0].dataValues.password;
                return apiSuccessHandler(res, 200, null, result[0]);
            } else {
                return apiFailureHandler(res, 400, 'User already exist.');
            }
        });
    } catch (error) {
        return apiFailureHandler(res, 500, null, error);
    }
}

export default {
    login,
    registration
};
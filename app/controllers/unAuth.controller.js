import crypto from 'crypto';

import globalHelper from '../helpers/global.helper';
import authHelper from '../helpers/auth.helper';
import validate from '../helpers/validate.helper';
import sendMail from "../helpers/mail.helper";
import model from '../config/model';

const {apiSuccessHandler, apiFailureHandler} = globalHelper;
const {passwordEncode, generateJwtToken} = authHelper;
const {userModel} = model;

/**
 * login by user
 *
 * @param req
 * @param res
 */
const login = async (req, res) => {
    try {
        const {body} = req;
        const rules = {
            email: 'required|email',
            password: 'required'
        };
        const validator = new validate(body, rules);
        if (validator.run() === false) {
            return apiFailureHandler(req, res, 400, validator.errorStr());
        }

        let {email, password} = body;
        const userData = await userModel.findOne({
            where: {email},
            raw: true
        });
        if (!userData) {
            return apiFailureHandler(req, res, 400, 'Invalid credential.');
        }

        // check password
        const {password: oldPassword, salt} = userData;
        password = await passwordEncode(salt, password);
        if (oldPassword === password) {
            const token = await generateJwtToken(userData);
            return apiSuccessHandler(req, res, 200, 'You are login successfully.', {token});
        }
        return apiFailureHandler(req, res, 400, 'Invalid credential.');
    } catch (error) {
        return apiFailureHandler(req, res, 500, null, error);
    }
};

/**
 * registration for new user
 *
 * @param req
 * @param res
 */
const registration = async (req, res) => {
    try {
        const {body} = req;
        const rules = {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email',
            password: 'required'
        };
        const validator = new validate(body, rules);
        if (validator.run() === false) {
            return apiFailureHandler(req, res, 400, validator.errorStr());
        }
        let {firstName, lastName, email, password} = body;

        // encrypt password
        const salt = crypto.randomBytes(128).toString('base64');
        password = await passwordEncode(salt, password);

        // insert data
        const roleId = 1; // 1: customer role
        const where = {email};
        const userRequestData = {
            roleId,
            firstName,
            lastName,
            email,
            salt,
            password
        };
        let userData = await userModel.findOne({where});
        if (userData) {
            return apiFailureHandler(req, res, 400, 'User already exist.');
        }

        // create user
        userData = await userModel.create(userRequestData);
        if (userData) {
            let data = userRequestData;
            data.name = firstName + ' ' + lastName;
            sendMail('registration', 'Registration Successfully', email, data);
            return apiSuccessHandler(req, res, 200, null, userData);
        }
        return apiFailureHandler(req, res, 400, 'User is not regenerated, Please try again.');
    } catch (error) {
        return apiFailureHandler(req, res, 500, null, error);
    }
};

export default {
    login,
    registration
};
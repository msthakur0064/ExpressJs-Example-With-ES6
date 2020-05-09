import jwt from 'jsonwebtoken';

import globalHelper from '../helpers/global.helper';
import config from "../config/config";
import model from "../config/model";

const {apiFailureHandler} = globalHelper;
const {userModel} = model;

/**
 * get user data for token verify
 *
 * @param err
 * @param user
 * @returns {Promise<{}>}
 */
const getUser = async (req, res, next, err, user) => {
    try {
        if (err) {
            return apiFailureHandler(req, res, 403, err.message);
        }
        if (user.id && Number.isInteger(parseInt(user.id))) {
            // check user is valid or not
            let result = await userModel.findOne({
                where: {
                    id: user.id
                },
                attributes: {exclude: ['salt', 'password']},
                raw: true
            });
            if (result) {
                req.userId = user.id;
                req.user = result;
                next();
            } else {
                return apiFailureHandler(req, res, 400, 'Token is invalid.');
            }
        } else {
            return apiFailureHandler(req, res, 400, 'Token is invalid.');
        }
    } catch (error) {
        return apiFailureHandler(req, res, 500, null, error);
    }
}

/**
 *  verify JWT token
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<{}>}
 */
export default async (req, res, next) => {
    try {
        // Gather the jwt access token from the request header
        const authHeader = req.headers.authorization;
        const authToken = authHeader && authHeader.split(' ');
        if (!authToken || authToken.length !== 2) {
            return apiFailureHandler(req, res, 401, 'Format for Authorization: Bearer [token].',);
        }

        const scheme = authToken[0];
        const token = authToken[1];
        if (scheme !== "Bearer") {
            return apiFailureHandler(req, res, 401, 'Format for Authorization: Bearer [token].',);
        }

        // if there isn't any token
        if (token == null) {
            return apiFailureHandler(req, res, 401, 'Token is empty. Format for Authorization: Bearer [token].');
        }
        jwt.verify(token, config.jwt.secretKey, getUser.bind(null, req, res, next));
    } catch (error) {
        return apiFailureHandler(req, res, 500, null, error);
    }
}
import {apiSuccessHandler, apiFailureHandler} from '../helpers/globalFunction.js';
import configuredDB from '../../config/database.js';

const {Users} = configuredDB;

/**
 * get users data
 *
 * @param req
 * @param res
 */
export function getUsers(req, res) {
    try {
        Users.findAll().then((result) => {
            res.status(200).send(apiSuccessHandler(200, null, result));
        });
    } catch (error) {
        res.status(200).send(apiFailureHandler(500, null));
    }
}

/**
 * insert user data
 *
 * @param req
 * @param res
 */
export function createUser(req, res) {
    try {
        const {body: {firstName, lastName, email, password}} = req;
        if (!firstName || !lastName || !email || !password) {
            res.status(200).send(apiFailureHandler(400, 'Field required: firstName, lastName, email and password.'));
        }

        // insert data
        Users.findOrCreate({
            where: {email},
            defaults: {firstName, lastName, email, password}
        }).then((result) => {
            res.status(200).send(apiSuccessHandler(200, null, result));
        });
    } catch (error) {
        res.status(200).send(apiFailureHandler(500, null));
    }
}

export default {getUsers, createUser};
import globalHelper from '../helpers/global.helper';
import model from '../config/model';

const {apiSuccessHandler, apiFailureHandler} = globalHelper;
const {userModel} = model;

/**
 * get users data
 *
 * @param req
 * @param res
 */
const getUser = (req, res) => {
    try {
        const {user} = req;
        if (user) {
            return apiSuccessHandler(req, res, 200, null, user);
        } else {
            return apiFailureHandler(req, res, 400, 'Invalid user.');
        }
    } catch (error) {
        return apiFailureHandler(req, res, 500, null, error);
    }
}

/**
 * update user data
 *
 * @param req
 * @param res
 */
const updateUser = async (req, res) => {
    try {
        const {userId} = req;
        let {body: userData} = req;
        const userUpdateFields = ['firstName', 'lastName', 'mobileNumber', 'address', 'city', 'postalCode', 'status'];
        Object.keys(userData).map(function (key) {
            if (userUpdateFields.indexOf(key) === -1) {
                delete userData[key];
            }
        });
        if (!userData || Object.keys(userData).length === 0) {
            return apiFailureHandler(req, res, 400, 'User data not exist.');
        }

        let result = await userModel.update(userData, {
            where: {
                id: userId
            },
        });
        if (result) {
            return apiSuccessHandler(req, res, 200, 'User data updated.');
        }
        return apiFailureHandler(req, res, 400, 'User data not updated. Please try again.');
    } catch (error) {
        return apiFailureHandler(req, res, 500, null, error);
    }
}

/**
 * delete user
 *
 * @param req
 * @param res
 */
const deleteUser = async (req, res) => {
    try {
        const {userId} = req;
        let result = await userModel.destroy({
            where: {id: userId},
        });
        if (result) {
            return apiSuccessHandler(req, res, 200, 'User deleted.');
        }
        return apiFailureHandler(req, res, 400, 'User not deleted. Please try again.');
    } catch (error) {
        return apiFailureHandler(req, res, 500, null, error);
    }
}

export default {
    getUser,
    updateUser,
    deleteUser
}
import express from 'express';

import {verifyJwtToken} from '../helpers/auth.helper.js';
import unauthRoute from './unauth.route.js';
import userRoute from './user.route.js';
//import projectRoute from './project.route.js';

const router = express.Router();

router.use('/', unauthRoute);
router.use('/user', (req, res, next) => verifyJwtToken(req, res, next), userRoute);
// router.use('/project', projectRoute);

export default router;
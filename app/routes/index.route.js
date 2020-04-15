import express from 'express';

import {verifyJwtToken} from '../helpers/auth.helper.js';
import unauthRoute from './unauth.route.js';
import userRoute from './user.route.js';

const router = express.Router();

// without authentication
router.use('/', unauthRoute);

// with middleware authentication
router.use('/user', (req, res, next) => verifyJwtToken(req, res, next), userRoute);

export default router;
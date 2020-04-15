import express from 'express';

import auth from '../middleware/auth.middleware.js';
import unauthRoute from './unauth.route.js';
import userRoute from './user.route.js';

const router = express.Router();

// without authentication
router.use('/', unauthRoute);

// with middleware authentication
router.use('/user', (req, res, next) => auth(req, res, next), userRoute);

export default router;
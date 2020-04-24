import express from 'express';

import auth from '../middleware/auth.middleware';
import unauthRoute from './unauth.route';
import userRoute from './user.route';

const router = express.Router();

// without authentication
router.use('/', unauthRoute);

// with middleware authentication
router.use('/user', auth, userRoute);

export default router;
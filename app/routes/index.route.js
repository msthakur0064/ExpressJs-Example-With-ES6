import express from 'express';

// include middleware for authentication
import authMiddleware from '../middleware/auth.middleware';

// include routes
import unAuthRoute from './unAuth.route';
import userRoute from './user.route';

const router = express.Router();

// without authentication
router.use('/', unAuthRoute);

// with middleware authentication
router.use('/user', authMiddleware, userRoute);

export default router;
import express from 'express';

import userRoute from './user.route.js';
import projectRoute from './project.route.js';

const router = express.Router();

router.use('/user', userRoute);
// router.use('/project', projectRoute);

export default router;
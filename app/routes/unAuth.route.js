import express from 'express';

import unAuthController from '../controllers/unAuth.controller';

const router = new express.Router();
const {login, registration} = unAuthController;

router.post('/login', login);
router.post('/registration', registration);

export default router;
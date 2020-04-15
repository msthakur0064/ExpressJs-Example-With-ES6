import express from 'express';

import UnauthController from '../controllers/unauth.controller.js';

const router = new express.Router();
const unauthController = new UnauthController();

router.post('/login', unauthController.login);
router.post('/registration', unauthController.registration);

export default router;
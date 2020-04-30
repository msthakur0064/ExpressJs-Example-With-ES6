import express from 'express';

import unauthController from '../controllers/unauth.controller';

const router = new express.Router();

router.post('/login', unauthController.login);
router.post('/registration', unauthController.registration);

export default router;
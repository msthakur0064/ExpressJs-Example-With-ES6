import express from 'express';

import UserController from '../controllers/user.controller.js';

const router = new express.Router();
const userController = new UserController();

router.get('/', userController.getUser);
router.put('/', userController.updateUser);
// router.delete('/delete', userController.deleteUser);

export default router;
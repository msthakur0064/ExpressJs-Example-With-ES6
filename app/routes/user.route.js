import express from 'express';

import userController from '../controllers/user.controller';

const router = new express.Router();

router.get('/', userController.getUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

export default router;
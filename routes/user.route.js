import express from 'express';

import userController from '../app/controllers/user.controller.js';

const router = new express.Router();

router.get('/get', userController.getUsers);
router.post('/create', userController.createUser);
// router.put('/updater', userController.updateUser);
// router.delete('/delete', userController.deleteUser);

export default router;
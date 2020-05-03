import express from 'express';

import userController from '../controllers/user.controller';

const router = new express.Router();
const {getUser, updateUser, deleteUser} = userController;

router.get('/', getUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;
import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

const userController = new UserController();

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)

router.get('/photos/:username', userController.getUserPhotos)

export const userRouter = router;
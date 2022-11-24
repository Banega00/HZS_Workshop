import express from 'express';
import { MainController } from '../controllers/main.controller.js';
import { authorizeUser } from '../utils/jwt.js';

const router = express.Router();

const mainController = new MainController();

router.get('/test', mainController.test)

router.post('/photo', authorizeUser, mainController.addPhoto)
router.get('/photo/:id', authorizeUser, mainController.getPhoto)
router.get('/photos', authorizeUser, mainController.getAllPhotos)

router.get('/test', mainController.test)

export const mainRouter = router;
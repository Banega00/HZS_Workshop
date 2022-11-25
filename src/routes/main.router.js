import express from 'express';
import { MainController } from '../controllers/main.controller.js';
import { authorizeUser } from '../utils/jwt.js';
import multer from 'multer';
import path from 'path';
import { v4 as uuid } from "uuid";

function fileFilter(req, file, cb) {
    try{
        const extensions = ['.jpeg','.jpg','.png']
    
        const ext = extensions.includes(path.extname(file.originalname));

        if (ext) {
            return cb(null, true);
        } else {
            cb('Allowed filetypes: png, jpeg, jpg');
        }
    }catch(error){
        console.log(error);
        cb('Error testing file')
    }
}

function filename(req, file, cb){
    cb(null, uuid() + path.extname(file.originalname))
}

const upload = multer({storage: multer.diskStorage({ destination: 'public/photos/', filename: filename, fileFilter: fileFilter})})


const router = express.Router();

const mainController = new MainController();


router.get('/test', mainController.test)

router.post('/photo', authorizeUser, upload.single('photo'), mainController.addPhoto)
router.get('/photo/:id', mainController.getPhoto)
router.get('/photos', mainController.getAllPhotos)
router.delete('/photo/:id', authorizeUser, mainController.deletePhoto)


router.get('/test', mainController.test)

export const mainRouter = router;
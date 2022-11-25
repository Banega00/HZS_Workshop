import express from 'express';
import mongoose from 'mongoose'
import { userRouter } from "./src/routes/user.router.js";
import { mainRouter } from './src/routes/main.router.js';
import path from 'path'
import {fileURLToPath} from 'url';



async function main(){
    const app = express();

    const connection = await mongoose.connect('mongodb://localhost:27017/hzs');

    app.use(express.json())

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use('/public', express.static(__dirname + '/public'));
    
    app.use('/user', userRouter)
    app.use('/', mainRouter)

    
    
    const PORT = 3000;
    
    app.listen(PORT, function(){
        console.log(`Server je pokrenut na portu: ${PORT}`)
    })
}

main();

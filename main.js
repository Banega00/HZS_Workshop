import express from 'express';
import mongoose from 'mongoose'
import { userRouter } from "./src/routes/user.router.js";
import { mainRouter } from './src/routes/main.router.js';
import { authorizeUser } from './src/utils/jwt.js';



async function main(){
    const app = express();

    const connection = await mongoose.connect('mongodb://localhost:27017/hzs');

    app.use(express.json())
    
    app.use('/user', userRouter)
    app.use('/', mainRouter)
    
    const PORT = 3000;
    
    app.listen(PORT, function(){
        console.log(`Server je pokrenut na portu: ${PORT}`)
    })
}

main();

import express from 'express';
import { userRouter } from "./src/routes/user.router.js";
import mongoose from 'mongoose'



async function main(){
    const app = express();

    const connection = await mongoose.connect('mongodb://localhost:27017/hzs');

    app.use(express.json())


    app.post('/test', function (request, response, next){
    
        console.log(request.body)
    
        response.status(200).send();
    })
    
    app.use('/user', userRouter)
    
    const PORT = 3000;
    
    app.listen(PORT, function(){
        console.log(`Server je pokrenut na portu: ${PORT}`)
    })
}

main();

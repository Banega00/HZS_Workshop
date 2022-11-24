import { User } from "../models/User.model.js";
import crypto from 'crypto';
export default class UserController{

    constructor(){

    }

    registerUser = async function(request, response, next){

        const body = request.body;

        let username = body.username;
        let password = body.password;
        let name = body.name;

        
        const existingUser = await User.findOne({username});
        
        if(existingUser){
            console.log(existingUser)
            console.log("User already exists");
            response.status(400).send();
            return;
        }
        
        password = crypto.createHash('sha256').update(password).digest('hex');

        const user = new User({username, password, name});

        await user.save();

        console.log(`User ${username} already exists`)
        response.status(200).send();
    }

    loginUser = function(request, response, next){

        const body = request.body;

        console.log("Zahtev za registracijom je stigao")
        console.log(body)

        response.status(200).send();

    }
}
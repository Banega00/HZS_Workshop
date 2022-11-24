import { User } from "../models/User.model.js";
export default class UserController{

    constructor(){

    }

    registerUser = async function(request, response, next){

        const body = request.body;

        const username = body.username;
        const password = body.password;
        const name = body.name;

        const user = new User({username, password, name});

        const existingUser = await User.findOne({username});

        if(existingUser){
            console.log(existingUser)
            console.log("User already exists");
            response.status(400).send();
            return;
        }

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
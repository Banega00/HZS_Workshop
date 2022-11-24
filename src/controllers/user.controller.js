import { User } from "../models/User.model.js";
import { encodeJWT } from '../utils/jwt.js'
import { hash } from '../utils/util-functions.js'
export default class UserController{

    constructor(){

    }

    registerUser = async function(request, response, next){

        const body = request.body;

        let username = body.username;
        let password = body.password;
        let name = body.name;

        if(!username || !password || !name) return response.status(400).json({message: 'Required properties missing for register (name, username, password)'})

        
        const existingUser = await User.findOne({username});
        
        if(existingUser){
            console.log(existingUser)
            console.log("User already exists");
            response.status(400).send();
            return;
        }
        
        password = hash(password)

        const user = new User({username, password, name});

        await user.save();

        console.log(`User ${username} successfully registered`);

        const token = encodeJWT({name: user.name, username: user.username});

        response.cookie('token', token);

        response.status(200).json({token});
    }

    loginUser = async function(request, response, next){
        const body = request.body;

        let username = body.username;
        let password = body.password;

        if(!username || !password) return response.status(400).json({message: 'Required properties missing for login (username, password)'})

        const user = await User.findOne({username});

        if(!user) return response.status(400).json({message: `User with username ${username} does not exists!`})

        const hashedPassword = hash(password);

        if(user.password != hashedPassword) return response.status(400).json({message: `Invalid password for user: ${username}`})
    
        console.log(`User ${username} successfully logged in`);

        const token = encodeJWT({name: user.name, username: user.username});

        response.cookie('token', token);

        response.status(200).json({token});
    }
}
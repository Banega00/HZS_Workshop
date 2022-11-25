import { User } from "../models/User.model.js";
import { encodeJWT } from '../utils/jwt.js'
import { hash } from '../utils/util-functions.js'
export default class UserController{

    constructor(){

    }

    registerUser = async function(request, response, next){
        try{
            const body = request.body;

            let username = body.username;
            let password = body.password;
            let firstName = body.firstName;
            let lastName = body.lastName;
            let email = body.email;
            let phoneNumber = body.phoneNumber;
            let description = body.description;
    
            if(!username || !password || !firstName || !lastName || !email || !phoneNumber){
                return response.status(400).json({message: 'Required properties missing for register'})
            } 
    
            
            const existingUser = await User.findOne({username});
            
            if(existingUser){
                console.log(existingUser)
                console.log("User already exists");
                response.status(400).send();
                return;
            }
            
            password = hash(password)
    
            const user = await User.create({username, password, firstName, lastName, email, phoneNumber, description});
    
            console.log(`User ${username} successfully registered`);
    
            const token = encodeJWT({name: user.name, username: user.username, id: user.id, firstName, lastName});
    
            response.cookie('token', token);
    
            response.status(200).json({token});
        }catch(error){
            console.log(error);
            return response.status(500).json({message: 'Error registering'})
        }
    }

    loginUser = async function(request, response, next){
        try{
            const body = request.body;

            let username = body.username;
            let password = body.password;
    
            if(!username || !password) return response.status(400).json({message: 'Required properties missing for login (username, password)'})
    
            const user = await User.findOne({username});
    
            if(!user) return response.status(400).json({message: `User with username ${username} does not exists!`})
            
            const hashedPassword = hash(password);
    
            if(user.password != hashedPassword) return response.status(400).json({message: `Invalid password for user: ${username}`})
        
            console.log(`User ${username} successfully logged in`);
    
            const token = encodeJWT({
                name: user.name, 
                username: user.username, 
                id: user.id, 
                firstName: user.firstName, 
                lastName: user.lastName
            });
    
            response.cookie('token', token);
    
            response.status(200).json({token});
        }catch(error){
            console.log(error);
            return response.status(500).json({message: 'Error logging in'})
        }
    }

    getUserPhotos = async function(request, response){
        try{
            const username = request.params.username;
    
            const user = await User.findOne({username: username}, '-password').populate('photos')
    
            return response.status(200).json(user); 
        }catch(error){
            console.log(error);
            return response.status(500).json({message:'Error getting user photos'})
        }
    }
}
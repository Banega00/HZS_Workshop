
import { Photo } from "../models/Photo.model.js";
import { User } from "../models/User.model.js";
export class MainController{

    test = function(request, response, next){
        response.status(200).send();
    }

    addPhoto = async function(request, response, next){
        try{
            const body = request.body;
            const file = request.file;
    
            const user = response.locals.user;
    
            if(!user) return response.status(401).json({message: 'Unknown user'})
    
            if(!body.title) return response.status(400).json({message: 'Invalid body'}) 
    
            if(!file) return response.status(400).json({message: 'File is missing from request'}) 
    
            const mongoUser = await User.findById(user.id);
    
            if(!mongoUser) return response.status(401).json({message: 'Unknown user'})
    
            const photo = await Photo.create({
                title: body.title, user: mongoUser, 
                filename: file.filename, 
                path:`/public/photos/${file.filename}`})
    
            response.status(200).json(photo);
        }catch(error){
            console.log(error)
            return response.status(401).json({message: 'Error adding the photo'})
        }
    }

    getPhoto = async function(request, response, next){
        const id = request.params.id;

        if(!id) return response.status(400).send({message: 'Missing photo id'})

        const photo = await Photo.findById(id).populate('user', '-password');

        if(!photo) return response.status(404).send({message: 'Photo not found'})

        response.status(200).json(photo);
    }

    getAllPhotos = async function(request, response, next){
        const photos = await Photo.find().populate('user', '-password');
        
        response.status(200).json(photos);
    }

    deletePhoto = async function(request, response, next){
        try{
            const user = response.locals.user;
            const id = request.params.id;
    
            if(!id) return response.status(400).send({message: 'Missing photo id'})
    
            const photo = await Photo.findById(id).populate('user')
    
            if(photo.user.username != user.username) return response.status(403).send({message: 'You are not allowed to delete other user photo'})
            
            await photo.delete();
    
            response.status(200).json({message:'photo successfully delted'});
        }catch(error){
            console.log(error);
            return response.status(500).send({message: 'Error deleting photo'})
        }
        
    }
}
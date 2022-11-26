
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
    
            const {title, filename, description, hashtags, location, createdAt} = body
    
            const photo = await Photo.create({
                title: title, 
                description: description ?? '',
                hashtags,
                location,
                createdAt,
                filename: filename})

            response.status(200).json();
        }catch(error){
            console.log(error)
            return response.status(400).json({message: 'Error adding the photo'})
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
            const id = request.params.id;
    
            if(!id) return response.status(400).send({message: 'Missing photo id'})
    
            const photo = await Photo.findById(id)

            if(!photo) return response.status(404).send({message: 'Photo not found'})
    
            await Photo.deleteOne(photo);

            response.status(200).json({message:'photo successfully delted'});
        }catch(error){
            console.log(error);
            return response.status(500).send({message: 'Error deleting photo'})
        }
        
    }
}
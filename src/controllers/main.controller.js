
import { Photo } from "../models/Photo.model.js";
import { User } from "../models/User.model.js";
export class MainController{

    test = function(request, response, next){
        response.status(200).send();
    }

    addPhoto = async function(request, response, next){
        const body = request.body;
        const file = request.file;

        const user = response.locals.user;

        if(!user) return response.status(401).json({message: 'Unknown user'})

        if(!body.title) return response.status(400).json({message: 'Invalid body'}) 

        if(!file) return response.status(400).json({message: 'File is missing from request'}) 

        const mongoUser = await User.findById(user.id);

        if(!mongoUser) return response.status(401).json({message: 'Unknown user'})

        const photo = await Photo.create({title: body.title, user: mongoUser, filename: file.filename})

        response.status(200).json(photo);
    }

    getPhoto = async function(request, response, next){
        const id = request.params.id;

        if(!id) return response.status(400).send({message: 'Missing photo id'})

        const photo = await Photo.findById(id);

        response.status(200).json(photo);
    }

    getAllPhotos = async function(request, response, next){
        const photos = await Photo.find();
        
        response.status(200).json(photos);
    }
}
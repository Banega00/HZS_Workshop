import mongoose, { Schema } from 'mongoose';
import { photoSchema } from '../models/Photo.model.js';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    description: String,
    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }]
});

export const User = mongoose.model('User', userSchema);
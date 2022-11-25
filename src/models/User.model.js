import mongoose, { Schema } from 'mongoose';
import { photoSchema } from '../models/Photo.model.js';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: String,
    name: String,
    photos: [{
        type: Schema.Types.ObjectId,
        ref: "Photo"
    }]
});

export const User = mongoose.model('User', userSchema);
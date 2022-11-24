import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: String,
    name: String,
    
});

export const Photo = mongoose.model('photo', photoSchema);
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: String,
    name: String,
    
});

export const User = mongoose.model('User', userSchema);
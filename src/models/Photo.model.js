import mongoose, { Schema } from 'mongoose'

export const photoSchema = new mongoose.Schema({
    title: String,
    filename: String,
    description: String,
    hashtags: String,
    location: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Photo = mongoose.model('Photo', photoSchema);
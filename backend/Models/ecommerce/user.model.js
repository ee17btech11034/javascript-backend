import mongoose from 'mongoose'

// const userSchema = new mongoose.Schema({}, {timestamps: true})
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
    
}, {timestamps: true})


export const userModel = mongoose.model("User", userSchema)
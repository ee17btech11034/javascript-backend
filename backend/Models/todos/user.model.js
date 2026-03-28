// user.model.js tells that it is JS file but related to Data Models for User.

//3 steps for mongoose

// 1. import mongoose
import mongoose from 'mongoose'


// 2. Create a Schema

// const userSchema = new mongoose.Schema({}) // 


/*
const userSchema = new mongoose.Schema({ // define schema
    username: String,
    email: String,
    isActive: Boolean
}) 
*/

const userSchema = new mongoose.Schema({
    username: { // add validations
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        required: [true, 'password is required'] // these accept req with msg if missing

    }
}, {timestamps: true}) // this adds 2 timestamps "createdAt, updatedAt"

// 3. Create a model and export it

export const userModel = mongoose.model("User", userSchema) // Create a model of name "User" in Db based on the Schema and i will access that "User" using model.

// In DB its name becomes plural ('users' from "User")
import mongoose, {Schema, model} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    username: {
        type: Sting,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // it makes it searchable in optimized way, decrease some performance, that's select carefully, which column you want to enable index -> expensive 
    },
    email: {
        type: Sting,
        required: true,
        unique: true,
        lowercase: true,
        trim: true // we can directly search it so no need of index
    },
    fullname: {
        type: Sting,
        required: true,
        trim: true,
    },
    avatar: {
        type: Sting, // storing only cloudnary link
        required: true,
    },
    coverImage: {
        type: Sting, // storing only cloudnary link
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    pasword: {
        type: String, // encrypted
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String,
    }
}, {timestamps: true})


// userSchema.pre("save", ()=>{})// prefer not to use Arrow function as we will need this (context of this current user.)
userSchema.pre("save", async function (next){
    // this.password = bcrypt.hash(this.password, 10) // content, rounds(use this to hash)
    // in above line issue is when ever user make any change change in user model it will run and update the password.
    // so better to run only when password is changed.

    if (! this.isModified("password")) return;
    
    this.password = bcrypt.hash(this.password, 10) // content, rounds(use this to hash)
    next()
})


// methods as middleware
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}


//
userSchema.methods.generateAccessToken = function (){
    return jwt.sign( // generally it does not take time so not using async-await, but we can.
        { // payload
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, // token secret
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    // return a token
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign( // generally it does not take time so not using async-await, but we can.
        { // payload
            _id: this._id, // it containes only id
        },
        process.env.REFRESH_TOKEN_SECRET, // token secret
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    // return a token
}

export const userModel = model("User", userSchema)
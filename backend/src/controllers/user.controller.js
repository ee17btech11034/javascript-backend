import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { userModel } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler ( async (requestAnimationFrame, res)=>{
    // get user details from frontend --> here we will use Postman
    // validation -> not empty
    // check if user already exist?
    // check for images and avatar
    // upload them to cloudinary
    // create user object bcz in mongodb we upload objects -> create entry call and return the complete object (encrypted password as well)
    //  remove password and refresh token feed from return
    // check for user creation
    // return response else error.


    const {fullname, email, password, username } = req.body

    // if (fullname===""){ // can check one by one or 
    //     throw new ApiError(400, "fullname is required")
    // }
    if ([fullname, email, username, password].some((field)=>{
            field?.field.trim()===""})
        ) {
            throw new ApiError(400, "all fields are required")
    } // we can write all the validation function in a seperate file and then call them here to validate.


    // userModel.findOne({email}) // checking one by one
    const existedUser = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser){
        throw new ApiError(409, "User with username or email already exist")
    }



    const avatarLocalpath = req.files?.avatar[0]?.path
    // const coverImageLocalpath = req.files?.coverImage[0]?.path // we get issues if user does not provide this cover image bcz we did not check this in if.


    if (! avatarLocalpath){
        throw new ApiError(400, "Avatar file is required!")
    }

    let coverImageLocalpath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalpath = req.files.coverImage[0].path
    }

    const avatarURI = await uploadOnCloudinary(avatarLocalpath)
    const coverImageURI = await uploadOnCloudinary(coverImageLocalpath)

    if (! avatarURI){
        throw new ApiError(400, "Avatar file is required")
    }

    const userObj = await userModel.create({
        fullname,
        avatar: avatarURI.url,
        coverImage: coverImageURI?.url,
        email,
        password,
        username: username.tolowerCase()
    })

    // const createdUser = await userObj.findById(user._id) // a way to validate if user is created?
    const createdUser = await userObj.findById(user._id).select("-password -refreshToken") // it says return without password and refresh token

    if (! createdUser){
        throw new ApiError(500, "error while registering the user.")
    }


    // return res.status(201).json({})
    return res.status(201).json(new ApiResponse(201,  createdUser, "User registered successfully."))
})

export default registerUser
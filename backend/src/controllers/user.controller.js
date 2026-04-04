import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { userModel } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import jwt from 'jsonwebtoken' 


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



// log in user 
const loginUser = asyncHandler(async(req, res)=>{
    // re.body -> data 
    // username or email
    // find the user 
    // password check 
    // access and refresh token 
    // send these tokens as cookies.


    const {emai, username, password} = req.body

    if ((! username) || (! email)){
        throw new ApiError(400, "uname or email is required")
    }

    const user = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if (! user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid){
        throw new ApiError(401, "invalid user creds")
    }


    // generate access and refresh token
    // better to create a new function or write both in here. 
    let accessToken;
    let refreshToken;
    try {
        accessToken = user.generateAccessToken()
        refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        // user.save() // we have save method from mongoose but when we do ths it checks all the required parameters. 
        // we use
        await user.save({validateBeforeSave: false}) // do not validate before save 


    } catch (error) {
        throw new ApiError(500, "Error while gen both tokens")
    }


    // cookies 
    const options = {
        httpOnly: true,
        secure: true // ensure that only server modify these
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {
                    user: user, //loggedInUser
                    accessToken,
                    refreshToken
                }, // why sending when done same in cookies. Cookies are only for browsers not for mobile devices.
                "User logged in successfully"
            )
        )

})


const logoutUser = asyncHandler(async(req, res)=>{
    // remove access and refresh tokens from cookies
    // set refresh token for that user to null or ""

    // But Q is how will we get user datat or id??????

    // we will use middleware

    await userModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})


const refreshAccessToken = asyncHandler(async(req, res)=>{
        // get refresh token from cookies
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken // or req.headers.refreshToken

        if (!incomingRefreshToken){
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify( // if we decoded means we have id of user
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await userModel.findById(decodedToken?._id)

        if (!user){
            throw new ApiError(401, "Invalid refreshToken")
        }

        // we can match that the token we got from cookies and user from id in cookies are same or not. 

        if (incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const  newAccessToken = await generateAccessToken()
        const newRefreshToken = await generateRefreshToken()

        return res
                .status(200)
                .cookie("accessToken", newAccessToken)
                .cookie("refreshToken", newRefreshToken)
                .json(
                    new ApiResponse(
                        200, 
                        {accessToken, refreshToken: newRefreshToken}
                    )
                )

})

const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body // user is trying to change this password

    // req.user // is refrering to current logged in user.

    const user = await userModel.findById(req.user?._id)

    const isPassCorrect = await user.isPasswordCorrect(oldPassword)

    if (! isPassCorrect){
        throw new ApiError(400, "Invalid password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false}) // now we are saving means pre will run 

    return res
            .status(200)
            .json(new ApiResponse(200, {}, "Password is changes."))

})


const getCurrentUser = asyncHandler(async(req, res)=>{
    return res 
            .status(200)
            .json(200, req.user, "Current user is fetched")
})

const updateUserDetails = asyncHandler(async (req, res)=>{
    const {gullname, email} = req.body 
    // files upate ke liye create a differen controller or method

    if (!fullname || !email){
        throw new ApiError(400, "All fields are required")
    }

    // req.user?.id  to get the id
    const user = await userModel.findByIdAndUpdate( // takes 3 args, 1. query, 2 updated content, 3. If new:true means returnt he updated user
        req.user?._id,
        {
            $set: { // set accepts new values
                fullname,
                email: email
            }
        },
        {new: true,}
    ).select("-password")

    return res
            .status(200)
            .json(new ApiResponse(200, user, "Account details updated"))
})

const updateUserAvatar = asyncHandler(async(req, res)=>{
    const avatarLocalPath = req.file?.path // assuming we gor the files from user using multer

    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar is missing")
    }

    const updatedAvatarLink = await uploadOnCloudinary(avatarLocalPath)

    if (!updatedAvatarLink.url){
        throw new ApiError(400, "Avatar saved url is missing")
    }

    const user = await userModel.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: updatedAvatarLink.url
            }
        },
        {new: true}
    ).select("-password")

    return res
            .status(200)
            .json(new ApiResponse(200, user, "Avatar is updated"))
}) // we can write same method for cover image as well

export  {registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateUserDetails, updateUserAvatar}
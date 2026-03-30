// only verifies that user exist or not

import { userModel } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler(async (req, res, next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (! token){
        throw new ApiError(401, "Unauthorized req")
    }

    // verify/check the token if token is valid 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await userModel.findById(decodedToken?._id).select("-password -refreshtoken")

    if (!user){
        throw new ApiError(401, "Invalid acess token")
    }

    req.user = user;
    next()
})
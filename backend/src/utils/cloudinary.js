// we take file from our server and then upload it on cloudinary

import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'

cloudinary.config({ // coppy from app after account on cloudinary
    cloud_name: 'raj', // store all these in env file
    api_key: 'sqdxwcxw',
    api_secret: 'dnwoccknwpc'
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (! localFilePath) return null;

        // upload 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // file is uploaded successfully
        // console.log("File is uploaded on Cloudinary: ", response.url);
        // file is uploaded then remove from our server
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        // delete file from our server
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as uploading on cloudinary failed.

        return null;
    }
}

export {uploadOnCloudinary}
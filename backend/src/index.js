import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js';

const app = express()

/* 
// DB in index as IFEE
// starting with ; means that it won't throw error if prev line do not have ;
;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`) // connecting with DB, we can store it if we want
        // sometimes we listen on app to confirm that app is listening.

        app.on("error", (error)=>{ // is there any error in app run
            console.log("Error in app run: ", error)
            throw error
        }) 

        // if no error then 
        app.listen(process.env.APP_LISTEN_PORT, ()=>{
            console.log(`app is listening on ${process.env.APP_LISTEN_PORT}`)
        })
    } catch (error) {
        console.log("Error in connecting DB: ", error)        
    }
})()

*/

dotenv.config({ // we need more setting at 34.15 in "How to connect DB in MERN"
    path: './env'
})


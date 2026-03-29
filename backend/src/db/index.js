import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`connectioninstance: ${connectionInstance}`); // check connectionInstance.connection.host
        
    } catch (error) {
        console.log("Error in connecting DB: ", error)
        process.exit(1) // check this out
    }
}

export default connectDB
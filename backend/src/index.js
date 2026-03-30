import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js';


dotenv.config({ // we need more setting at 34.15 in "How to connect DB in MERN"
    path: './.env'
})

connectDB()
    .then(()=>{
        console.log("DB connection is successful.");
        app.listen(process.env.APP_LISTEN_PORT || 3000, ()=>{
            console.log(`App is listening on port ${process.env.APP_LISTEN_PORT || 3000}`);
            
        })
    }).catch(()=>{
        console.log("DB connection failed");
    })
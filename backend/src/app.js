import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()


//middleware
// app.use(cors())
app.use(cors({
    origin: process.env.CORS_ORIGIN // ctrl + space se options dekh sakte hai
}))


//accept data as json, like form data
app.use(express.json({limit: "16kb"})) // earlier we used body-parser for json but now it is  inbuilt in node.

// data from url
// app.use(express.urlencoded({})) // 
app.use(express.urlencoded({extended: true, limit: "16kb"})) // extended means that nested 


// create a public store which can be accessed by all
app.use(express.static("public"))


//cookies set
app.use(cookieParser())

export {app}
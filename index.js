const express = require('express') // way in Module JS
// import express from "express" // this is a way in common JS  (both are correct)

require('dotenv').config() // accuire .env file

const app = express() // create a app object from express (Factory method), i can access all the properties of express
const port = 3000 // we have ports like USB, C, etc. Same there are virtual ports around > 65000 ports
// our server will listen on this port.

app.get('/', (req, res) => { // if we get any req with "/" path then 
  res.send('Hello World!')// send this in res
})

app.get('/login', (req, res) => { // if we get any req with "/" path then 
  res.send('You are logged in!')// send this in res
})

app.get('/signup', (req, res) => { // if we get any req with "/" path then 
  res.send('<h1>Sign Up</h1>')// can send HTML in res
})

// app.listen(port, () => { // it constantly listens 
//   console.log(`Example app listening on port ${port}`)
//   console.log(`Click http://localhost:/${port}`)
// })

// using .env file config
app.listen(process.env.APP_LISTEN_PORT, () => { // using port number from env file
  console.log(`Example app listening on port ${process.env.APP_LISTEN_PORT}`)
  console.log(`Click http://localhost:/${process.env.APP_LISTEN_PORT}`)
})

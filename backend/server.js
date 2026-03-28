import express from "express" // assemble it as module form 
// require('dotenv').config() // accuire .env file

const app = express();

const port = process.env.APP_LISTEN_PORT || 4000; // find a way to accesss this var

app.get('/', (req, res)=>{
    res.send("Hi from Raja")
})

/*
app.get('/jokes', (req, res)=>{
    const jokes = [
        {
            id: 1,
            title: "joke 1",
            content: "This is joke 1"
        },
        {
            id: 2,
            title: "joke 2",
            content: "This is joke 2"
        },
        {
            id: 3,
            title: "joke 3",
            content: "This is joke 3"
        },
        {
            id: 4,
            title: "joke 4",
            content: "This is joke 4"
        },
        {
            id: 5,
            title: "joke 5",
            content: "This is joke 5"
        },
    ]

    res.json(jokes)
})
// Got COR error
*/

app.get('/api/jokes', (req, res)=>{ //api/version/path --> right now not using version
    const jokes = [
        {
            id: 1,
            title: "joke 1",
            content: "This is joke 1"
        },
        {
            id: 2,
            title: "joke 2",
            content: "This is joke 2"
        },
        {
            id: 3,
            title: "joke 3",
            content: "This is joke 3"
        },
        {
            id: 4,
            title: "joke 4",
            content: "This is joke 4"
        },
        {
            id: 5,
            title: "joke 5",
            content: "This is joke 5"
        },
    ]

    res.json(jokes)
})

app.listen(port, ()=>{
    console.log(`Application has started at: http://localhost:/${port}`)
})
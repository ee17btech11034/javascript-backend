import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  // create a state so that i can pull jokes from API
  const [jokes, setJokes] = useState([])

  /*
  useEffect(()=>{
    axios.get('http://localhost:4000/jokes') // as this is the host api from backend
        .then((response)=>{
          setJokes(response.data) // axios automatically datat ko JSON bana deta hai, additional functionality
        })
        .catch((error)=>{
          console.log(`Error while fetching joke: ${error}`)
        })
  }) // CORS policy issue got when I ran this

  */

  useEffect(()=>{
    // axios.get('http://localhost:4000/api/jokes') // everytime if we are writing this whole domain name is unnecessary
    axios.get('/api/jokes') // we will hit the real standard api path, and use proxy for the first part.
        .then((response)=>{
          setJokes(response.data) // axios automatically datat ko JSON bana deta hai, additional functionality
        })
        .catch((error)=>{
          console.log(`Error while fetching joke: ${error}`)
        })
  }) // CORS policy issue got when I ran this
  return (
    <>
      <h1> Hello from backend</h1>
      <p>Total jokes: {jokes.length}</p>

      {
        jokes.map((joke)=>(
          <div key={joke.id}>
            <h6>{joke.title}</h6>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App

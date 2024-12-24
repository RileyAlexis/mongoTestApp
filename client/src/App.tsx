import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })
  })


  return (
    <div>
      <h1>Full Stack App for Mongo DB</h1>
    </div>
  )
}

export default App

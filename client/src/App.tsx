import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [allData, setAllData] = useState("");

  const getData = () => {
    axios.get('/api/testDb')
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  const submitData = ((event: any) => {
    event.preventDefault();
    axios.post('/api/testDb', { name, text, allData })
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
  })


  return (
    <div>
      <h1>Full Stack App for Mongo DB</h1>
      <form onSubmit={(event) => submitData(event)} >
        Name:<input type='text' onChange={(event) => setName(event.target.value)} />
        Text:<input type='text' onChange={(event) => setText(event.target.value)} />
        Data:<input type='text' onChange={(event) => setData(event.target.value)} />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={getData}>Get Data</button>
    </div>
  );
}

export default App

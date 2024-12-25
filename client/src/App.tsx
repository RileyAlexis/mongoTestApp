import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [details, setDetails] = useState("");
  const [allData, setAllData] = useState([]);

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
    axios.post('/api/testDb', { name, text, details })
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
  })

  const deleteRecord = ((id: string) => {
    console.log(id);
    axios.delete(`/api/testDb/${id}`)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
    getData();
  });

  const handleUpdate = ((id: string) => {
    console.log(id);
    axios.post(`/api/updatename/${id}`)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
    getData();
  });


  return (
    <div>
      <h1>Full Stack App for Mongo DB</h1>
      <form onSubmit={(event) => submitData(event)} >
        Name:<input type='text' onChange={(event) => setName(event.target.value)} />
        Text:<input type='text' onChange={(event) => setText(event.target.value)} />
        Details:<input type='text' onChange={(event) => setDetails(event.target.value)} />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={getData}>Get Data</button>
      {allData.length > 0 &&
        allData.map((item) => (
          <div key={item._id.toString()} style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'

          }}>
            <a onClick={() => deleteRecord(item._id.toString())} style={{
              cursor: 'pointer',
              color: 'red',
              marginLeft: 15
            }}>X</a>
            <p>{item.name}, {item.text}, {item.details}, {item._id}</p>
            <a onClick={() => handleUpdate(item._id.toString())} style={{
              cursor: 'pointer',
              color: 'green',
              margin: 25
            }}>Update</a>
          </div>
        ))
      }
    </div >
  );
}

export default App

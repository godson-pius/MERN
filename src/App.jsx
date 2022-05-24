import { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css'

function App() {
  const url = "https://crudbackendapi.herokuapp.com";
  const [name, setName] = useState('')
  const [age, setAge] = useState()
  const [username, setUsername] = useState('')
  const [students, setStudents] = useState([])

  useEffect(() => {
   Axios.get(`${url}/getStudents`).then(res => {
      setStudents(res.data)
   })

   // Clean up function
   return () => {}
  }, [])

  const handleCreate = () => {
    let data = {
      name,
      age,
      username
    }

    Axios.post(`${url}/createStudent`, data).then(res => {
      setStudents([...students, data])
      console.log('Entered')

      // Return input fields to default...
      setName('')
      setAge(0)
      setUsername('')
    }).catch(err => {
      console.log(err)
    })

  }

  const showData = (e) => {
    const data = students[e]
    
    alert(`Student Details: \n\n Name: ${data.name} \n Age: ${data.age} \n Username: ${data.username}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container pt-3">
        <h1 className="mb-5">SAVE STUDENT</h1>
        <div className="row">
          <div className="col-lg-6">
            <input type="text" className='form-control mb-2 opacity-50' value={name} placeholder='Name....' onChange={e => setName(e.target.value)} />
            <input type="number" className='form-control mb-2 opacity-50' value={age} placeholder='Age....' onChange={e => setAge(e.target.value)} />
            <input type="text" className='form-control mb-2 opacity-50' value={username} placeholder='Username....' onChange={e => setUsername(e.target.value)} />
            <button onClick={handleCreate} className='btn btn-light btn-sm w-100 mb-4'>Save Student</button>
          </div>
          <div className="col-lg-6">
            <h5>Available Students</h5>

            <div className="hold__data">
              { students.map((data, index) => {
                return (
                  <div onClick={() => showData(index)} key={index} className="shadow-sm p-1 mb-2 bg-body rounded text-dark data">
                    <h5>{ data.name }</h5>
                  </div>
                )
              }) }

            </div>
            <h5 className='mt-2 text-muted'>This is scrollable</h5>

            

            
          </div>
        </div>
        </div>
      </header>
    </div>
  )
}

export default App

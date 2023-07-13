import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState("")
  
  useEffect(() => {
    axios.get('http://127.0.0.1:6969/api/hierarchy/getall')
      .then(res => {
        console.log(res.data)
        setData(res.data)
      }
    )
    .catch(err => {
      console.log(err)
    }
  )
  },[])

  return (
    <>
      <div>
        Hello Employees
      </div>
      <div>
        {data && data.data.map((item, index) => {
          return (
            <div key={index}>
              {item.Ename}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App

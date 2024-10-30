import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  const [values, setVAlues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChanges = (e) => {
    setVAlues({...values, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values)
      if(response.status === 201){
        localStorage.setItem('token', response.data.token)
        navigate('/')
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email'  name='email' onChange={handleChanges}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password'  name='password' onChange={handleChanges}/>
          </div>
          <button>Submit</button>
        </form>
        <div>
          <p>Don't Have Account?</p>
          <Link to='/Register'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
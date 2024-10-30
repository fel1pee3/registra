import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [values, setVAlues] = useState({
    username: '',
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
      const response = await axios.post('http://localhost:3000/auth/register', values)
      if(response.status === 201){
        navigate('/login')
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
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Enter Username'  name='username' onChange={handleChanges}/>
          </div>
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
          <p>Already Have Account?</p>
          <Link to='/Login'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
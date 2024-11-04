import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../components/Logo/Logo'
import './Login.css'

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
    <div className='pageLogin'>
      <div className='containerLogin'>
      <Logo />
        <form onSubmit={handleSubmit} className='formLogin'>
          <div className='caixaImput'>
            <label className='label' htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email'  name='email' onChange={handleChanges} className='input'/>
          </div>
          <div className='caixaImput'>
            <label className='label' htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password'  name='password' onChange={handleChanges} className='input'/>
          </div>
          <button className='btn'>Login</button>
        </form>
        <div className='caixaMore'>
          <p className='pMore'>Don't Have Account?</p>
          <Link to='/Register' className='linkMore'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
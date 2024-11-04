import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../components/Logo/Logo'
import './Register.css'

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
    <div className='pageRegister'>
      <div className='containerRegister'>
        <Logo />
        <form className='formRegister' onSubmit={handleSubmit}>
          <div className='caixaImput'>
            <label htmlFor="username" className='label'>Seu nome</label>
            <input type="text" placeholder='Nome Sobrenome'  name='username' onChange={handleChanges} className='input'/>
          </div>
          <div className='caixaImput'>
            <label htmlFor="email" className='label'>Email</label>
            <input type="email" placeholder='email@gmail.com'  name='email' onChange={handleChanges} className='input'/>
          </div>
          <div className='caixaImput'>
            <label htmlFor="password" className='label'>Password</label>
            <input type="password" placeholder='senha@12345'  name='password' onChange={handleChanges} className='input'/>
          </div>
          <button className='btn'>Cadastrar</button>
        </form>
        <div className='caixaMore'>
          <p className='pMore'>Already Have Account?</p>
          <Link className='linkMore' to='/Login'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
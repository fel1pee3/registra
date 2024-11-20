import React from 'react'
import Header from '../../components/Header/Header'
import CardProfile from '../../components/CardProfile/CardProfile'
import './Profile.css'

const Profile = () => {
  return (
    <div className='pageProfile'>
        <Header />
        <div className='contentProfile'>
        <div className='startPage'>
          <span>Perfil</span>
        </div>
        <CardProfile />
      </div>
    </div>
  )
}

export default Profile
import React from 'react'
import Header from '../../components/Header/Header'
import CardProfile from '../../components/CardProfile/CardProfile'
import './Profile.css'
import LeaderCode from '../../components/LeaderCode/LeaderCode'
import LeaderConnection from '../../components/LeaderConnection/LeaderConnection'

const Profile = () => {
  return (
    <div className='pageProfile'>
        <Header />
        <div className='contentProfile'>
        <div className='startPage'>
          <span>Perfil</span>
        </div>
        <CardProfile />
        <LeaderCode />
        <LeaderConnection />
      </div>
    </div>
  )
}

export default Profile
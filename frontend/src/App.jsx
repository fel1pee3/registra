import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Occurrences from './pages/Occurrences/Occurrences'
import Search from './pages/Search/Search'
import ReportsCreated from './pages/ReportsCreated/ReportsCreated'
import Profile from './pages/Profile/Profile'
import AddOccurrence from './pages/AddOccurrence/AddOccurrence'
import AddReport from './pages/AddReports/AddReport'
import ViewOccurrence from './pages/ViewOccurrence/ViewOccurrence'
import ViewReport from './pages/ViewReport/ViewReport'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/occurrences' element={<Occurrences />}></Route>
        <Route path='/addOccurrence' element={<AddOccurrence />}></Route>
        <Route path='/viewOccurrence/:id' element={<ViewOccurrence />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/reportsCreated' element={<ReportsCreated />}></Route>
        <Route path='/addReport' element={<AddReport />}></Route>
        <Route path='/viewReport/:id' element={<ViewReport />}></Route>
        <Route path='/profile' element={<Profile />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import Login from './components/authentication/Login'
import { Route, Routes } from 'react-router-dom'
import Chat from './components/main/chat'
import SignupPage from './components/authentication/Register'
import GeminiSubscription from './components/trygemini/try'
import Settings from './components/interface/setting'
import Help from './components/interface/help'
import Profile from './components/interface/profile'
import AppNavbar from './components/interface/about'
import SettingsPage from './components/interface/setting'

function App() {
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/auth" element={<div ><Chat /></div>} />
        <Route path='/register' element={<SignupPage />} />
        <Route path='/trygemini' element={<GeminiSubscription />} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route  path='/help' element={<Help />} />
        <Route path='/profile' element={<Profile />} />
        <Route   path='/about' element={<AppNavbar />} />
      </Routes>
    
    </div>
  )
}

export default App


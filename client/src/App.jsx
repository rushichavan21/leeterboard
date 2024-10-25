import React from 'react'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import Login from './Components/Login'
import SignupPage from './Components/Signup'
import Hero from './Components/Hero'
import { useAuthContext } from './Hooks/useAuthContext'
const App = () => {
  const {user}=useAuthContext();

  return (
    <div>
    
      <Routes>
        <Route path='/login' element={!user? <Login/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!user?<SignupPage/>:<Navigate to='/'/>}/>
        <Route path='/' element={user?<Hero/>:<Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import Login from './Components/Login'
import SignupPage from './Components/Signup'
import { useAuthContext } from './Hooks/useAuthContext'
import SnapPage from './Components/SnapPage'
import NewHome from './NewComp/NewHome'
const App = () => {
  const {user,loading}=useAuthContext();
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Routes>
        <Route path='/login' element={!user? <Login/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!user?<SignupPage/>:<Navigate to='/'/>}/>
        <Route path='/' element={user?<NewHome/>:<Navigate to="/login"/>}/>
        <Route path='/generate_snap' element={user?<SnapPage/>:<Navigate to="/login"/>}/>
        <Route path='/testing' element={<NewHome/>}/>
      </Routes>
    </div>
  )
}

export default App

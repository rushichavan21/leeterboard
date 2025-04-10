import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import SignupPage from './pages/Signup/Signup'
import { useAuthContext } from './Hooks/useAuthContext'
import SnapPage from './pages/Snap/SnapPage'
import Home from './pages/Home/Home'
import Discuss from './pages/Discuss/Interview'
import Experience from './Components/Experience/Experience'
import VjtiCustom from './pages/vjticustom/vjticustom'

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
        <Route path='/' element={user?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/vjti' element={user?<VjtiCustom/>:<Navigate to="/login"/>}/>
        <Route path='/generate_snap' element={user?<SnapPage/>:<Navigate to="/login"/>}/>
        <Route path='/discuss' element={user?<Discuss/>:<Navigate to="/login"/>}/>
        <Route path='/experience/:id' element={user?<Experience/>:<Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App

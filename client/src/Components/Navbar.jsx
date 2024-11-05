import React from 'react'
import '../Styles/Navbar.css'
import { useAuthContext } from '../Hooks/useAuthContext'; 
import { useNavigate , useLocation } from 'react-router-dom';
import toast ,{Toaster} from 'react-hot-toast'

const Navbar = () => {
    const navigate = useNavigate();
    let location=useLocation()
    const { user ,dispatch} = useAuthContext();
    const displayEmail = user?.email ? `Welcome: ${user.email.slice(0, 10)}...` : 'email';
    const handleLogout=()=>{
        localStorage.removeItem('user');
        dispatch({type:"LOGOUT"});
        console.log('logout')
    }
    const handlehome=()=>{

      if(location.pathname==='/'){
        toast('You are on HomePage Already', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontWeight: '400',
            fontFamily: 'Poppins, sans-serif',
          },
        });
      }
      navigate('/');
    }
    const handleGenerate=()=>{
  if (location.pathname === '/generate_snap') {
    toast('You are on the Generate_snap Page Already', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontWeight: '400',
        fontFamily: 'Poppins, sans-serif',
      },
    });
  } else {
    navigate('/generate_snap');
  }
  }
    const handleRefresh=()=>{
      navigate('/');
      window.location.reload();
    }
  return (
    <>
    <div className='Navbar container'>
      <div className="title" onClick={handleRefresh}>
        <h2>LeeterBoard</h2>
      </div>
      <div className="userData">
        <h2>{displayEmail}</h2>
        <button className='Buttons' onClick={handleLogout}>logout</button>
      </div>
    </div>
    <div className="toggle container">
      <div className="toggle--options">
        <ul>
          <button className='toggle--buttons Buttons' onClick={handlehome}>Home</button>
          <button className='toggle--buttons Buttons' id='feature' onClick={handleGenerate}>Generate a snap</button>
        </ul>
      </div>
    </div>
    </>

  )
}

export default Navbar;

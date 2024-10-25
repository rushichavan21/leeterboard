import React from 'react'
import '../Styles/Navbar.css'
import { useAuthContext } from '../Hooks/useAuthContext'; 


const Navbar = () => {
    const { user ,dispatch} = useAuthContext();
    const displayEmail = user?.email ? `Welcome: ${user.email.slice(0, 10)}...` : 'email';
    const handleLogout=()=>{
        localStorage.removeItem('user');
        dispatch({type:"LOGOUT"});
        console.log('logout')

    }
  return (
    <>
    <div className='Navbar container'>
      <div className="title">
        <h2>LeeterBoard</h2>
      </div>
      <div className="userData">
        <h2>{displayEmail}</h2>
        <button className='Buttons' onClick={handleLogout}>logout</button>
      </div>
    </div>
    </>

  )
}

export default Navbar

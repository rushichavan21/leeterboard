
import toast ,{Toaster} from 'react-hot-toast'
import './Login.css';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useAuthContext } from '../../Hooks/useAuthContext';
import axios from 'axios';
const Login = () => {
  const { dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit= async(e)=>{
    e.preventDefault();
   try {
    toast('Please Wait', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontWeight: '400',
        fontFamily: 'Poppins, sans-serif',
      },
    });
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    const json = response.data;
    localStorage.setItem("user", JSON.stringify(json));
    dispatch({ type: "LOGIN", payload: json });
    toast.success("Login success",{
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
   } catch (err) {
    if (err.response && err.response.status === 404) {
      toast.error("User not found. Please sign up first.",{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontFamily:'poppins',
          fontWeight:'500'
        },
      })
    } else if (err.response && err.response.status === 401) {
      toast.error("Incorrect password. Please try again.",{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    } else {
      toast.error("An Error occurred.Please try again.",{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
   }
  }

  return (
    <div className='landing-container '>
      <Toaster
  position="top-center"
  reverseOrder={true}
/>
   
      <div className='title container'>
        Leeter-Board
      </div>

      <div className='subtitle container'>
        Track and Compete with Your Friends on LeetCode
      </div>

      {/* Login Section */}
      <div className="login-form ">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input type="email"
            name='email'
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your Email' />
          </div>

          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password' />
          </div>

          <button type='submit' className='login-button'>Login</button>
        </form>
      </div>

      {/* Optional Footer or Additional Links */}
      <div className='footer container'>
        <p>Don't have an account? <Link to='/signup'>signup</Link></p>
      </div>
    </div>
  )
}

export default Login;

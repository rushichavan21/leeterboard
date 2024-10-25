import React from 'react';
import '../Styles/Login.css';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import axios from 'axios';
const Login = () => {
  const { dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    const json = response.data;
    localStorage.setItem("user", JSON.stringify(json));
    dispatch({ type: "LOGIN", payload: json });
    setSuccess("Signin successful!");
      setError("");
   } catch (err) {
    if (err.response && err.response.status === 404) {
      setError("User not found. Please sign up first.");
    } else if (err.response && err.response.status === 401) {
      setError("Incorrect password. Please try again.");
    } else {
      setError("An error occurred. Please try again.");
    }

    setError(err.response?.data?.message || "Login failed. Please try again."); 
      setSuccess("");

   }
  }

  return (
    <div className='landing-container '>
   
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
      {error && <p className="error-message">{`${error}`}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  )
}

export default Login;

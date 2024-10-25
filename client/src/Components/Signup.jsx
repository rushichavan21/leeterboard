import React from "react";
import "../Styles/SignupPage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

const SignupPage = () => {
  const { dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const json = response.data;

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setSuccess("Signup successful!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again."); 
      setSuccess("");

    }
  };
  return (
    <div className="landing-container signupPage">
      <div className="namePlate container">
        <div className="title">LeeterBoard</div>
        <div className="subtitle">
          Create an account and join the competition!
        </div>

        <div>
          {error && <p className="error-message">{`${error}`}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>

      <div className="login-form signup-form container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
        <div className="redirect">
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

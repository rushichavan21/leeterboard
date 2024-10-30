import React from "react";
import toast, { Toaster } from "react-hot-toast";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
        },
      });
      return;
    }

    try {
      toast.success("loading...", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
        },
      });
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/signup`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      const json = response.data;

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      toast.success("Signup successful!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
        },
      });
    } catch (err) {
      toast.error("Signup failed. please try again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontWeight: "400",
          fontFamily: "Poppins, sans-serif",
        },
      });
    }
  };
  return (
    <div className="landing-container signupPage">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="namePlate container">
        <div className="title">LeeterBoard</div>
        <div className="subtitle">
          Create an account and join the competition!
        </div>

        <div></div>
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

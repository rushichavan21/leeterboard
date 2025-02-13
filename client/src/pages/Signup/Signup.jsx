import toast, { Toaster } from "react-hot-toast";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import { useAuthContext } from "../../Hooks/useAuthContext";

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
      toast.error("Passwords do not match!");
      return;
    }

    try {
      toast.loading("Signing up...");
      
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/signup`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const json = response.data;
      
      localStorage.setItem("user", JSON.stringify(json));
      
      dispatch({ type: "LOGIN", payload: json });
      toast.dismiss();
      toast.success("Signup successful!");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.error || "Signup failed. Please try again");
    }
  };
  return (
    <div className="signupPage">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="namePlate container">
        <div className="title">LeeterBoard</div>
        <div className="subtitle">
          Create an account and join the competition!
        </div>
      </div>
      <div className="login-form signup-form container" id="signupWidthFix">
        <form onSubmit={handleSubmit}>
          <div className="input-group-login">
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

          <div className="input-group-login">
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

          <div className="input-group-login">
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

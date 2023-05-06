import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import "../login.css";

const Login = () => {
 
  const [inputs, setInputs] = useState({
    username: "",
    showPassword: false,
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const navigate = useNavigate();

  const { adminlogin } = useContext(AuthContext);

  const [error, setError] = useState(null);

  console.log(inputs);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminlogin(inputs);
      navigate("/");
      // console.log(res);
    } catch (err) {
      setError(err.response.data);
      
    }
  };



  return (
    <div className="auth">
      
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <form>
        <h1>Admin Login</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        {passwordShown ? (
          <Link className="link" onClick={togglePassword}>
            Hide Password
          </Link>
        ) : (
          <Link className="link" onClick={togglePassword}>
            Show Password
          </Link>
        )}
        <button onClick={handleSubmit}>Login</button>
        {error && <p className="error">{error}</p>}
        <span>
          Are you a User? 
          {" "}
          <Link className="authlink" to="/login">
         Login 
          </Link>
        </span>
        <span>
          Don't have an account?{" "}
          <Link className="authlink" to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

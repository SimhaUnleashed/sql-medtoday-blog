import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import app from '../context/axiosConfig';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const [error,setError] = useState(null) ;

  console.log(inputs);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await app.post(
        "/auth/register",
        inputs
      );
      navigate("/login")
      console.log(res);
    } catch (err) {
      setError(err.response.data)
    }
  };
  return (
    <div>
      <div className="auth">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
        <form>
        <h1>Register</h1>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Register</button>
          {error&& <p className="error">{error}</p>}
          <span>
            Do you have an account? <Link className="authlink" to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;

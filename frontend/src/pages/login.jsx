import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/AuthProvider.jsx";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="p-8  w-90 bg-white rounded">
          <h2 className="text-3xl font-bold mb-4 text-black ">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block ">Email</label>
              <input
                className="border  border-gray-300 w-full text-gray-500 px-3 py-2"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block">Password</label>
              <input
                className="border  border-gray-300 w-full text-gray-500 px-3 py-2"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className=" rounded  py-2 w-full bg-teal-600 text-white
            "
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

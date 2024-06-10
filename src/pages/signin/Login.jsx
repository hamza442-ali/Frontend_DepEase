import React, { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTeacherData } from "../../redux/slices/teacher/teacherSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpeg"


const Login = () => {
  const navigate = useNavigate(); // hook to navigate programmatically

  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    // Add an interceptor for every outgoing request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        // If the token exists, add it to the Authorization header
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with the request error
        return Promise.reject(error);
      }
    );
    // Clean up the interceptor when the component is unmounted
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);


  const handleLogin = async () => {
    
    try {
      const response = await axios.post("http://localhost:3001/loginT", {
        email,
        passoword:password,
      });
      const { teacher, token } = response.data;

      if (response.status === 200) {
        // Successful login, redirect to Dashboard Page
        dispatch(setTeacherData(teacher)); // Store specific teacher data in Redux
        
  
      // Save the token in localStorage or a secure storage method
      localStorage.setItem('token', token);

      navigate("/projectsManage");
  
        
      } 
    } catch (error) {
      setError("Invalid Credentials. Please try again later.");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
      <div className="flex flex-row mx-2 mb-6 ml-16">

      <img src={logo} alt="DepEase" className="w-8 h-8 ml-2 mr-2 rounded-full sm:w-10 sm:h-10 sm:ml-4 sm:mr-4" />
        <h2 className="mb-6 text-2xl font-bold text-center">
         DepEase
        </h2>
      </div>
      
        <input
          type="text"
          placeholder="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

import React, { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStudentData } from "../../redux/slices/student/studentSlice";
import { useNavigate } from "react-router-dom";
import { setProjectData } from "../../redux/slices/project/projectSlice";
const Login = () => {
  const navigate = useNavigate(); // hook to navigate programmatically

  const dispatch = useDispatch();
  const [email_address, setemail] = useState("");
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
      const response = await axios.post("http://localhost:3001/login", {
        email_address,
        password,
      });
      const { student, token } = response.data;

      if (response.status === 200) {
        // Successful login, redirect to Dashboard Page
        dispatch(setStudentData(student)); // Store specific student data in Redux
        let id = student.registration_number;
  
      // Save the token in localStorage or a secure storage method
      localStorage.setItem('token', token);

        try {
          const response1 = await axios.get(`http://localhost:3001/group/getone/${id}`);
          if (response1.status === 200) {
            const group = response1.data._id;

            try {
              const response2 = await axios.get(`http://localhost:3001/projects/getone/${group}`);
              if (response2.status === 200) {
                // console.log(response2.data[0])
                dispatch(setProjectData(response2.data[0])); // Store project data in Redux
                navigate('/dashboard'); // Use navigate to redirect to the dashboard route
              } 
            } catch (error) {
              console.error("Error fetching project data:", error);
            }
          } 
        } catch (error) {
          console.error("you have no group yet:", error);
            navigate('/proposal');
        }
  
        
      } 
    } catch (error) {
      setError("Error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">
          FYP Management System
        </h2>
        <input
          type="text"
          placeholder="email_address"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email_address}
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

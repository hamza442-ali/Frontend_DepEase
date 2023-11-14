import React, { useState } from "react";
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

  const handleLogin = async () => {
    
    try {
      const response = await axios.post("http://localhost:3001/student/login", {
        email_address,
        password,
      });
  
      if (response.status === 200) {
        // Successful login, redirect to Dashboard Page
        dispatch(setStudentData(response.data)); // Store student data in Redux
        let id = response.data.registration_number;
  
        try {
          const response1 = await axios.get(`http://localhost:3001/group/getone/${id}`);
          if (response1.status === 200) {
            const group = response1.data._id;
              
            try {
              const response2 = await axios.get(`http://localhost:3001/projects/getone/${group}`);
              if (response2.status === 200) {
                // console.log(response2.data[0])
                dispatch(setProjectData(response2.data[0])); // Store project data in Redux
              } else {
                console.error("Error fetching project data:", response2.statusText);
              }
            } catch (error) {
              console.error("Error fetching project data:", error);
            }
          } else {
            console.error("Error fetching group data:", response1.statusText);
          }
        } catch (error) {
          console.error("Error fetching group data:", error);
        }
  
        navigate('/dashboard'); // Use navigate to redirect to the dashboard route
      } else {
        setError("Invalid credentials. Please try again.");
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

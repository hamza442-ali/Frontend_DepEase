import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisplayEvaluationForm } from "../../components/evaluation/DisplayEvaluationForm";
import { toast } from 'react-toastify';
import { useLocation,useParams } from "react-router-dom";

export const DynamicEvaluationForm = () => {

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

  
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [evaluationForms, setEvaluationForms] = useState([]);

    
  const location = useLocation();
  const projects = location.state?.projectsData
  const { projectId } = useParams();

  const project  = projects.find(project => project._id === projectId);
  
    const handleFormClick = (index) => {
      setActiveFormIndex(index);
    };
  
      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/evaluation/getAll");
        setEvaluationForms(response.data);
      } catch (error) {
        toast.error('Error fetching  evaluation Forms:', error);
        console.error("Error fetching evaluation Forms:", error);
      }
    };

    fetchData();
  }, []);

    const ActiveForm = evaluationForms[activeFormIndex];
  
    return (
      <>
        <div className="flex p-4 mt-16 ml-32 mr-32 shadow-lg bg-neutral-50 rounded-3xl">
          <h2 className="mb-4 text-2xl font-bold"> {project.ProjectId}   Evaluation Forms  </h2>
          
        </div>
  
        <div className="flex mt-4 ml-32 mr-32 shadow-lg vh-screen bg-neutral-100 mb-14 rounded-3xl">

            {/* evaluation sidebar div */}
          <div className="w-1/6 h-screen p-6 m-4 bg-white shadow-lg rounded-3xl">
            <h2 className="mb-4 text-xl font-bold">Select Form:</h2>
            <ul>
              {evaluationForms.map((form, index) => (
                <li
                  key={index}
                  className={`cursor-pointer  text-blue-500 hover:underline ${
                    activeFormIndex === index ? "font-bold" : ""
                  }`}
                  onClick={() => handleFormClick(index)}
                >
                  {form.evaluationType}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="w-3/4 p-6 m-4 bg-white shadow-md rounded-3xl">
            {ActiveForm && (
              <DisplayEvaluationForm 
                evaluationTitle={ActiveForm.evaluationType}
                totalWeightage={ActiveForm.totalWeightage}
                FormId={ActiveForm._id}
                fields={ActiveForm.fields}
                project = {project}
              />
            )}
          </div>
        </div>
      </>
    );
  };
  
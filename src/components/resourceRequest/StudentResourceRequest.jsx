import React, { useState,useEffect } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi'; // Assuming you have these icons installed
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const StudentResourceRequest = () => {
  const [resourceRequests, setResourceRequests] = useState([]);
  const projectData = useSelector(state => state.project);
  const studentData = useSelector((state) => state.student);
  const [formData, setFormData] = useState({
    studentId: studentData.registration_number,
    projectId: '',
    TeacherId:projectData.teacher,
    projectTitle: '',
    phoneNumber: '',
    email: '',
    requestType: '',
    requestReason: '',
    requestDate: new Date().toISOString().split('T')[0], // Hardcoded for this example
    startDate: '',
    endDate: '',
    acceptTerms: false, 
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };const handleAddRequest = () => {
    if (formData.requestType.trim() !== '' && formData.acceptTerms) {
      // Make a POST request to the Express.js backend

      
      axios.post('http://localhost:3001/resource/add', formData)
        .then(response => {
          // Handle success, maybe show a success message to the user
          toast.success('Request sent Successfully ');
          setResourceRequests([...resourceRequests, formData]);
          setFormData({
            ...formData,
            requestType: '',
            requestReason: '',
            startDate: '',
            endDate: '',
          });
        })
        .catch(error => {
          // Handle error, maybe show an error message to the user
          console.error('Error sending request:', error);
          toast.error('Error sending request:', error);
        });
    } else {
      toast.info('Please fill out all fields and accept the terms.');
    }
  };
  

 

  return (
    <div className="max-w-screen-xl p-4 mx-auto my-8">
      <h1 className="mb-4 text-3xl font-semibold">Student Resource Request</h1>

      {/* Horizontal Form */}
      <form className="grid grid-cols-2 gap-4">
       
        <div>
          <label className="block text-sm font-medium text-gray-700">Project ID</label>
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Title</label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Request Type</label>
          <textarea
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Request Reason</label>
          <textarea
            name="requestReason"
            value={formData.requestReason}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expected End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

  {/* Acceptance Clause Checkbox */}
  <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mr-2"
            />
            I accept that the information provided is true and I will be responsible for the consequences.
          </label>
        </div>


        <div className="col-span-2">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md"
            onClick={handleAddRequest}
          >
            <FiPlus className="mr-2" /> Add Request
          </button>
        </div>
      </form>

     
    </div>
  );
};

export default StudentResourceRequest;

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const DisplayEvaluationForm = ({ evaluationTitle, totalWeightage, fields,FormId,project  }) => {

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

  
  const [obtainedMarks, setObtainedMarks] = useState(Array(fields.length).fill(''));
  const [comments, setComments] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleObtainedMarksChange = (index, value) => {
    const newObtainedMarks = [...obtainedMarks];
    newObtainedMarks[index] = value;
    setObtainedMarks(newObtainedMarks);
    // Clear error for this field when the user starts typing again
    setFormErrors({ ...formErrors, [index]: '' });
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    fields.forEach((field, index) => {
      // Check if the obtained marks are not negative and not exceeding the weightage
      if (obtainedMarks[index] < 0 || obtainedMarks[index] > field.weightage) {
        errors[index] = 'Obtained marks should be between 0 and the weightage';
        isValid = false;
      }

      // Check if the obtained marks are provided for required fields
      if (field.weightage > 0 && obtainedMarks[index] === '') {
        errors[index] = 'Obtained marks are required';
        isValid = false;
      }
    });

    // Check if the comment is provided
    if (!comments.trim()) {
      errors.comments = 'Comments are required';
      isValid = false;
    }

    // Set errors for the form
    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        // Prepare the data to be sent to the server
        const formData = {
            ProjectId:project.ProjectId,// hardcoded for now 
            TeacherId:project.teacher,// hardcoded for now
            totalWeightage: totalWeightage,
          fields: fields.map((field, index) => ({
            name: field.name,
            weightage: field.weightage,
            Subobtain: obtainedMarks[index],
          })),
          evaluationType:evaluationTitle,
          comments: comments,
          evalFormId:FormId,
        };
 
       // Make a POST request to your backend API using Axios
        const response = await axios.post('http://localhost:3001/addMarks/add', formData);
  
        // Handle the response as needed
        console.log('Server Response:', response.data);
        toast.success('Marks submitted successfully');
  
        // Clear the form or perform any other actions after successful submission
      } catch (error) {
        console.error('Error submitting marks:', error);
        toast.error('Error submitting marks:', error);
      }
    }
  };


  const handleUpdate = async () => {
    try {
      // Prepare the data to be sent for the update
      const updateData = {
        ProjectId:'P12345',// hardcoded for now 
        TeacherId:'TCH54321',// hardcoded for now
        totalWeightage: totalWeightage,
      fields: fields.map((field, index) => ({
        name: field.name,
        weightage: field.weightage,
        Subobtain: obtainedMarks[index],
      })),
      evaluationType:evaluationTitle,
      comments: comments,
      evalFormId:FormId,
    };

    const ProjectId='P12345';// hardcoded for now
      // Make a PUT request to your backend API for the update
      const response = await axios.put(`http://localhost:3001/addMarks/update/${ProjectId}`, updateData);  

      // Handle the response as needed
      console.log('Update Response:', response.data);
      toast.success('Marks updated successfully');

      // Clear the form or perform any other actions after successful update
    } catch (error) {
      console.error('Error updating marks:', error);
      toast.error('Error updating marks:', error);
    }
  };

  return (
    <>
       <div className="flex p-4 mb-8 shadow-md bg-neutral-50 rounded-3xl">
            <h2 className="mb-6 text-2xl font-bold"> {evaluationTitle} </h2>
            <p className="mt-2 ml-auto text-lg ">
                
              Total Weightage: <span className="ml-4 text-3xl text-red-500">{totalWeightage}</span>
            </p>
          </div>

      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.name} (Marks: {field.weightage}) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={obtainedMarks[index]}
              onChange={(e) => handleObtainedMarksChange(index, e.target.value)}
            />
            <div className="mt-1 text-xs text-red-500">
              {formErrors[index]}
            </div>
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Comments:
          </label>
          <textarea
            rows="4"
            placeholder="(Mandatory)"
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={comments}
            onChange={handleCommentsChange}
          ></textarea>
          <div className="mt-1 text-xs text-red-500">
            {formErrors.comments}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Submit Marks
        </button>
        <button
        type="button" // Change to "button" type to prevent form submission
        onClick={handleUpdate}
        className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Update Marks
      </button>
        
      </form>
    </>
  );
};
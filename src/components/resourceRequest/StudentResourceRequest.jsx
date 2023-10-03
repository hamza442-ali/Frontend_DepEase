import React, { useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi'; // Assuming you have these icons installed

const StudentResourceRequest = () => {
  const [resourceRequests, setResourceRequests] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    projectId: '',
    projectTitle: '',
    studentPhone: '',
    studentEmail: '',
    requestType: '',
    requestReason: '',
    requestDate: '2023-09-22', // Hardcoded for this example
    startDate: '',
    endDate: '',
    acceptTerms: false, 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleAddRequest = () => {
    if (formData.requestType.trim() !== '' && formData.acceptTerms) {
      setResourceRequests([...resourceRequests, formData]);
      setFormData({
        ...formData,
        requestType: '',
        requestReason: '',
        startDate: '',
        endDate: '',
      });
    }
    else {
        alert('Please fill out all fields and accept the terms.');
      }
  };

  const handleRemoveRequest = (index) => {
    const updatedRequests = [...resourceRequests];
    updatedRequests.splice(index, 1);
    setResourceRequests(updatedRequests);
  };


  return (
    <div className="max-w-screen-xl p-4 mx-auto my-8">
      <h1 className="mb-4 text-3xl font-semibold">Student Resource Request</h1>

      {/* Horizontal Form */}
      <form className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
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
            name="studentPhone"
            value={formData.studentPhone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Email</label>
          <input
            type="text"
            name="studentEmail"
            value={formData.studentEmail}
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

      {/* Display Requests */}
      <div className="mt-8">
        
        <ul>
          {resourceRequests.map((request, index) => (
            <li
              key={index}
              className="p-4 mb-4 border rounded"
            >
              <strong>Request Type:</strong> {request.requestType}<br />
              <strong>Request Reason:</strong> {request.requestReason}<br />
              {/* Display other request details here */}
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveRequest(index)}
              >
                <FiTrash className="mr-2" /> Remove Request
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentResourceRequest;

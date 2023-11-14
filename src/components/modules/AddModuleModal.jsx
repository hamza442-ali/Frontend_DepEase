import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddModuleModal = ({ onAddModule, onClose,onUpdate }) => {
  const projectData = useSelector(state => state.project);

  const [formData, setFormData] = useState({
    name: '',
    status: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
   
    if (formData.name && formData.status && formData.details) {
      // Add projectId to formData before calling onAddModule
      const dataWithProjectId = {
        ...formData,
        projectId: projectData.ProjectId,
      };
      onAddModule(dataWithProjectId);
    }
  };

  const handleUpdate = () => {  
    if (formData.name && formData.status && formData.details) {
      // Add projectId to formData before calling onAddModule
      const dataWithProjectId = {
        ...formData,
        projectId: projectData.ProjectId,
      };
      onUpdate(dataWithProjectId);
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-semibold">Add Module</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Module
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 ml-4 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Update
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModuleModal;
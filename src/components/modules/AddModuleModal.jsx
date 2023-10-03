import React, { useState } from 'react';

const AddModuleModal = ({ onAddModule, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    type: '',
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
    // Perform validation here if needed
    if (formData.name && formData.status && formData.type && formData.details) {
      onAddModule(formData);
    }
  };

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
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
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
            Add
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

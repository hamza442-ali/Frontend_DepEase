import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddDeliverableModal = ({ onAddDeliverable, onClose }) => {
  
  const projectData = useSelector(state => state.project);
  
  // State for form fields
  const [deliverableData, setDeliverableData] = useState({
    name: '',
    status: 'Pending', // Default status
    deadline: '',
    modules: [],
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliverableData({
      ...deliverableData,
      [name]: value,
    });
  };

  

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (deliverableData.name && deliverableData.deadline && deliverableData.status) {

      const dataWithProjectId = {
        ...deliverableData,
        projectId: projectData.ProjectId,
      };
      // Call the parent component's function to add the deliverable
      onAddDeliverable(dataWithProjectId);

      // Clear the form and close the modal
      setDeliverableData({
        name: '',
        status: 'Pending',
        deadline: '',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-semibold">Add Deliverable</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={deliverableData.name}
              onChange={handleInputChange}
              placeholder="Enter deliverable name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={deliverableData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={deliverableData.deadline}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-4 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Add Deliverable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeliverableModal;

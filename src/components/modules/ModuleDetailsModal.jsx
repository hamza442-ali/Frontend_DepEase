// src/components/modules/ModuleDetailsModal.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModuleDetailsModal = ({ module, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-lg shadow-lg w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{module.name} Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="mb-4">
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Title:</span> {module.name}
          </div>

          <div className="mb-2">
            <span className="font-semibold text-gray-700">ID:</span> {module._id}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Status:</span> {module.status}
          </div>
        
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Details:</span> {module.details}
          </div>
          {/* Add more details as needed */}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailsModal;

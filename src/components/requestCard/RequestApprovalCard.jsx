import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import person from "../../assets/images/person2.jpeg"
const MemberCard = ({ request, onViewDetails,updateRequest }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  

  const handleViewDetails = () => {
    onViewDetails(request);
  };

  const handleUpdateRequest = () => {
    setShowConfirmation(true);
  };

  const handleConfirmUpdate = () => {
    updateRequest(request);
    setShowConfirmation(false);
    
  };

  const handleCancelUpdate = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-2" key={request._id}>
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={person}
          alt="Member Avatar"
        />
        <div className="ml-4">
          <h2 className="text-lg font-medium">{request.projectTitle}</h2>
          <p className="text-sm text-gray-500">{request.email}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
       onClick={handleUpdateRequest}
        >
          Approve Request
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md mx-auto bg-white rounded-lg p-6">
            <p className="text-gray-800">
              Are you sure you want to accept  {request.projectTitle}'s Resource Request?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
                onClick={handleConfirmUpdate}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
                onClick={handleCancelUpdate}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default MemberCard;

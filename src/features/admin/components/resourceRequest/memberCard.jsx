import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import person from "../../assets/images/person2.jpeg";
import { RejectionModal } from './RejectionModal';
export const MemberCard = ({ request, onViewDetails, updateRequest,rejectRequest }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    
  const handleViewDetails = () => {
    onViewDetails(request);
  };

  const handleUpdateRequest = () => {
    setShowConfirmation(true);
  };

  const handleRejectRequest  = (reason) => {
    rejectRequest(reason,request);
  };

  const handleConfirmUpdate = () => {
    updateRequest(request);
    setShowConfirmation(false);
  };

  const handleCancelUpdate = () => {
    setShowConfirmation(false);
  };

  
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return { icon: faEye, color: 'text-yellow-500' };
      case 'In Progress':
        return { icon: faCheck, color: 'text-blue-500' };
      case 'Approved':
        return { icon: faCheck, color: 'text-green-500' };
      case 'Rejected':
        return { icon: faTimes, color: 'text-red-500' };
      default:
        return { icon: null, color: 'text-gray-500' };
    }
  };

  const statusInfo = getStatusColor(request.supervisorStatus);

  return (

    <div className="p-6 mx-2 bg-white rounded-lg shadow-lg mt-8" key={request._id}>
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={person}
          alt="Member Avatar"
        />
        <div className="ml-4">
          
          <div className='flex flex-row justify-between'>
          <h2 className="text-lg font-medium">{request.projectTitle}</h2>
         
          <p className={` ml-36 text-sm ${statusInfo.color}`}>
              <FontAwesomeIcon icon={statusInfo.icon} className="mr-2" />
              {request.adminStatus}
            </p>
          </div>
          <p className="mr-4 text-sm text-gray-500">{request.email}</p>
          
        </div>
      </div>
      <div className="flex justify-end mt-7">
        <button
          className="px-4 py-2 mr-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleViewDetails}
        >
          <FontAwesomeIcon icon={faEye} className="mr-2" />
           Details
        </button>
        <button
          className="px-4 py-2 mr-2 font-medium text-white bg-green-500 rounded hover:bg-green-600"
          onClick={handleUpdateRequest}
        >
          <FontAwesomeIcon icon={faCheck} className="mr-2" />
          Approve 
        </button>
        <button
          className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-red-600"
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          Reject 
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-6 mx-auto bg-white rounded-lg">
            <p className="text-gray-800">
              Are you sure you want to accept {request.projectTitle}'s Resource Request?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleConfirmUpdate}
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Yes
              </button>
              <button
                className="px-4 py-2 font-medium text-white bg-red-500 rounded hover:bg-red-600"
                onClick={handleCancelUpdate}
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <RejectionModal onClose={closeModal} onSubmit={handleRejectRequest} />
      )}
    </div>
    
  );
};

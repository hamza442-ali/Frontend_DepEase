// RejectionModal.js

import React, { useState } from 'react';

const RejectionModal = ({ onClose, onSubmit }) => {
  const [rejectionReason, setRejectionReason] = useState('');

  const handleInputChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(rejectionReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter rejection reason"
                  value={rejectionReason}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;

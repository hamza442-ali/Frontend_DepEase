// src/components/modules/Module.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes,  faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const Module = ({ module, onDetailsClick }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('moduleId', module._id);
      }}
      className="p-4 transition duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl"
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 mr-4 text-lg font-bold text-white bg-blue-500 rounded-full">
          <FontAwesomeIcon icon={faCubes} />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{module.name}</h2>
          <p className="text-sm text-gray-500">Status: {module.status}</p>
        </div>
        <div className="ml-4">
          
          <button
            className="ml-2 text-gray-500 hover:text-gray-600"
            onClick={() => onDetailsClick(module)} // Trigger details click
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module;

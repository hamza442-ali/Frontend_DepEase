// src/components/modules/Module.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faPencilAlt, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';


const Module = ({ module, onDetailsClick,ondeleteModule }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('moduleId', module._id.toString());
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
          <p className="text-sm text-gray-500">Type: {module.type}</p>
        </div>
        <div className="ml-4">
          <button className="text-blue-500 hover:text-blue-600">
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button className="ml-2 text-red-500 hover:text-red-600"  onClick={() => ondeleteModule(module)} >
            <FontAwesomeIcon icon={faTrash} />
          </button>
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

import React from 'react';
import Module from '../modules/Module';

const Deliverable = ({ deliverable, modules}) => {
 

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">{deliverable.name}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Status: {deliverable.status}</span>
            <span className="text-sm text-gray-500">Deadline: {deliverable.deadline}</span>
           
          </div>
        </div>
      </div>
      <div
        className="p-2 mt-2 border border-gray-300 border-dashed min-h-32"
        onDragOver={(e) => e.preventDefault()}
      >
      
        {deliverable.modules?.map((module) => (
          <div
            key={module}
            className="relative"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('moduleId', module);
            }}
           
            
          >
            <Module module={module} />
          </div>
        ))}
        {(!deliverable.modules || deliverable.modules.length === 0) && (
          <p className="mt-4 text-center text-gray-400">Drag modules here</p>
        )}
      </div>
    </div>
  );
};

export default Deliverable;

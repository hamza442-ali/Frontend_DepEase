import React from 'react';
import Module from '../modules/Module';

const Deliverable = ({ deliverable, modules, onModuleDrop, onModuleRemove }) => {
  const handleModuleDrop = (e) => {
    e.preventDefault();
    const moduleId = e.dataTransfer.getData('moduleId');
    const moduleToAdd = modules.find((module) => module.id === parseInt(moduleId));

    if (deliverable.modules && deliverable.modules.includes(moduleToAdd)) {
      // Module is already in this deliverable, show alert
      alert('Module is already added to this deliverable.');
    } else {
      onModuleDrop(moduleId, deliverable.name);
    }
  };

  const handleModuleRemove = (moduleId) => {
    // Remove module from deliverable
    onModuleRemove(moduleId, deliverable.name);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">{deliverable.name}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Status: {deliverable.status}</span>
            <span className="text-sm text-gray-500">Deadline: {deliverable.deadline}</span>
            <button className="px-3 py-1 text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300">
              Edit
            </button>
            <button className="px-3 py-1 text-red-500 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-300">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div
        className="p-2 mt-2 border border-gray-300 border-dashed min-h-32"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleModuleDrop}
      >
        {deliverable.modules?.map((module) => (
          <div
            key={module.id}
            className="relative"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('moduleId', module.id.toString());
            }}
            onDragEnd={() => handleModuleRemove(module.id)}
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

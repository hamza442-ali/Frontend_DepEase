import React,{useState} from 'react';
import Module from '../modules/Module';
import AddDeliverableModal from './AddDeliverableModal'; 
import { toast } from 'react-toastify';

const Deliverable = ({ deliverable, modules, onModuleDrop, onModuleRemove,ondeleteDelieverable,onupdateDelieverable }) => {

  const handleModuleDrop = (e) => {
    e.preventDefault();
    const moduleId = e.dataTransfer.getData('moduleId');
   
    
    const moduleToAdd = modules.find((module2) => module2._id === moduleId);

if (deliverable.modules && deliverable.modules.find(module => module._id.toString() === moduleId.toString())) {
  // Module is already in this deliverable, show alert
  toast.error(`${moduleToAdd.name} Module is already added to this deliverable`);

} else {  
  // deliverable.modules.push(moduleToAdd);
    onModuleDrop(moduleId, deliverable._id);
  toast.success(`Successfully added ${moduleToAdd.name} to  ${deliverable.name}`);
}
  };

  const handleModuleRemove = (moduleId) => {
    // Remove module from deliverable
    onModuleRemove(moduleId, deliverable._id);
  };
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">{deliverable.name}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Status: {deliverable.status}</span>
            <span className="text-sm text-gray-500">Deadline: {deliverable.deadline}</span>
            <button className="px-3 py-1 text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300" onClick={()=> onupdateDelieverable(deliverable)}>
              Status
            </button>
            <button className="px-3 py-1 text-red-500 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-300" onClick={() => ondeleteDelieverable(deliverable)}>
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
      
        {deliverable.modules?.map((module1) => (
          <div
            key={module1._id}
            className="relative"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('moduleId', module1._id);
            }}
            onDragEnd={() => handleModuleRemove(module1._id)}
            
          >
            <Module module={module1} />
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

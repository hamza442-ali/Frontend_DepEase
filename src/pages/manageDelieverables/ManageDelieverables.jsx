// src/ManageDeliverables.js
import React, { useState } from 'react';
import Deliverable from '../../components/delieverables/Deliverable';
import Module from '../../components/modules/Module';
import ModuleDetailsModal from '../../components/modules/ModuleDetailsModal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import AddModuleModal from '../../components/modules//AddModuleModal'; 
import AddDeliverableModal from '../../components/delieverables/AddDeliverableModal'; 

library.add(fas);
function ManageDeliverables() {
  const [modules, setModules] = useState([
    { id: 1, name: 'Module 1', status: 'Active', type: 'Type A', details:'testing the usecases' },
    { id: 2, name: 'Module 2', status: 'Inactive', type: 'Type B', details:'deployment through jenkins' },
    { id: 3, name: 'Module 3', status: 'Active', type: 'Type C' , details:'user all processes are here'},
  ]);

  const [deliverables, setDeliverables] = useState([
    { name: 'Deliverable 1', status: 'Pending', deadline: '2023-10-01', modules: [] },
    { name: 'Deliverable 2', status: 'In Progress', deadline: '2023-11-15', modules: [] },
    { name: 'Deliverable 3', status: 'In Progress', deadline: '2023-11-15', modules: [] },
  ]);
  // Modal state and functions
  const [isModuleDetailsModalOpen, setIsModuleDetailsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [isAddDeliverableModalOpen, setIsAddDeliverableModalOpen] = useState(false);

  const openAddDeliverableModal = () => {
    setIsAddDeliverableModalOpen(true);
  };

  const closeAddDeliverableModal = () => {
    setIsAddDeliverableModalOpen(false);
  };

    const openAddModuleModal = () => {
        setIsAddModuleModalOpen(true);
      };
    
    
      const closeAddModuleModal = () => {
        setIsAddModuleModalOpen(false);
      };

 
  
  const handleModuleDetailsClick = (module) => {
    setSelectedModule(module);
    setIsModuleDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsModuleDetailsModalOpen(false);
    setSelectedModule(null);
  };

  const handleModuleDrop = (moduleId, deliverableName) => {
    const updatedDeliverables = deliverables.map((deliverable) => {
      if (deliverable.name === deliverableName) {
        return {
          ...deliverable,
          modules: [...deliverable.modules, modules.find((m) => m.id === parseInt(moduleId))],
        };
      }
      return deliverable;
    });

    setDeliverables(updatedDeliverables);
  };


  const handleModuleRemove = (moduleId, deliverableName) => {
    const updatedDeliverables = deliverables.map((deliverable) => {
      if (deliverable.name === deliverableName) {
        return {
          ...deliverable,
          modules: deliverable.modules.filter((module) => module.id !== parseInt(moduleId)),
        };
      }
      return deliverable;
    });

    setDeliverables(updatedDeliverables);
  };
  
// Function to add a new deliverable
const addDeliverable = (newDeliverable) => {
    // Update the deliverables state with the new deliverable
    setDeliverables([...deliverables, newDeliverable]);
    closeAddDeliverableModal();
  };

  
  const addModule = (newModule) => {
    const newModuleWithId = {
      id: generateUniqueId(), // Replace with your actual unique ID generation logic
      ...newModule,
    };
    // Update the modules state with the new module
    setModules([...modules, newModuleWithId]);
    closeAddModuleModal();
  };

  const generateUniqueId = () => {
    // based on the maximum existing ID + 1
    const currentMaxId = modules.reduce((maxId, module) => {
      return module.id > maxId ? module.id : maxId;
    }, 0); // Start with 0 if no modules exist
  
    return currentMaxId + 1; // Increment the maximum ID to generate a new unique ID
  };
  
  return (
    <div className="container mx-auto mt-10">
       <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Manage Delieverables </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="sticky top-0 col-span-1">
          <h1 className="mb-4 text-xl">Modules</h1>
          {modules.map((module) => (
            <Module
              key={module.id}
              module={module}
              onDetailsClick={() => handleModuleDetailsClick(module)}
            />
          ))}
          <button
          className="px-3 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          onClick={openAddModuleModal}
        >
          <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
          Add Module
        </button>
        </div>
        <div className="col-span-2">
        <div className='flex flex-row justify-between mb-2'>
          <h1 className="mb-4 text-xl">Canvas</h1>
          <button
          className="px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={openAddDeliverableModal}
        >
          <FontAwesomeIcon icon={['fas', 'plus']} className="mr-2" />
          Add Deliverable
        </button>
          </div>
          {deliverables.map((deliverable) => (
            <Deliverable
              key={deliverable.name}
              deliverable={deliverable}
              modules={modules}
              onModuleDrop={handleModuleDrop}
              onModuleRemove={handleModuleRemove}
            />
          ))}
        </div>
      </div>

      {isAddDeliverableModalOpen && (
        <AddDeliverableModal onAddDeliverable={addDeliverable} onClose={closeAddDeliverableModal} />
      )}

      {/* Render the AddModuleModal component when isAddModuleModalOpen is true */}
      {isAddModuleModalOpen && (
        <AddModuleModal onAddModule={addModule} onClose={closeAddModuleModal} />
      )}

      {isModuleDetailsModalOpen && (
        <ModuleDetailsModal module={selectedModule} onClose={closeModal} />
      )}
    </div>
  );
}

export default ManageDeliverables;
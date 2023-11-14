// src/ManageDeliverables.js
import React, { useState,useEffect } from 'react';
import Deliverable from '../../components/delieverables/Deliverable';
import Module from '../../components/modules/Module';
import ModuleDetailsModal from '../../components/modules/ModuleDetailsModal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import AddModuleModal from '../../components/modules//AddModuleModal'; 
import AddDeliverableModal from '../../components/delieverables/AddDeliverableModal'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

library.add(fas);
function ManageDeliverables() {
  const projectData = useSelector(state => state.project);
  const [modules, setModules] = useState([]);

  const [deliverables, setDeliverables] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/modules/getmine/${projectData.ProjectId}`);
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching requests:', error);
    }

    try {
      const response = await axios.get(`http://localhost:3001/deliverables/getmine/${projectData.ProjectId}`);
      setDeliverables(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching requests:', error);
    }


  };
  useEffect(() => {
    fetchData();
  }, []); 


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


  const handleModuleDrop = async (moduleId, deliverableName) => {
    try {
      // there is an API endpoint to handle adding modules to deliverables
      const response = await axios.post('http://localhost:3001/deliverables/addModuleToDeliverable', {
        moduleId: parseInt(moduleId),
        deliverableName: deliverableName,
      });
  
      const updatedDeliverables = deliverables.map((deliverable) => {
        if (deliverable.name === deliverableName) {
          return {
            ...deliverable,
            modules: [...deliverable.modules, response.data], // Assuming the API returns the updated deliverable
          };
        }
        return deliverable;
      });
  
      setDeliverables(updatedDeliverables);
    } catch (error) {
      console.error('Error adding module to deliverable:', error);
    }
  };
  
  const handleModuleRemove = async (moduleId, deliverableName) => {
    try {
      //  there is an API endpoint to handle removing modules from deliverables
      await axios.delete(`http://localhost:3001/deliverables/removeModuleFromDeliverable/${parseInt(moduleId)}/${deliverableName}`);
  
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
    } catch (error) {
      console.error('Error removing module from deliverable:', error);
    }
  };
  
// Function to add a new deliverable
const addDeliverable = async (newDeliverable) => {
  try {
    // Send axios POST request to add deliverable
    const response = await axios.post('http://localhost:3001/deliverables/add', newDeliverable);
    
    // Update the deliverables state with the new deliverable from the response
    setDeliverables([...deliverables, response.data]);
    toast.success('Successfully initialized Deliverable');
    closeAddDeliverableModal();
  } catch (error) {
    console.error('Error adding deliverable:', error);
    toast.error('Error adding deliverable :', error); 
  }
};

// Function to add a new module
const addModule = async (newModule) => {
  try {
    // Send axios POST request to add module
    const response = await axios.post('http://localhost:3001/modules/add', newModule);
    
    // Update the modules state with the new module from the response
    setModules([...modules, response.data]);
    toast.success('Successfully added Module');
    closeAddModuleModal();
  } catch (error) {
    console.error('Error adding module:', error);
    toast.error('Error adding module:', error); 
  }
};
  

const ondeleteModule = async (module) => {
  try {
    let id = module._id;
    const response = await axios.delete(`http://localhost:3001/modules/delete/${id}`);
    setModules((prevModules) => prevModules.filter((m) => m._id !== id));
    toast.success('Successfully deleted module');
  } catch (error) {
    // Handle errors
    console.error('Error deleting module:', error);
    toast.error('Error deleting modules:', error);
  }
};

const ondeleteDelieverable = async (delieverable) => {
  try {
    let id = delieverable._id;
    const response = await axios.delete(`http://localhost:3001/deliverables/delete/${id}`);
    setDeliverables((prevdeliverables) => prevdeliverables.filter((m) => m._id !== id));
    toast.success('Successfully deleted deliverables');
  } catch (error) {
    // Handle errors
    console.error('Error deleting deliverables:', error);
    toast.error('Error deleting deliverables:', error);
  }
};

  return (
    <div className="container mx-auto mt-10">
       <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Manage Delieverables </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="top-0 col-span-1">
          <h1 className="mb-4 text-xl">Modules</h1>
          {modules.map((module) => (
            <Module
              key={module._id}
              module={module}
              onDetailsClick={() => handleModuleDetailsClick(module)}
              ondeleteModule={() => ondeleteModule(module)}
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
              key={deliverable._id}
              deliverable={deliverable}
              modules={modules}
              onModuleDrop={handleModuleDrop}
              onModuleRemove={handleModuleRemove}
              ondeleteDelieverable={() => ondeleteDelieverable(deliverable)}
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
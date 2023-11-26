// DeliverablesPage.js
import React, { useState,useEffect } from 'react';
import Deliverable from '../../components/delieverables/Deliverable';
import Module from '../../components/modules/Module';
import ModuleDetailsModal from '../../components/modules/ModuleDetailsModal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useLocation,useParams } from "react-router-dom";
import NoDataFound from '../../components/handlers/NoDataFound';


const DeliverablesPage = () => {
  const location = useLocation();
  const projects = location.state?.projectsData
  const { projectId } = useParams();

  const project  = projects.find(project => project._id === projectId);
  const [modules, setModules] = useState([]);

  const [deliverables, setDeliverables] = useState([]);

  

  // useEffect(() => {
  //   // Add an interceptor for every outgoing request
  //   const requestInterceptor = axios.interceptors.request.use(
  //     (config) => {
  //       // Get the token from localStorage
  //       const token = localStorage.getItem('token');
  //       // If the token exists, add it to the Authorization header
  //       if (token) {
  //         config.headers['Authorization'] = `Bearer ${token}`;
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       // Do something with the request error
  //       return Promise.reject(error);
  //     }
  //   );
  //   // Clean up the interceptor when the component is unmounted
  //   return () => {
  //     axios.interceptors.request.eject(requestInterceptor);
  //   };
  // }, []);





  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/modules/getmine/${project.ProjectId}`);
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules :', error);
      toast.error('Error fetching  moudules :', error);
    }

    try {
      const response = await axios.get(`http://localhost:3001/deliverables/getmine/${project.ProjectId}`);
      setDeliverables(response.data);
      
    } catch (error) {
      console.error('Error fetching deliverables :', error);
      toast.error('Error fetching deliveverables :', error);
    }


  };
  useEffect(() => {
    fetchData();
  }, []); 


  // Modal state and functions
  const [isModuleDetailsModalOpen, setIsModuleDetailsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  

 
  
  const handleModuleDetailsClick = (module) => {
    setSelectedModule(module);
    setIsModuleDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsModuleDetailsModalOpen(false);
    setSelectedModule(null);
  };


  if(modules.length===0 && deliverables.length===0){
    return (
     <NoDataFound/>
    );
  }
    
  return (
    <div className="container mx-auto mt-10">
       <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800">Manage Delieverables </h1>

      <div className="grid grid-cols-3 gap-4 ml-28">
        <div className="top-0 col-span-1">
          <h1 className="mb-4 text-xl">Modules</h1>
          {modules.map((module) => (
            <Module
              key={module._id}
              module={module}
              onDetailsClick={() => handleModuleDetailsClick(module)}
            />
          ))}
         
        </div>
        <div className="col-span-2">
        <div className='flex flex-row justify-between mb-2'>
          <h1 className="mb-4 text-xl">Canvas</h1>
          
          </div>
          {deliverables.map((deliverable) => (
            <Deliverable
              key={deliverable._id}
              deliverable={deliverable}
              modules={modules}
            />
          ))}
        </div>
      </div>

      {isModuleDetailsModalOpen && (
        <ModuleDetailsModal module={selectedModule} onClose={closeModal} />
      )}
    </div>
  );
}

export default DeliverablesPage;

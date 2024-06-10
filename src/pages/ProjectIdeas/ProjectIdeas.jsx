import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectIdeasList from '../../components/projectideas/ProjectIdeasList';
import ProjectIdeaModal from '../../components/projectideas/ProjectIdeaModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import NoDataFound from '../../components/handlers/NoDataFound';

const ProjectIdeasPage = () => {

  useEffect(() => {
    // Add an interceptor for every outgoing request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        // If the token exists, add it to the Authorization header
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with the request error
        return Promise.reject(error);
      }
    );
    // Clean up the interceptor when the component is unmounted
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);


  
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectIdeas, setProjectIdeas] = useState([]);

  useEffect(() => {
    // Fetch project ideas when the component mounts
    fetchProjectIdeas();
  }, []);

  const fetchProjectIdeas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/projectIdea/getall');
      setProjectIdeas(response.data);

     
    } catch (error) {
      if(projectIdeas.length===0) {
        toast.error('NO project ideas found try adding some:');
      }else{
        toast.error('Error fetching project ideas:', error);
      }
     
      console.error('Error fetching project ideas:', error);
    }
  };

  const addProjectIdea = async (newProjectIdea) => {
    try {
      // Make a POST request to add a new project idea
      await axios.post('http://localhost:3001/projectIdea/add', newProjectIdea);
      
      toast.success('Successfully added project idea!');
      // After successfully adding, fetch the updated list
      fetchProjectIdeas();
    } catch (error) {
      toast.error('Error adding project ideas:', error);
      console.error('Error adding project idea:', error);
    }
  };

  if(!projectIdeas) return (<NoDataFound />);

  
  return (
    <div className="container p-4 mx-auto">
      <button
        className="fixed flex items-center px-4 py-2 text-white bg-blue-500 rounded bottom-4 right-4"
        onClick={() => setModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Project Idea
      </button>
      {isModalOpen && (
        <ProjectIdeaModal
          closeModal={() => setModalOpen(false)}
          addProjectIdea={addProjectIdea}
        />
      )}
      {/* Render the updated ProjectIdeasList component with the modified projectIdeas array */}
      <ProjectIdeasList projectIdeas={projectIdeas} />
    </div>
  );
};

export default ProjectIdeasPage;

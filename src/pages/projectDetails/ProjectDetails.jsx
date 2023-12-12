import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  HiOutlineInformationCircle,
  HiOutlineDesktopComputer,
  HiOutlineClock,
  HiOutlineCode,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';


const ProjectDetails = () => {
  const [project, setProject] = useState('');
  const projectData = useSelector(state => state.project);

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


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/projects/getmine/${projectData._id}`);
      
      let id = response.data.projectProposal;
      try {
        const response = await axios.get(`http://localhost:3001/proposals/getmine/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
        toast.error('Error fetching  your proposal data :', error);
      }

    } catch (error) {
      console.error('Error fetching project data:', error);
      toast.error('Error fetching  your project data  at proposal fetching:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount



  if(!projectData || projectData.ProjectId==null || projectData===undefined ){
    toast.info("Please give proposal first");
    return (<div>
    
      <h2 className="p-2 mb-4 ml-28 font-serif text-xl  text-gray-800 font-semiboldp-2"> Please Add a proposal First</h2>
    </div>
  )}
 

  return (
    <div className="container mx-auto mt-8 p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-8 text-gray-800">{project.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {renderCard('Project Type', project.ProjectType, <HiOutlineDesktopComputer className="h-6 w-6" />)}
            {renderCard('Supervisor', project.supervisor, <HiOutlineInformationCircle className="h-6 w-6" />)}
            {renderCard('Problem Statement', project.problemStatement)}
            {renderCard('Problem Solution', project.problemSolution)}
            {renderCard('Scope', project.scope)}
            {renderListCard('Timeline', project.timeline, <HiOutlineClock className="h-6 w-6" />)}
            {renderCard('Technology Used', project.technologyUsed, <HiOutlineCode className="h-6 w-6" />)}
            {renderListCard('Modules', project.modules)}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderCard = (title, content, icon) => (
  <div className="mb-4 sm:mb-8">
    <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out flex flex-col sm:flex-row items-center">
      {icon && <div className="mb-4 sm:mb-0 sm:mr-4">{icon}</div>}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  </div>
);

const renderListCard = (title, items, icon) => (
    <div className="mb-4 sm:mb-8">
      <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
        <div className="flex items-center mb-2">{icon && <div className="mr-4">{icon}</div>}</div>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        {items ? (
          <ul className="list-disc pl-4">
            {items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No items available</p>
        )}
      </div>
    </div>
  );
  

export default ProjectDetails;

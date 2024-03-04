import React,{useEffect,useState} from 'react';
import ProjectIdeasList from '../../components/projectideas/ProjectIdeasList';
import { toast } from 'react-toastify';
import NoDataFound from '../../components/handlers/NoDataFound';
import axios from 'axios';

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



if(!projectIdeas.length) return (<NoDataFound />);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">Project Ideas</h1>
      <ProjectIdeasList projectIdeas={projectIdeas} />
    </div>
  );
};

export default ProjectIdeasPage;

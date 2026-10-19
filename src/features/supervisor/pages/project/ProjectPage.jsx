import React,{useState,useEffect} from "react";
import ProjectList from "../../components/project/ProjectList";
import { useNavigate } from "react-router-dom";
import AnnouncementModal from "../../components/announcement/AnnouncementModal"; 
import axios from "axios";
import { toast } from 'react-toastify';
import NoDataFound from "../../components/handlers/NoDataFound";
import { useSelector } from 'react-redux';
  
  const ProjectPage = () => {


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


    
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);
   const [projectsData,setprojectsData]=useState([]);
   const teacherData = useSelector(state => state.teacher);

    const fetchData = async () => {
   
      try {
        const response = await axios.get(`http://localhost:3001/projects/getallmine/${teacherData.employeeId}`);
        setprojectsData(response.data);
      } catch (error) {
        console.error('Error fetching  Projects:', error);
        toast.error('Error fetching  Projects:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []); 
  
    

const handleGiveEvaluation = (project) => {
  setSelectedProject(project);
  navigate(`/addEvaluation/${project._id}`, { state: { projectsData } });

};

    const handleViewDetails = (project) => {
      setSelectedProject(project);
      navigate(`/project/${project._id}`, { state: { projectsData }});
    };
  
    const handleViewEvaluation = (project) => {
      navigate(`/evaluation/${project._id}`, { state: { projectsData } });
    };
  
    const handleAnnouncementClick = (project) => {
      setSelectedProject(project);
      setAnnouncementModalOpen(true);
    };
  
    // New function for handling progress button click
    const handleShowProgress = (project) => {
      setSelectedProject(project);
      navigate(`/progress/${project._id}`, { state: { projectsData } });
    };

    
  
    // New function for handling deliverables button click
    const handleShowDeliverables = (project) => {
      setSelectedProject(project);
      navigate(`/deliverables/${project._id}`, { state: { projectsData } });
    };
  
    const handleShowPipeline = (project) => {
      setSelectedProject(project);
      navigate(`/pipeline/${project._id}`, { state: { projectsData } });
    };
    
    if (!projectsData) {
      return <NoDataFound/>;  
    }

    
    return (
      <div className="container p-8 mx-auto">
        <ProjectList
          projects={projectsData}
          onViewDetails={handleViewDetails}
          onViewEvaluation={handleViewEvaluation}
          onAnnouncementClick={handleAnnouncementClick}
          onShowDeliverables={handleShowDeliverables}
          onShowProgress={handleShowProgress}
          onGiveEvaluation={handleGiveEvaluation}
          onShowPipeline={handleShowPipeline}
        />
  
        {selectedProject && (
          <AnnouncementModal
            isOpen={isAnnouncementModalOpen}
            onRequestClose={() => setAnnouncementModalOpen(false)}
            project={selectedProject}
          />
        )}
      </div>
    );
  };
  
  export default ProjectPage;
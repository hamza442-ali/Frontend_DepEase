import React,{useState,useEffect} from "react";
import ProjectList from "../../components/project/ProjectList";
import person from "../../assets/images/person2.jpeg";
import { useNavigate } from "react-router-dom";
import AnnouncementModal from "../../components/announcement/AnnouncementModal"; 
import axios from "axios";
import { toast } from 'react-toastify';
import NoDataFound from "../../components/handlers/NoDataFound";


  
  const ProjectPage = () => {
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);
   const [projectsData,setprojectsData]=useState([]);
  

    const fetchData = async () => {
      let teacher='TCH54321'
      try {
        const response = await axios.get(`http://localhost:3001/projects/getallmine/${teacher}`);
        setprojectsData(response.data);
      } catch (error) {
        console.error('Error fetching  Projects:', error);
        toast.error('Error fetching  Projects:', error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []); 
  
    



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
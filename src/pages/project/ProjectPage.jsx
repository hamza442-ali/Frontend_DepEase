import React,{useState} from "react";
import ProjectList from "../../components/project/ProjectList";
import person from "../../assets/images/person2.jpeg";
import { useNavigate } from "react-router-dom";
import AnnouncementModal from "../../components/announcement/AnnouncementModal"; 

const projectsData = [
    {
      id: 1,
      title: "Project 1",
      problemStatement: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
      problemSolution: "Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.",
      scope: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
      members: [
        { name: "Alice", avatar: person },
        { name: "Bob", avatar: person },
      ],
      timeline: "1 month",
      modules: "Module 1, Module 2",
      teamLead: "Alice kob",
      supervisor: "Jane Smith",
      technologyUsed: "React, Node.js",
    },
  
    {
      id: 2,
      title: "Project 2",
      problemStatement: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
      problemSolution: "Consectetur adipiscing elit. Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.Consectetur adipiscing elit.",
      scope: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
      members: [
        { name: "Alice", avatar: person },
        { name: "Bob", avatar: person },
      ],
      timeline: "1 month",
      modules: "Module 1, Module 2",
      teamLead: "Alice kob",
      supervisor: "Jane Smith",
      technologyUsed: "React, Node.js",
    },
    // Add more sample projects here
  ];
  const ProjectPage = () => {
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null); // State to track the selected project
    const [isAnnouncementModalOpen, setAnnouncementModalOpen] = useState(false);
  
    const handleViewDetails = (project) => {
      setSelectedProject(project);
      navigate(`/project/${project.id}`);
    };
  
    const handleViewEvaluation = (project) => {
      navigate(`/evaluation/${project.id}`, { state: { project } });
    };
  

    // Inside ProjectPage.js
const handleAnnouncementClick = (project) => {
  setSelectedProject(project);
  setAnnouncementModalOpen(true);
};

    return (
      <div className="container p-8 mx-auto">
        <ProjectList
          projects={projectsData}
          onViewDetails={handleViewDetails}
          onViewEvaluation={handleViewEvaluation}
          onAnnouncementClick={handleAnnouncementClick}
        />
        {/* Render the AnnouncementModal component */}
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
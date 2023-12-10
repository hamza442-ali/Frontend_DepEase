import React,{useState} from 'react';
import ProjectIdeasList from '../../components/projectideas/ProjectIdeasList';
import ProjectIdeaModal from '../../components/projectideas/ProjectIdeaModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



const ProjectIdeasPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectIdeas, setProjectIdeas] = useState([
    {
      title: 'Project Idea 1',
      description: 'devops project this is ',
      teacherName: 'umer baiq',
    },
    {
      title: 'Project Idea 2',
      description: 'Ai base mobile app will recommend you palces to visist in city',
      teacherName: 'Saad khan',
    },
    {
      title: 'Project Idea 3',
      description: 'Ai based app that will identity fake news',
      teacherName: 'Naeem Akhtar',
    },
  ]);

  const addProjectIdea = (newProjectIdea) => {
    setProjectIdeas([...projectIdeas, newProjectIdea]);
  };

  return (
    <div className="container p-4 mx-auto">
      {/* ... (existing code) */}
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
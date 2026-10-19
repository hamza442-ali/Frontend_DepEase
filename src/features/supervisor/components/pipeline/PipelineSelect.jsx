import React, { useState } from 'react';
import FrontendPipeline from './FrontendPipeline';
import PipelineCreate from './PipelineCreate';
import { useLocation} from "react-router-dom";

const ComponentSwitcher = () => {
  const location = useLocation();
  const projectsData = location.state?.projectsData
  
  const [showFirstComponent, setShowFirstComponent] = useState(true);

  const toggleComponent = () => {
    console.log(projectsData)
    setShowFirstComponent(!showFirstComponent);
  };

  return (
    <div className="container mx-auto mt-4">
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={toggleComponent}
      >
        Switch Pipeline
      </button>
      {showFirstComponent ? (
        <FrontendPipeline projectsData={projectsData} />
      ) : (
        <PipelineCreate projectsData={projectsData} />
      )}
    </div>
  );
};

export default ComponentSwitcher;

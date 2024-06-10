import React from "react";
import ProjectCard from "./ProjectCard";


const ProjectList = ({ projects, onViewDetails, onViewEvaluation, onAnnouncementClick, onShowDeliverables, onShowProgress,onGiveEvaluation,onShowPipeline }) => {
  return (
    <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-8">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-900">Explore Projects</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onViewDetails={onViewDetails}
            onViewEvaluation={onViewEvaluation}
            onAnnouncementClick={onAnnouncementClick}
            onShowDeliverables={onShowDeliverables} // Pass the function for showing deliverables
            onShowProgress={onShowProgress} // Pass the function for showing progress
            onGiveEvaluation={onGiveEvaluation}
            onShowPipeline={onShowPipeline}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
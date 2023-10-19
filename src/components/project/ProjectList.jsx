import React from "react";
import ProjectCard from "./ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheckSquare, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProjectList = ({ projects, onViewDetails, onViewEvaluation,onAnnouncementClick }) => {
  return (
    <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-8">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-900">Explore Projects</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} onViewDetails={onViewDetails} onViewEvaluation={onViewEvaluation}  onAnnouncementClick={onAnnouncementClick}  />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;

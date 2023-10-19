import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCheckSquare,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ project, onViewDetails,onViewEvaluation,onAnnouncementClick }) => {

  
  return (
    <div className="overflow-hidden transition duration-300 ease-in-out transform border border-gray-300 rounded-lg hover:scale-105">
      <div className="flex items-center justify-center h-48 bg-gray-200">
        {/* You can add project images or other visuals here */}
      </div>
      <div className="p-6">
        <h3 className="mb-3 text-2xl font-semibold text-gray-900">
          {project.title}
        </h3>
        <p className="mb-4 text-gray-700">
          <span className="font-semibold text-gray-900">Team Lead:</span>{" "}
          {project.teamLead}
        </p>
        <div className="flex flex-wrap mb-4">
          {project.members.map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 mb-2 mr-2 rounded-full"
            />
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
            onClick={() => onViewDetails(project)} // Pass the project data here
          >
            <FontAwesomeIcon icon={faEye} className="text-xl" />
          </button>
          
          <button
            className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
            onClick={() => onViewEvaluation(project)} // Pass the project data here
          >
            <FontAwesomeIcon icon={faCheckSquare} className="text-xl" />
          </button>

          <button
        className="text-gray-600 transition duration-300 transform hover:text-gray-800 focus:outline-none hover:scale-110"
        onClick={() => onAnnouncementClick(project)} // Pass the project data here
      >
        <FontAwesomeIcon icon={faBullhorn} className="text-xl" />
      </button>
      
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

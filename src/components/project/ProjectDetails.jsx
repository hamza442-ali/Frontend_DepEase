import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faUsers, faClock, faCogs, faChalkboardTeacher, faBriefcase, faLightbulb } from "@fortawesome/free-solid-svg-icons";

const ProjectDetails = ({ projects }) => {
  const { projectId } = useParams();
  const project = projects.find((project) => project.id === parseInt(projectId));

  if (!project) {
    return <div className="text-center mt-10 text-gray-800">Project not found</div>;
  }

  return (
    <div className="container mx-auto my-10 p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">{project.title} Details</h2>
      
      {/* Project ID Section */}
      <div className="mb-8 flex items-center">
        <FontAwesomeIcon icon={faFileAlt} className="text-gray-600 mr-2" />
        <span className="text-gray-600">{project.id}</span>
      </div>

      {/* Problem Statement Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Problem Statement</h3>
        <p className="text-gray-600">{project.problemStatement}</p>
      </div>

      {/* Teammates Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          <FontAwesomeIcon icon={faUsers} className="text-gray-600 mr-2" />
          Teammates
        </h3>
        <ul className="list-disc text-gray-600 pl-6">
          {project.members.map((member, index) => (
            <li key={index}>{member.name}</li>
          ))}
        </ul>
      </div>

      {/* Project Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            <FontAwesomeIcon icon={faClock} className="text-gray-600 mr-2" />
            Project Timeline
          </h3>
          <p className="text-gray-600">{project.timeline}</p>

          <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
            <FontAwesomeIcon icon={faCogs} className="text-gray-600 mr-2" />
            Modules
          </h3>
          <p className="text-gray-600">{project.modules}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            <FontAwesomeIcon icon={faBriefcase} className="text-gray-600 mr-2" />
            Team Lead
          </h3>
          <p className="text-gray-600">{project.teamLead}</p>

          <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="text-gray-600 mr-2" />
            Supervisor
          </h3>
          <p className="text-gray-600">{project.supervisor}</p>

          <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">
            <FontAwesomeIcon icon={faLightbulb} className="text-gray-600 mr-2" />
            Technology Used
          </h3>
          <p className="text-gray-600">{project.technologyUsed}</p>
        </div>
      </div>

      {/* Problem Solution and Scope Sections */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Problem Solution</h3>
        <p className="text-gray-600">{project.problemSolution}</p>

        <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900">Scope</h3>
        <p className="text-gray-600">{project.scope}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;

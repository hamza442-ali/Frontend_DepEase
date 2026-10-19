import React from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const Evaluation = () => {
  // Access the project data from the location state (for demonstration purposes, using hardcoded data)
  const location = useLocation();
  const projects = location.state?.projectsData
  const { projectId } = useParams();

  const project  = projects.find(project => project._id === projectId);
  

  return (
    <div className="container p-8 mx-auto">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-900">
        Evaluation Details for {project.ProjectId}
      </h2>
      <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Project Information</h3>
        <p>
          <span className="font-semibold text-gray-900">Project ID:</span> {project._id}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Team Lead:</span> {project.batch}
        </p>
        <div className="flex items-center mt-4">
          <span className="mr-2 font-semibold text-gray-900">Team Members:</span>
          {/* {project.members.map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 mr-2 rounded-full"
            />
          ))} */}
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">Evaluation Details</h3>
        <div className="mb-4">
          <span className="font-semibold text-gray-900">Criteria 1:</span> Exemplary
        </div>
        <div className="mb-4">
          <span className="font-semibold text-gray-900">Criteria 2:</span> Satisfactory
        </div>
        {/* Add more evaluation criteria here */}
      </div>
    </div>
  );
};

export default Evaluation;

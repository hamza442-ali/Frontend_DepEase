import React from "react";
import { useLocation } from "react-router-dom";

const Evaluation = () => {
  // Access the project data from the location state (for demonstration purposes, using hardcoded data)
  const location = useLocation();
  const project = location.state?.project || {
    id: 1,
    title: "Sample Project",
    teamLead: "John Doe",
    members: [
      { name: "Alice", avatar: "https://via.placeholder.com/50" },
      { name: "Bob", avatar: "https://via.placeholder.com/50" },
    ],
  };

  return (
    <div className="container p-8 mx-auto">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-900">
        Evaluation Details for {project.title}
      </h2>
      <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Project Information</h3>
        <p>
          <span className="font-semibold text-gray-900">Project ID:</span> {project.id}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Team Lead:</span> {project.teamLead}
        </p>
        <div className="flex items-center mt-4">
          <span className="mr-2 font-semibold text-gray-900">Team Members:</span>
          {project.members.map((member, index) => (
            <img
              key={index}
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 mr-2 rounded-full"
            />
          ))}
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

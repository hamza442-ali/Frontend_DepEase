import React from 'react';

const ProjectIdeasCard = ({ title, description, teacherName }) => {
  return (
    <div className="p-6 mb-4 bg-white rounded-lg shadow-lg">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-4 text-gray-700">{description}</p>
      <p className="text-sm text-gray-500">Teacher: {teacherName}</p>
    </div>
  );
};

export default ProjectIdeasCard;

import React from 'react';

const ProjectInfo = ({ project }) => {
  return (
    <div className="p-4 ml-4 bg-white border-l-4 rounded-lg shadow-md hover:border-blue-500">
      <h3 className="mb-2 text-lg font-semibold">{project.projectName}</h3>
      <p className="mb-3 text-xs text-gray-600">Project ID: {project.id}</p>
     
      <div className="flex flex-row mt-2 justify-evenly">
        
        {project.teammates.map((teammate) => (
          <div className="flex items-center mb-2" key={teammate.id}>
            <img
              className="w-8 h-8 mr-2 transition-transform duration-300 ease-in-out transform border-2 border-blue-500 rounded-full hover:scale-110"
              src={teammate.profilePic}
              alt={`${teammate.name}'s Profile`}
            />
            <div>
              <p className="text-xs text-gray-600">{teammate.name}</p>
              <p className="text-xs text-gray-600">Email: {teammate.email}</p>
              <a href={`mailto:${teammate.email}`} className="text-xs text-blue-500 hover:underline">
                Email Teammate
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectInfo;

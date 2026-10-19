import React, { useEffect, useState } from 'react';
import axios from 'axios';
import proImg from './CSS.png';

export const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/project/getall")
      .then((response) => {
        console.log(response.data, " response data in scheduling");
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  const handleCheckButtonClick = (project) => {
    setSelectedProject(project);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-16 ml-32 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold"> Projects</h1>
        <div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded">+ Add new</button>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex">
          <button className="bg-purple-500 text-white px-4 py-2 rounded mr-2">Search</button>
          <input type="text" placeholder="Search:" className="border rounded p-2" />
        </div>
      </div>

      <div className="projectSection">
        <h1 className="project text-4xl font-bold text-white text-center ">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card bg-white rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            >
              <img
                src={proImg}
                alt={project.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h1 className="text-lg font-semibold mt-4">{project.ProjectId}</h1>
              <p className="text-gray-600">{project.projectProposal}</p>
              <button
                className="bg-indigo-500 text-white mt-4 py-2 px-4 rounded-full hover:bg-indigo-600 transition-colors"
                onClick={() => handleCheckButtonClick(project)}
              >
                Check
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-indigo-500 px-4 py-5 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-white" id="modal-headline">
                  Panel : {" "}{selectedProject && selectedProject.ProjectId} 
                </h3>
              </div>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Batch:</span> {selectedProject && selectedProject.batch}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Group:</span> {selectedProject && selectedProject.group}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Semester:</span> {selectedProject && selectedProject.semester}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Teacher:</span> {selectedProject && selectedProject.teacher}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Project Proposal:</span> {selectedProject && selectedProject.projectProposal}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

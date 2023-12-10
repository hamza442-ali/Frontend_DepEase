// ProjectIdeaModal.jsx

import React, { useState } from 'react';

const ProjectIdeaModal = ({ closeModal, addProjectIdea }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teacherName, setTeacherName] = useState('');

  const handleSubmit = () => {
    // Validate input fields (you can add more validation as needed)
    if (!title || !description || !teacherName) {
      alert('Please fill in all fields.');
      return;
    }

    // Create a new project idea object
    const newProjectIdea = { title, description, teacherName };

    // Add the new project idea to the list
    addProjectIdea(newProjectIdea);

    // Close the modal
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal Panel */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="p-6">
            <h1 className="mb-2 text-xl font-semibold">Add Project Idea</h1>
            {/* Input fields for title, description, and teacherName */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="teacherName" className="block text-sm font-medium text-gray-600">
                Teacher Name
              </label>
              <input
                type="text"
                id="teacherName"
                name="teacherName"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            >
              Add Project Idea
            </button>
            {/* Close button */}
            <button
              onClick={closeModal}
              className="px-4 py-2 ml-2 text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdeaModal;

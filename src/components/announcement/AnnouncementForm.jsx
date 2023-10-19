import React, { useState } from 'react';

const AnnouncementForm = ({ projects, onAnnouncementSubmit }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [announcementText, setAnnouncementText] = useState('');

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleAnnouncementChange = (e) => {
    setAnnouncementText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProject && announcementText) {
      onAnnouncementSubmit(selectedProject, announcementText);
      setSelectedProject('');
      setAnnouncementText('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Announcement</h2>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Select Project:</label>
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Announcement:</label>
          <textarea
            value={announcementText}
            onChange={handleAnnouncementChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;

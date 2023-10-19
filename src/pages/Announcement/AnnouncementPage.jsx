import React from 'react';
import AnnouncementForm from '../../components/announcement/AnnouncementForm';
 // Make sure to provide the correct path to AnnouncementForm component

const AnnouncementPage = () => {
  // Sample projects data (replace this with your actual projects data)
  const projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    // ... other project objects
  ];

const yourSubmitFunction = (formData) => {
    // Handle form submission here
    console.log(formData);
};

return (
    <div className="your-parent-component">
        {/* Check if projects is defined before passing it to AnnouncementForm */}
        {projects && projects.length > 0 ? (
            <AnnouncementForm projects={projects} onAnnouncementSubmit={yourSubmitFunction} />
        ) : (
            <p>No projects available</p>
        )}
    </div>
);
};

export default AnnouncementPage;

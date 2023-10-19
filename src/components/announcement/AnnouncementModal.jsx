import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const AnnouncementModal = ({ isOpen, onRequestClose, project }) => {
  const [announcementText, setAnnouncementText] = useState("");

  const handleAnnouncementChange = (e) => {
    setAnnouncementText(e.target.value);
  };

  const handleAnnouncementSubmit = () => {
    // Handle the announcement submission logic here
    console.log("Announcement submitted:", announcementText);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed top-0 right-0 z-50 h-full p-8 bg-white shadow-lg w-96"
      overlayClassName="modal-overlay"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
        <button onClick={onRequestClose} className="close-button">
          <FontAwesomeIcon icon={faTimes} className="text-lg" />
        </button>
      </div>
      <p className="mb-6 text-gray-600">Project ID: {project.id}</p>
      <p className="mb-6 text-gray-600">Team Lead: {project.teamLead}</p>
      <div className="flex mb-4">
        {project.members.map((member, index) => (
          <img
            key={index}
            src={member.avatar}
            alt={member.name}
            className="w-10 h-10 mb-2 mr-4 rounded-full"
          />
        ))}
      </div>
      <textarea
        className="w-full h-32 p-4 mb-6 border border-gray-300 rounded focus:outline-none"
        placeholder="Type your announcement here..."
        value={announcementText}
        onChange={handleAnnouncementChange}
      />
      <button
        className="flex items-center justify-center w-full py-3 font-bold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        onClick={handleAnnouncementSubmit}
      >
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Send Announcement
      </button>
    </Modal>
  );
};

export default AnnouncementModal;

import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from 'react-toastify';

Modal.setAppElement("#root");

const AnnouncementModal = ({ isOpen, onRequestClose, project }) => {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementText, setAnnouncementText] = useState("");

  const handleTitleChange = (e) => {
    setAnnouncementTitle(e.target.value);
  };

  const handleAnnouncementChange = (e) => {
    setAnnouncementText(e.target.value);
  };

  const handleAnnouncementSubmit = () => {
    // Create an announcement object with title and content
    const announcementData = {
      title: announcementTitle,
      content: announcementText,
      TeacherId: project.teacher, 
      ProjectId: project.ProjectId,
    };

    // Send the announcement to the backend using Axios
    axios.post("http://localhost:3001/announcement/add", announcementData)
      .then((response) => {
        toast.success('Announcement submitted successfully!');
      })
      .catch((error) => {
        console.error("Error submitting announcement:", error);
        toast.error('Error submitting announcement::', error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed top-0 right-0 z-50 h-full p-8 bg-white shadow-lg w-96"
      overlayClassName="modal-overlay"
    >
      <div className="flex items-center justify-between mb-8">
        <button onClick={onRequestClose} className="close-button">
          <FontAwesomeIcon icon={faTimes} className="text-lg" />
        </button>
      </div>
      <p className="mb-6 text-gray-600">Project ID: {project._id}</p>
     
     
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none"
        placeholder="Announcement Title"
        value={announcementTitle}
        onChange={handleTitleChange}
      />
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

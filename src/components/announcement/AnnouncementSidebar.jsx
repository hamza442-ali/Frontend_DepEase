import React, { useState } from 'react';
import { FaBell, FaUser, FaTag, FaRegCheckCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import AnnouncementList from './AnnouncementList';

const AnnouncementSidebar = ({ announcements, onUpdateAnnouncements }) => {
  // State to manage sidebar collapse
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  // Filter unread announcements
  const unreadAnnouncements = announcements.filter((announcement) => !announcement.read);

  // Mark an announcement as read and update state
  const markAsRead = (announcementToMark) => {
    const updatedAnnouncements = announcements.map((announcement) =>
      announcement === announcementToMark ? { ...announcement, read: true } : announcement
    );
    onUpdateAnnouncements(updatedAnnouncements);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-screen p-6 bg-gray-100 shadow-md transition-transform ${
        isSidebarCollapsed ? 'translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Unread Announcements</h2>
        <button onClick={toggleSidebar} className="text-gray-500 hover:text-blue-500">
          {isSidebarCollapsed ? <FaChevronRight className="text-xl" /> : <FaChevronLeft className="text-xl" />}
        </button>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
        <AnnouncementList announcements={unreadAnnouncements} markAsRead={markAsRead} />
      </div>
    </div>
  );
};

export default AnnouncementSidebar;

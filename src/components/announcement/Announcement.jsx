import React from 'react';
import { FaBell, FaUser, FaTag, FaRegCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // For animations

const Announcement = ({ title, content, date, sender, category, markAsRead, read }) => {
  const boxShadow = read
    ? '0 2px 4px rgba(0, 0, 0, 0.1)' // Shadow for read announcements
    : '0 4px 8px rgba(0, 0, 0, 0.2)'; // Shadow for unread announcements

  return (
    <motion.div
      className="p-4 bg-white rounded-lg"
      initial={{ opacity: 0, y: 50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when component appears
      transition={{ duration: 0.3 }} // Animation duration
      style={{ boxShadow }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaTag className="text-gray-500" />
          <span className="text-sm text-blue-600">{category}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-500" />
          <span className="text-sm text-gray-600">{sender}</span>
        </div>
        {read ? (
          <span className="flex items-center space-x-2 text-green-500">
            <FaRegCheckCircle className="text-lg" />
            <span className="text-xs">Read</span>
          </span>
        ) : (
          <button
            onClick={markAsRead}
            className="text-blue-500 hover:text-blue-700"
          >
            Mark as Read
          </button>
        )}
      </div>
      <h3 className="mt-2 mb-2 text-2xl font-semibold">{title}</h3>
      {content && (
        <>
          <p className="text-gray-700">{content}</p>
          <div className="mt-4 text-xs text-gray-400">Date: {date}</div>
        </>
      )}
    </motion.div>
  );
};

export default Announcement;

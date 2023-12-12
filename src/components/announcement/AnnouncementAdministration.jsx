// src/components/AnnouncementAdministration.js
import React, { useState } from 'react';

const AnnouncementAdministration = ({ announcement }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`transition-transform duration-300 ease-in-out transform bg-green-200 p-4 mb-4 rounded-md ${
        expanded ? 'shadow-lg scale-105' : 'shadow-md'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{announcement.title}</h3>
        <button
          className={`text-green-500 hover:text-green-700 focus:outline-none ${
            expanded ? 'rotate-180' : ''
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={expanded ? 'M19 9l-7 7-7-7' : 'M9 5l7 7 7-7'}
            />
          </svg>
        </button>
      </div>
      {expanded && (
        <div>
          <p className="mb-2 text-gray-800">{announcement.richText}</p>
          <p className="text-sm text-gray-600">Date: {new Date(announcement.date).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementAdministration;

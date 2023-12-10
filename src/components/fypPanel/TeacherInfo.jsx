import React from 'react';

const TeacherInfo = ({ teacher }) => {
  return (
    <div className="p-4 ml-2 transition-transform duration-300 ease-in-out transform bg-white border-l-4 rounded-lg shadow-md hover:scale-105 hover:border-blue-500">
      <img
        className="w-12 h-12 mx-auto mb-2 transition-transform duration-300 ease-in-out transform border-4 border-blue-500 rounded-full hover:scale-110"
        src={teacher.profilePic}
        alt={`${teacher.name}'s Profile`}
      />
      <div>
        <h3 className="mb-1 text-sm font-semibold">{teacher.name}</h3>
        <p className="text-xs text-gray-600">Email: {teacher.email}</p>
        <p className="text-xs text-gray-600">Phone: {teacher.phone}</p>
        <a href={`mailto:${teacher.email}`} className="block mt-1 text-xs text-blue-500 hover:underline">
          Email Teacher
        </a>
      </div>
    </div>
  );
};

export default TeacherInfo;

// LogoutPage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetTeacherData } from '../../redux/slices/teacher/teacherSlice';

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Perform logout actions, such as removing the token from localStorage
    localStorage.removeItem('token');

    dispatch(resetTeacherData());
    // Navigate to the login page
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-6 m-auto bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-3xl font-semibold text-center">Logout</h2>
        <p className="mb-6 text-center text-gray-600">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-4 py-2 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Logout
          </button>
          <Link to="/" className="text-blue-500 hover:underline">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;

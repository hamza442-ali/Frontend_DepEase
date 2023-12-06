// LogoutPage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions, such as removing the token from localStorage
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center">Logout</h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
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

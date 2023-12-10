import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <Component />
    </div>
  );
}

export default PrivateRoute;

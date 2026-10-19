import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.jpeg';

library.add(fas);

const Sidebar = ({ data }) => {
  const [isExtended, setIsExtended] = useState(false);

  const toggleSidebar = () => {
    setIsExtended(!isExtended);
  };

  const handleMouseEnter = () => {
    setIsExtended(true);
  };

  const handleMouseLeave = () => {
    setIsExtended(false);
  };

  return (
    <nav
      className={`${
        isExtended
          ? 'w-64 z-50 transition-width duration-300 ease-in-out'
          : 'w-16 z-50 transition-width duration-300 ease-in-out'
      } h-screen bg-gray-800 text-white fixed top-0 left-0 `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between p-4 ">
        {isExtended ? (
          <div className="flex items-center">
            <div className="mr-2">
              <FontAwesomeIcon icon={logo} size="lg" />
            </div>
            <div className="font-semibold">Dep Ease</div>
          </div>
        ) : (
          <div className="mr-2">
            <FontAwesomeIcon icon="random" size="lg" />
          </div>
        )}
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>
              <div
                className={`${
                  isExtended
                    ? 'flex items-center justify-between pl-6 pr-4 py-3 hover:bg-blue-600 hover:text-white cursor-pointer'
                    : 'flex items-center p-4 hover:bg-blue-600 hover:text-white cursor-pointer'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    <FontAwesomeIcon icon={item.icon} size="lg" />
                  </span>
                  <span>{isExtended && item.label}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

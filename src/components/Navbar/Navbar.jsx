import React from 'react';
import person from "../../assets/images/person2.jpeg"
import logo from "../../assets/images/logo.jpeg"
import { useSelector } from 'react-redux';

const Navbar = () => {
  const teacherData = useSelector(state => state.teacher);

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md sm:px-6 lg:px-8 sm:py-4">
      <div className="flex items-center">
        <img src={logo} alt="DepEase" className="w-8 h-8 ml-2 mr-2 rounded-full sm:w-10 sm:h-10 sm:ml-4 sm:mr-4" />
        <h1 className="text-lg font-bold sm:text-xl">DepEase</h1>
      </div>
      <div className="flex items-center px-2 space-x-4 sm:space-x-6 sm:px-4">
        <ul className="hidden space-x-4 sm:flex">
          <li>
            <a href="/" className="font-bold hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/projectsManage" className="font-bold hover:text-gray-300">Projects</a>
          </li>
          <li>
            <a href="/fyppanels" className="font-bold hover:text-gray-300">FypPanels</a>
          </li>
          <li>
            <a href="/scheduler" className="font-bold hover:text-gray-300">Scheduler</a>
          </li>
          <li>
            <a href="/announce" className="font-bold hover:text-gray-300">Announcement</a>
          </li>
        </ul>
        <img src={person} alt="User Profile" className="w-8 h-8 ml-2 text-center rounded-full sm:w-10 sm:h-10 sm:ml-4" />
        <div className='flex flex-col'>
          <span className="ml-2 font-semibold text-gray-600">{teacherData.name}</span>
          <span className="ml-2 text-sm text-gray-500">{teacherData.email}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

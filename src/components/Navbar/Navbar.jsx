import React, { useEffect } from 'react';
import person from '../../assets/images/person2.jpeg';
import logo from '../../assets/images/logo.jpeg';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const studentData = useSelector((state) => state.student);

  if (!studentData) {
    return <div className='ml-96'>Loading...</div>; // or handle the loading state in your desired way
  }

  return (
    <nav className="flex flex-col items-center justify-between px-6 py-4 bg-white shadow-md sm:flex-row">
      <div className="flex items-center">
        <img src={logo} alt="DepEase" className="w-8 h-8 ml-2 mr-2 rounded-full sm:ml-24" />
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">DepEase</h1>
      </div>
      <div className="flex flex-col items-center mt-4 sm:flex-row sm:mt-0">
        <ul className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <li><a href="#" className="font-bold hover:text-gray-300">Dashboard</a></li>
          <li><a href="#" className="font-bold hover:text-gray-300">Projects</a></li>
          <li><a href="#" className="font-bold hover:text-gray-300">Tasks</a></li>
          <li><a href="#" className="mr-10 font-bold hover:text-gray-300">Announcements</a></li>
        </ul>
        <div className="flex items-center mt-2 ml-4 sm:mt-0">
          <img src={person} alt="User Profile" className="w-10 h-10 rounded-full" />
          <div className='flex flex-col ml-2'>
            <span className="font-semibold text-gray-600">{studentData.student_name}</span>
            <span className="text-gray-500">{studentData.isTeamLead ? <p>Team Lead</p> : <p>Member</p>}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

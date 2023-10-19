import React from 'react';
import person from "../../assets/images/myPic.jpeg"
import logo from "../../assets/images/logo.jpeg"
export const  Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center">
      <img src={logo} alt="DepEase" className="w-8 h-8 ml-24 mr-2 rounded-full" />

        <h1 className="font-bold ">DepEase</h1>
      </div>
      <div className="flex items-center px-7">
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="font-bold hover:text-gray-300">Dashboard</a>
          </li>
          <li>
            <a href="#" className="font-bold hover:text-gray-300">Projects</a>
          </li>
          <li>
            <a href="#" className="font-bold hover:text-gray-300">Documentation</a>
          </li>
          <li>
            <a href="#" className="font-bold hover:text-gray-300">Tasks</a>
          </li>
          <li>
            <a href="#" className="mr-10 font-bold hover:text-gray-300">Team</a>
          </li>
        </ul>
        <img src={person} alt="User Profile" className="w-10 h-10 ml-4 text-center rounded-full" />
        <div className='flex flex-col'>
        <span className="ml-2 font-semibold text-gray-600">Ali Hamza</span>
        <span className="ml-2 text-gray-500 from-neutral-100 to-slate-400">Admin</span>
        </div>
        
      </div>
    </nav>
  );
};



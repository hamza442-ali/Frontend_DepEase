import React from 'react'; 
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import sidebarData from '../../data/sidebarData.json'
import { Link, useLocation } from 'react-router-dom';
const MainLayout = () => {
  const location = useLocation();

   // Check if the current route is '/' or '/signin'
   const hideNavbar = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/logout';

   // If the current route is '/' or '/signin', don't render the Navbar
   if (hideNavbar) {
     return null;
   }
 

   
   
  return (
    <div className="flex ">
    <Sidebar data={sidebarData} />
    <div className="flex-1 p-4">
      <Outlet />
    </div>
  </div>
  );
};

export default MainLayout;

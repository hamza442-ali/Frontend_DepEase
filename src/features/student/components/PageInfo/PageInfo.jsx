import React from "react";
import { Link, useLocation } from 'react-router-dom';

const PageInfo = () => {
  const location = useLocation();
  const { pathname } = location;




  // Check if the current route is '/' or '/signin'
  const hideNavbar = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/logout';

  // If the current route is '/' or '/signin', don't render the Navbar
  if (hideNavbar) {
    return null;
  }


  // Get the page name from the path
  const pageName = pathname === "/" ? "Home" : pathname.substring(1).toUpperCase() + " Page";

  return (
    <div className="flex items-center justify-between w-full p-1 -mt-10 bg-white border">
      <div className="lg:ml-32 md:ml-16">
        {/* Adjusting left margin for larger screens */}
        <p className="text-sm font-semibold">{pageName}</p>
      </div>
      <div className="lg:mr-24 md:mr-16">
        {/* Adjusting right margin for larger screens */}
        <p className="text-sm"> Home {pathname}</p>
      </div>
    </div>
  );
};

export default PageInfo;

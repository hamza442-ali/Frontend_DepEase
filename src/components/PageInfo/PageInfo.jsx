import React from "react";
import { useLocation } from "react-router-dom";

const PageInfo = () => {
  const location = useLocation();
  const { pathname } = location;

  // Get the page name from the path
  const pageName = pathname === "/" ? "Home" : pathname.substring(1).toUpperCase() + " Page";

  return (
    <div className="flex items-center justify-between w-full p-1 bg-white border -mt-10">
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

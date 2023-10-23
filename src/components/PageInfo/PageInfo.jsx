import React from "react";
import { useLocation } from "react-router-dom";

const PageInfo = () => {
  const location = useLocation();
  const { pathname } = location;

  // Get the page name from the path
  const pageName = pathname === "/" ? "Home" : pathname.substring(1).toUpperCase()+" Page";

  return (
    <div className="flex items-center justify-between w-full p-1 -mt-10 bg-white border ">
      <div>
        <p className="ml-32 text-sm font-semibold">{pageName}</p>
      </div>
      <div>
        <p className="mr-24 text-sm"> Home {pathname}</p>
      </div>
    </div>
  );
};

export default PageInfo;

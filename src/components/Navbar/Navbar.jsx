import React from 'react';
import person from "../../assets/images/myPic.jpeg"
import logo from "../../assets/images/logo_DepEase.png"
import { Link } from 'react-router-dom';
import { ProfilePage } from '../profile/userProfile';
export const  Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md ">

        <Link href='' className='' >
              
       
        <div className="flex ml-24">
                <img
                  src={logo}
                  alt="logo"
                
                  className="w-full dark:hidden w-14 h-10"
                />
              <h1 class="text-3xl">DepEase</h1>

              
              </div>
              </Link>

              

              

      <div className="flex items-center px-7">
        <ul className="block lg:flex lg:space-x-12">


          
  
          
          {/* <li className='flex'>
          <span
                      class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                      id="basic-addon2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5">
                        <path
                          fill-rule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clip-rule="evenodd" />
                      </svg>
                    </span>
            
          <input
              type="search"
              class="relative m-0 block w-[200px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-custom-blue focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2" />
           
          </li> */}
          
          <li>
            <button className="hover:text-custom-blue focus:outline-none" onClick={() => window.location.href = "/dashboard"}>
              Dashboard
            </button>
          </li>
          <li>
            <button className="hover:text-custom-blue focus:outline-none" onClick={() => window.location.href = "/projects"}>
              Projects
            </button>
          </li>
          <li>
            <button className="hover:text-custom-blue focus:outline-none">Documentation</button>
          </li>
          <li>
            <Link to="/" className="hover:text-custom-blue">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="#" className="mr-10  hover:text-custom-blue">Team</Link>
          </li>
        </ul>
        <img src={person} alt="User Profile" className="w-10 h-10 ml-4 text-center rounded-full" />
        <div className='flex flex-col'>
         <Link to="/userProfile">
         <span className="ml-2 font-semibold text-gray-600">Ali Hamza</span>
         </Link>
         
         
        
        {/* <span className="ml-2 text-gray-500 from-neutral-100 to-slate-400">Admin</span> */}
        </div>
        
      </div>
    </nav>
  );
};



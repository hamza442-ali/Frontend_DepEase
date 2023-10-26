import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import {ThemeToggler} from "./ThemeToggler";
import menuData from "../../data/menuData.json";
import logo from './logo_DepEase.png'
// import depEaseName from '../../assets/images/depEaseName.svg'


export const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <div className="flex">
                <img
                  src={logo}
                  alt="logo"
                
                  className="w-full dark:hidden w-14 h-10"
                />
              <h1 class="text-4xl">DepEase</h1>

              
              </div>
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
              
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
          
                  <ul className="block lg:flex lg:space-x-12">

                      <Link
                          href=""    
                          className="block rounded  text-sm text-dark hover:opacity-70 dark:text-white mt-3 text-xl">
                          Home
                      </Link>
                      <Link
                          href=""    
                          className="block rounded  text-sm text-dark hover:opacity-70 dark:text-white mt-3 text-xl">
                          About
                      </Link>
                      <Link
                          href=""    
                          className="block rounded  text-sm text-dark hover:opacity-70 dark:text-white mt-3 text-xl">
                          Contact
                      </Link>
                    
                  </ul>

                    
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <Link
                  href="/signin"
                  className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
                >
                  Sign In
                </Link>
                <Link
  to="/signup"
  className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-black hover:text-white hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
>
  Sign Up
</Link>

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

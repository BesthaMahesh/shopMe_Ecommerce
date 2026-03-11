import React from "react";

import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { FiShoppingBag } from "react-icons/fi";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#home",
  },
  {
    id: 2,
    name: "Top Rated",
    link: "/#top-rated",
  },
  {
    id: 3,
    name: "Kids Wear",
    link: "/#products",
  },
  {
    id: 4,
    name: "Mens Wear",
    link: "/#products",
  },
  {
    id: 5,
    name: "Electronics",
    link: "/#products",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#products",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#products",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#top-rated",
  },
];

const Navbar = ({ handleOrderPopup, handleLogout }) => {
  return (
    <div className="shadow-md bg-white dark:bg-slate-800 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-xl items-center flex gap-1">
              <FiShoppingBag size="30" />
              ShopMe
            </a>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-lg border border-gray-300 py-1 px-2
                text-sm focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-slate-800 "
              />
              <IoMdSearch className="text-slate-800 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* order button */}
            <button
              onClick={() => handleOrderPopup()}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group hidden sm:flex"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* logout button */}
            <button
              onClick={() => handleLogout()}
              className="border-2 border-primary/50 hover:border-primary transition-all duration-200 text-slate-800 dark:text-white hover:text-primary py-1 px-4 rounded-full flex items-center gap-2 font-medium"
            >
              Logout
            </button>

            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <button
                onClick={() => {
                  const element = document.querySelector(data.link.replace('/#', '#'));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else if (data.link === "/#home") {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </button>
            </li>
          ))}
          {/* Simple Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <button
                      onClick={() => {
                        const element = document.querySelector(data.link.replace('/#', '#'));
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 text-left"
                    >
                      {data.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const NewNavbar = () => {
  return (
    <div className="navbar bg-alabaster-50 shadow-sm flex flex-col lg:flex-row justify-start items-center px-4 py-2 gap-4">
      <div className="flex justify-center lg:justify-start w-full lg:w-auto">
        <a className="btn btn-ghost text-3xl lg:ml-[72px]">Dashboard</a>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto lg:ml-[130px]">
        <div className="relative w-full lg:w-[700px] mr-[80px]">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered pr-12 w-full rounded-[8px] bg-zircon-50"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-10 h-10 text-white absolute right-0 top-1/2 -translate-y-1/2 bg-carnation-400 rounded-[8px] p-2"
          />
        </div>

        <div className="flex gap-4 mr-[39px]">
          <a href="">
            <FontAwesomeIcon
              icon={faBell}
              className="w-10 h-10 bg-carnation-400 text-white p-2 rounded-[8px]"
            />
          </a>
          <a href="">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="w-10 h-10 bg-carnation-400 text-white p-2 rounded-[8px]"
            />
          </a>
        </div>

        <div className="text-center lg:text-left left-0 ">
          <p className="text-[15px] font-medium">Tuesday</p>
          <p className="text-[14px]">13/07/2025</p>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;

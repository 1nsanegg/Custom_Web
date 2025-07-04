import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const NewNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full h-full lg:px-20 space-x-4">
      {/* Left: Dashboard */}
      <div className="flex-shrink-0 whitespace-nowrap">
        <a className="btn btn-ghost text-xl sm:text-2xl md:text-3xl">
          Dashboard
        </a>
      </div>

      {/* Center: Search (flexible) */}
      <div className="flex-grow min-w-[120px] relative lg:m-35">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered pr-12 w-full rounded-[8px] bg-zircon-50 h-8"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="w-8 h-8 text-white absolute right-0 top-1/2 -translate-y-1/2 bg-carnation-400 rounded-[8px] p-2 cursor-pointer"
        />
      </div>

      {/* Right: Icons & Date */}
      <div className="flex items-center flex-shrink-0 space-x-2 whitespace-nowrap">
        <button className="btn btn-ghost btn-circle" aria-label="Notifications">
          <FontAwesomeIcon
            icon={faBell}
            className="w-8 h-8 bg-carnation-400 text-white p-2 rounded-[8px]"
          />
        </button>
        <button className="btn btn-ghost btn-circle" aria-label="Calendar">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="w-8 h-8 bg-carnation-400 text-white p-2 rounded-[8px]"
          />
        </button>
        <div className="flex flex-col text-left text-xs sm:text-sm md:text-base lg:ml-5">
          <p className="font-medium">Tuesday</p>
          <p>13/07/2025</p>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;

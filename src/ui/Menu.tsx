"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns, faGauge, faExclamation, faCheckSquare, faStream, faGear, faQuestion, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "@/auth/nextjs/actions";
const Menu = () => {
  return (
    <div className="relative w-full mt-15">
      <div className="relative w-full ml-0">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-10 text-center">
          <div className="avatar mb-2">
            <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <p className="text-sm font-semibold text-white">Trevor</p>
          <p className="text-xs text-white">trevorkhuat@gmail.com</p>
        </div>

        <ul className="menu bg-carnation-400 w-full rounded-xl p-4 space-y-2">
          <li className="mt-20">
            <a className="flex items-center gap-4 bg-white text-red-500 font-semibold px-4 py-3 rounded-xl">
              <FontAwesomeIcon icon={faGauge} className="text-xl h-6 w-6" />
              Dashboard
            </a>
          </li>
          <li>
            <a className="flex items-center gap-4 text-white px-4 py-3">
              <FontAwesomeIcon icon={faExclamation} className="text-xl h-6 w-6" />
              Vital Task
            </a>
          </li>
          <li>
            <a className="flex items-center gap-4 text-white px-4 py-3">
              <FontAwesomeIcon icon={faCheckSquare} className="text-xl h-6 w-6" />
              My Task
            </a>
          </li>
          <li>
            <a className="flex items-center gap-4 text-white px-4 py-3">
              <FontAwesomeIcon icon={faStream} className="text-xl h-6 w-6" />
              Task Categories
            </a>
          </li>
          <li>
            <a className="flex items-center gap-4 text-white px-4 py-3">
              <FontAwesomeIcon icon={faGear} className="text-xl h-6 w-6" />
              Setting
            </a>
          </li>
          <li>
            <a className="flex items-center gap-4 text-white px-4 py-3">
              <FontAwesomeIcon icon={faQuestion} className="text-xl h-6 w-6" />
              Help
            </a>
          </li>
          <li className="mb-0">
            <a className="flex items-center gap-4 text-white px-4 py-3 mt-20" onClick={async () => await logOut() }>
              <FontAwesomeIcon icon={faRightFromBracket} className="text-xl h-6 w-6" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;

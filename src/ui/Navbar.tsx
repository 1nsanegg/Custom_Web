"use client";

import { logOut } from "@/auth/nextjs/actions";


type NavbarProps = {
  user: { id: string; role: "admin" | "user" } | null;
};

function Navbar({ user }: NavbarProps) {
  

  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-6xl ml-10 font-lobster ">F</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 mr-10 text-xl">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Blogs</a>
          </li>
          <li>
            <a>Skills</a>
          </li>
          <li>
            <a>Contacts</a>
          </li>
          {user && (
            <li>
              <button
                onClick={async () => await logOut()}
                className="btn btn-error btn-sm ml-4"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
      <ul></ul>
    </div>
  );
}
export default Navbar;

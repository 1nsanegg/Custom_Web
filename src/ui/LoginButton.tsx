"use client";
import { useState } from "react";

function LoginButton() {
  
  return (
    <div className="flex flex-col items-center mt-40">
      <a href="/signin">
        <button className="btn btn-neutral btn-sm ml-4">Login</button>
      </a>
    </div>
  );
}
export default LoginButton;
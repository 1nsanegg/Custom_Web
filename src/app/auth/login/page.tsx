import React from "react";
import LoginForm from "@/auth/nextjs/components/login-form";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <LoginForm />
    </div>
  );
};

export default page;

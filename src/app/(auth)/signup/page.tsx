import RegisterForm from "@/auth/nextjs/components/register-form";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <RegisterForm />
    </div>
  );
};

export default page;

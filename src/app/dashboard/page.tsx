import ToDoList from "@/ui/ToDoList";
import React from "react";

const page = () => {
  return (
    <div className="mt-14 ml-20 mb-8 font-medium w-full h-full">
      <div>
        <h1 className="text-4xl">Welcome back, Trevor</h1>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left side – ToDoList */}
          <div className="w-full">
            <ToDoList />
          </div>

          {/* Right side – Progress bars */}
          <div className="w-full flex flex-col items-start gap-6">
            {[70, 70, 70].map((value, idx) => (
              <div
                key={idx}
                className="radial-progress text-primary"
                style={{ "--value": value } as React.CSSProperties}
                aria-valuenow={value}
                role="progressbar"
              >
                {value}%
              </div>
            ))}
            <div className="text-center mt-4">03</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

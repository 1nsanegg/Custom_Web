import React from "react";

const TodoCard = () => {
  return (
    <div className="relative p-2">
      <div className="bg-white w-full rounded-xl border shadow flex flex-col p-4">
        {/* Top: Title and description with image */}
        <div className="flex flex-row items-start gap-4">
          <div className="flex-1">
            <h2 className="font-bold text-base mb-1">
              Attend Nischal’s Birthday Party
            </h2>
            <p className="text-sm text-gray-600">
              Buy gifts on the way and pick up cake from the bakery. (6 PM |
              Fresh Elements).....
            </p>
          </div>
          <div className="w-30 h-30 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Birthday Party"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom row: Priority, Status, Created on */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-xs text-gray-500">
          <span>
            <strong className="text-black">Priority:</strong>{" "}
            <span className="text-blue-500">Moderate</span>
          </span>
          <span>
            <strong className="text-black">Status:</strong>{" "}
            <span className="text-red-500">Not Started</span>
          </span>
          <span>Created on: 20/06/2023</span>
        </div>
      </div>

      {/* Red circle indicator */}
      <input type="radio" name="radio-5" className="radio radio-secondary absolute top-2 left-2 rounded-full bg-red-500" />
    </div>
  );
};

export default TodoCard;

"use client";
import { useState } from "react";

function InfoToggle() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="flex flex-col items-center mt-40">
      <button className="btn btn-info" onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? "Hide Info" : "Show Info"}
      </button>

      {showInfo && (
        <div className="mt-4 p-4 bg-base-200 rounded shadow">
            <p>This is the extra information revealed when the button is clicked!</p>
        </div>
      )}
    </div>
  );
}
export default InfoToggle;
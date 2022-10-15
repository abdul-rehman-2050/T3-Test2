import React from "react";
import { useState } from "react";

function SideBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      {showSidebar ? (
        <button
          className="fixed left-10 top-6 z-50 flex cursor-pointer items-center text-4xl text-white"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  left-10 top-6 z-30 flex cursor-pointer items-center"
          fill="#2563CB"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}
      <div className={"fixed top-0 left-0 h-full   bg-purple-600 p-10 pr-20 text-white "+(showSidebar?"w-[35vw]":'w-[10vw]')}>
      
        <h2 className="mt-20 text-4xl font-semibold text-white">
          I am a sidebar
        </h2>
      </div>
    </div>
  );
}

export default SideBar;

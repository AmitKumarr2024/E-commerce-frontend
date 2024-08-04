import React from "react";
import { FaWindowClose } from "react-icons/fa";

function NoConnectionSidebar({ isOnline }) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-start p-4 z-50 transition-transform transform ${
        isOnline ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ transitionDuration: "300ms" }}
    >
      <div className="relative w-full max-w-md mx-auto bg-red-600 text-white text-center p-4 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 p-2 text-2xl text-white hover:bg-red-500 rounded-full"
          onClick={() => window.location.reload()}
        >
          <FaWindowClose />
        </button>
        <h1 className="text-xl font-semibold mb-2">No Internet Connection</h1>
        <p>Please check your network and try again.</p>
      </div>
    </div>
  );
}

export default NoConnectionSidebar;

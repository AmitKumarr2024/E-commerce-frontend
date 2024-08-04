import React from "react";

function NoConnectionSidebar({ isOnline }) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-red-600 text-white text-center p-2 z-50 transition-transform transform ${
        isOnline ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative max-w-md w-full bg-red-700 p-4 rounded-md shadow-lg">
        <button
          className="absolute top-2 right-2 p-2 text-2xl text-red-100 hover:bg-red-600 rounded-full"
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

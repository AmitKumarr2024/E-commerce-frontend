import React from "react";
import { FaWindowClose } from "react-icons/fa";

function NoConnectionSidebar({ isOnline, isConnectionRestored }) {
    const backgroundColor = isOnline
      ? 'bg-green-600'
      : 'bg-red-600';
    const message = isOnline
      ? 'Connection Restored'
      : 'No Internet Connection';
  
    return (
      <div
        className={`fixed inset-0 flex justify-center items-start p-4 z-50 transition-transform transform ${
          isOnline || isConnectionRestored ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionDuration: '300ms' }}
      >
        <div className={`relative w-full max-w-md mx-auto ${backgroundColor} text-white text-center p-4 rounded-lg shadow-lg`}>
          <button
            className="absolute top-2 right-2 p-2 text-2xl text-white hover:bg-opacity-50 rounded-full"
            onClick={() => window.location.reload()}
          >
            <FaWindowClose />
          </button>
          <h1 className="text-xl font-semibold mb-2">{message}</h1>
          <p>
            {isOnline ? 'You are back online.' : 'Please check your network and try again.'}
          </p>
        </div>
      </div>
    );
  }

export default NoConnectionSidebar;

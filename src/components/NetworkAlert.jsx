import React, { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';

function NetworkAlert({ isOnline, isConnectionRestored }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOnline || isConnectionRestored) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  }, [isOnline, isConnectionRestored]);

  const backgroundColor = isOnline ? 'bg-green-600' : 'bg-red-600';
  const message = isOnline ? 'Connection Restored' : 'No Internet Connection';

  return (
    <div
      className={`fixed top-14 left-0 right-0 p-2 z-10 transform transition-transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${backgroundColor} text-white text-center`}
      style={{ transitionDuration: '300ms' }}
    >
      <div className="relative w-full mx-auto">
        <button
          className="absolute top-2 right-2 p-2 text-2xl text-white hover:bg-opacity-50 rounded-full"
          onClick={() => setIsVisible(false)}
        >
          <FaWindowClose />
        </button>
        <h1 className="text-xl font-semibold mb-2">{message}</h1>
        <p>{isOnline ? 'You are back online.' : 'Please check your network and try again.'}</p>
      </div>
    </div>
  );
}

export default NetworkAlert;

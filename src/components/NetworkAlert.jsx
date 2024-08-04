// components/NetworkAlert.js
import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";

function NetworkAlert({ isOnline, isConnectionRestored }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!isOnline) {
      setAlertMessage("No Internet Connection");
      setShowAlert(true);
    } else if (isConnectionRestored) {
      setAlertMessage("Internet Connection Restored");
      setShowAlert(true);

      // Hide the alert after 2 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOnline, isConnectionRestored]);

  if (!showAlert) return null;

  return (
    <div
      className={`fixed inset-0 bg-${isOnline ? 'green' : 'red'}-600 text-white p-4 flex justify-center items-center z-50`}
    >
      <div className="relative max-w-lg w-full">
        <button
          className="absolute top-2 right-2 p-2 text-2xl text-white hover:bg-opacity-80 rounded-full"
          onClick={() => setShowAlert(false)}
        >
          <FaWindowClose />
        </button>
        <p className="text-center text-lg">{alertMessage}</p>
      </div>
    </div>
  );
}

export default NetworkAlert;

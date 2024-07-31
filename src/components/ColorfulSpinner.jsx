import React, { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";

const ColorfulSpinner = ({ loading }) => {
  const [color, setColor] = useState("#123abc");
  const colors = ["#123abc", "#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff", "#ffff00"];

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 500); // Change color every 500ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <PuffLoader size={50} color={color} loading={loading} />
      <p>Loading Please wait</p>
    </div>
  );
};

export default ColorfulSpinner;

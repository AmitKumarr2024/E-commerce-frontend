import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function DisplayImage({ imgUrl, onClose }) {
  return (
    <>
      <div className="fixed  bottom-0 top-0 right-0 left-0 flex bg-transparent justify-center items-center  overflow-auto scale-75">
        <div className=" bg-white shadow-lg rounded max-w-5xl p-4">
          <div
            className="text-2xl w-fit ml-auto p-2 rounded-full bg-red-500 hover:text-red-400 cursor-pointer"
            onClick={onClose}>
            <IoClose />
          </div>
          <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
            <img src={imgUrl} className="w-full h-full" alt={imgUrl} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayImage;

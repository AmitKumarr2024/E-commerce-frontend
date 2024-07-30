import React, { useState } from "react";
import ROLE from "../common/role";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import SummaryApi from "../common";

function ChangeRole({ name, email, userId, role, onClose, callFun }) {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    const data = e.target.value;
    setUserRole(data);
    toast.info(`Role : ${data}`, { theme: "dark" });
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.userUpdate.url, {
      method: SummaryApi.userUpdate.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const responseData = await fetchResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFun();
    }
    console.log("response data", responseData);
  };
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex  justify-between items-center bg-cyan-100 bg-opacity-50">
        <div className="w-full mx-auto bg-white  shadow-lg p-4 max-w-md rounded-md ">
          <button
            className="block ml-auto p-4 cursor-pointer"
            onClick={onClose}
          >
            <FaWindowClose  className=" rounded-full  text-2xl text-red-700"/>
          </button>
          <h1 className="pb-9 -mt-10 text-xl font-semibold capitalize text-center">
            Change user role
          </h1>
          <p>
            Name:&nbsp; <span className="font-semibold text-lg">{name}</span>
          </p>
          <p>
            Email:&nbsp; <span className="font-semibold text-lg">{email}</span>
          </p>
          <div className="flex items-center justify-between my-4">
            <p className="font-bold">ROLE</p>
            <select
              className="border px-4 py-1"
              value={userRole}
              onChange={handleOnChangeSelect}
            >
              {Object.values(ROLE).map((el) => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            onClick={updateUserRole}
            className="w-fit mx-auto block border px-3 py-1 rounded-full hover:bg-red-600 hover:text-white bg-red-400 "
          >
            Change Role
          </button>
        </div>
      </div>
    </>
  );
}

export default ChangeRole;

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
      <div className="fixed inset-0 flex justify-center items-center bg-cyan-100 bg-opacity-50 z-10">
        <div className="bg-white shadow-lg p-6 rounded-md max-w-md w-full">
          <button
            className="absolute top-3 right-3 p-2 text-2xl text-red-700 hover:bg-red-100 rounded-full z-50"
            onClick={onClose}
          >
            <FaWindowClose />
          </button>
          <h1 className="text-xl font-semibold text-center mb-6">
            Change User Role
          </h1>
          <p className="text-lg mb-2">
            Name: <span className="font-semibold">{name}</span>
          </p>
          <p className="text-lg mb-4">
            Email: <span className="font-semibold">{email}</span>
          </p>
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold">Role</p>
            <select
              className="border border-gray-300 px-4 py-2 rounded-md"
              value={userRole}
              onChange={handleOnChangeSelect}
            >
              {Object.values(ROLE).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={updateUserRole}
            className="w-full py-2 px-4 rounded-full bg-red-400 text-white hover:bg-red-500 transition-colors"
          >
            Change Role
          </button>
        </div>
      </div>
    </>
  );
}

export default ChangeRole;

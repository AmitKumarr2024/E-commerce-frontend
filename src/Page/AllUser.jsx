import React, { useEffect, useState, useCallback } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaUserEdit } from "react-icons/fa";
import ChangeRole from "../components/ChangeRole";
import ColorfulSpinner from "../components/ColorfulSpinner"; // Import the new spinner component

function AllUser(props) {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchAllUser = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllUser(dataResponse.data);
      } else {
        toast.error(dataResponse.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  if (loading) {
    return <ColorfulSpinner loading={loading} />;
  }

  return (
    <>
      <h1 className="text-3xl mb-7 font-bold uppercase text-center">All Users</h1>
<div className="bg-white pb-5 rounded-lg shadow-md overflow-x-auto">
  <table className="w-full bg-white border-collapse">
    {/* Total Users Header */}
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-200">
        <th colSpan="6" className="p-1 text-left text-gray-700 font-semibold">Total Users</th>
        <th colSpan="1" className="p-1 text-red-800 font-bold text-lg">{allUser.length}</th>
      </tr>
    </thead>

    {/* Main Table Header */}
    <thead className="bg-orange-100 border-b border-gray-200">
      <tr>
        <th className="p-1 text-left text-gray-600 font-semibold">No.</th>
        <th className="p-1 text-left text-gray-600 font-semibold">Name</th>
        <th className="p-1 text-left text-gray-600 font-semibold">Email</th>
        <th className="p-1 text-left text-gray-600 font-semibold">Role</th>
        <th className="p-1 text-left text-gray-600 font-semibold">Created</th>
        <th className="p-1 text-left text-gray-600 font-semibold">Action</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {allUser.map((user, index) => (
        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
          <td className="p-1 text-gray-700">{index + 1}</td>
          <td className="p-1 text-gray-700">{user.name}</td>
          <td className="p-1 text-gray-700">{user.email}</td>
          <td className="p-1 text-gray-700">{user.role}</td>
          <td className="p-1 text-gray-700">{moment(user.createdAt).format("LLL")}</td>
          <td className="p-1 text-center">
            <button
              className="p-2 bg-green-200 hover:bg-green-500 hover:text-white transition-colors ease-in-out text-xl rounded-full"
              onClick={() => {
                setUpdateUserDetails(user);
                setOpenUpdateUser(true);
              }}
            >
              <FaUserEdit />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{openUpdateUser && (
  <ChangeRole
    onClose={() => setOpenUpdateUser(false)}
    name={updateUserDetails.name}
    email={updateUserDetails.email}
    role={updateUserDetails.role}
    userId={updateUserDetails._id}
    callFun={fetchAllUser}
  />
)}

    </>
  );
}

export default AllUser;

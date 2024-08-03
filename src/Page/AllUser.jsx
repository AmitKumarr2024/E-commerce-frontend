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
      <h1 className="text-3xl mb-7 font-bold uppercase text-center">
        All Users
      </h1>
      <div className="bg-white pb-5 rounded-lg">
        <table className="w-full userTable">
        <thead>
            <tr>
              <th>Total user</th>
              <th className="text-red-800">{allUser.length}</th>
            </tr>
          </thead>
          <thead className="bg-orange-100">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{moment(user.createdAt).format("LLL")}</td>
                <td>
                  <button
                    className="p-2 bg-green-200 hover:bg-green-500 hover:text-white hover:ease-in-out text-xl rounded-full"
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

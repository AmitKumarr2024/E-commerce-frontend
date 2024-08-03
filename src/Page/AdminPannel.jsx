import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

function AdminPannel(props) {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="min-h-[calc(100vh-50px)] md:flex hidden">
        <aside className="bg-white min-h-full min-w-[20%] customeShadow">
          <div className="h-40 flex justify-center items-center flex-col mt-5">
            <div className="text-6xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-24 h-24 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
            {/* name */}
            <p className="font-semibold capitalize text-2xl">{user?.name}</p>
            <p className="text-sm ">{user?.role}</p>
          </div>
          {/* navigate */}
          <div>
            <nav className="grid p-4">
              <Link to={"all-user"} className="px-2 py-1 hover:bg-slate-100">
                All User
              </Link>
              <Link to={"all-product"} className="px-2 py-1 hover:bg-slate-100">
                All Product
              </Link>
              <Link to={"all-order"} className="px-2 py-1 hover:bg-slate-100">
                All Order
              </Link>
            </nav>
          </div>
        </aside>
        <main className="w-full min-h-full bg-slate-200 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminPannel;

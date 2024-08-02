import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import { FaRegUserCircle, FaCartPlus } from "react-icons/fa";
import Logo from "./Logo";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import image1 from "../../public/favicon.jpg";

function Header() {
  const navigate = useNavigate();
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [profileMenu, setProfileMenu] = useState(false);
  const context = useContext(Context);
  const searchLocation = useLocation();
  const urlSearch = new URLSearchParams(searchLocation?.search);
  const searchQuery = urlSearch.get("q") || "";
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await fetch(SummaryApi.logout.url, {
        method: SummaryApi.logout.method,
        credentials: "include", // Important for sending cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!fetchData.ok) {
        const errorData = await fetchData.json();
        toast.error(errorData.message || "Logout request failed");
        return;
      }

      const data = await fetchData.json();
      if (data.success) {
        toast.success(data.message);
        // Update application state
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Failed to logout, please try again.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };

  console.log("userdetails", user);
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-50">
    <div className="h-full container mx-auto flex items-center px-4 lg:px-14 justify-between">
      <div>
        <Link to="/">
          <img
            src={image1}
            className="w-20 h-12 lg:w-24 lg:h-14 rounded-2xl mix-blend-multiply animate-pulse transition-all"
            alt="logo"
          />
        </Link>
      </div>
      <div className="hidden lg:flex pl-3 items-center w-full max-w-sm justify-evenly border rounded-full focus-within:shadow">
        <input
          type="text"
          placeholder="Search your Product..."
          className="w-full outline-none pl-4 bg-transparent"
          onChange={handleSearch}
          value={search}
        />
        <div className="text-lg min-w-[50px] h-8 text-[1.5rem] text-white bg-red-600 flex justify-center items-center rounded-r-full">
          <IoIosSearch />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 lg:gap-6 flex-row max-w-xs lg:max-w-sm">
        {user?._id && (
          <Link to="/cart" className="text-2xl lg:text-4xl relative">
            <FaCartPlus />
            <div className="bg-red-600 text-white p-1 w-5 h-5 lg:p-3 font-bold flex items-center justify-center rounded-full absolute -top-3 -right-3">
              <p className="text-xs lg:text-[0.8rem] text-center font-medium">
                {context?.cartProductCount}
              </p>
            </div>
          </Link>
        )}
        <div className="relative flex justify-center">
          <div
            className="text-2xl lg:text-4xl cursor-pointer relative flex justify-center"
            onClick={() => setProfileMenu((prev) => !prev)}
          >
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                alt={user.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          {profileMenu && (
            <div className="absolute z-50 bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
              <nav className="flex flex-col">
                {user.role === ROLE.ADMIN && (
                  <Link
                    to="/admin-pannel/all-product"
                    className="whitespace-nowrap hover:bg-slate-200 p-1 hidden md:block"
                    onClick={() => setProfileMenu((prev) => !prev)}
                  >
                    Admin Pannel
                  </Link>
                )}
                <Link
                  to="/setting"
                  className="whitespace-nowrap hover:bg-slate-200 p-1"
                  onClick={() => setProfileMenu((prev) => !prev)}
                >
                  Setting
                </Link>
                <Link
                  to="/order"
                  className="whitespace-nowrap hover:bg-slate-200 p-1"
                  onClick={() => setProfileMenu((prev) => !prev)}
                >
                  My Order
                </Link>
              </nav>
            </div>
          )}
        </div>
        <div>
          {user?._id ? (
            <Link
              to="/"
              className="px-3 py-1 lg:px-5 lg:py-1 font-bold text-sm lg:text-[1.1rem] rounded-full bg-violet-900 text-white hover:bg-red-800"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 lg:px-5 lg:py-1 font-bold text-sm lg:text-[1.1rem] rounded-full bg-red-500 text-white hover:bg-red-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
  
  );
}

export default Header;

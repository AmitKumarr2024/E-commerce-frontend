import React, { useContext, useState } from "react";
import signupIcon from "../assest/assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

function Login({props}) {
  const [showPassword, setShowPassword] = useState(false);

  const [datas, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  
  const navigate = useNavigate();
  const { fetchUserDetails,fetchUserAddToCart } = useContext(Context);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Assuming data contains the login credentials
    const data = {
      email: e.target.email.value, // or however you're obtaining the email
      password: e.target.password.value, // or however you're obtaining the password
    };

    try {
      const dataResponse = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();


      if (dataResponse.ok) {
        // Handle successful login
        toast.success(dataApi.message || "Login successful");
        // Navigate to another page if needed
        navigate("/");
        fetchUserDetails();
        // for cart
        fetchUserAddToCart();
      } else {
        // Handle error response
        toast.error(dataApi.message || "Login failed");
      }
    } catch (error) {
      toast.error("Network error, please try again later.");
    }
  };

  return (
    <>
      <section id="login">
        <div className="mx-auto container p-5 flex items-center justify-center">
          {/* login start */}
          <div className="bg-white px-9 py-5 w-full max-w-md">
            <div className="w-20 h-20 rounded-full mx-auto">
              <img src={signupIcon} alt="Login/SignUp" />
            </div>

            <form
              action=""
              className="pt-6 flex flex-col gap-1"
              onSubmit={handleOnSubmit}
            >
              {/* email start */}
              <div className="grid">
                <label className="text-[1.1rem] my-2 font-bold">Email:</label>
                <div className="bg-slate-100 rounded-md p-1">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={datas.email}
                    onChange={handleOnChange}
                    className="px-3 py-1 w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              {/* password start */}
              <div className="grid">
                <label className="text-[1.1rem] my-2 font-bold">
                  Password:
                </label>
                <div className="bg-slate-100 rounded-md p-2 flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={datas.password}
                    name="password"
                    onChange={handleOnChange}
                    className="px-3 w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((change) => !change)}
                  >
                    <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="text-[1rem] text-blue-600 w-fit block ml-auto hover:underline hover:text-red-600"
                >
                  Forget Password?
                </Link>
              </div>
              {/* Login */}
              <button className="bg-red-500 text-white px-6 py-2 w-full max-w-[150px] mx-auto mt-7 block rounded-full text-[1.3rem] hover:scale-125 transition-all">
                Login
              </button>
            </form>
            <p className=" my-4 text-center">
              Don't have an account?{" "}
              <Link
                to={"/sign-up"}
                className="text-red-500 hover:text-red-800 hover:underline "
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

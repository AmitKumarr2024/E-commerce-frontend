import React, { useState } from "react";
import signupIcon from "../assest/assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const signupblank = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePic: "",
};
function SignUp(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(signupblank);
  // for input
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((rest) => {
      return {
        ...rest,
        [name]: value,
      };
    });
  };

  console.log("Sign-up", data);
  // for form submit
  const navigate = useNavigate();
  const handleonSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      if (data.password.length >= 8) {
        try {
          const dataResponse = await fetch(SummaryApi.signUp.url, {
            method: SummaryApi.signUp.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const dataApi = await dataResponse.json();
          console.log("Response data:", dataApi); // Log the entire response for debugging

          if (dataResponse.ok) {
            toast.success(dataApi.message || "User created successfully");
            navigate("/login");
          } else {
            toast.error(dataApi.message || "An error occurred");
          }
        } catch (error) {
          console.error("Network error:", error);
          toast.error("Network error, please try again later.");
        }
      } else {
        toast.error("Password should be at least 8 characters long");
      }
    } else {
      toast.error("Password and confirm password do not match");
    }
  };
  // for pic upload
  const handleUploadPic = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const imagepic = await imageToBase64(file);

    console.log("file:", imagepic);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagepic,
      };
    });
  };
  return (
    <>
      <section id="signup">
        <div className="mx-auto container p-5 flex items-center justify-center">
          {/* Signup start */}
          <div className="bg-white px-9 py-5 w-full max-w-sm mx-auto">
            <div className="w-28 h-28 rounded-full mx-auto relative overflow-hidden">
              <div>
                <img src={data.profilePic || signupIcon} alt="signUp" />
              </div>
              <form onSubmit={handleonSubmit}>
                <label>
                  <div className="absolute bottom-0 w-full text-xs bg-opacity-80 bg-slate-200 text-black pb-4 pt-1 cursor-pointer text-center">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    required
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <form
              action=""
              className="pt-6 flex flex-col gap-1"
              onSubmit={handleonSubmit}
            >
              {/* name */}
              <div className="grid">
                <label className="text-[1.1rem] my-2 font-bold">Name:</label>
                <div className="bg-slate-100 rounded-md p-1">
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className="px-3 py-1 w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              {/* email start */}
              <div className="grid">
                <label className="text-[1.1rem] my-2 font-bold">Email:</label>
                <div className="bg-slate-100 rounded-md p-1">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
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
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    required
                    className="px-3 w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((change) => !change)}
                  >
                    <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>
                </div>
              </div>
              {/* confirm-password */}
              <div className="grid">
                <label className="text-[1.1rem] my-2 font-bold">
                  Confirm-Password:
                </label>
                <div className="bg-slate-100 rounded-md p-2 flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter confirm-password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    required
                    className="px-3 w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((change) => !change)}
                  >
                    <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>
                </div>
              </div>
              {/* Login */}
              <button className="bg-red-500 text-white px-6 py-2 w-full max-w-[150px] mx-auto mt-7 block rounded-full text-[1.3rem] hover:scale-125 transition-all">
                Sign Up
              </button>
            </form>
            <p className=" my-4 text-center">
              Already have an Account /{" "}
              <Link
                to={"/login"}
                className="text-red-500 hover:text-red-800 hover:underline "
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;

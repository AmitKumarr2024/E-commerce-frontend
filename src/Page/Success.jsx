import React from "react";
import success from "../assest/assest/success.gif";
import {Link} from 'react-router-dom'

function Success(props) {
  return (
    <div className="mt-6 rounded-lg w-full mix-blend-multiply bg-green-50 max-w-md mx-auto flex flex-col justify-center items-center p-4" >
      <img src={success} className="rounded-full mix-blend-multiply" width={800} height={100} alt="success" />
      <p className="my-5 text-green-600 font-medium text-lg">Payment Done Successfull</p>
      <Link to={'/order'} className="p-2 m-2 border-2 hover:bg-green-600 hover:text-white border-green-600 text-green-600 bg-white font-bold rounded-md">See Your Order</Link>
    </div>
  );
}

export default Success;

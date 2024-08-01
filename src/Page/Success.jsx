import React from "react";
import success from "../assest/assest/success.gif";
import {Link} from 'react-router-dom'

function Success(props) {
  return (
    <div className="mt-6 rounded-lg w-full bg-slate-200 max-w-md mx-auto flex flex-col justify-center items-center p-4" >
      <img src={success} width={150} height={150} alt="success" />
      <p className="text-green-700 font-bold text-xl">Payment Done Successfull</p>
      <Link to={'/order'} className="p-2 m-2 border-2 hover:bg-white hover:text-green-600 hover:border-green-700 bg-green-600 font-bold rounded-md">See Your Order</Link>
    </div>
  );
}

export default Success;

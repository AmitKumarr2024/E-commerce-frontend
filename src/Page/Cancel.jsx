import React from 'react';
import cancel from '../assest/assest/cancel.gif'

function Cancel(props) {
    return (
        <div>
           <div className="mt-6 rounded-lg w-full mix-blend-multiply bg-orange-200-100 max-w-md mx-auto flex flex-col justify-center items-center p-4" >
      <img src={cancel} className="rounded-full mix-blend-multiply bg-transparent " width={250} height={100} alt="success" />
      <p className="my-5 text-red-700 font-medium text-lg">Payment Cancelled!</p>
      <Link to={'/order'} className="p-2 m-2 border-2 hover:bg-red-600 hover:text-white border-red-600 text-red-600 bg-white font-bold rounded-md">See Your Order</Link>
    </div>
        </div>
    );
}

export default Cancel;
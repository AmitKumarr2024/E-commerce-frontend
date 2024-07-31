import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProdcut from "./AdminEditProdcut";
import displayINRCurrency from "../helper/displayCurrency";

function AdminProductCard({ data, key, fetchdata }) {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <>
      <div key={key} className="bg-white p-2 rounded-md my-1">
        <div className="w-56 ">
          <div className="w-56 h-56 flex justify-center items-center overflow-hidden">
            <img
              src={data?.productImage[0]}
              alt={data?.productImage[0]}
              className="object-contain max-h-full max-w-full"
            />
          </div>

          <div className="flex flex-col justify-between items-center">
            <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
            <p className="text-[0.8rem] text-blue-400 capitalize font-bold">
              {data?.brandName}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div className="text-[1rem] font-semibold">
                {displayINRCurrency(data?.selling)}
              </div>
              <div className="text-[0.8rem] line-through text-red-300">
                {displayINRCurrency(data?.price)}
              </div>
            </div>
            <span className="flex items-center">
              <p className="text-[0.7rem] text-zinc-400 capitalize font-extrabold">
                category : &nbsp;
              </p>
              <p className="capitalize">{data?.category}</p>
            </span>

            <span>
              <p className="text-[0.7rem]">
                <span className="text-[0.7rem] text-zinc-400 font-extrabold">
                  Discription :{" "}
                </span>
                <p className="capitalize text-ellipsis line-clamp-1">
                  {data?.description}
                </p>
              </p>
            </span>

            <div
              className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEdit />
            </div>
          </div>
        </div>
        {editProduct && (
          <AdminEditProdcut
            data={data}
            onClose={() => setEditProduct(false)}
            fetchdata={fetchdata}
          />
        )}
      </div>
    </>
  );
}

export default AdminProductCard;

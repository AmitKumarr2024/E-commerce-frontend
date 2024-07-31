import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helper/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helper/uploadimage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import ProductApi from "../common/product";
import { toast } from "react-toastify";

function UploadProducts({ onClose, fetchdata }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    try {
      const { name, value } = e.target;
      setData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } catch (error) {}
  };

  const handleUploadProduct = async (e) => {
    const files = Array.from(e.target.files);

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const uploadImageCloudinary = await uploadImage(file);
        return uploadImageCloudinary.url;
      })
    );

    setData((previous) => {
      return {
        ...previous,
        productImage: [...previous.productImage, ...uploadedImages],
      };
    });
  };

  // handle delete product image
  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(ProductApi.createProduct.url, {
      method: ProductApi.createProduct.method,
      credentials: "include",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchdata();
    }
    if (responseData.error) {
      toast.error(responseData.error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-slate-200 bg-opacity-75 z-50">
        <div className="bg-white p-4 rounded w-full max-w-3xl h-full max-h-[80%] overflow-hidden shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2>Upload Product</h2>
            <div
              className="text-2xl w-fit ml-auto bg-red-500 p-3 text-white rounded-full hover:bg-red-700 hover:text-white cursor-pointer"
              onClick={onClose}
            >
              <IoClose />
            </div>
          </div>

          <form
            className="grid p-1 overflow-y-scroll hide-scrollbar h-full pb-5"
            onSubmit={handleSubmit}
          >
            <div className="grid p-3">
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Enter product name"
                value={data.productName}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />
            </div>
            <div className="grid p-3">
              <label htmlFor="brandName">Brand Name:</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                placeholder="Enter brand name"
                value={data.brandName}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />
            </div>

            <div className="grid p-3">
              <label htmlFor="category">Category:</label>
              <select
                value={data.category}
                name="category"
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              >
                <option value={""}>Select Category</option>
                {productCategory.map((prod, index) => (
                  <option value={prod.value} key={prod.value + index}>
                    {prod.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid p-3">
              <label htmlFor="productImage" className="mt-3">
                Product Images:
              </label>
              <label htmlFor="uploadImageInput">
                <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                  <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                    <span className="text-4xl">
                      <FaCloudUploadAlt />
                    </span>
                    <p className="text-sm">Upload Product Images</p>
                    <input
                      type="file"
                      id="uploadImageInput"
                      className="hidden"
                      onChange={handleUploadProduct}
                      multiple
                      required
                    />
                  </div>
                </div>
              </label>
              <div className="flex justify-start items-center gap-2">
                {data?.productImage[0] ? (
                  data.productImage.map((tl, index) => (
                    <div
                      key={index}
                      className="w-22 h-20 mt-1 bg-slate-100 border overflow-hidden relative group"
                    >
                      <img
                        src={tl}
                        alt={tl}
                        className="w-full h-full object-cover"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(tl);
                        }}
                      />
                      <div
                        className="cursor-pointer absolute text-[0.7rem] bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-600 text-xs py-2">
                    *Please upload product images
                  </p>
                )}
              </div>
              <button className="px-3 py-2 mt-2 font-semibold hover:bg-red-700 hover:text-white bg-red-600 text-white text-lg rounded-sm">
                Upload Photos
              </button>
            </div>

            <div className="grid p-3">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Enter price"
                value={data.price}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />
            </div>
            <div className="grid p-3">
              <label htmlFor="selling">Selling:</label>
              <input
                type="text"
                id="selling"
                name="selling"
                placeholder="Enter selling price"
                value={data.selling}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded"
                required
              />
            </div>
            <div className="grid p-3">
              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Enter product description"
                value={data.description}
                onChange={handleOnChange}
                rows={3}
                className="h-28 p-2 bg-slate-100 border resize-none rounded"
                required
              />
            </div>
            <button className="px-3 py-2 my-9 font-bold bg-green-500 text-white hover:bg-green-700 text-lg rounded-sm">
              Upload Product
            </button>
          </form>
        </div>
        {/* display image in full screen */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </>
  );
}

export default UploadProducts;

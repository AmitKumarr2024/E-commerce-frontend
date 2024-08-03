import React, { useEffect, useState } from "react";
import UploadProducts from "../components/UploadProducts";
import ProductApi from "../common/product";
import AdminProductCard from "../components/AdminProductCard";
import ColorfulSpinner from "../components/ColorfulSpinner";
import { toast } from "react-toastify";

function AllProducts(props) {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(ProductApi.allProduct.url, {
        method: ProductApi.allProduct.method,
        credentials: "include",
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setAllProduct(responseData.data || []);
      } else {
        toast.error("Failed to fetch products:", responseData.message);
      }
    } catch (error) {
      toast.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  if (loading) {
    return <ColorfulSpinner loading={loading} />;
  }

  return (
    <>
      <div className="bg-white flex justify-between items-center py-3 px-6 text-lg font-semibold rounded-lg">
        <h2 className="font-medium capitalize text-3xl">All products {allProduct.length} </h2>
        <span
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 px-3 py-1 rounded-full border-red-300 text-red-400 hover:bg-red-700 hover:text-white cursor-pointer"
        >
          Add Products
        </span>
      </div>

      {/* all product display below */}
      <div className="mt-5 flex justify-evenly flex-wrap items-center gap-1 h-[calc(125vh-100px)] overflow-y-scroll ">
        {allProduct.map((product) => {
          return (
            <AdminProductCard
            
              data={product}
              key={product._id} // Assuming _id is a unique identifier for each product
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {openUploadProduct && (
        <UploadProducts
          onClose={() => setOpenUploadProduct(false)}
          fetchdata={fetchAllProduct}
        />
      )}
    </>
  );
}

export default AllProducts;

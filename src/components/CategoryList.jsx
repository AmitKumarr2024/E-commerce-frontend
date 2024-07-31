import React, { useEffect, useState } from "react";
import ProductApi from "../common/product";
import ColorfulSpinner from "./ColorfulSpinner";
import { Link } from "react-router-dom";

function CategoryList(props) {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    const response = await fetch(ProductApi.categoryProduct.url, {
      method: ProductApi.categoryProduct.method,
    });
    setLoading(false);
    const dataResponse = await response.json();
    setCategoryProduct(dataResponse.productByCategory);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  // if (loading) {
  //   return <ColorfulSpinner loading={loading} />;
  // }

  return (
    <div className=" container mx-auto p-2">
      <div className="flex h-32 justify-evenly items-center gap-2 overflow-scroll hide-scrollbar ">
        {loading
          ? categoryLoading.map((tl, index) => {
              return (
                <div
                  className="h-12 w-12 md:w-20 md:h-20  rounded-full overflow-hidden bg-slate-300 animate-pulse"
                  key={"categoryLoding" + index}
                ></div>
              );
            })
          : categoryProduct.map((items, index) => {
              return (
                <Link
                  key={index}
                  to={"/get-category?category=" + items?.category}
                  className="cursor-pointer"
                >
                  <div className="text-center cursor-pointerb ">
                    <div className=" w-12 h-12 md:w-20 md:h-20 p-3 rounded-full flex justify-center items-center bg-slate-300 overflow-hidden">
                      <img
                        src={items?.productImage[0]}
                        alt={items.category}
                        className="object-scale-down max-h-full max-w-full mix-blend-multiply hover:scale-125 transition-all"
                      />
                    </div>
                    <p className="text-[0.6rem] mt-3 md:text-xs font-bold capitalize">
                      {items.category}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default CategoryList;

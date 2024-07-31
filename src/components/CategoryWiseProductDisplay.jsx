import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWise from "../helper/fetchCategoryWise";
import displayINRCurrency from "../helper/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import addToCart from "../helper/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";
import scrollUp from "../helper/scrollUp";

function CategoryWiseProductDisplay({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollElements = useRef(null);

  const loadingList = new Array(13).fill(null);
  
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWise(category);
    setLoading(false);
    setData(categoryProduct);
    console.log(categoryProduct);
  };

  const checkScrollButtons = () => {
    if (scrollElements.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollElements.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [data, loading]);

  return (
    <div className="container mx-auto my-6 relative">
      <h1 className="text-2xl capitalize font-semibold py-2">{heading}</h1>

      <div className=" grid grid-cols-[repeat(auto-fit,minmax(300px,360px))] gap-5 justify-between overflow-hidden mg:gap=6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="cursor-pointer mx-4 my-5 w-full min-w-[360px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="h-48 p-4 min-w-[120px] md:min-w-[90px] bg-slate-300 flex justify-center items-center animate-pulse">
                  <img
                    src={""}
                    className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                    alt=""
                  />
                </div>
                <div className="p-6 flex flex-col justify-center gap-1">
                  <h1 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 py-3 w-full bg-slate-200 animate-pulse"></h1>
                  <p className="text-[0.9rem] font-semibold p-2 w-full bg-slate-200 animate-pulse"></p>
                  <p className="text-[0.8rem] p-3 w-full bg-slate-200 animate-pulse"></p>
                  <div className="flex justify-between">
                    <p className="text-green-600 text-[1rem] p-3 w-20 rounded-full bg-slate-200 animate-pulse"></p>
                    <p className="line-through text-slate-400 text-[0.9rem] rounded-full p-3 w-20 bg-slate-200 animate-pulse"></p>
                  </div>
                  <button className="bg-slate-200 rounded-full text-sm font-medium capitalize transition-all px-3 py-4 animate-pulse text-white w-full"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={"/product/" + product._id}
                key={index}
                className="cursor-pointer mx-4 my-5 w-full min-w-[360px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-orange-50 rounded-sm shadow"
                onClick={scrollUp}
              >
                <div className="h-48 p-4 min-w-[120px] md:min-w-[90px] bg-slate-300 flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                    alt=""
                  />
                </div>
                <div className="p-6 flex flex-col justify-center gap-1">
                  <h1 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                    {product.productName}
                  </h1>
                  <p className="text-[0.9rem] font-semibold">
                    {product.brandName}
                  </p>
                  <p className="text-[0.8rem]">Category : {product.category}</p>
                  <div className="flex justify-between">
                    <p className="text-green-600 text-[1rem]">
                      {displayINRCurrency(product.selling)}
                    </p>
                    <p className="line-through text-slate-400 text-[0.9rem]">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    className="rounded-full text-sm font-medium capitalize transition-all bg-orange-500 hover:bg-green-600 px-3 py-1 text-white"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default CategoryWiseProductDisplay;

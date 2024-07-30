import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWise from "../helper/fetchCategoryWise";
import displayINRCurrency from "../helper/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import addToCart from "../helper/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";

function VerticalCard({ category, heading }) {
  const [data, setData] = useState([]); // Initialize as an empty array
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
    try {
      const categoryProduct = await fetchCategoryWise(category);
      setData(categoryProduct || []); // Ensure it is an array
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const checkScrollButtons = () => {
    if (scrollElements.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollElements.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollRight = () => {
    if (scrollElements.current) {
      scrollElements.current.scrollLeft += 250;
      checkScrollButtons();
    }
  };

  const scrollLeft = () => {
    if (scrollElements.current) {
      scrollElements.current.scrollLeft -= 250;
      checkScrollButtons();
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]); // Add category as a dependency

  useEffect(() => {
    checkScrollButtons();
  }, [data, loading]);

  return (
    <div className="container mx-auto my-6 relative">
      <h1 className="text-2xl capitalize font-semibold py-2">{heading}</h1>
      <div className="relative">
        {canScrollLeft && (
          <button
            className="bg-white p-2 hidden md:block rounded-full text-gray-500 shadow-lg absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={scrollLeft}
          >
            <FaAngleLeft />
          </button>
        )}
        {canScrollRight && (
          <button
            className="bg-white p-2 hidden md:block rounded-full text-gray-500 shadow-lg absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={scrollRight}
          >
            <FaAngleRight />
          </button>
        )}
        <div
          className="w-full flex items-center overflow-x-scroll hide-scrollbar"
          ref={scrollElements}
        >
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
            : Array.isArray(data) && data.map((product, index) => (
                <Link
                  to={"product/" + product._id}
                  key={index}
                  className="cursor-pointer mx-4 my-5 w-full min-w-[360px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-orange-50 rounded-sm shadow"
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
                    <p className="text-[0.8rem]">
                      Category : {product.category}
                    </p>
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
    </div>
  );
}

export default VerticalCard;

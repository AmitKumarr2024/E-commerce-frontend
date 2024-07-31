import React, { useEffect, useState, useCallback, useContext } from "react";
import ProductApi from "../common/product";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import displayINRCurrency from "../helper/displayCurrency";
import VerticalCard from "../components/VerticalCard";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";
import addToCart from "../helper/addToCart";

function ProductDetails(props) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState([]);
  const [zoomImagePosition, setZoomImagePosition] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImageBox, setZoomImageBox] = useState(false);

  const navigate = useNavigate();

  const { fetchUserAddToCart } = useContext(Context);
  const params = useParams();

  const loadingDetails = new Array(4).fill(null);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(ProductApi.ProductDetails.url, {
      method: ProductApi.ProductDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse.data);
    setActiveImage(dataResponse.data.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleMouseMove = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImageBox(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImagePosition({ x, y });
    },
    [zoomImagePosition]
  );

  const handleMouseLeave = () => {
    setZoomImageBox(false);
  };

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); // Prevent default link behavior
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleToBuy = async (e, id) => {
    e.preventDefault(); // Prevent default link behavior
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  

  return (
    <>
      <div className="container mx-auto py-9 mt-2">
        <div className="min-h-[300px] flex gap-1 flex-col md:flex-row">
          {/* product Image */}
          <div className="h-96 flex gap-2 flex-col-reverse lg:flex-row lg:gap-2">
            <div className="h-full">
              {loading ? (
                <div className="h-full flex gap-3 lg:flex-col overflow-scroll hide-scrollbar ">
                  {loadingDetails.map((_, index) => (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-300 rounded animate-pulse transition-all"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex gap-3 lg:flex-col overflow-scroll hide-scrollbar">
                  {data.productImage.map((items, index) => (
                    <div key={index} className="h-20 w-20 bg-slate-200 rounded">
                      <img
                        src={items}
                        onMouseEnter={() => handleMouseMove(items)}
                        onClick={() => handleMouseMove(items)}
                        className="h-full w-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* big-image */}
            {loading ? (
              <div className="h-[350px] w-[350px] md:h-96 md:w-[420px] bg-slate-200 rounded animate-pulse"></div>
            ) : (
              <div className="relative h-[410px] w-[380px]  mr-6 md:h-96 md:w-96 bg-slate-200 rounded p-1 cursor-pointer">
                <img
                  src={activeImage}
                  className="h-full w-full object-scale-down mix-blend-multiply"
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleMouseLeave}
                  alt="Product"
                />

                {/* product zoom */}
                {zoomImageBox && (
                  <div className="z-50 hidden lg:block overflow-hidden absolute -right-[605px] top-0 min-w-[600px] min-h-[400px] bg-slate-200 p-1">
                    <div
                      className="h-full w-full min-h-[500px] min-w-[500px] mix-blend-multiply scale-125"
                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${zoomImagePosition.x * 100}% ${
                          zoomImagePosition.y * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* product details */}
          {loading ? (
            <div className="flex flex-col gap-4">
              <p className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-56"></p>
              <h2 className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-full "></h2>
              <p className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-56"></p>
              <div className="flex items-center gap-2">
                <p className="bg-slate-300 animate-pulse rounded-full inline-block py-3 w-20"></p>
                <div className="bg-slate-300 animate-pulse rounded-full inline-block py-3 w-56"></div>
              </div>
              <div className="flex items-center gap-20 text-2xl lg:text-3xl font-medium my-1">
                <p className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-56"></p>
                <p className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-56"></p>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-32"></button>
                <button className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-32"></button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="bg-slate-300 animate-pulse rounded-full inline-block py-4 w-full"></p>
                <p className="bg-slate-300 animate-pulse rounded-full inline-block py-7 w-full"></p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="bg-red-600 text-white px-2 rounded-full inline-block w-fit animate-pulse">
                {data?.brandName}
              </p>
              <h2 className="text-xl lg:text-2xl font-light">
                {data?.productName}
              </h2>
              <p className="capitalize text-slate-500 font-semibold">
                Category: {data?.category}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-slate-500">Rating:</p>
                <div className="text-yellow-500 flex items-center gap-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfStroke />
                </div>
              </div>
              <div className="flex items-center gap-20 text-xl lg:text-2xl font-medium my-1">
                <p className="text-green-600 animate-bounce">
                  {displayINRCurrency(data?.selling)}
                </p>
                <p className="text-slate-300 line-through">
                  {displayINRCurrency(data?.price)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border-2 transition-all hover:bg-green-600 bg-green-500 text-white px-5 py-2 rounded-lg font-semibold capitalize text-lg"
                  onClick={(e) => handleToBuy(e, data?._id)}
                >
                  Buy Items
                </button>
                <button
                  className="border-2 transition-all hover:bg-red-700 bg-red-500 text-white px-5 py-2 rounded-lg font-semibold capitalize text-lg"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add to Cart
                </button>
              </div>
              <div className="flex gap-2">
                <p className="text-slate-600 font-bold">Description:</p>
                <p className="text-slate-500 font-medium text-wrap transition-all">
                  {data?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Suggested Product"}
        />
      )}
    </>
  );
}

export default ProductDetails;

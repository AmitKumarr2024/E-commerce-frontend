import React, { useEffect, useState } from "react";
import image1 from "../assest/assest/banner/img1.webp";
import image2 from "../assest/assest/banner/img2.webp";
import image3 from "../assest/assest/banner/img3.jpg";
import image4 from "../assest/assest/banner/img4.jpg";
import image5 from "../assest/assest/banner/img5.webp";

import mobileImage1 from "../assest/assest/banner/img1_mobile.jpg";
import mobileImage2 from "../assest/assest/banner/img2_mobile.webp";
import mobileImage3 from "../assest/assest/banner/img3_mobile.jpg";
import mobileImage4 from "../assest/assest/banner/img4_mobile.jpg";
import mobileImage5 from "../assest/assest/banner/img5_mobile.png";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function BannerImage(props) {
  const [bannerImage, setBannerImage] = useState(0);
  const [loading, setLoading] = useState(true); // Initial loading state set to true
  const dekstopImage = [image1, image2, image3, image4, image5];
  const mobileImage = [
    mobileImage1,
    mobileImage2,
    mobileImage3,
    mobileImage4,
    mobileImage5,
  ];

  const nextImage = () => {
    setLoading(true);
    setBannerImage((prev) => (prev + 1) % dekstopImage.length);
  };

  const previousImage = () => {
    setLoading(true);
    setBannerImage((prev) => (prev - 1 + dekstopImage.length) % dekstopImage.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = dekstopImage[bannerImage];
    img.onload = () => setLoading(false);
  }, [bannerImage]);

  return (
    <div className="container mx-auto">
      <div className="h-52 md:h-72 md:w-full bg-slate-200 relative">
        <div className="absolute h-full w-full z-10 md:flex items-center hidden">
          <div className="flex justify-between w-full mx-2 text-2xl">
            <button
              className="bg-slate-200 p-2 rounded-full text-gray-500 shadow-lg"
              onClick={previousImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-slate-200 p-2 rounded-full text-gray-500 shadow-lg"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop and tablet */}
        <div className="hidden md:flex h-full w-full overflow-hidden rounded">
          {loading ? (
            <div
              className="w-full h-full min-w-full min-h-full transition-all bg-slate-200 animate-pulse"
              style={{ transform: `translateX(-${bannerImage * 100}%)` }}
            ></div>
          ) : (
            dekstopImage.map((image, index) => (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                style={{ transform: `translateX(-${bannerImage * 100}%)` }}
                key={index}
              >
                <img src={image} className="h-full w-screen object-fill" alt={`Banner ${index}`} />
              </div>
            ))
          )}
        </div>

        {/* Mobile and small screen */}
        <div className="flex h-full w-full overflow-hidden rounded md:hidden">
          {mobileImage.map((image, index) => (
            <div
              className="w-full h-32 md:h-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${bannerImage * 100}%)` }}
              key={index}
            >
              <img src={image} className="h-full w-full object-fill" alt={`Mobile Banner ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerImage;

"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { BounceLoader } from "react-spinners";
import Image from "next/image";

export function CarouselSize() {
  const [bestsellers, setbestsellers] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchBestSeller = async () => {
    setloading(true);
    try {
      const response = await fetch("/api/get-products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch best seller perfumes");
      }
      const perfumes: { bestSeller: boolean }[] = await response.json();

      const bestsellers = perfumes.filter(
        (perfume) => perfume.bestSeller === true
      );
      setbestsellers(bestsellers);
      setloading(false);
    } catch (error) {
      console.error("Failed to fetch best seller perfumes", error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchBestSeller();
  }, []);

  const textContainer = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 0.8 },
    },
  };

  return (
    <div>
      {loading ? (
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center w-full"
        >
          {" "}
          <BounceLoader size={50} />
        </motion.div>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ clickable: true }}
          className="w-full max-w-xl"
        >
          {bestsellers.map((perfume, index) => (
            <SwiperSlide key={index} className="mb-5">
              <motion.div
                variants={textContainer}
                initial="hidden"
                animate="visible"
                className=" flex flex-col items-center shadow-lg rounded-xl pb-5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 bg-gray-500 p-1">
                  {" "}
                  <p className="text-sm text-white">Best Seller</p>
                </div>

                <div className="w-full h-64">
                  <Image
                    src={perfume.image}
                    alt={perfume.name}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full rounded-xl"
                  />
                </div>

                <h2 className="text-xl mt-2">{perfume.name}</h2>
                <div className="flex gap-5">
                  {" "}
                  <p className="text-gray-600 text-lg line-through">
                    ${perfume.originalPrice}
                  </p>
                  <p className="text-gray-600 text-lg">
                    ${perfume.discountedPrice}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function CarouselSize() {
  const perfumes = [
    {
      id: 1,
      name: "Ethereal Blossom",
      image: "/perfume.jpg",
      price: "$120",
    },
    {
      id: 2,
      name: "Velvet Noir",
      image: "/perfume.jpg",
      price: "$150",
    },
    {
      id: 3,
      name: "Amber Luxe",
      image: "/perfume.jpg",
      price: "$135",
    },
    {
      id: 4,
      name: "Celestial Mist",
      image: "/perfume.jpg",
      price: "$110",
    },
    {
      id: 5,
      name: "Royal Essence",
      image: "/perfume.jpg",
      price: "$140",
    },
  ];
  const textContainer = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 0.8 },
    },
  };

  return (
    <motion.div variants={textContainer} initial="hidden" animate="visible">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        pagination={{ clickable: true }}
        className="w-full max-w-xl"
      >
        {perfumes.map((perfume) => (
          <SwiperSlide key={perfume.id} className="mb-5">
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

              <Image
                src={perfume.image}
                alt={perfume.name}
                width={200}
                height={200}
                className=" object-cover w-full rounded-xl"
              />

              <h2 className="text-xl mt-2">{perfume.name}</h2>
              <div className="flex gap-5">
                {" "}
                <p className="text-gray-600 text-lg line-through">$200</p>
                <p className="text-gray-600 text-lg">{perfume.price}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

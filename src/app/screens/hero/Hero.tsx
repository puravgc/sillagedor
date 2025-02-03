"use client";
import { CarouselSize } from "@/app/components/carousel/Carousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const textContainer = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, duration: 0.8 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Hero = () => {
  return (
    <div className="h-full w-full px-5">
      <div className="flex flex-col md:flex-row justify-between h-full mt-20">
        {/* Text Section */}
        <div className="text-4xl md:text-6xl flex flex-col font-extrabold text-center md:text-left p-10">
          <motion.div
            className="w-full text-gray-600"
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="inline-block" variants={textItem}>
              Indulge in luxury,
            </motion.span>
            <br />
            <motion.span className="inline-block" variants={textItem}>
              one fragrance at a time.
            </motion.span>
            <div className="text-xl mt-5">
              <Button className="p-6 bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-600 hover:text-white">
                Shop Now
              </Button>
            </div>
          </motion.div>

          <div className="mt-12 w-full flex flex-col items-start">
            {" "}
            <div className="">
              <motion.h1
                className="text-2xl text-gray-600 mb-5"
                variants={textContainer}
                initial="hidden"
                animate="visible"
              >
                BEST SELLERS
              </motion.h1>
            </div>
            <div className="">
              <CarouselSize />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <motion.div
          className="flex flex-wrap md:flex-nowrap w-full md:w-[50%] gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.5,
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
        >
          <motion.div
            className="h-auto md:h-[90%] flex flex-col gap-5 justify-end items-end p-5"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <Image
              src="/sidemodel.png"
              alt="model image"
              height={800}
              width={2000}
              className="h-auto max-h-[400px] md:h-[50%] rounded-xl object-cover"
            />
            <Image
              src="/model2.jpg"
              alt="model image"
              height={800}
              width={2000}
              className="h-auto max-h-[400px] md:h-[50%] rounded-xl object-cover"
            />
          </motion.div>

          <motion.div
            className="h-auto md:h-[90%] flex justify-end items-end pb-5 pt-5 pr-5 rounded-xl"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <Image
              src="/menmodel.png"
              alt="model image"
              height={800}
              width={2000}
              className="h-full rounded-xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import Quantity from "@/components/ui/quantity";

const Trending = () => {
  return (
    <div className="my-10">
      {/* Marquee Section */}
      <div className="mb-16">
        <Marquee
          className="text-8xl font-bold strokeme overflow-hidden"
          speed={150}
        >
          {Array(5)
            .fill("TRENDING")
            .map((text, index) => (
              <p key={index} className="mr-10">
                {text}
              </p>
            ))}
        </Marquee>
      </div>

      <div className="flex">
        {/* Content Section */}
        <div className="h-full flex justify-center gap-16 px-5">
          {/* Image Section */}
          <div className="w-fit h-fit flex justify-center items-start overflow-hidden rounded-xl">
            <Image
              layout="intrinsic"
              src={"/trending2.png"}
              height={900}
              width={500}
              alt="perfume"
              className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500 h-full w-auto"
            />
          </div>

          {/* Text + Pricing + Quantity */}
          <div className="max-w-sm text-gray-600">
            {/* Product Name */}
            <h1 className="text-5xl font-bold">
              Lattafa Khamrah Qahwa Eau De Parfum
            </h1>

            {/* Price Section */}
            <div className="flex gap-5 mt-10">
              <p className="text-2xl line-through">$65</p>
              <p className="text-2xl font-semibold">$35</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5">
              <Quantity />
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <button className="w-full px-12 py-3 text-gray-600 border border-gray-600 rounded-xl hover:border-2 transition-colors duration-300">
                Add to cart
              </button>
              <button className="w-full px-12 py-3 text-white bg-gray-600 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                Buy it now
              </button>
            </div>
          </div>
        </div>
        <div className=" border border-gray-500"></div>
        {/* Content Section */}
        <div className="h-full flex justify-center gap-16 px-5">
          {/* Image Section */}
          <div className="w-fit h-fit flex justify-center items-start overflow-hidden rounded-xl">
            <Image
              layout="intrinsic"
              src={"/trending.png"}
              height={900}
              width={500}
              alt="perfume"
              className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500 h-full w-auto"
            />
          </div>

          {/* Text + Pricing + Quantity */}
          <div className="max-w-sm text-gray-600">
            {/* Product Name */}
            <h1 className="text-5xl font-bold">
              Dior Sauvage by Christian Dior Men's Elixir
            </h1>

            {/* Price Section */}
            <div className="flex gap-5 mt-10">
              <p className="text-2xl line-through">$200</p>
              <p className="text-2xl font-semibold">$160</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5">
              <Quantity />
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <button className="w-full px-12 py-3 text-gray-600 border border-gray-600 rounded-xl hover:border-2 transition-colors duration-300">
                Add to cart
              </button>
              <button className="w-full px-12 py-3 text-white bg-gray-600 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                Buy it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;

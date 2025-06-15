import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import Quantity from "@/components/ui/quantity";

const products = [
  {
    name: "Lattafa Khamrah Qahwa Eau De Parfum",
    originalPrice: 65,
    discountedPrice: 35,
    image: "/trending2.png",
  },
  {
    name: "Dior Sauvage by Christian Dior Men's Elixir",
    originalPrice: 200,
    discountedPrice: 160,
    image: "/trending.png",
  },
];

const Trending = () => {
  return (
    <section className="py-16  text-gray-600">
      {/* Marquee Heading */}
      <div className="mb-10">
        <Marquee
          speed={100}
          gradient={false}
          className="text-5xl md:text-7xl font-extrabold uppercase text-gray-600"
        >
          {Array(5)
            .fill("TRENDING")
            .map((text, i) => (
              <span key={i} className="mx-6">
                {text}
              </span>
            ))}
        </Marquee>
      </div>

      {/* Products */}
      <div className="flex flex-col gap-16 px-6 md:px-20">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 bg-gray-300 border rounded-3xl shadow-xl overflow-hidden p-6 md:p-10"
          >
            {/* Text Section */}
            <div className="flex-1 text-gray-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h2>

              {/* Pricing */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl md:text-2xl line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-2xl md:text-3xl font-semibold">
                  ${product.discountedPrice}
                </span>
                <span className="text-xs uppercase bg-gray-600 text-white px-2 py-1 rounded-full">
                  Sale
                </span>
              </div>

              {/* Quantity */}
              <div className="mt-5">
                <Quantity />
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="w-full sm:w-auto px-6 py-3 text-gray-600 border border-gray-600 rounded-xl hover:border-2 transition">
                  Add to Cart
                </button>
                <button className="w-full sm:w-auto px-6 py-3 text-white bg-gray-600 rounded-xl hover:bg-gray-700 transition">
                  Buy it now
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={700}
                className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500 mx-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;

import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { prisma } from "@/lib/prisma";
import ShopNowButton from "./ShopNowButton";

const Trending = async () => {
  const products = await prisma.perfumeModel.findMany({
    where: { bestSeller: true, stock: { gt: 0 } },
    orderBy: { releaseDate: "desc" },
    take: 3,
  });

  return (
    <section className="py-20 text-gray-700">
      {/* Marquee Heading */}
      <div className="mb-16">
        <Marquee
          speed={80}
          gradient={false}
          className="text-6xl md:text-7xl font-extrabold uppercase text-gray-700 strokeme"
        >
          {Array(4)
            .fill("TRENDING")
            .map((text, i) => (
              <span key={i} className="mx-10">
                {text}
              </span>
            ))}
        </Marquee>
      </div>

      {/* Products Grid */}
      <div className="flex flex-col gap-20 px-6 md:px-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 bg-white border border-gray-300 rounded-3xl shadow-2xl p-6 md:p-12"
          >
            {/* Text Section */}
            <div className="flex-1 space-y-6">
              {/* Tags */}
              <div className="flex gap-3">
                <span className="text-xs font-medium uppercase bg-black text-white px-3 py-1 rounded-full">
                  Sale
                </span>
                <span className="text-xs font-medium uppercase bg-red-600 text-white px-3 py-1 rounded-full">
                  Trending
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold">{product.name}</h2>

              {/* Description */}
              <p className="text-base leading-relaxed text-gray-600">
                {product.description}
              </p>

              {/* Pricing */}
              <div className="space-y-1">
                <p className="text-xl line-through text-gray-500">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  ${product.discountedPrice.toFixed(2)}
                </p>
              </div>

              {/* CTA */}
              <ShopNowButton id={product.id} />
            </div>

            {/* Image Section */}
            <div className="flex-1 max-w-[400px]">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={700}
                className="rounded-xl shadow-lg mx-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;

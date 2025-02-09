import Image from "next/image";
import React from "react";

const Collection = () => {
  const collection = [
    { category: "Men", image: "/mencollection.png" },
    { category: "Women", image: "/womencollection.png" },
    { category: "Unisex", image: "/unisexcollection.png" },
    { category: "Luxury", image: "/luxurycollection.png" },
  ];

  return (
    <div className=" mb-44 p-5">
      {/* Title */}
      <div className="w-full flex justify-center mb-20">
        <h1 className="text-6xl font-bold text-gray-800 strokeme">
          Collection
        </h1>
      </div>

      {/* Collection Grid */}
      <div className="flex flex-wrap justify-center gap-10">
        {collection.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="overflow-hidden">
              {" "}
              <Image
                height={500}
                width={400}
                src={item.image}
                alt={item.category}
                className="object-cover w-full h-[400px] transition-transform hover:scale-105 duration-500"
              />
            </div>

            <div className="flex justify-center items-center bg-gray-600 text-white text-xl py-4 uppercase tracking-wide">
              {item.category}
              <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;

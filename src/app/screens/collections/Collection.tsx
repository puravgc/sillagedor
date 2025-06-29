import CollectionCard from "@/app/components/collectioncard/CollectionCard";
import React from "react";

const Collection = () => {
  const collection = [
    {
      category: "Men",
      image: "/mencollection.png",
      link: "/shop?category=men",
    },
    {
      category: "Women",
      image: "/womencollection.png",
      link: "/shop?category=women",
    },
    {
      category: "Unisex",
      image: "/unisexcollection.png",
      link: "/shop?category=unisex",
    },
    {
      category: "Luxury",
      image: "/luxurycollection.png",
      link: "/shop?category=luxury",
    },
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
          <CollectionCard collection={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Collection;

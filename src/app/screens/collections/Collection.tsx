import React from "react";

const Collection = () => {
  const collection = [
    { category: "Men", image: "/mencollection.png" },
    { category: "Women", image: "/womencollection.png" },
    { category: "Unisex", image: "/unisexcollection.png" },
  ];

  return (
    <div className="flex justify-center gap-10 p-10">
      {collection.map((item, index) => (
        <div
          key={index}
          className="w-64 h-80 bg-gray-200 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all"
        >
          <img
            src={item.image}
            alt={item.category}
            className="w-full h-48 object-cover"
          />
          <div className="flex justify-center items-center h-32 bg-indigo-600 text-white text-2xl font-bold">
            {item.category}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collection;

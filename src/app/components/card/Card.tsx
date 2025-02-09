import Image from "next/image";
import React from "react";

interface CardProps {
  name: string;
  brand: string;
  price: string;
  rating: number;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, brand, price, rating, image }) => {
  return (
    <div className="border rounded-lg shadow-md w-64 group cursor-pointer overflow-hidden">
      <div className="overflow-hidden">
        {" "}
        <Image
          src={image}
          alt={name}
          height={800}
          width={400}
          className=" object-cover rounded-md group-hover:scale-105 duration-500"
        />
      </div>

      <div className="p-2">
        <h2 className="text-lg font-semibold mt-2 group-hover:underline">
          {name}
        </h2>
        <p className="text-gray-500">{brand}</p>
        <p className="text-lg font-bold mt-1">{price}</p>
        <p className="text-yellow-500">⭐ {rating}</p>
      </div>
    </div>
  );
};

export default Card;

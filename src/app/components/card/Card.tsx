import Image from "next/image";
import React from "react";

interface CardProps {
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, brand, price, rating, image }) => {
  return (
    <div className="border rounded-lg shadow-md w-64 h-96 flex flex-col justify-between group cursor-pointer overflow-hidden">
      <div className="overflow-hidden h-1/2">
        <Image
          src={image}
          alt={name}
          height={500}
          width={500}
          className="object-cover w-full h-full group-hover:scale-105 duration-500"
        />
      </div>

      <div className="p-3 flex flex-col justify-between h-1/2">
        <h2 className="text-lg font-semibold group-hover:underline">{name}</h2>
        <p className="text-gray-500">{brand}</p>
        <p className="text-lg font-bold mt-1">${price.toFixed(2)}</p>
        <p className="text-yellow-500">⭐ {rating}</p>
      </div>
    </div>
  );
};

export default Card;

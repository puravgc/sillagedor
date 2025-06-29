"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CollectionItem {
  category: string;
  image: string;
  link: string;
}

const CollectionCard = ({ collection }: { collection: CollectionItem }) => {
  return (
    <Link href={collection.link}>
      <div className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-hidden">
          <Image
            height={500}
            width={400}
            src={collection.image}
            alt={collection.category}
            className="object-cover w-full h-[400px] transition-transform hover:scale-105 duration-500"
          />
        </div>

        <div className="flex justify-center items-center bg-gray-600 text-white text-xl py-4 uppercase tracking-wide">
          {collection.category}
          <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;

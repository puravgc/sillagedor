"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ShopNowButton = ({ id }) => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push(`/shop/${id}`)}
        className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-gray-500 rounded-xl hover:bg-gray-700 transition"
      >
        Shop Now !!
      </button>
    </div>
  );
};

export default ShopNowButton;

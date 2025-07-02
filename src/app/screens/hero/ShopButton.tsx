import Link from "next/link";
import React from "react";

const ShopButton = () => {
  return (
    <div>
      <Link href="/shop">
        <button className="p-6 bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-600 hover:text-white">
          Shop Now
        </button>
      </Link>
    </div>
  );
};

export default ShopButton;

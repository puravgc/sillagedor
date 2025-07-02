"use client";

import React, { useState } from "react";

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () =>
    setQuantity((prev) => Math.min(prev + 1, 99999));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setQuantity(value ? Math.min(parseInt(value, 10), 99999) : 1);
  };

  return (
    <div className="">
      <div className="max-w-xs">
        {/* Label */}
        <label
          htmlFor="quantity-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose quantity:
        </label>

        {/* Quantity Controls */}
        <div className="relative flex items-center max-w-[8rem]">
          {/* Decrement Button */}
          <button
            type="button"
            onClick={handleDecrement}
            className="bg-transparent dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-400 rounded-l-lg p-3 h-11 hover:bg-gray-200 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>

          {/* Input Field */}
          <input
            type="text"
            id="quantity-input"
            value={quantity}
            onChange={handleChange}
            className="bg-gray-300 border border-x-0 border-gray-400 h-11 text-center text-gray-900 text-sm w-full py-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Increment Button */}
          <button
            type="button"
            onClick={handleIncrement}
            className="bg-transparent dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-400 rounded-r-lg p-3 h-11 hover:bg-gray-200 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quantity;

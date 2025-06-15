"use client";
import React, { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import toast, { Toaster } from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

const CartInteraction = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = async () => {
    try {
      addToCart({ ...product, quantity });
      toast.success(`Added to cart`);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const buyNowHandler = () => {
    toast.success(`Bought ${quantity} of ${product.name}`);
    console.log(`Proceed to buy ${quantity}`);
  };

  return (
    <div className="space-y-4">
      <Toaster />
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrease}
          className="px-3 py-1 text-xl bg-gray-200 rounded"
        >
          −
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="px-3 py-1 text-xl bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={buyNowHandler}
        className="w-full py-3 px-6 text-lg font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-300"
      >
        Buy Now
      </button>

      <button
        onClick={addToCartHandler}
        className="w-full py-3 px-6 text-lg font-semibold text-black border-2 border-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex justify-center items-center"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartInteraction;

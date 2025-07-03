"use client";
import React, { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

const CartInteraction = ({ product }: { product: Product }) => {
  const { addToCart, cart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    if (!quantity || quantity < 1) {
      toast.error("Please select a valid quantity");
      return;
    }
    try {
      addToCart({ ...product, quantity });
      toast.success(`Added ${quantity} ${product.name}(s) to cart`);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const buyNowHandler = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: product }),
    });

    const data = await res.json();
    stripe?.redirectToCheckout({ sessionId: data.id });
    localStorage.removeItem("cart-storage");
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

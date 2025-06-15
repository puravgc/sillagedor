"use client";
import React from "react";
import { useCartStore } from "@/stores/cartStore";
import { FaRegTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const increaseQuantity = (itemId: string) => {
    const item = cart.find((i) => i._id === itemId);
    if (item && item.quantity < item.stock) {
      addToCart({ ...item, quantity: 1 });
    }
  };

  const decreaseQuantity = (itemId: string) => {
    const item = cart.find((i) => i._id === itemId);
    if (item) {
      if (item.quantity > 1) {
        addToCart({ ...item, quantity: -1 });
      } else {
        removeFromCart(itemId);
      }
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center text-lg font-medium text-gray-600">
        🛒 Your cart is empty.
      </div>
    );
  }

  return (
    <div className="my-12 p-8 max-w-4xl mx-auto space-y-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold border-b pb-4 mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-6 border-b border-gray-200 pb-6"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />

          {/* Info */}
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            <p className="text-sm text-gray-600 font-medium">
              Brand: {item.brand}
            </p>
            <p className="text-lg font-bold text-green-700">
              ${item.discountedPrice.toFixed(2)}
              <span className="text-sm line-through text-gray-400 ml-2">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-red-500 font-semibold">
                ({item.discountPercentage}% off)
              </span>
            </p>

            {/* Quantity controls */}
            <div className="flex items-center space-x-3 mt-3">
              <button
                onClick={() => decreaseQuantity(item._id)}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item._id)}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Remove button */}
          <button
            onClick={() => removeFromCart(item._id)}
            className="ml-6 px-4 py-2 text-red-600 hover:text-red-800 font-semibold transition"
          >
            <FaRegTrashAlt className="h-6 w-6" />
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center pt-6 border-t border-gray-300">
        <div className="text-2xl font-bold text-gray-900">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="px-5 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold"
          >
            Clear Cart
          </button>
          <button className="px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition font-semibold">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

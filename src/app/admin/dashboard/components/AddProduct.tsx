"use client";

import React, { useState } from "react";
import { addProduct } from "./action";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    originalPrice: "",
    discountedPrice: "",
    tags: "",
    brand: "",
    image: "",
    bestSeller: false,
    stock: "",
    releaseDate: "",
    discountPercentage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form action={addProduct} className="space-y-4 max-w-lg">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 w-full"
          rows={3}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={form.originalPrice}
          onChange={handleChange}
          required
          step="0.01"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="discountedPrice"
          placeholder="Discounted Price"
          value={form.discountedPrice}
          onChange={handleChange}
          required
          step="0.01"
          className="border p-2 w-full"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={form.bestSeller}
            onChange={handleChange}
          />
          <span>Best Seller</span>
        </label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="releaseDate"
          placeholder="Release Date"
          value={form.releaseDate}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="Discount Percentage"
          value={form.discountPercentage}
          onChange={handleChange}
          step="0.01"
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

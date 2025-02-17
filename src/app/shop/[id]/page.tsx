"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Perfume {
  _id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  tags: string[];
  rating: number;
  brand: string;
  image: string;
  bestSeller: boolean;
  stock: number;
  releaseDate: string;
  discountPercentage: number;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPerfume = async () => {
      try {
        const res = await fetch(`/api/get-products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setPerfume(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfume();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );

  if (!perfume)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Product not found
      </div>
    );

  return (
    <div className="h-screen w-full flex items-center justify-center  p-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row  shadow-2xl rounded-2xl overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 h-[500px]">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-bold text-gray-900">{perfume.name}</h2>
            <p className="text-gray-600 mt-2">{perfume.description}</p>

            {/* Price */}
            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold text-gray-900">
                ${perfume.discountedPrice}
              </span>
              {perfume.discountPercentage > 0 && (
                <span className="ml-3 text-lg text-gray-500 line-through">
                  ${perfume.originalPrice}
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex space-x-2 mt-4">
              {perfume.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold uppercase bg-gray-800 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center mt-4">
              <span className="text-yellow-500 text-lg">
                {"★".repeat(perfume.rating)}
              </span>
              <span className="ml-2 text-gray-500">({perfume.rating}/5)</span>
            </div>

            {/* Brand & Stock */}
            <p className="text-gray-700 mt-4">
              <span className="font-semibold">Brand:</span> {perfume.brand}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Stock:</span>{" "}
              {perfume.stock > 0 ? perfume.stock : "Out of Stock"}
            </p>

            {/* Release Date */}
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Release Date:</span>{" "}
              {new Date(perfume.releaseDate).toLocaleDateString()}
            </p>

            {/* Best Seller Badge */}
            {perfume.bestSeller && (
              <div className="mt-4 p-2 bg-yellow-500 text-white text-sm font-semibold rounded-lg inline-block">
                Best Seller
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6  text-black py-3 px-6 rounded-lg hover:border-2 transition text-lg border border-gray-600">
            Add to Cart
          </button>
          <button className="mt-6 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition text-lg font-semibold">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./action"; // must have `"use server"` inside

export default async function ProductList() {
  const products = await prisma.perfumeModel.findMany();

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <ul className="space-y-4 max-w-3xl">
        {products.map((product) => (
          <li
            key={product.id}
            className="border rounded p-4 flex flex-col md:flex-row md:justify-between items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded mr-6 mb-4 md:mb-0"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm italic text-gray-500">{product.category}</p>
              <p className="text-sm text-gray-700">Brand: {product.brand}</p>
              <p className="text-sm text-gray-500">
                Released on: {product.releaseDate.toDateString()}
              </p>
              <p className="text-sm text-gray-700">
                Tags: {product.tags.join(", ")}
              </p>
            </div>

            <div className="mt-4 md:mt-0 text-right min-w-[120px]">
              <p className="font-bold text-lg">
                ${product.discountedPrice.toFixed(2)}
              </p>
              <p className="text-sm line-through text-gray-500">
                ${product.originalPrice.toFixed(2)}
              </p>
              <p className="text-sm">{product.stock} in stock</p>
              {product.bestSeller && (
                <p className="text-sm text-green-600 font-semibold">
                  Best Seller
                </p>
              )}

              <form action={deleteProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button
                  type="submit"
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

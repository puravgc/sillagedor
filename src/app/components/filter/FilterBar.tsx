"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-8">
      {/* Price Range Section */}
      <div>
        <h3 className="mb-2 font-semibold text-gray-700">Price Range</h3>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min Price"
            defaultValue={searchParams.get("filter.v.price.gte") || ""}
            onChange={(e) => updateParam("filter.v.price.gte", e.target.value)}
            className="border px-3 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            defaultValue={searchParams.get("filter.v.price.lte") || ""}
            onChange={(e) => updateParam("filter.v.price.lte", e.target.value)}
            className="border px-3 py-1 rounded"
          />
          <select
            defaultValue={searchParams.get("sort_by") || ""}
            onChange={(e) => updateParam("sort_by", e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="">Default</option>
            <option value="price-ascending">Price: Low to High</option>
            <option value="price-descending">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Section */}
      <div>
        <h3 className="mb-2 font-semibold text-gray-700">Category</h3>
        <select
          defaultValue={searchParams.get("category") || ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>
    </div>
  );
}

"use client";
import Card from "@/app/components/card/Card";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { CiFilter } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";

const PerfumeCollection = () => {
  const searchParams = useSearchParams();
  const min = searchParams.get("filter.v.price.gte");
  const max = searchParams.get("filter.v.price.lte");
  const sort = searchParams.get("sort_by");
  const router = useRouter();
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const query = new URLSearchParams();

    if (min) query.append("filter.v.price.gte", min);
    if (max) query.append("filter.v.price.lte", max);
    if (sort) query.append("sort_by", sort);

    try {
      const response = await fetch(`/api/get-products?${query.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPerfumes(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [min, max, sort]);

  const handlePerfume = (id) => {
    router.push(`/shop/${id}`);
  };

  const updateQueryParam = (param, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Products</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Price Range */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <CiFilter className="h-6 w-6" />
            <label htmlFor="min" className="font-medium">
              $ Min Price:
            </label>
            <input
              id="min"
              type="number"
              placeholder="e.g. 100"
              className="border rounded px-2 py-1 w-28"
              value={min || ""}
              onChange={(e) => updateQueryParam("filter.v.price.gte", e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="max" className="font-medium">
              $ Max Price:
            </label>
            <input
              id="max"
              type="number"
              placeholder="e.g. 200"
              className="border rounded px-2 py-1 w-28"
              value={max || ""}
              onChange={(e) => updateQueryParam("filter.v.price.lte", e.target.value)}
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex gap-2 items-center">
          <label className="font-medium">Sort:</label>
          <select
            value={sort || ""}
            onChange={(e) => updateQueryParam("sort_by", e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Default</option>
            <option value="price-ascending">Price: Low to High</option>
            <option value="price-descending">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <MoonLoader />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {perfumes.map((perfume, index) => (
            <div
              key={index}
              onClick={() => handlePerfume(perfume._id)}
            >
              <Card
                name={perfume.name}
                brand={perfume.brand}
                price={perfume.discountedPrice}
                rating={perfume.rating}
                image={perfume.image}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerfumeCollection;

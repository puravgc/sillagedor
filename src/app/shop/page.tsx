"use client";
import Card from "@/app/components/card/Card";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const PerfumeCollection = () => {
  const router = useRouter();
  const [perfumes, setperfumes] = useState([]);
  const [loading, setloading] = useState(false);
  const fetchData = async () => {
    setloading(true);
    try {
      const response = await fetch("/api/get-products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setperfumes(data);
      setloading(false);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePerfume = (id) => {
    router.push(`/shop/${id}`);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <BounceLoader />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {perfumes.map((perfume, index) => (
            <div
              onClick={() => {
                handlePerfume(perfume._id);
              }}
            >
              {" "}
              <Card
                name={perfume.name}
                brand={perfume.brand}
                price={perfume.discountedPrice}
                rating={perfume.rating}
                image={perfume.image}
                key={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerfumeCollection;

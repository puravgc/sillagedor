import { prisma } from "@/lib/prisma";
import FilterBar from "../components/filter/FilterBar";
import Card from "../components/card/Card";

interface Props {
  searchParams?: Record<string, string>;
}

export default async function PerfumeCollection({ searchParams }: Props) {
  const min = searchParams?.["filter.v.price.gte"];
  const max = searchParams?.["filter.v.price.lte"];
  const sort = searchParams?.["sort_by"];

  const where: any = {};
  if (min) where.discountedPrice = { gte: parseFloat(min) };
  if (max) {
    where.discountedPrice = {
      ...where.discountedPrice,
      lte: parseFloat(max),
    };
  }

  let orderBy: any = { createdAt: "desc" };
  if (sort === "price-ascending") orderBy = { discountedPrice: "asc" };
  if (sort === "price-descending") orderBy = { discountedPrice: "desc" };

  const perfumes = await prisma.perfumeModel.findMany({
    where,
    orderBy,
  });

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Collection</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <FilterBar />
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
        {perfumes.length > 0 ? (
          perfumes.map((perfume) => <Card key={perfume.id} perfume={perfume} />)
        ) : (
          <div className="w-full flex justify-center items-center min-h-[200px]">
            <h1 className="text-lg text-gray-600">No perfume found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

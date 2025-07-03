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
  const category = searchParams?.["category"];

  const page = parseInt(searchParams?.page || "1", 10);
  const limit = parseInt(searchParams?.limit || "8", 10);

  const skip = (page - 1) * limit;

  const where: any = {};

  if (min) {
    where.discountedPrice = { gte: parseFloat(min) };
  }

  if (max) {
    where.discountedPrice = {
      ...where.discountedPrice,
      lte: parseFloat(max),
    };
  }

  if (category) {
    where.category = category;
  }

  let orderBy: any = { createdAt: "desc" };
  if (sort === "price-ascending") orderBy = { discountedPrice: "asc" };
  if (sort === "price-descending") orderBy = { discountedPrice: "desc" };

  // total count for pagination
  const totalCount = await prisma.perfumeModel.count({ where });
  const totalPages = Math.ceil(totalCount / limit);

  // fetch perfumes with pagination
  const perfumes = await prisma.perfumeModel.findMany({
    where,
    orderBy,
    skip,
    take: limit,
  });

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Collection</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <FilterBar />
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-y-6 gap-x-2">
        {perfumes.length > 0 ? (
          perfumes.map((perfume) => <Card key={perfume.id} perfume={perfume} />)
        ) : (
          <div className="col-span-4 flex justify-center items-center min-h-[200px]">
            <h1 className="text-lg text-gray-600">No perfume found</h1>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <a
              key={pageNum}
              href={`?page=${pageNum}&limit=${limit}${
                category ? `&category=${category}` : ""
              }${min ? `&filter.v.price.gte=${min}` : ""}${
                max ? `&filter.v.price.lte=${max}` : ""
              }${sort ? `&sort_by=${sort}` : ""}`}
              className={`px-4 py-2 rounded ${
                pageNum === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </a>
          );
        })}
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const min = searchParams.get("filter.v.price.gte");
  const max = searchParams.get("filter.v.price.lte");
  const sort = searchParams.get("sort_by");

  const filters: any = {};

  if (min) {
    filters.originalPrice = { ...filters.originalPrice, gte: parseFloat(min) };
  }

  if (max) {
    filters.originalPrice = { ...filters.originalPrice, lte: parseFloat(max) };
  }

  let orderBy = {};

  if (sort === "price_asc") {
    orderBy = { originalPrice: "asc" };
  } else if (sort === "price_desc") {
    orderBy = { originalPrice: "desc" };
  } else if (sort === "newest") {
    orderBy = { releaseDate: "desc" };
  } else if (sort === "oldest") {
    orderBy = { releaseDate: "asc" };
  } else {
    orderBy = { createdAt: "desc" };
  }

  try {
    const perfumes = await prisma.perfumeModel.findMany({
      where: filters,
      orderBy,
    });

    if (!perfumes || perfumes.length === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(perfumes);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

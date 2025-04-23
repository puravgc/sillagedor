import { NextRequest, NextResponse } from "next/server";
import PerfumeModel from "@/model/PerfumeModel";
import connectToDatabase from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const min = searchParams.get("filter.v.price.gte");
    const max = searchParams.get("filter.v.price.lte");
    const sortBy = searchParams.get("sort_by");

    const filter: any = {};
    if (min || max) {
      filter.discountedPrice = {};
      if (min) filter.discountedPrice.$gte = Number(min);
      if (max) filter.discountedPrice.$lte = Number(max);
    }

    const sort: any = {};
    if (sortBy === "price-descending") sort.discountedPrice = -1;
    else if (sortBy === "price-ascending") sort.discountedPrice = 1;

    const perfumes = await PerfumeModel.find(filter).sort(sort);

    if (!perfumes || perfumes.length === 0) {
      return NextResponse.json(
        { message: "No perfumes found" },
        { status: 404 }
      );
    }

    return NextResponse.json(perfumes);
  } catch (error: any) {
    console.error("Error in GET /api/get-products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import PerfumeProduct from "@/model/PerfumeModel";
import connectToDatabase from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const perfume = await PerfumeProduct.find({});
    if (!perfume) {
      return NextResponse.json({ message: "perfume not found" });
    }

    return NextResponse.json(perfume);
  } catch (error: any) {
    console.error("Error in GET /api/route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

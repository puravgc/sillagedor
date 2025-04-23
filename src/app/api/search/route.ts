import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PerfumeModel from "@/model/PerfumeModel";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q"); // Ensure we use 'q' here

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const regex = new RegExp(query, "i");
    const results = await PerfumeModel.find({
      $or: [{ name: regex }, { brand: regex }],
    });

    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

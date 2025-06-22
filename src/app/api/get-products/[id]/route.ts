import { NextRequest, NextResponse } from "next/server";
import PerfumeModel from "@/model/PerfumeModel";
import connectToDatabase from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    console.log(id);
    const perfume = await PerfumeModel.findById(id);
    if (!perfume) {
      return NextResponse.json({ message: "Perfume not found" });
    } 

    return NextResponse.json(perfume);
  } catch (error: any) {
    console.error("Error in GET /api/perfume/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import PerfumeModel from "@/model/PerfumeModel";
import connectToDatabase from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const {
      name,
      image,
      description,
      originalPrice,
      discountedPrice,
      releaseDate,
      discountPercentage,
      bestSeller,
      tags,
      brand,
      stock,
    } = await req.json();

    if (
      !name ||
      !image ||
      !description ||
      !originalPrice ||
      !discountedPrice ||
      !releaseDate ||
      !tags ||
      !brand ||
      stock === undefined
    ) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }

    const perfume = new PerfumeModel({
      name,
      image,
      description,
      originalPrice,
      discountedPrice,
      releaseDate,
      discountPercentage,
      bestSeller,
      tags,
      brand,
      stock,
    });

    await perfume.save();

    return NextResponse.json({
      message: "Perfume added successfully",
      perfume,
    });
  } catch (error) {
    console.error("Error adding perfume:", error);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
}

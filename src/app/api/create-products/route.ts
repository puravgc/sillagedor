import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      image,
      description,
      category,
      originalPrice,
      discountedPrice,
      releaseDate,
      discountPercentage,
      bestSeller = false,
      tags,
      brand,
      stock,
    } = body;
    console.log(typeof name);

    if (
      typeof name !== "string" ||
      typeof image !== "string" ||
      typeof description !== "string" ||
      typeof brand !== "string" ||
      typeof category !== "string" ||
      typeof originalPrice !== "number" ||
      typeof discountedPrice !== "number" ||
      typeof stock !== "number" ||
      typeof bestSeller !== "boolean" ||
      typeof discountPercentage !== "number" ||
      !Array.isArray(tags) ||
      !releaseDate
    ) {
      return NextResponse.json(
        { message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const newPerfume = await prisma.perfumeModel.create({
      data: {
        name,
        image,
        description,
        category,
        originalPrice, // already typeof number
        discountedPrice, // already typeof number
        releaseDate: new Date(releaseDate),
        discountPercentage, // already typeof number
        bestSeller,
        tags,
        brand,
        stock,
      },
    });

    return NextResponse.json(
      { message: "Perfume added successfully", perfume: newPerfume },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding perfume:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      name,
      description,
      category,
      originalPrice,
      discountedPrice,
      tags,
      rating,
      brand,
      image,
      bestSeller,
      stock,
      releaseDate,
      discountPercentage,
    } = await req.json();

    // Basic validation
    if (
      !name ||
      !description ||
      !category ||
      !originalPrice ||
      !discountedPrice
    ) {
      return NextResponse.json(
        {
          message:
            "Name, description, category, originalPrice, and discountedPrice are required.",
        },
        { status: 400 }
      );
    }

    const perfume = await prisma.perfumeModel.create({
      data: {
        name,
        description,
        category,
        originalPrice,
        discountedPrice,
        tags, // expect an array of strings
        rating: rating ?? 0,
        brand,
        image,
        bestSeller: bestSeller ?? false,
        stock: stock ?? 0,
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        discountPercentage: discountPercentage ?? 0,
      },
    });

    return NextResponse.json(
      { message: "Perfume added successfully.", perfume },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating perfume:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

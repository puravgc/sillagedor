"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const originalPrice = parseFloat(formData.get("originalPrice") as string);
  const discountedPrice = parseFloat(formData.get("discountedPrice") as string);
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const brand = formData.get("brand") as string;
  const image = formData.get("image") as string;
  const bestSeller = formData.get("bestSeller") === "on";
  const stock = parseInt(formData.get("stock") as string);
  const releaseDate = new Date(formData.get("releaseDate") as string);
  const discountPercentage = parseFloat(
    formData.get("discountPercentage") as string
  );

  await prisma.perfumeModel.create({
    data: {
      name,
      description,
      category,
      originalPrice,
      discountedPrice,
      tags,
      brand,
      image,
      bestSeller,
      stock,
      releaseDate,
      discountPercentage,
    },
  });

  console.log("Product added successfully:", name);
}

export async function deleteProduct(formData: FormData) {
  const idString = formData.get("id");
  if (!idString || typeof idString !== "string") {
    throw new Error("Invalid ID");
  }

  const id = parseInt(idString);
  if (isNaN(id)) {
    throw new Error("ID is not a number");
  }

  await prisma.perfumeModel.delete({
    where: { id },
  });

  revalidatePath("/admin");
}

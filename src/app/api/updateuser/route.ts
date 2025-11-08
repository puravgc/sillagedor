import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path to your prisma client

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, location } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        firstName,
        lastName,
        location,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

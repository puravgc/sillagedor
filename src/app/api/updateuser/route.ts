import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/model/UserModel";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, location } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (location !== undefined && Array.isArray(location)) {
      user.location = location;
    }

    await user.save();

    return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

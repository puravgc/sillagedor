import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import UserModel from "@/model/UserModel";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

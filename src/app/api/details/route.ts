import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/db";
import UserModel from "@/model/UserModel";

type Data = {
  firstname: string;
  lastname: string;
  email: string;
  location: [number, number];
};

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const userId = await req.nextUrl.searchParams.get("userId");
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await UserModel.findById(userId).select("-password");
    console.log(user);
    if (!user)
      return NextResponse.json({ message: "User not found", status: 404 });

    return NextResponse.json(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

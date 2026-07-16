import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { User } from "@/database";

import { verifyToken } from "@/lib/jwt";

type TokenPayload = {
  userId: string;
};

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const payload = verifyToken(token) as TokenPayload;

  const user = await User.findById(payload.userId).select("-password");

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      {
        status: 404,
      },
    );
  }
  
  return NextResponse.json({
    success: true,
    user,
  });
}

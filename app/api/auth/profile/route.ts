import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { User } from "@/database";
import { verifyToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

type TokenPayload = {
  userId: string;
};

export async function PATCH(req: NextRequest) {
  try {
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
        }
      );
    }

    const payload = verifyToken(token) as TokenPayload;

    const { name, email} = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, and email are required",
        },
        {
          status: 400,
        }
      );
    }

    const currentUser = await User.findById(payload.userId);

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check if another user already uses this email
    const existingUser = await User.findOne({
      email,
      _id: { $ne: currentUser._id },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already in use",
        },
        {
          status: 409,
        }
      );
    }

    currentUser.name = name;
    currentUser.email = email;

    await currentUser.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}
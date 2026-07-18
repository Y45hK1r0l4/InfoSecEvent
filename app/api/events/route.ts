import connectDB from "@/lib/mongodb";
import { Event } from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyToken } from "@/lib/jwt";


type TokenPayload = {
  userId: string;
};

const parseListField = (value: FormDataEntryValue | null) => {
  if (!value) return [];

  if (typeof value !== "string") return [];

  const trimmed = value.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) return parsed;
    return [parsed];
  } catch {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const normalizeMode = (value: string) => {
  const normalized = value.trim().toLowerCase();

  if (normalized === "offfline" || normalized === "off-line") {
    return "offline";
  }

  if (normalized === "oneline") {
    return "online";
  }

  return normalized;
};

export async function POST(req: NextRequest) {
    
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token) as TokenPayload;

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch {
      return NextResponse.json(
        { message: "Invalid form data format" },
        { status: 400 },
      );
    }

    const file = formData.get("image");

    if (!(file instanceof File) || !file.name) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 },
      );
    }

    const tags = parseListField(formData.get("tags"));
    const agenda = parseListField(formData.get("agenda"));
    const mode =
      typeof event.mode === "string" ? normalizeMode(event.mode) : event.mode;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);

            resolve(results);
          },
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      mode,
      tags,
      agenda,
      createdBy: payload.userId,
    });

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (e) {
    console.error("Event creation error:", e);

    if (e instanceof Error) {
      return NextResponse.json(
        {
          message: "Event Creation Failed",
          error: e.message,
          stack: process.env.NODE_ENV === "development" ? e.stack : undefined,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Event Creation Failed", error: "Unknown error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Event fetching failed", error: e },
      { status: 500 },
    );
  }
}

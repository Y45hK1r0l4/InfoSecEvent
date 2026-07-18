import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { verifyToken } from "@/lib/jwt";

import { v2 as cloudinary } from "cloudinary";

// Define route params type for type safety
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

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

/**
 * GET /api/events/[slug]
 * Fetches a single events by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Await and extract slug from params
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    // Sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query events by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle events not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 },
      );
    }

    // Return successful response with events data
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching events by slug:", error);
    }

    // Handle specific error types
    if (error instanceof Error) {
      // Handle database connection errors
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 },
        );
      }

      // Return generic error with error message
      return NextResponse.json(
        { message: "Failed to fetch events", error: error.message },
        { status: 500 },
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token) as TokenPayload;

    const { slug } = await params;

    const event = await Event.findOne({ slug });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (event.createdBy.toString() !== payload.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();

    const data = Object.fromEntries(formData.entries());

    const tags = parseListField(formData.get("tags"));

    const agenda = parseListField(formData.get("agenda"));

    const mode =
      typeof data.mode === "string" ? normalizeMode(data.mode) : data.mode;

    const file = formData.get("image");

    if (file instanceof File && file.name) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "DevEvent",
            },
            (error, result) => {
              if (error) return reject(error);

              resolve(result);
            },
          )
          .end(buffer);
      });

      data.image = (uploadResult as { secure_url: string }).secure_url;
    }

    event.set({
      ...data,
      mode,
      tags,
      agenda,
    });

    await event.save();

    return NextResponse.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Event update error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Event update failed",
          error: error.message,
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Event update failed",
        error: "Unknown error",
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@bhms/database";

export async function POST(request: NextRequest) {
  try {
    const { accessCode } = await request.json();

    if (!accessCode) {
      return NextResponse.json(
        { error: "Access code is required" },
        { status: 400 }
      );
    }

    const boarder = await db.boarder.findUnique({
      where: { accessCode },
      include: {
        room: true,
        user: true,
      },
    });

    if (!boarder || !boarder.isActive) {
      return NextResponse.json(
        { error: "Invalid access code" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      boarder: {
        id: boarder.id,
        firstName: boarder.firstName,
        lastName: boarder.lastName,
        email: boarder.email,
        room: boarder.room,
      },
    });
  } catch (error) {
    console.error("Boarder access error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


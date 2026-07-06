import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const total = await prisma.feedback.count();

    const bugs = await prisma.feedback.count({
      where: {
        category: "Bug",
      },
    });

    const features = await prisma.feedback.count({
      where: {
        category: "Feature Request",
      },
    });

    const complaints = await prisma.feedback.count({
      where: {
        category: "Complaint",
      },
    });

    return NextResponse.json({
      total,
      bugs,
      features,
      complaints,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
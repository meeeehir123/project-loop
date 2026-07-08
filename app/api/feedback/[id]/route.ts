import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.feedback.delete({
      where: {
        id: String(id),
      },
    });

    return NextResponse.json({
      message: "Feedback deleted successfully!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { customerName, email, category, feedback } =
      await request.json();

    const updatedFeedback = await prisma.feedback.update({
      where: {
        id: String(id),
      },
      data: {
        customerName,
        email,
        category,
        feedback,
      },
    });

    return NextResponse.json({
      message: "Feedback updated successfully!",
      feedback: updatedFeedback,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
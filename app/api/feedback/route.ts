import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { customerName, email, category, feedback, rating } = await request.json();
    
    // AI ko yahan se hata diya hai taaki error na aaye
    const detectedSentiment = "Neutral"; 

    const newFeedback = await prisma.feedback.create({
      data: {
        customerName: customerName || "Anonymous Node",
        email: email || "anonymous@loop.os",
        feedback: feedback,
        sentiment: detectedSentiment,
        category: category || "General",
        rating: rating || 5,
      },
    });

    return NextResponse.json(newFeedback);
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json({ message: "Submission failed" }, { status: 500 });
  }
}

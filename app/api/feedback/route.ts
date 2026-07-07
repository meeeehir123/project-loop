import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSentiment } from "@/lib/sentiment"; // Make sure path is correct

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, category, feedback, rating } = body;
    
    console.log("DEBUG: Received Feedback:", feedback);

    // Call the sentiment function
    const detectedSentiment = await getSentiment(feedback);
    
    console.log("DEBUG: Calculated Sentiment:", detectedSentiment);

    const newFeedback = await prisma.feedback.create({
      data: {
        customerName: customerName || "Anonymous",
        email: email || "a@b.com",
        feedback: feedback,
        sentiment: detectedSentiment, // Ye wahi result hai jo function dega
        category: category || "General",
        rating: rating || 5,
      },
    });

    return NextResponse.json(newFeedback);
  } catch (error) {
    console.error("CRITICAL ERROR:", error);
    return NextResponse.json({ message: "Submission failed" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSentiment } from "@/lib/sentiment";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, category, feedback, rating, workspaceId } = body;
    
    console.log("DEBUG: Received Feedback:", feedback);

    // Call the sentiment function
    const detectedSentiment = await getSentiment(feedback);
    
    console.log("DEBUG: Calculated Sentiment:", detectedSentiment);

    // Agar workspaceId missing hai toh error bhej do, nahi toh create karo
    if (!workspaceId) {
      return NextResponse.json({ message: "Workspace ID is required" }, { status: 400 });
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        customerName: customerName || "Anonymous",
        email: email || "a@b.com",
        feedback: feedback,
        sentiment: detectedSentiment || "Neutral", 
        category: category || "General",
        rating: Number(rating) || 5,
        workspaceId: workspaceId,
      },
    });

    return NextResponse.json(newFeedback);
  } catch (error) {
    console.error("CRITICAL ERROR:", error);
    return NextResponse.json({ message: "Submission failed" }, { status: 500 });
  }
}
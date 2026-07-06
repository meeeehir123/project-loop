import { getSentiment } from "@/lib/sentiment";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 📥 GET: Fetch All Feedback Data Streams
export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("GET Feedback Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 📤 POST: Ingest New Feedback and Run Local AI Analysis
export async function POST(request: Request) {
  try {
    const {
  customerName,
  email,
  category,
  feedback,
  rating,
} = await request.json();
    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback text is required for system analysis" },
        { status: 400 }
      );
    }

    // 🧠 Triggering Real AI Sentiment Engine (Inference Node with AWAIT)
    const detectedSentiment = await getSentiment(feedback);

    // Saving clean data logs to Prisma Database Nodes
    const newFeedback = await prisma.feedback.create({
  data: {
    customerName: customerName || "Anonymous Node",
    email: email || "anonymous@loop.os",
    feedback: feedback,

    sentiment: detectedSentiment,

    category: category || detectedSentiment,

    rating: rating || 5,
  },
});

    return NextResponse.json(newFeedback);
  } catch (error) {
    console.error("POST Feedback Ingestion Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
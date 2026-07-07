import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// Import ko aise rakho taaki wo crash na ho
import { getSentiment } from "@/lib/sentiment"; 

// 📥 GET: Fetch All Feedback Data Streams
export async function GET() {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("GET Feedback Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 📤 POST: Ingest New Feedback with AI Safety Net
export async function POST(request: Request) {
  try {
    const { customerName, email, category, feedback, rating } = await request.json();
    
    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback text is required" },
        { status: 400 }
      );
    }

    let detectedSentiment = "Neutral"; // Default value

    // 🧠 AI Sentiment Engine with Safety Net
    try {
      detectedSentiment = await getSentiment(feedback);
    } catch (aiError) {
      console.error("AI Analysis Failed (Using Default):", aiError);
      // Agar AI fail hota hai, toh hum "Neutral" ke saath aage badhenge
    }

    // Saving data to Prisma
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
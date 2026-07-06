import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Check karo ki API Key hai ya nahi
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ message: "API Key missing hai .env file mein!" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ message: "No messages provided" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content;
    const model = genAI.getGenerativeModel({ 
  model: "gemini-3-flash-preview",
  systemInstruction: `
    Tum 'Project LOOP' ke official AI Assistant ho.
    PROJECT SUMMARY: Project LOOP ek advanced Customer-Feedback Intelligence platform hai. 
    CORE FUNCTIONS:
    1. Feedback Collection: Users se feedback collect karna.
    2. Sentiment Analysis: AI ke through feedback ka sentiment (positive/negative) check karna.
    3. Actionable Insights: Data ko analyze karke business growth ke liye suggestions dena.
    
    LIMITATION: Tum sirf Project LOOP se related sawalon ke jawab doge. Agar koi bahar ki baat puche, toh polite hokar mana kar dena.
  `
});
    
    const result = await model.generateContent(lastMessage);
    const response = await result.response.text();

    return NextResponse.json({ message: response });
    
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ message: "Server error hua hai" }, { status: 500 });
  }
}
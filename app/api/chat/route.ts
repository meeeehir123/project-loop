import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing in environment variables");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(lastMessage);
    const response = await result.response.text();

    return NextResponse.json({ message: response });
  } catch (error: any) {
    console.error("DEBUG AI ERROR:", error);
    return NextResponse.json(
      { message: "AI Error: " + (error.message || "Unknown error") }, 
      { status: 500 }
    );
  }
}
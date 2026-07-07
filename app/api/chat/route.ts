import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const apiKey = "process.env.GEMINI_API_KEY";
    if (!apiKey) {
      return NextResponse.json({ message: "API Key nahi mili!" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(lastMessage);
    const response = await result.response.text();

    return NextResponse.json({ message: response });
  } catch (error) {
    return NextResponse.json({ message: "AI Error aagya" }, { status: 500 });
  }
}
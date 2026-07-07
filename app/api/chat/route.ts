import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. System Prompt yahan define karo (Project Loop ke baare mein)
    const systemPrompt = {
      role: "system",
      content: `You are the expert assistant for "Project Loop". 
      Your task is to answer user queries strictly related to Project Loop services, features, and technical details. 
      If a user asks about general topics not related to the project, politely guide them back to Project Loop. 
      Be professional, accurate, and concise.`
    };

    // 2. Hum purani puri chat history bhej rahe hain taaki AI context yaad rakhe
    const allMessages = [systemPrompt, ...messages];

    const completion = await groq.chat.completions.create({
      messages: allMessages, 
      model: "llama-3.3-70b-versatile",
    });

    const response = completion.choices[0]?.message?.content;

    return NextResponse.json({ message: response });
  } catch (error: any) {
    console.error("GROQ AI ERROR:", error);
    return NextResponse.json(
      { message: "AI Error: " + (error.message || "Unknown error") }, 
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk'; // Pehle npm install groq-sdk karo

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: lastMessage }],
      model: "llama-3.3-70b-versatile", // Groq ka free model
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
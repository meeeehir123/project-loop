import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI client initialize karna
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Yeh tumhare .env se key uthayega
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // OpenAI se chat completion mangna
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Yeh model fast aur cheap hai
      messages: [{ role: "user", content: lastMessage }],
    });

    // OpenAI se response lena
    const response = completion.choices[0].message.content;

    return NextResponse.json({ message: response });
  } catch (error: any) {
    console.error("DEBUG AI ERROR:", error);
    return NextResponse.json(
      { message: "AI Error: " + (error.message || "Unknown error") }, 
      { status: 500 }
    );
  }
}
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getSentiment(text: string): Promise<string> {
  if (!text || text.trim() === "") return "Neutral";

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze the sentiment of this feedback: "${text}". Reply with only one word: Positive, Negative, or Neutral.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sentiment = response.text().trim();
    
    if (["Positive", "Negative", "Neutral"].includes(sentiment)) return sentiment;
  } catch (err) {
    console.error("Gemini SDK Error:", err);
  }

  // Fallback Logic
  const msg = text.toLowerCase();
  const pos = ["good", "great", "excellent", "awesome", "nice", "love", "happy", "charming", "wonderful", "delighted", "fantastic", "amazing", "beautiful", "perfect", "lovely"];
  const neg = ["bad", "worst", "hate", "poor", "terrible", "disappointed", "issue", "problem", "sad", "awful", "ugly", "horrible", "difficult", "unhappy", "frustrated"];

  let score = 0;
  pos.forEach(w => msg.includes(w) ? score++ : 0);
  neg.forEach(w => msg.includes(w) ? score-- : 0);
  return score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
}
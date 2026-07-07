import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getSentiment(text: string): Promise<string> {
  // 1. Basic validation
  if (!text || text.trim() === "") return "Neutral";

  // 2. Safely get the API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in environment variables");
    return runFallback(text);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use 'gemini-1.5-flash' with the correct model path prefix
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `Analyze the sentiment of this feedback: "${text}". Reply with only one word: Positive, Negative, or Neutral.`;
    const result = await model.generateContent(prompt);
    
    // Safely get text response
    const sentiment = (await result.response.text()).trim();
    
    if (["Positive", "Negative", "Neutral"].includes(sentiment)) {
      return sentiment;
    }
  } catch (err) {
    console.error("Gemini SDK Error:", err);
    // Agar Gemini fail ho, to niche wali Fallback logic chalegi
  }

  return runFallback(text);
}

// Separate fallback logic to keep code clean
function runFallback(text: string): string {
  const msg = text.toLowerCase();
  const pos = ["good", "great", "excellent", "awesome", "nice", "love", "happy", "wonderful", "fantastic", "amazing", "beautiful", "perfect", "lovely"];
  const neg = ["bad", "worst", "hate", "poor", "terrible", "disappointed", "issue", "problem", "sad", "awful", "horrible", "difficult", "unhappy", "frustrated"];

  let score = 0;
  pos.forEach(w => msg.includes(w) ? score++ : 0);
  neg.forEach(w => msg.includes(w) ? score-- : 0);
  
  return score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
}

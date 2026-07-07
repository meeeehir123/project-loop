// lib/sentiment.ts
export async function getSentiment(text: string): Promise<string> {
  if (!text || text.trim() === "") return "Neutral";

  // --- LAYER 1: AI (ONLY IF ENVIRONMENT ALLOWS) ---
  // Vercel serverless functions mein AI model ka heavy loading error deta hai
  // isliye hum ise 'soft-try' mein rakh rahe hain.
  try {
    const { pipeline, env } = await import("@xenova/transformers");
    
    // Performance optimization for Vercel
    env.allowLocalModels = false;
    env.useBrowserCache = true;

    const classifier = await pipeline(
      "sentiment-analysis", 
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );

    const result = (await classifier(text)) as any[];
    const aiLabel = result[0].label;
    const aiScore = result[0].score;

    if (aiScore >= 0.6) {
      return aiLabel === "POSITIVE" ? "Positive" : "Negative";
    }
  } catch (err) {
    // Agar model load hone mein 1 second se zyada le, 
    // ya memory overflow ho, toh ye code catch block mein aa jayega
    // aur crash nahi hoga.
    console.log("AI bypassed due to resource limits.");
  }

  // --- LAYER 2: FALLBACK (NEVER FAILS) ---
  const msg = text.toLowerCase();
  const pos = ["good", "great", "excellent", "awesome", "nice", "love", "happy", "charming", 
    "wonderful", "delighted", "fantastic", "amazing", "beautiful", "perfect", "lovely"
  ];
  const neg = ["bad", "worst", "hate", "poor", "terrible", "disappointed", "issue", "problem", 
    "sad", "awful", "ugly", "horrible", "difficult", "unhappy", "frustrated"];

  let score = 0;
  pos.forEach(w => msg.includes(w) ? score++ : 0);
  neg.forEach(w => msg.includes(w) ? score-- : 0);

  return score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
}
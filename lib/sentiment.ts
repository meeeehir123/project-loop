// lib/sentiment.ts
import { pipeline, env } from "@xenova/transformers";

// Vercel serverless ke liye crucial settings
env.allowLocalModels = false;
env.useBrowserCache = true;

// Singleton pattern: Model ek hi baar load hoga, baar-baar nahi
let cachedPipeline: any = null;

export async function getSentiment(text: string): Promise<string> {
  if (!text || text.trim() === "") return "Neutral";

  try {
    if (!cachedPipeline) {
      console.log("Loading AI Model for the first time...");
      cachedPipeline = await pipeline(
        "sentiment-analysis",
        "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      );
    }

    const result = await cachedPipeline(text);
    
    // Safety check for result structure
    const aiLabel = result?.[0]?.label;
    const aiScore = result?.[0]?.score;

    if (aiScore && aiScore >= 0.6) {
      return aiLabel === "POSITIVE" ? "Positive" : "Negative";
    }
  } catch (err) {
    console.error("AI Model Error:", err);
  }

  // Fallback Logic
  return runFallbackLogic(text);
}

function runFallbackLogic(text: string): string {
  const msg = text.toLowerCase();
  const pos = ["good", "great", "excellent", "nice", "love", "happy"];
  const neg = ["bad", "worst", "hate", "poor", "terrible"];

  let score = 0;
  pos.forEach(w => msg.includes(w) ? score++ : null);
  neg.forEach(w => msg.includes(w) ? score-- : null);

  return score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
}
import { pipeline, env } from "@xenova/transformers";

// Local development settings ko optimized rakhne ke liye configuration
env.allowLocalModels = false; 

let sentimentPipeline: any = null;

async function getAIPipeline() {
  if (!sentimentPipeline) {
    try {
      // Free Lightweight Sentiment Analysis Model
      sentimentPipeline = await pipeline(
        "sentiment-analysis", 
        "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
      );
    } catch (e) {
      console.error("AI Initialization failed, switching smoothly to standard fallbacks:", e);
      sentimentPipeline = null;
    }
  }
  return sentimentPipeline;
}

export async function getSentiment(text: string): Promise<string> {
  if (!text || text.trim() === "") return "Neutral";

  // --- 🤖 LAYER 1: TRY REAL AI (With Strict Fast Execution) ---
  try {
    const classifier = await getAIPipeline();
    if (classifier) {
      // Promise race lagate hain taaki agar AI 3 second se zyada le, toh purana fast logic chal jaye
      const aiPromise = classifier(text);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000));

      const result = (await Promise.race([aiPromise, timeoutPromise])) as any;
      const aiLabel = result[0].label; 
      const aiScore = result[0].score; 

      if (aiScore >= 0.6) {
        return aiLabel === "POSITIVE" ? "Positive" : "Negative";
      }
    }
  } catch (aiError) {
    console.log("AI Pipeline delayed/offline -> Executing instant text algorithm.");
  }

  // --- 🛡️ LAYER 2: AAPKA SAFE, SECURE LOOP LOGIC (Never Fails) ---
  const msg = text.toLowerCase();

  const positiveWords = ["good", "great", "excellent", "awesome", "nice", "love", "happy", "perfect"];
  const negativeWords = ["bad", "worst", "hate", "poor", "terrible", "disappointed", "issue", "problem"];

  let positiveScore = 0;
  let negativeScore = 0;

  for (const word of positiveWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = msg.match(regex);
    if (matches) positiveScore += matches.length;
  }

  for (const word of negativeWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = msg.match(regex);
    if (matches) negativeScore += matches.length;
  }

  if (positiveScore > negativeScore) return "Positive";
  if (negativeScore > positiveScore) return "Negative";
  return "Neutral";
}
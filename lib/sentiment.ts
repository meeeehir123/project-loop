export async function getSentiment(text: string): Promise<string> {
  if (!text || text.trim() === "") return "Neutral";

  // --- 🤖 LAYER 1: TRY REAL AI (Dynamic Import) ---
  try {
    const { pipeline } = await import("@xenova/transformers");
    
    const classifier = await pipeline(
      "sentiment-analysis", 
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );

    // TypeScript ko batane ke liye ki result ek array hai jisme objects hain
    const result = (await classifier(text)) as any[]; 
    
    // Ab red lines nahi aayengi
    const aiLabel = result[0].label; 
    const aiScore = result[0].score; 

    if (aiScore >= 0.6) {
      return aiLabel === "POSITIVE" ? "Positive" : "Negative";
    }
  } catch (aiError) {
    console.error("AI Pipeline failed, falling back to Loop Logic:", aiError);
  }

  // --- 🛡️ LAYER 2: AAPKA SAFE, SECURE LOOP LOGIC ---
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
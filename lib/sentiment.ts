// lib/sentiment.ts
export async function getSentiment(text: string): Promise<string> {
  if (!text || text.trim() === "") return "Neutral";

  // --- LAYER 0: GOOGLE GEMINI API (FAST & ACCURATE) ---
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Analyze sentiment of this feedback: "${text}". Answer ONLY with one word: Positive, Negative, or Neutral.` }] }]
        }),
      }
    );
    const data = await response.json();
    const geminiResult = data.candidates[0].content.parts[0].text.trim();
    if (["Positive", "Negative", "Neutral"].includes(geminiResult)) return geminiResult;
  } catch (apiErr) {
    console.log("Gemini API skipped, moving to AI model...");
  }

  // --- LAYER 1: AI (TRANSFORMERS.JS) ---
  try {
    const { pipeline, env } = await import("@xenova/transformers");
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
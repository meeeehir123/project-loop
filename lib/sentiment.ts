export async function getSentiment(text: string): Promise<string> {
  if (!text || text.trim() === "") return "Neutral";

  const msg = text.toLowerCase();

  // Keyword Lists
  const positiveWords = ["good", "great", "excellent", "awesome", "nice", "love", "happy", "perfect", "best", "amazing", "better", "easy"];
  const negativeWords = ["bad", "worst", "hate", "poor", "terrible", "disappointed", "issue", "problem", "difficult", "hard", "slow", "error", "fail", "broken"];

  let score = 0;

  // Simple Scoring Logic
  positiveWords.forEach(word => {
    if (msg.includes(word)) score += 1;
  });

  negativeWords.forEach(word => {
    if (msg.includes(word)) score -= 1;
  });

  // Result based on score
  if (score > 0) return "Positive";
  if (score < 0) return "Negative";
  
  return "Neutral";
}
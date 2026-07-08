import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Ek Workspace banao
  const workspace = await prisma.workspace.create({
    data: { name: "Project Loop Demo" },
  });

  console.log(`Created workspace: ${workspace.name}`);

  // 2. 120 Feedback items generate karo
  const feedbacks = [];
  const categories = ["Bug", "Feature Request", "UI/UX", "Performance"];
  const sentiments = ["Positive", "Neutral", "Negative"];

  for (let i = 1; i <= 120; i++) {
    feedbacks.push({
      customerName: `Customer ${i}`,
      email: `customer${i}@example.com`,
      category: categories[Math.floor(Math.random() * categories.length)],
      feedback: `This is feedback number ${i} about the system. It is working quite well but needs some improvements.`,
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      workspaceId: workspace.id,
    });
  }

  await prisma.feedback.createMany({
    data: feedbacks,
  });

  console.log("Successfully seeded 120 feedback items!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
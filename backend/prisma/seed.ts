import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create a default user
  const user = await prisma.user.upsert({
    where: { email: 'alex@contentforge.ai' },
    update: {},
    create: {
      email: 'alex@contentforge.ai',
      name: 'Alex Forge',
      password: hashedPassword,
      credits: 2450,
      plan: 'Pro Member',
    },
  });

  console.log('User created:', user.email);

  // Create Notifications
  await prisma.notification.deleteMany(); // Clear existing
  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        title: "Alchemy Complete",
        description: "Your video 'Product Launch Teaser' has been successfully repurposed into 5 Twitter threads and 3 LinkedIn posts.",
        type: "success",
        icon: "Sparkles",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
      },
      {
        userId: user.id,
        title: "Credit Balance Low",
        description: "You have less than 500 alchemy credits remaining. Upgrade your plan to ensure uninterrupted forge operations.",
        type: "warning",
        icon: "Zap",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
      },
      {
        userId: user.id,
        title: "System Maintenance",
        description: "ContentForge will undergo scheduled maintenance on Sunday at 02:00 UTC. Expect minor latency during this window.",
        type: "info",
        icon: "AlertCircle",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
      },
      {
        userId: user.id,
        title: "New Integration Available",
        description: "You can now connect your TikTok account directly to ContentForge for seamless publishing.",
        type: "update",
        icon: "CircleCheck",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
      }
    ],
  });

  console.log('Notifications seeded.');

  // Create Activities
  await prisma.activity.deleteMany();
  await prisma.activity.createMany({
    data: [
      {
        userId: user.id,
        task: "Bulk Repurpose: Product Demo",
        engine: "Alchemy Engine v2.4",
        status: "Completed",
        tokens: "18.4k",
        progress: 100,
        impact: "+245% Reach",
      },
      {
        userId: user.id,
        task: "Viral Thread Synthesis",
        engine: "ContentForge Llama 3",
        status: "Processing",
        tokens: "4.2k",
        progress: 64,
        impact: "Calculating...",
      },
      {
        userId: user.id,
        task: "LinkedIn Authority Series",
        engine: "Alchemy Engine v2.4",
        status: "Completed",
        tokens: "32.1k",
        progress: 100,
        impact: "+180% Engagement",
      },
      {
        userId: user.id,
        task: "Newsletter Auto-Draft",
        engine: "System Scheduler",
        status: "Scheduled",
        tokens: "0",
        progress: 0,
        impact: "N/A",
      }
    ],
  });

  console.log('Activities seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

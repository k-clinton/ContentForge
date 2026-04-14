import express from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';

const router = express.Router();

// Delay helper for mock
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

router.post('/', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const { sourceText, url, voice, depth, platform } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // Mock API generation time
    await delay(3000);

    const mockedOutput = `Here is your synthesized content from ContentForge generated in the "${voice}" voice targeting ${platform}. \n\nWe analyzed the input text (or URL) and extracted the core concepts. The depth configuration was set to ${depth}%, meaning we provided a highly detailed yet scannable output.\n\n# Key Takeaways:\n- Always optimize your content for the specific platform.\n- Utilize AI alchemy to expand simple ideas into comprehensive threads.\n- Leverage your specific brand voice to maintain authenticity.\n\nEnjoy your new digital masterpiece!`;

    // Save history
    const synthesisJob = await prisma.synthesisJob.create({
      data: {
        sourceText: sourceText || null,
        url: url || null,
        outputText: mockedOutput,
        platform: platform || 'Unknown',
        voice: voice || 'Professional',
        depth: parseInt(depth) || 70,
        userId: userId,
      }
    });

    // Log Activity
    await prisma.activity.create({
      data: {
        task: `Content Synthesis (${platform})`,
        engine: 'Alchemy Forge v1.0',
        status: 'Completed',
        tokens: '1,450',
        progress: 100,
        impact: '+ High',
        userId: userId
      }
    });

    return res.status(200).json({ job: synthesisJob });
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;

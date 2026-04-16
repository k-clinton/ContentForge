import express from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Initialize Gemini API
const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;

router.post('/', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const { sourceText, url, voice, depth, platform } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // Fetch user to check for personal API key
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    // Determine which API key to use (User's personal key > System key)
    const effectiveApiKey = user?.apiKey || (process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? process.env.GEMINI_API_KEY : null);
    const activeGenAI = effectiveApiKey ? new GoogleGenerativeAI(effectiveApiKey) : null;

    let finalOutput = "";
    let tokenCount = "0";

    if (activeGenAI) {
      try {
        const model = activeGenAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `
          You are an expert social media alchemist at ContentForge. 
          Your task is to repurpose the following content into a high-impact ${platform} post.
          
          Target Voice: ${voice}
          Synthesis Depth: ${depth}% (Higher means more detailed and verbose, lower means more concise/punchy)
          
          Source Content:
          ${sourceText || "Fetch from URL: " + url}
          
          Guidelines:
          - If platform is LinkedIn: Use professional but engaging tone, use whitespace for readability, add 2-3 relevant hashtags.
          - If platform is Twitter/X: Be punchy, use threads if the content is long, maximize engagement hooks.
          - Maintain the "${voice}" persona throughout.
          - Return ONLY the final synthesized content.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        finalOutput = response.text();
        tokenCount = (finalOutput.length / 4).toFixed(0); // Rough estimation
      } catch (aiError) {
        console.error("Gemini AI Error:", aiError);
        finalOutput = `[Fallback Synthesis] ${voice} perspective on ${platform}: \n\nWe encountered a temporary connection issue with the Alchemist Engine, but here is a strategic breakdown: \n- The core message revolves around optimizing input for ${depth}% depth. \n- Use the ${voice} tone to maintain brand authority. \n- Ready for ${platform} distribution.`;
        tokenCount = "450";
      }
    } else {
      // Original Mock System
      await new Promise(resolve => setTimeout(resolve, 2000));
      finalOutput = `[Mock API] Synthesis result in "${voice}" for ${platform}. \n\nTo enable real AI synthesis, please add a valid GEMINI_API_KEY to your backend/.env file. \n\nKey Strategy:\n- Repurpose content with ${depth}% depth.\n- Maintain ${voice} consistency.`;
      tokenCount = "150";
    }

    // Save history
    const synthesisJob = await prisma.synthesisJob.create({
      data: {
        sourceText: sourceText || null,
        url: url || null,
        outputText: finalOutput,
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
        engine: genAI ? 'Gemini 1.5 Pro' : 'Alchemy Forge (Mock)',
        status: 'Completed',
        tokens: tokenCount,
        progress: 100,
        impact: '+ High',
        userId: userId
      }
    });

    return res.status(200).json({ job: synthesisJob });
  } catch (err: any) {
    console.error("Synthesis Route Error:", err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;

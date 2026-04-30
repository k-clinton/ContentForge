import express from 'express';
import prisma from '../lib/prisma';
import { emailService } from '../lib/email';
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

    // Fetch user to check for personal API key and credit balance
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Determine which API key to use (User's personal key > System key)
    const isUsingPersonalKey = !!user.apiKey;
    const effectiveApiKey = user.apiKey || (process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? process.env.GEMINI_API_KEY : null);
    
    // Credit Check: Only if using system key
    const jobCost = 50;
    if (!isUsingPersonalKey && user.credits < jobCost) {
      return res.status(403).json({ 
        message: 'Insufficient credits', 
        required: jobCost, 
        current: user.credits 
      });
    }

    const activeGenAI = effectiveApiKey ? new GoogleGenerativeAI(effectiveApiKey) : null;

    let finalOutput = "";
    let tokenCount = "0";
    let isSuccess = false;

    if (activeGenAI) {
      try {
        const model = activeGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
        isSuccess = true;
      } catch (aiError) {
        console.error("Gemini AI Engine Error Details:", aiError);
        finalOutput = `[Fallback Synthesis] ${voice} perspective on ${platform}: \n\nWe encountered a temporary connection issue with the Alchemist Engine, but here is a strategic breakdown: \n- The core message revolves around optimizing input for ${depth}% depth. \n- Use the ${voice} tone to maintain brand authority. \n- Ready for ${platform} distribution.`;
        tokenCount = "450";
        isSuccess = false;
      }
    } else {
      // Original Mock System
      await new Promise(resolve => setTimeout(resolve, 2000));
      finalOutput = `[Mock API] Synthesis result in "${voice}" for ${platform}. \n\nTo enable real AI synthesis, please add a valid GEMINI_API_KEY to your backend/.env file. \n\nKey Strategy:\n- Repurpose content with ${depth}% depth.\n- Maintain ${voice} consistency.`;
      tokenCount = "150";
      isSuccess = true;
    }

    // Wrap all database updates in a transaction for consistency
    const [synthesisJob] = await prisma.$transaction([
      // 1. Save history
      prisma.synthesisJob.create({
        data: {
          sourceText: sourceText || null,
          url: url || null,
          outputText: finalOutput,
          platform: platform || 'Unknown',
          voice: voice || 'Professional',
          depth: parseInt(depth) || 70,
          userId: userId,
        }
      }),
      // 2. Log Activity
      prisma.activity.create({
        data: {
          task: `Synthesis: ${platform}`,
          engine: isUsingPersonalKey ? 'Personal Gemini Key' : (genAI ? 'Gemini 1.5 Pro' : 'Alchemy Forge (Mock)'),
          status: isSuccess ? 'Completed' : 'Drafted (UI Fallback)',
          tokens: tokenCount,
          progress: 100,
          impact: isSuccess ? '+ High' : '- Neutral',
          userId: userId
        }
      }),
      // 3. Create Notification
      prisma.notification.create({
        data: {
          title: isSuccess ? 'Synthesis Successful' : 'Synthesis Connection Issue',
          description: isSuccess 
            ? `Your ${platform} post has been forged in ${voice} voice.` 
            : `We had trouble reaching the AI engine, but forged a fallback version for your ${platform} post.`,
          type: isSuccess ? 'success' : 'warning',
          icon: isSuccess ? 'Sparkles' : 'AlertCircle',
          color: isSuccess ? 'emerald-400' : 'amber-400',
          bg: isSuccess ? 'emerald-500/10' : 'amber-500/10',
          userId: userId
        }
      }),
      // 4. Deduct Credits if applicable
      ...(isUsingPersonalKey ? [] : [
        prisma.user.update({
          where: { id: userId },
          data: { credits: { decrement: jobCost } }
        })
      ])
    ]);

    // Credit Low Nudge: Check if credits dropped below threshold (e.g., 200)
    if (!isUsingPersonalKey && user.credits - jobCost < 200 && user.credits >= 200) {
      // Use fire-and-forget for the email so it doesn't slow down the response
      emailService.sendCreditLowWarning(user.email, user.name || 'Alchemist', user.credits - jobCost)
        .catch(err => console.error('Error sending credit warning:', err));
    }

    return res.status(200).json({ 
      job: synthesisJob,
      creditsDeducted: isUsingPersonalKey ? 0 : jobCost,
      remainingCredits: isUsingPersonalKey ? user.credits : user.credits - jobCost
    });
  } catch (err: any) {
    console.error("Synthesis Route Error:", err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;
;

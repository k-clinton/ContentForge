import express from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Get the user info
router.get('/me', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, name: true, email: true, credits: true, plan: true, createdAt: true, apiKey: true, maxCredits: true,
        emailNotifications: true, inAppNotifications: true, defaultLanguage: true, defaultLength: true, theme: true
      }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Update the user info
router.put('/settings', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name, email, password, apiKey, emailNotifications, inAppNotifications, defaultLanguage, defaultLength, theme } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (apiKey !== undefined) updateData.apiKey = apiKey;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
      updateData.email = email;
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    if (emailNotifications !== undefined) updateData.emailNotifications = emailNotifications;
    if (inAppNotifications !== undefined) updateData.inAppNotifications = inAppNotifications;
    if (defaultLanguage) updateData.defaultLanguage = defaultLanguage;
    if (defaultLength) updateData.defaultLength = defaultLength;
    if (theme) updateData.theme = theme;

    // If nothing to update, return early
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { name: true, email: true, credits: true, plan: true, apiKey: true, maxCredits: true }
    });

    return res.status(200).json({ message: 'Settings updated successfully', user: updatedUser });
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Get dashboard stats
router.get('/dashboard-stats', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const [user, totalJobs, activities] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { credits: true, maxCredits: true } }),
      prisma.synthesisJob.count({ where: { userId } }),
      prisma.activity.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 10 })
    ]);

    // Calculate time saved (15 mins per job)
    const totalMinutesSaved = totalJobs * 15;
    const hoursSaved = (totalMinutesSaved / 60).toFixed(1);

    return res.status(200).json({
      totalGenerated: totalJobs,
      credits: user?.credits || 0,
      creditLimit: user?.maxCredits || 2500,
      hoursSaved: hoursSaved,
      momentum: "+12%", // Mocking momentum for now
      activities: activities
    });
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;

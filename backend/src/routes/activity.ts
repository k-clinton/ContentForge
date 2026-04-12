import express from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: any) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity' });
  }
});

export default router;

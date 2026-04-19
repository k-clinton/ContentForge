import express from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

router.patch('/:id/read', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: String(req.params.id) }
    });

    if (!notification || notification.userId !== req.user!.userId) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await prisma.notification.update({
      where: { id: String(req.params.id) },
      data: { isRead: true }
    });
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
});

router.post('/read-all', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user!.userId, isRead: false },
      data: { isRead: true }
    });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notifications' });
  }
});

export default router;

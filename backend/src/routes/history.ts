import express from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const history = await prisma.synthesisJob.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json(history);
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const id = req.params.id as string;
    
    // Check ownership
    const job = await prisma.synthesisJob.findUnique({ where: { id: id } });
    if (!job || job.userId !== userId) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await prisma.synthesisJob.delete({ where: { id: id } });
    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;

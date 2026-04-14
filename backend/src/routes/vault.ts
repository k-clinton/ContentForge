import express from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get the vault
router.get('/', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const items = await prisma.vaultItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json(items);
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Save to vault
router.post('/', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { title, description, content, platform, image } = req.body;

    const vaultItem = await prisma.vaultItem.create({
      data: {
        title,
        description,
        content,
        platform,
        image,
        userId
      }
    });

    return res.status(201).json(vaultItem);
  } catch (err: any) {
    return res.status(500).json({ message: 'Error saving item', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) return res.status(400).json({ message: 'Invalid ID' });

    // Check ownership
    const item = await prisma.vaultItem.findUnique({ where: { id } });
    if (!item || item.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.vaultItem.delete({ where: { id } });
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;

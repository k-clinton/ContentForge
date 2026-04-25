import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { emailService } from '../lib/email';
import { authMiddleware } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'alchemy_forge_secret_2026';

// Register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });

    // Send Welcome Email
    await emailService.sendWelcomeEmail(user.email, user.name || 'Alchemist');

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name || '' } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Security best practice: don't reveal if user exists
      return res.json({ message: 'If an account exists with this email, you will receive a reset link.' });
    }

    // Generate a secure token (mocking for now, usually stored in DB with expiration)
    const resetToken = jwt.sign({ userId: user.id, type: 'password-reset' }, JWT_SECRET, { expiresIn: '1h' });
    
    // In a real app, you might save this token to the user record in DB
    // await prisma.user.update({ where: { id: user.id }, data: { resetToken } });

    await emailService.sendPasswordResetEmail(user.email, user.name || 'Alchemist', resetToken);

    res.json({ message: 'If an account exists with this email, you will receive a reset link.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, credits: user.credits, plan: user.plan } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login error', details: error instanceof Error ? error.message : 'Unknown' });
  }
});

// Profile
router.get('/me', authMiddleware, async (req: AuthRequest, res: express.Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, email: true, name: true, credits: true, plan: true, avatar: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

export default router;

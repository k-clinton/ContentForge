import express from 'express';
import prisma from '../lib/prisma';
import { emailService } from '../lib/email';

const router = express.Router();

/**
 * Stripe Webhook Handler
 * 
 * SECURITY NOTE: In production, you MUST verify the Stripe signature to prevent spoofing.
 * Use: stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
 */
router.post('/stripe', async (req, res) => {
  const event = req.body;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret && process.env.NODE_ENV === 'production') {
    console.error('CRITICAL: STRIPE_WEBHOOK_SECRET is missing in production!');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  // Handle specific event types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userEmail = session.customer_details?.email;
      const amount = (session.amount_total / 100).toFixed(2);
      const currency = session.currency.toUpperCase();
      
      if (userEmail) {
        // Find user in DB
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        
        if (user) {
          // Send Receipt Email
          await emailService.sendReceiptEmail(
            user.email, 
            user.name || 'Valued Customer', 
            `${currency} ${amount}`, 
            'Pro Alchemist Plan' // This would ideally come from session metadata
          );
          
          console.log(`Receipt sent to ${userEmail} for checkout session ${session.id}`);
        }
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      // Handle recurring subscription payments
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;

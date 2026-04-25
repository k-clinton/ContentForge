import express from 'express';
import prisma from '../lib/prisma';
import { emailService } from '../lib/email';

const router = express.Router();

/**
 * Stripe Webhook Handler (Mock)
 * In a real app, use stripe.webhooks.constructEvent to verify signatures.
 */
router.post('/stripe', async (req, res) => {
  const event = req.body;

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

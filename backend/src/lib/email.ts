import { Resend } from 'resend';
import { 
  welcomeTemplate, 
  passwordResetTemplate, 
  receiptTemplate, 
  creditLowTemplate 
} from './email-templates';

/**
 * Interface for Email Service to allow easy swapping of providers (e.g., SendGrid)
 */
interface IEmailService {
  sendWelcomeEmail(email: string, name: string): Promise<void>;
  sendPasswordResetEmail(email: string, name: string, token: string): Promise<void>;
  sendReceiptEmail(email: string, name: string, amount: string, planName: string): Promise<void>;
  sendCreditLowWarning(email: string, name: string, currentCredits: number): Promise<void>;
}

class EmailService implements IEmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey && process.env.NODE_ENV === 'production') {
      console.warn('RESEND_API_KEY is missing in production!');
    }
    this.resend = new Resend(apiKey || 're_mock_key');
    this.fromEmail = process.env.FROM_EMAIL || 'ContentForge <onboarding@resend.dev>';
  }

  /**
   * Send a welcome email to a new user
   */
  async sendWelcomeEmail(email: string, name: string) {
    try {
      const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`;
      const html = welcomeTemplate(name, loginUrl);

      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Welcome to ContentForge!',
        html: html,
      });

      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }

  /**
   * Send a password reset link
   */
  async sendPasswordResetEmail(email: string, name: string, token: string) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
      const html = passwordResetTemplate(name, resetUrl);

      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Reset your ContentForge password',
        html: html,
      });

      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
    }
  }

  /**
   * Send a subscription receipt
   */
  async sendReceiptEmail(email: string, name: string, amount: string, planName: string) {
    try {
      const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const html = receiptTemplate(name, amount, planName, date);

      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: `Your ContentForge Receipt - ${planName}`,
        html: html,
      });

      console.log(`Receipt email sent to ${email}`);
    } catch (error) {
      console.error('Failed to send receipt email:', error);
    }
  }

  /**
   * Send a warning when credits are low
   */
  async sendCreditLowWarning(email: string, name: string, currentCredits: number) {
    try {
      const html = creditLowTemplate(name, currentCredits);

      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Action Required: Your credits are low',
        html: html,
      });

      console.log(`Credit low warning sent to ${email}`);
    } catch (error) {
      console.error('Failed to send credit low warning:', error);
    }
  }
}

// Export a singleton instance
export const emailService = new EmailService();

/**
 * Email Templates for ContentForge
 * Modern, responsive HTML templates with indigo/violet brand colors.
 */

const brandColor = '#6366f1'; // Indigo-500
const brandColorDark = '#4f46e5'; // Indigo-600
const textColor = '#1f2937'; // Gray-800
const mutedColor = '#6b7280'; // Gray-500

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: ${textColor};
  margin: 0;
  padding: 0;
  background-color: #f9fafb;
`;

const containerStyles = `
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const headerStyles = `
  text-align: center;
  margin-bottom: 30px;
`;

const footerStyles = `
  text-align: center;
  margin-top: 40px;
  font-size: 12px;
  color: ${mutedColor};
`;

const buttonStyles = `
  display: inline-block;
  padding: 12px 24px;
  background-color: ${brandColor};
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  margin: 20px 0;
`;

const logo = `<div style="font-size: 24px; font-weight: 800; color: ${brandColor}; letter-spacing: -0.025em;">ContentForge</div>`;

export const welcomeTemplate = (name: string, loginUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${baseStyles}</style>
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <div style="${headerStyles}">
      ${logo}
    </div>
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Welcome to the Forge, ${name}!</h1>
    <p>We're thrilled to have you join ContentForge. You're now equipped with the Alchemist Engine to turn your content into high-impact social media posts.</p>
    <p>Ready to start repurposing?</p>
    <div style="text-align: center;">
      <a href="${loginUrl}" style="${buttonStyles}">Go to Dashboard</a>
    </div>
    <p style="margin-top: 20px;">If you have any questions, just reply to this email. We're here to help!</p>
    <div style="${footerStyles}">
      &copy; 2026 ContentForge. All rights reserved.<br>
      You received this because you signed up for ContentForge.
    </div>
  </div>
</body>
</html>
`;

export const passwordResetTemplate = (name: string, resetUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <div style="${headerStyles}">
      ${logo}
    </div>
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Reset your password</h1>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password for your ContentForge account. Click the button below to set a new password:</p>
    <div style="text-align: center;">
      <a href="${resetUrl}" style="${buttonStyles}">Reset Password</a>
    </div>
    <p style="font-size: 14px; color: ${mutedColor};">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
    <div style="${footerStyles}">
      &copy; 2026 ContentForge. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const receiptTemplate = (name: string, amount: string, planName: string, date: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <div style="${headerStyles}">
      ${logo}
    </div>
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Payment Received</h1>
    <p>Hi ${name},</p>
    <p>Thank you for your subscription! Your payment for the <strong>${planName}</strong> plan has been successfully processed.</p>
    
    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px 0; color: ${mutedColor};">Plan</td>
          <td style="padding: 4px 0; text-align: right; font-weight: 600;">${planName}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: ${mutedColor};">Amount</td>
          <td style="padding: 4px 0; text-align: right; font-weight: 600;">${amount}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: ${mutedColor};">Date</td>
          <td style="padding: 4px 0; text-align: right; font-weight: 600;">${date}</td>
        </tr>
      </table>
    </div>

    <p>You can view your billing history and download invoices in your settings.</p>
    <div style="text-align: center;">
      <a href="https://contentforge.app/settings" style="${buttonStyles}">View Billing</a>
    </div>
    <div style="${footerStyles}">
      &copy; 2026 ContentForge. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const creditLowTemplate = (name: string, currentCredits: number) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <div style="${headerStyles}">
      ${logo}
    </div>
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Your credits are running low</h1>
    <p>Hi ${name},</p>
    <p>Your Alchemist Engine is running low on fuel! You currently have <strong>${currentCredits}</strong> credits remaining.</p>
    <p>Upgrade your plan now to ensure your content pipeline stays active without interruption.</p>
    <div style="text-align: center;">
      <a href="https://contentforge.app/pricing" style="${buttonStyles}">Upgrade Now</a>
    </div>
    <div style="${footerStyles}">
      &copy; 2026 ContentForge. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const verificationTemplate = (name: string, verificationUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="${baseStyles}">
  <div style="${containerStyles}">
    <div style="${headerStyles}">
      ${logo}
    </div>
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">Verify your email address</h1>
    <p>Hi ${name},</p>
    <p>Thanks for signing up for ContentForge! Please click the button below to verify your email address and activate your account:</p>
    <div style="text-align: center;">
      <a href="${verificationUrl}" style="${buttonStyles}">Verify Email</a>
    </div>
    <p style="font-size: 14px; color: ${mutedColor};">If you didn't create an account, you can safely ignore this email.</p>
    <div style="${footerStyles}">
      &copy; 2026 ContentForge. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

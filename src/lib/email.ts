import nodemailer from 'nodemailer'

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"ZEROM Power Admin" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Reset your admin password',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #f97316;">ZEROM Power – Password Reset</h2>
        <p>You requested a password reset for the admin panel.</p>
        <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0;">
          Reset Password
        </a>
        <p style="color:#888;font-size:12px;">If you did not request this, ignore this email.</p>
        <p style="color:#888;font-size:12px;">Link: ${resetUrl}</p>
      </div>
    `,
  })
}

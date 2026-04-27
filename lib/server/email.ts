import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const brand = {
  primary: '#1374e6',
  dark: '#0f172a'
};

function welcomeTemplate(name: string) {
  return `
  <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;color:${brand.dark}">
    <div style="max-width:640px;margin:0 auto;background:white;border-radius:12px;padding:24px;border:1px solid #e2e8f0">
      <img src="https://heymariner.com/logo.png" alt="HeyMariner" style="height:40px;margin-bottom:16px"/>
      <h1 style="margin:0 0 8px 0;color:${brand.primary}">Welcome aboard, ${name}</h1>
      <p style="line-height:1.6">Your HeyMariner account is ready. Explore articles, port intelligence, IMPA codes, and calculators built for maritime teams.</p>
      <a href="https://heymariner.com/dashboard" style="display:inline-block;margin-top:16px;background:${brand.primary};color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Open Dashboard</a>
    </div>
  </div>`;
}

export async function sendWelcomeEmail(to: string, name: string) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) return;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: 'Welcome to HeyMariner',
    html: welcomeTemplate(name)
  });
}

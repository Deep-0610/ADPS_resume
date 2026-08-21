import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { answerResumeQuestion } from './server/chatbot.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 🛡️ ETHICAL ENGINEERING & SECURITY MODULES
// ==========================================

// 1. Input Sanitization to Prevent XSS / Injection
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Strip < and >
    .replace(/javascript:/gi, '') // Strip pseudo-protocols
    .replace(/on\w+=/gi, '') // Strip event handlers
    .trim();
}

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 2. Sliding Window In-Memory Rate Limiter
const rateLimitStore = new Map();

function createRateLimiter(windowMs, maxRequests, endpointName) {
  return (req, res, next) => {
    const clientIp = (req.headers['x-forwarded-for'])?.split(',')[0]?.trim() || 
                     req.socket.remoteAddress || 
                     'unknown_client';

    const key = `${endpointName}:${clientIp}`;
    const now = Date.now();
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({
        success: false,
        error: `Rate limit exceeded for security. Please retry in ${retryAfter} seconds.`,
      });
    }

    record.count += 1;
    next();
  };
}

// Cleanup stale rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

// ==========================================
// 📬 NODEMAILER TRANSPORTER SETUP
// ==========================================
async function createMailTransporter() {
  const host = process.env.EMAIL_HOST || 'smtp.ethereal.email';
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  
  // Ensure valid username format (fallback to Ethereal user if provided string lacks @)
  let user = process.env.EMAIL_USER;
  if (!user || !user.includes('@')) {
    user = 'tressie99@ethereal.email';
  }
  const pass = process.env.EMAIL_PASS || 'CNMRXDmKaBTQPAN3QX';

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false, // Prevents self-signed cert rejections in dev
      },
    });

    return transporter;
  } catch (err) {
    console.warn('[Nodemailer] Could not create email transporter:', err);
    return null;
  }
}

// ==========================================
// 🚀 MAIN APPLICATION SERVER
// ==========================================
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Strict Request Body Size Limits (Prevents DoS through large payloads)
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // HTTP Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      owner: 'Deep Chaudhari',
      service: 'Portfolio & Forward Deployment Engineering API',
      security: {
        rateLimiting: 'active',
        inputSanitization: 'active',
        antiSpamHoneypot: 'active',
        securityHeaders: 'active',
      },
      timestamp: new Date().toISOString(),
    });
  });

  // POST /api/contact - Secure Contact Inquiries Handler
  const contactRateLimiter = createRateLimiter(15 * 60 * 1000, 6, 'contact'); // 6 submissions per 15 mins

  app.post('/api/contact', contactRateLimiter, async (req, res) => {
    try {
      const { name, email, company, service, budget, message, timeline, website_url } = req.body;

      // 🛡️ Honeypot Check (Catches automated bots without alerting them)
      if (website_url) {
        console.warn('[Security] Bot trapped by honeypot field:', { ip: req.ip });
        return res.status(200).json({
          success: true,
          message: 'Your inquiry was received.',
        });
      }

      // Input Sanitization
      const cleanName = sanitizeInput(name).slice(0, 100);
      const cleanEmail = sanitizeInput(email).slice(0, 120);
      const cleanCompany = sanitizeInput(company).slice(0, 120);
      const cleanService = sanitizeInput(service).slice(0, 100);
      const cleanBudget = sanitizeInput(budget).slice(0, 80);
      const cleanTimeline = sanitizeInput(timeline).slice(0, 80);
      const cleanMessage = sanitizeInput(message).slice(0, 3000);

      // Validation
      if (!cleanName || !cleanEmail || !cleanMessage) {
        return res.status(400).json({
          success: false,
          error: 'Please provide all required fields (name, email, and message).'
        });
      }

      // Email RFC 5322 standard regex validation
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid, deliverable email address.'
        });
      }

      console.log(`[Contact Form Received] From: ${cleanName} <${cleanEmail}>, Topic: ${cleanService || 'General Inquiry'}`);

      const recipientEmail = process.env.RECIPIENT_EMAIL || 'deepsc0606@gmail.com';
      const transporter = await createMailTransporter();

      let previewUrl = false;

      if (transporter) {
        const mailOptions = {
          from: `"Deep Chaudhari Portfolio" <tressie99@ethereal.email>`,
          replyTo: `"${escapeHtml(cleanName)}" <${cleanEmail}>`,
          to: recipientEmail,
          subject: `💼 New Opportunity: ${escapeHtml(cleanService || 'Engineering Role')} from ${escapeHtml(cleanName)} (${escapeHtml(cleanCompany || 'Individual')})`,
          html: `
            <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #FAF9F6; padding: 32px; color: #0F172A; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #E2E8F0;">
              <div style="border-bottom: 2px solid #064E3B; padding-bottom: 16px; margin-bottom: 24px;">
                <h1 style="color: #064E3B; margin: 0; font-size: 22px; font-weight: 700;">Deep Chaudhari &bull; Portfolio Inquiry</h1>
                <p style="color: #475569; margin: 4px 0 0 0; font-size: 13px;">Forward Deployment &amp; Full-Stack Engineering Portal</p>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600; width: 140px;">Sender Name:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px; font-weight: 700;">${escapeHtml(cleanName)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Email Address:</td>
                  <td style="padding: 8px 0; color: #064E3B; font-size: 14px;"><a href="mailto:${escapeHtml(cleanEmail)}" style="color: #064E3B; text-decoration: underline;">${escapeHtml(cleanEmail)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Company / Org:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;">${escapeHtml(cleanCompany || 'Not specified')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Role / Service:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;"><span style="background-color: #D1FAE5; color: #064E3B; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600;">${escapeHtml(cleanService || 'Forward Deployment / Full-Stack Role')}</span></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Budget / Package:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;">${escapeHtml(cleanBudget || 'Flexible / Competitive')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Timeline:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;">${escapeHtml(cleanTimeline || 'Immediate')}</td>
                </tr>
              </table>

              <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px 0; color: #064E3B; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Message Details</h3>
                <p style="margin: 0; line-height: 1.6; color: #334155; font-size: 14px; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
              </div>

              <div style="text-align: center; color: #94A3B8; font-size: 12px; border-top: 1px solid #E2E8F0; padding-top: 16px;">
                <p style="margin: 0;">Sent directly to Deep Chaudhari &bull; deepsc0606@gmail.com &bull; ${new Date().toUTCString()}</p>
              </div>
            </div>
          `,
        };

        const info = await transporter.sendMail(mailOptions);
        previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log('[Nodemailer Ethereal Preview URL]:', previewUrl);
        }
      }

      res.status(200).json({
        success: true,
        message: 'Thank you! Your message has been securely sent to Deep Chaudhari. He will respond within 24 hours.',
        previewUrl: previewUrl || undefined,
        data: {
          name: cleanName,
          email: cleanEmail,
          service: cleanService,
          submittedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('[POST /api/contact Error]:', error?.message);
      res.status(500).json({
        success: false,
        error: 'An unexpected error occurred while transmitting your message. Please reach Deep directly at deepsc0606@gmail.com.'
      });
    }
  });

  // POST /api/chat - Resume and website navigation assistant
  const chatRateLimiter = createRateLimiter(60 * 1000, 25, 'chat'); // 25 queries per minute

  app.post('/api/chat', chatRateLimiter, async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Valid message string is required.' });
      }

      const cleanUserMessage = sanitizeInput(message).slice(0, 1500);
      if (!cleanUserMessage) {
        return res.status(400).json({ error: 'Message contains invalid characters.' });
      }

      res.json({
        reply: answerResumeQuestion(cleanUserMessage),
        model: 'local-resume-nlp',
        isFallback: true,
        scope: 'resume-and-navigation'
      });
    } catch (error) {
      console.error('[POST /api/chat Error]:', error);
      res.status(200).json({
        reply: "Deep Chaudhari is a Full-Stack Software Engineer & Forward Deployment candidate (Ex-Assistant C.T.O. at SpiroEdu) with 9 verified certifications from Walmart USA, UC Irvine, Infosys, IIM Bangalore, and IIT Bombay. You can contact him directly at deepsc0606@gmail.com or +91 7738266248.",
        model: 'deep-portfolio-fallback',
        isFallback: true
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Deep Chaudhari Secure Server] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

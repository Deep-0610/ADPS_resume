var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.js
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();
}
function escapeHtml(text) {
  if (typeof text !== "string") return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
var rateLimitStore = /* @__PURE__ */ new Map();
function createRateLimiter(windowMs, maxRequests, endpointName) {
  return (req, res, next) => {
    const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown_client";
    const key = `${endpointName}:${clientIp}`;
    const now = Date.now();
    const record = rateLimitStore.get(key);
    if (!record || now > record.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return next();
    }
    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1e3);
      res.set("Retry-After", String(retryAfter));
      return res.status(429).json({
        success: false,
        error: `Rate limit exceeded for security. Please retry in ${retryAfter} seconds.`
      });
    }
    record.count += 1;
    next();
  };
}
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 6e4);
var aiClient = null;
function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[Gemini AI] GEMINI_API_KEY is not set in environment variables.");
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({ apiKey });
  }
  return aiClient;
}
async function createMailTransporter() {
  const host = process.env.EMAIL_HOST || "smtp.ethereal.email";
  const port = parseInt(process.env.EMAIL_PORT || "587", 10);
  let user = process.env.EMAIL_USER;
  if (!user || !user.includes("@")) {
    user = "tressie99@ethereal.email";
  }
  const pass = process.env.EMAIL_PASS || "CNMRXDmKaBTQPAN3QX";
  try {
    const transporter = import_nodemailer.default.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
        // Prevents self-signed cert rejections in dev
      }
    });
    return transporter;
  } catch (err) {
    console.warn("[Nodemailer] Could not create email transporter:", err);
    return null;
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "100kb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "100kb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
  });
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      owner: "Deep Chaudhari",
      service: "Portfolio & Forward Deployment Engineering API",
      security: {
        rateLimiting: "active",
        inputSanitization: "active",
        antiSpamHoneypot: "active",
        securityHeaders: "active"
      },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  const contactRateLimiter = createRateLimiter(15 * 60 * 1e3, 6, "contact");
  app.post("/api/contact", contactRateLimiter, async (req, res) => {
    try {
      const { name, email, company, service, budget, message, timeline, website_url } = req.body;
      if (website_url) {
        console.warn("[Security] Bot trapped by honeypot field:", { ip: req.ip });
        return res.status(200).json({
          success: true,
          message: "Your inquiry was received."
        });
      }
      const cleanName = sanitizeInput(name).slice(0, 100);
      const cleanEmail = sanitizeInput(email).slice(0, 120);
      const cleanCompany = sanitizeInput(company).slice(0, 120);
      const cleanService = sanitizeInput(service).slice(0, 100);
      const cleanBudget = sanitizeInput(budget).slice(0, 80);
      const cleanTimeline = sanitizeInput(timeline).slice(0, 80);
      const cleanMessage = sanitizeInput(message).slice(0, 3e3);
      if (!cleanName || !cleanEmail || !cleanMessage) {
        return res.status(400).json({
          success: false,
          error: "Please provide all required fields (name, email, and message)."
        });
      }
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          error: "Please provide a valid, deliverable email address."
        });
      }
      console.log(`[Contact Form Received] From: ${cleanName} <${cleanEmail}>, Topic: ${cleanService || "General Inquiry"}`);
      const recipientEmail = process.env.RECIPIENT_EMAIL || "deepsc0606@gmail.com";
      const transporter = await createMailTransporter();
      let previewUrl = false;
      if (transporter) {
        const mailOptions = {
          from: `"Deep Chaudhari Portfolio" <tressie99@ethereal.email>`,
          replyTo: `"${escapeHtml(cleanName)}" <${cleanEmail}>`,
          to: recipientEmail,
          subject: `\u{1F4BC} New Opportunity: ${escapeHtml(cleanService || "Engineering Role")} from ${escapeHtml(cleanName)} (${escapeHtml(cleanCompany || "Individual")})`,
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
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;">${escapeHtml(cleanCompany || "Not specified")}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Role / Service:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;"><span style="background-color: #D1FAE5; color: #064E3B; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600;">${escapeHtml(cleanService || "Forward Deployment / Full-Stack Role")}</span></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Budget / Package:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;">${escapeHtml(cleanBudget || "Flexible / Competitive")}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; font-size: 13px; font-weight: 600;">Timeline:</td>
                  <td style="padding: 8px 0; color: #0F172A; font-size: 14px;">${escapeHtml(cleanTimeline || "Immediate")}</td>
                </tr>
              </table>

              <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px 0; color: #064E3B; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Message Details</h3>
                <p style="margin: 0; line-height: 1.6; color: #334155; font-size: 14px; white-space: pre-wrap;">${escapeHtml(cleanMessage)}</p>
              </div>

              <div style="text-align: center; color: #94A3B8; font-size: 12px; border-top: 1px solid #E2E8F0; padding-top: 16px;">
                <p style="margin: 0;">Sent directly to Deep Chaudhari &bull; deepsc0606@gmail.com &bull; ${(/* @__PURE__ */ new Date()).toUTCString()}</p>
              </div>
            </div>
          `
        };
        const info = await transporter.sendMail(mailOptions);
        previewUrl = import_nodemailer.default.getTestMessageUrl(info);
        if (previewUrl) {
          console.log("[Nodemailer Ethereal Preview URL]:", previewUrl);
        }
      }
      res.status(200).json({
        success: true,
        message: "Thank you! Your message has been securely sent to Deep Chaudhari. He will respond within 24 hours.",
        previewUrl: previewUrl || void 0,
        data: {
          name: cleanName,
          email: cleanEmail,
          service: cleanService,
          submittedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch (error) {
      console.error("[POST /api/contact Error]:", error?.message);
      res.status(500).json({
        success: false,
        error: "An unexpected error occurred while transmitting your message. Please reach Deep directly at deepsc0606@gmail.com."
      });
    }
  });
  const chatRateLimiter = createRateLimiter(60 * 1e3, 25, "chat");
  app.post("/api/chat", chatRateLimiter, async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Valid message string is required." });
      }
      const cleanUserMessage = sanitizeInput(message).slice(0, 1500);
      if (!cleanUserMessage) {
        return res.status(400).json({ error: "Message contains invalid characters." });
      }
      const ai = getAiClient();
      const systemInstruction = `
You are "Deep's AI Assistant & Engineering Copilot", representing Deep Chaudhari (Deep Sandeep Chaudhari) \u2014 Full-Stack Software Engineer & Forward Deployment Engineer candidate.

Key Facts about Deep Chaudhari:
- **Identity**: Full-Stack Computer Engineering student at Shah & Anchor Kutchhi Engineering College (SAKEC), Mumbai (B.Tech 2024-2028).
- **Leadership & Work Experience**: Former Assistant C.T.O. / Full Stack Engineering Lead at SpiroEdu Education Pvt Ltd (incubated at SAKEC Technology Business Incubator, Jan 2025 - Sep 2025).
  - Built core web platform with gamified UI, responsive Figma token integration, and multi-step routing.
  - Engineered backend user authentication (register, login, password handling, JWT).
  - Created REST APIs for user management and secure data handling.
  - Integrated MongoDB / SQL databases for persistent storage and secure payment form submissions.
- **Career Objective**: Seeking a Forward Deployment Engineer or Full-Stack Software Engineering role to integrate AI solutions, build secure backend systems, and deploy scalable software directly into client environments.
- **Verified Certifications (9 Certifications)**:
  1. Walmart USA - Advanced Software Engineering Job Simulation (Forage, Aug 2026: Advanced Data Structures, Software Architecture, Relational DB Design, Data Munging).
  2. The Blockchain - University of California, Irvine / Coursera (Feb 2026, ID: Y8MI49O5BU0Q).
  3. Cryptography and Hashing Overview - University of California, Irvine / Coursera (Jul 2026, ID: KOFHF49B8XMO).
  4. Data Structures and Algorithms using Java - Infosys Springboard (Dec 2025).
  5. Database Fundamentals: Getting Started with SQL - Infosys Springboard (Feb 2026).
  6. Foundations of French (Score: 67.0%) - Indian Institute of Management Bangalore (IIMB) / SWAYAM (Jul 2026, ID: MR160300941).
  7. Full-Stack Development 101 - Simplilearn SkillUp (Jul 2025, Code: 8612418).
  8. C Training Certification (Score: 50.0%) - IIT Bombay Spoken Tutorial (Mar 2025, ID: 4283529ISU).
  9. Internship Completion Certificate - SPIRO / SAKEC TBI (Feb 2026, Ref: SAKEC/TBI/2639/2025-26).
- **Core Skills**: React 19, TypeScript, Node.js, Express, REST APIs, Java, C, SQL/PostgreSQL, MongoDB, Blockchain & Cryptography, Data Structures & Algorithms, Google Gemini AI integration.
- **Contact Details**: Email: deepsc0606@gmail.com | Phone: +91 7738266248 | Location: Mumbai, India.
- **Tone**: Warm, confident, professional, articulate, and engineering-focused. Highlight Deep's hands-on leadership, quick learning agility, and readiness for Forward Deployment and software development challenges.
      `;
      if (!ai) {
        const lower = cleanUserMessage.toLowerCase();
        let fallbackText = "";
        if (lower.includes("experience") || lower.includes("spiro") || lower.includes("cto") || lower.includes("work")) {
          fallbackText = `**Deep Chaudhari** served as **Assistant C.T.O.** at **SpiroEdu Education Pvt Ltd** (SAKEC TBI, Jan 2025 \u2013 Sep 2025).

Key achievements include:
- **Full-Stack Architecture**: Built the core portal including Team, Terms, Contact, and Payment pages with responsive Figma integration and gamified UI.
- **Authentication & Security**: Engineered full user auth (register, login, password security, session handling).
- **REST APIs & Database**: Designed performant backend APIs, connected databases (MongoDB & SQL) for persistent user storage, and ensured secure data pipelines between client and server.`;
        } else if (lower.includes("certificate") || lower.includes("walmart") || lower.includes("coursera") || lower.includes("infosys") || lower.includes("credential")) {
          fallbackText = `Deep holds **9 verified professional certifications**:

1. **Walmart USA**: Advanced Software Engineering Job Simulation (Data Structures, Architecture, Relational DB Design)
2. **UC Irvine**: The Blockchain (Decentralized networks & smart contracts)
3. **UC Irvine**: Cryptography & Hashing Overview (Cryptographic principles & hash functions)
4. **Infosys Springboard**: Data Structures & Algorithms using Java
5. **Infosys Springboard**: Database Fundamentals: Getting Started with SQL
6. **IIM Bangalore / SWAYAM**: Foundations of French (Score: 67.0%)
7. **IIT Bombay**: C Programming Certification
8. **Simplilearn**: Full-Stack Development 101
9. **SAKEC TBI**: Official Internship Completion Certificate (SPIRO)`;
        } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("phone") || lower.includes("reach")) {
          fallbackText = `You can reach **Deep Chaudhari** directly:

- \u{1F4E7} **Email**: [deepsc0606@gmail.com](mailto:deepsc0606@gmail.com)
- \u{1F4F1} **Phone**: [+91 7738266248](tel:+917738266248)
- \u{1F4CD} **Location**: Mumbai, India
- \u{1F393} **Education**: B.Tech Computer Engineering (2024-2028), Shah & Anchor Kutchhi Engineering College

You can also submit a direct message via the **Contact** page!`;
        } else if (lower.includes("skills") || lower.includes("tech") || lower.includes("stack")) {
          fallbackText = `Deep's technical stack spans:

- **Frontend**: React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, Figma design tokens, gamified UI.
- **Backend**: Node.js, Express, REST APIs, User Auth/JWT, Session Management, Payment Webhooks.
- **Databases & Systems**: SQL / PostgreSQL, MongoDB, Data Structures & Algorithms in Java and C.
- **Emerging Tech**: Blockchain ledgers, Cryptographic Hashing, Google Gemini AI integrations, and Forward Deployment methodologies.`;
        } else {
          fallbackText = `Hello! I'm **Deep Chaudhari's AI Copilot**.

Deep is a **Full-Stack Software Engineer & Forward Deployment Engineer** candidate and former **Assistant C.T.O. at SpiroEdu**. He specializes in building robust REST APIs, modern React platforms, relational databases, blockchain architectures, and AI systems.

Ask me about Deep's work experience at SpiroEdu, his 9 verified certifications (Walmart, UC Irvine, Infosys, IIM Bangalore, IIT Bombay), his technical skills, or how to contact him!`;
        }
        return res.json({
          reply: fallbackText,
          model: "deep-portfolio-ai",
          isFallback: true
        });
      }
      let contents = cleanUserMessage;
      if (Array.isArray(history) && history.length > 0) {
        const formattedHistory = history.slice(-6).map((item) => ({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: sanitizeInput(item.text).slice(0, 1e3) }]
        }));
        formattedHistory.push({
          role: "user",
          parts: [{ text: cleanUserMessage }]
        });
        contents = formattedHistory;
      }
      let reply = "";
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7
          }
        });
        reply = response.text || "I'm here to share all details about Deep Chaudhari's software engineering background and project experience. Reach him at deepsc0606@gmail.com.";
      } catch (geminiErr) {
        console.warn("[Gemini 3.7 Flash fallback]:", geminiErr?.message);
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents,
            config: {
              systemInstruction,
              temperature: 0.7
            }
          });
          reply = response.text || "I'm here to share all details about Deep Chaudhari's software engineering background and project experience. Reach him at deepsc0606@gmail.com.";
        } catch (secondaryErr) {
          console.error("[Gemini API Call Failed]:", secondaryErr);
          reply = "Deep Chaudhari is a Full-Stack Software Engineer & Forward Deployment candidate (Ex-Assistant C.T.O. at SpiroEdu) with 9 verified certifications from Walmart USA, UC Irvine, Infosys, IIM Bangalore, and IIT Bombay. You can contact him directly at deepsc0606@gmail.com or +91 7738266248.";
        }
      }
      res.json({
        reply,
        model: "gemini-3.7-flash",
        isFallback: false
      });
    } catch (error) {
      console.error("[POST /api/chat Error]:", error);
      res.status(200).json({
        reply: "Deep Chaudhari is a Full-Stack Software Engineer & Forward Deployment candidate (Ex-Assistant C.T.O. at SpiroEdu) with 9 verified certifications from Walmart USA, UC Irvine, Infosys, IIM Bangalore, and IIT Bombay. You can contact him directly at deepsc0606@gmail.com or +91 7738266248.",
        model: "deep-portfolio-fallback",
        isFallback: true
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Deep Chaudhari Secure Server] Running at http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map

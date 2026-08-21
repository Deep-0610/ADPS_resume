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
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);

// server/chatbot.js
var ROUTES = {
  home: "",
  experience: "experience",
  certifications: "certifications",
  projects: "projects",
  contact: "contact"
};
var STOP_WORDS = /* @__PURE__ */ new Set([
  "a",
  "about",
  "and",
  "are",
  "can",
  "could",
  "deep",
  "do",
  "for",
  "give",
  "he",
  "his",
  "i",
  "is",
  "me",
  "my",
  "of",
  "please",
  "tell",
  "the",
  "what",
  "where",
  "who",
  "with",
  "you",
  "your"
]);
var INTENTS = [
  {
    name: "navigation",
    phrases: ["navigate", "go to", "open", "show me the", "take me to", "page", "section", "website"],
    keywords: ["home", "experience", "certification", "project", "contact", "resume", "cv"]
  },
  {
    name: "contact",
    phrases: ["contact", "get in touch", "reach", "hire", "email", "phone", "available"],
    keywords: ["opportunity", "recruiter", "location"]
  },
  {
    name: "experience",
    phrases: ["work experience", "professional experience", "assistant cto", "assistant c.t.o", "worked at"],
    keywords: ["experience", "spiroedu", "leadership", "responsibilities", "employment"]
  },
  {
    name: "certifications",
    phrases: ["certifications", "certificates", "credentials", "verification"],
    keywords: ["walmart", "coursera", "infosys", "iim", "iit", "simplilearn", "blockchain", "cryptography"]
  },
  {
    name: "projects",
    phrases: ["projects", "built", "portfolio work", "what has he made"],
    keywords: ["project", "platform", "pipeline", "ledger", "optimizer"]
  },
  {
    name: "skills",
    phrases: ["technical skills", "tech stack", "technologies", "programming languages"],
    keywords: ["skills", "stack", "react", "node", "express", "mongodb", "sql", "javascript", "typescript", "java"]
  },
  {
    name: "education",
    phrases: ["education", "study", "college", "degree", "university"],
    keywords: ["student", "btech", "engineering", "sakec", "mumbai"]
  },
  {
    name: "objective",
    phrases: ["career objective", "looking for", "what role", "requirements", "job requirement"],
    keywords: ["role", "career", "forward deployment", "full stack", "opportunity"]
  }
];
var NAVIGATION_TARGETS = [
  { names: ["home", "homepage"], path: ROUTES.home, label: "Home" },
  { names: ["experience", "work"], path: ROUTES.experience, label: "Experience" },
  { names: ["certification", "certifications", "certificate"], path: ROUTES.certifications, label: "Certifications" },
  { names: ["project", "projects"], path: ROUTES.projects, label: "Projects" },
  { names: ["contact", "get in touch"], path: ROUTES.contact, label: "Contact" },
  { names: ["resume", "cv"], path: ROUTES.home, label: "Resume" }
];
var ANSWERS = {
  experience: `**Deep Chaudhari** was **Assistant C.T.O. / Full Stack Engineering Lead** at **SpiroEdu Education Pvt Ltd**, incubated at SAKEC TBI, from **January 2025 to September 2025**.

He led React frontend work, authentication, REST APIs, MongoDB and SQL data flows, payment webhooks, responsive Figma implementation, and gamified user experiences.`,
  certifications: `Deep has **9 verified certifications**, including Walmart USA's Advanced Software Engineering simulation, two University of California Irvine credentials, two Infosys Springboard credentials, IIM Bangalore Foundations of French, an SPIRO internship certificate, Simplilearn Full-Stack Development 101, and IIT Bombay C Training.

Open the [Certifications](/ADPS_resume/certifications) page to inspect the verification details.`,
  projects: `Deep's featured work includes the **SpiroEdu Learning & Payment Engine**, a **Forward Deployment AI Agent & Search Pipeline**, a **Cryptographic Hash & Block Verification Engine**, and an **Enterprise Relational DB Optimizer & Munging Pipeline**.

Open the [Projects](/ADPS_resume/projects) page for the project details and technology lists.`,
  skills: `Deep's documented stack includes **React 19, TypeScript, JavaScript, Tailwind CSS, Node.js, Express.js, REST APIs, JWT authentication, SQL/PostgreSQL, MongoDB, Java, C, blockchain, cryptography, Google Gemini integration, Git, and GitHub**.`,
  education: `Deep is an undergraduate **B.Tech Computer Engineering** student at **Shah & Anchor Kutchhi Engineering College (SAKEC)** in Mumbai, with an expected study period of **2024 to 2028**.`,
  objective: `Deep is seeking **Forward Deployment Engineer** and **Full-Stack Software Engineering** opportunities. His focus is integrating AI solutions, building secure backend systems, and deploying scalable software in complex client environments.`,
  contact: `You can reach **Deep Chaudhari** at [deepsc0606@gmail.com](mailto:deepsc0606@gmail.com) or [+91 7738266248](tel:+917738266248). He is based in Mumbai, Maharashtra, India. Use the [Contact](/ADPS_resume/contact) page to send an inquiry.`
};
var OUT_OF_SCOPE_REPLY = `I can only answer questions about **Deep Chaudhari's resume, experience, skills, certifications, projects, career requirements, contact details, and this website's navigation**. Try asking about one of those topics.`;
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9.#+\s-]/g, " ").replace(/\s+/g, " ").trim();
}
function tokens(text) {
  return new Set(normalize(text).split(" ").filter((token) => token && !STOP_WORDS.has(token)));
}
function scoreIntent(query, intent) {
  const normalized = normalize(query);
  const queryTokens = tokens(query);
  const phraseScore = intent.phrases.reduce((score, phrase) => score + (normalized.includes(phrase) ? 3 : 0), 0);
  const keywordScore = intent.keywords.reduce((score, keyword) => {
    const keywordTokens = tokens(keyword);
    const matches = [...keywordTokens].filter((token) => queryTokens.has(token)).length;
    return score + (matches === keywordTokens.size ? 2 : 0);
  }, 0);
  return phraseScore + keywordScore;
}
function classifyIntent(query) {
  const ranked = INTENTS.map((intent) => ({ name: intent.name, score: scoreIntent(query, intent) })).sort((left, right) => right.score - left.score);
  return ranked[0]?.score > 0 ? ranked[0].name : "out_of_scope";
}
function findNavigationTarget(query) {
  const normalized = normalize(query);
  return NAVIGATION_TARGETS.find((target) => target.names.some((name) => normalized.includes(name)));
}
function answerResumeQuestion(query) {
  const intent = classifyIntent(query);
  if (intent === "navigation") {
    const target = findNavigationTarget(query);
    return target ? `Opening the [${target.label}](${target.path}) page.` : `Use the navigation bar to open [Experience](${ROUTES.experience}), [Certifications](${ROUTES.certifications}), [Projects](${ROUTES.projects}), or [Contact](${ROUTES.contact}).`;
  }
  return ANSWERS[intent] || OUT_OF_SCOPE_REPLY;
}

// server.js
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
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Valid message string is required." });
      }
      const cleanUserMessage = sanitizeInput(message).slice(0, 1500);
      if (!cleanUserMessage) {
        return res.status(400).json({ error: "Message contains invalid characters." });
      }
      res.json({
        reply: answerResumeQuestion(cleanUserMessage),
        model: "local-resume-nlp",
        isFallback: true,
        scope: "resume-and-navigation"
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

# 🚀 Deep Chaudhari — Interactive 3D Portfolio & Forward Deployment Engineering Hub

A high-performance, modern full-stack web application showcasing **Deep Sandeep Chaudhari's** software engineering profile, Assistant C.T.O. leadership experience at SpiroEdu (SAKEC TBI), 9 verified industry certifications, interactive 3D skill visualizers, and an AI-powered Copilot assistant.

Built with **React 19**, **Express.js**, **Vite**, **Tailwind CSS**, and pure **JavaScript (ES6+ / JSX)**.

---

## 🌟 Highlights & Features

- **Interactive 3D Elements**:
  - **Fibonacci 3D Skill Sphere**: Orbital canvas node sphere with real-time mouse inertia and rotation physics.
  - **Live 3D Terminal Emulator**: Real-time terminal with command streaming presets for system status, credential verification, and CTO architecture inspection.
  - **Interactive 3D Flip Cards**: 3D perspective cards with 180-degree flip animations and instant verification hash copy features.
  - **Holographic Tilt Cards**: Dynamic mouse-tracking 3D tilt with real-time radial light glares.
- **AI-Powered Engineering Copilot**:
  - Full-stack Google Gemini integration (`gemini-3.7-flash` / `gemini-3.6-flash`) with intelligent fallback contextual knowledge base.
- **Ethical Engineering & Security Layer**:
  - Sliding-window in-memory rate limiting.
  - RFC 5322 regex validation and XSS input sanitization.
  - Anti-spam honeypot traps.
  - HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`).
- **Full-Stack Nodemailer Dispatch**:
  - Direct message transmission with automated email formatting and development preview link support.

---

## 📋 Prerequisites

Before running the application locally, ensure you have the following installed on your system:

- **Node.js**: `v18.0.0` or higher (Node.js `v20.x` or `v22.x` recommended)
  - Download from: [https://nodejs.org/](https://nodejs.org/)
  - Verify installation: `node -v`
- **npm**: `v9.0.0` or higher (comes bundled with Node.js)
  - Verify installation: `npm -v`

---

## 🛠️ Step-by-Step Local Setup Guide

Follow these steps to run the application locally on your machine after extracting/downloading the ZIP file:

### 1. Extract the ZIP Archive
Extract the downloaded ZIP file into your desired directory, and open your terminal or command prompt inside the extracted project directory:

```bash
cd deep-chaudhari-portfolio
```

### 2. Install Project Dependencies
Install all required packages from `package.json`:

```bash
npm install
```

*(Optional: If you use Bun or Yarn, you can alternatively run `bun install` or `yarn install`)*.

---

### 3. Configure Environment Variables
The repository includes a `.env.example` file with configuration templates. Create a `.env` file in the root folder:

#### On macOS / Linux:
```bash
cp .env.example .env
```

#### On Windows (Command Prompt):
```cmd
copy .env.example .env
```

#### On Windows (PowerShell):
```powershell
Copy-Item .env.example .env
```

#### Edit your `.env` file:
Open `.env` in any code editor (e.g. VS Code, Notepad) and configure your API keys (all optional with built-in fallbacks):

```env
# Server Port (Default is 3000)
PORT=3000

# Google Gemini API Key (Optional - enables live AI Assistant)
# Get a free key at https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

# Contact Email Recipient
RECIPIENT_EMAIL=deepsc0606@gmail.com

# SMTP Nodemailer Credentials (Defaults to Ethereal test inbox)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=tressie99@ethereal.email
EMAIL_PASS=CNMRXDmKaBTQPAN3QX
```

> **Note**: Even without a `GEMINI_API_KEY`, the built-in intelligent fallback engine will answer all queries about Deep's background, certifications, and technical stack!

---

### 4. Start the Development Server
Launch the full-stack development server:

```bash
npm run dev
```

The terminal will confirm:
```
[Deep Chaudhari Secure Server] Running at http://0.0.0.0:3000
```

---

### 5. Open the Application in your Browser
Open your web browser and navigate to:

👉 **[http://localhost:3000](http://localhost:3000)**

You can now freely navigate all pages, interact with the 3D components, test the AI Copilot, and inspect all 9 verified certifications!

---

## 🏗️ Production Build & Deployment

To build and run the optimized production bundle locally:

```bash
# 1. Build the production client assets and bundle server.js
npm run build

# 2. Launch the production server
npm start
```

---

## 📁 Project Architecture & Structure

```
├── .env.example                 # Environment variables specification
├── index.html                   # HTML5 entry with Google Fonts & metadata
├── package.json                 # Project dependencies & scripts
├── README.md                    # Local setup instructions (This file)
├── server.js                    # Express backend + Gemini AI + Nodemailer + Security
├── vite.config.js               # Vite bundler configuration
│
└── src/
    ├── App.jsx                  # Main router and layout orchestrator
    ├── index.css                # Tailwind CSS + 3D utilities & animations
    ├── main.jsx                 # React root renderer
    │
    ├── components/
    │   ├── CertificateDetailModal.jsx # Deep-dive cryptographic verification modal
    │   ├── CertificateFlipCard3D.jsx  # 3D interactive flip cards with verification codes
    │   ├── Chatbot.jsx                # AI Copilot assistant with Gemini integration
    │   ├── CommandPalette.jsx         # Spotlight Cmd+K global search & action navigator
    │   ├── Footer.jsx                 # Site footer with contacts & academic details
    │   ├── GitActivityMatrix.jsx      # Live engineering telemetry & commit heatmap
    │   ├── InteractiveTimeline.jsx    # Interactive vertical timeline with motion animations
    │   ├── Live3DTerminal.jsx         # 3D command execution emulator
    │   ├── Navbar.jsx                 # Sticky responsive navigation bar with sound & search
    │   ├── ProjectDetailModal.jsx     # Production architecture & pipeline inspector modal
    │   ├── ResumeModal.jsx            # Printable executive CV & credentials viewer
    │   ├── TechSphere3D.jsx           # 3D Fibonacci orbital skills canvas
    │   └── TiltCard3D.jsx             # Mouse-tracking 3D tilt component with glare
    │
    ├── utils/
    │   └── soundEffects.js            # Web Audio API procedural audio synthesis
    │
    ├── data/
    │   └── deepResumeData.js          # Comprehensive profile, certifications & project data
    │
    ├── lib/
    │   └── firebase.js          # Firebase client configuration
    │
    └── pages/
        ├── Certifications.jsx   # 9 verified credentials with search & filters
        ├── Contact.jsx          # Secure inquiry portal with rate limiting & anti-spam
        ├── Experience.jsx       # Assistant C.T.O. SpiroEdu breakdown & academics
        ├── Home.jsx             # Hero, 3D interactive matrix & featured sections
        └── Projects.jsx         # Systems & Forward Deployment case studies
```

---

## 💻 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Express backend and Vite in development mode on port 3000 |
| `npm run build` | Builds optimized frontend to `/dist` and bundles server for production |
| `npm start` | Runs the compiled production server |
| `npm run clean` | Cleans up `/dist` build outputs |

---

## 📬 Contact & Inquiries

**Deep Sandeep Chaudhari**  
- 📧 **Email**: [deepsc0606@gmail.com](mailto:deepsc0606@gmail.com)  
- 📱 **Mobile**: [+91 7738266248](tel:+917738266248)  
- 📍 **Location**: Mumbai, Maharashtra, India  
- 🎓 **Education**: B.Tech Computer Engineering (2024-2028), SAKEC Mumbai

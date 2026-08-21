const ROUTES = {
  home: '',
  experience: 'experience',
  certifications: 'certifications',
  projects: 'projects',
  contact: 'contact',
};

const STOP_WORDS = new Set([
  'a', 'about', 'and', 'are', 'can', 'could', 'deep', 'do', 'for', 'give',
  'he', 'his', 'i', 'is', 'me', 'my', 'of', 'please', 'tell', 'the', 'what',
  'where', 'who', 'with', 'you', 'your',
]);

const INTENTS = [
  {
    name: 'navigation',
    phrases: ['navigate', 'go to', 'open', 'show me the', 'take me to', 'page', 'section', 'website'],
    keywords: ['home', 'experience', 'certification', 'project', 'contact', 'resume', 'cv'],
  },
  {
    name: 'contact',
    phrases: ['contact', 'get in touch', 'reach', 'hire', 'email', 'phone', 'available'],
    keywords: ['opportunity', 'recruiter', 'location'],
  },
  {
    name: 'experience',
    phrases: ['work experience', 'professional experience', 'assistant cto', 'assistant c.t.o', 'worked at'],
    keywords: ['experience', 'spiroedu', 'leadership', 'responsibilities', 'employment'],
  },
  {
    name: 'certifications',
    phrases: ['certifications', 'certificates', 'credentials', 'verification'],
    keywords: ['walmart', 'coursera', 'infosys', 'iim', 'iit', 'simplilearn', 'blockchain', 'cryptography'],
  },
  {
    name: 'projects',
    phrases: ['projects', 'built', 'portfolio work', 'what has he made'],
    keywords: ['project', 'platform', 'pipeline', 'ledger', 'optimizer'],
  },
  {
    name: 'skills',
    phrases: ['technical skills', 'tech stack', 'technologies', 'programming languages'],
    keywords: ['skills', 'stack', 'react', 'node', 'express', 'mongodb', 'sql', 'javascript', 'typescript', 'java'],
  },
  {
    name: 'education',
    phrases: ['education', 'study', 'college', 'degree', 'university'],
    keywords: ['student', 'btech', 'engineering', 'sakec', 'mumbai'],
  },
  {
    name: 'objective',
    phrases: ['career objective', 'looking for', 'what role', 'requirements', 'job requirement'],
    keywords: ['role', 'career', 'forward deployment', 'full stack', 'opportunity'],
  },
];

const NAVIGATION_TARGETS = [
  { names: ['home', 'homepage'], path: ROUTES.home, label: 'Home' },
  { names: ['experience', 'work'], path: ROUTES.experience, label: 'Experience' },
  { names: ['certification', 'certifications', 'certificate'], path: ROUTES.certifications, label: 'Certifications' },
  { names: ['project', 'projects'], path: ROUTES.projects, label: 'Projects' },
  { names: ['contact', 'get in touch'], path: ROUTES.contact, label: 'Contact' },
  { names: ['resume', 'cv'], path: ROUTES.home, label: 'Resume' },
];

const ANSWERS = {
  experience: `**Deep Chaudhari** was **Assistant C.T.O. / Full Stack Engineering Lead** at **SpiroEdu Education Pvt Ltd**, incubated at SAKEC TBI, from **January 2025 to September 2025**.\n\nHe led React frontend work, authentication, REST APIs, MongoDB and SQL data flows, payment webhooks, responsive Figma implementation, and gamified user experiences.`,
  certifications: `Deep has **9 verified certifications**, including Walmart USA's Advanced Software Engineering simulation, two University of California Irvine credentials, two Infosys Springboard credentials, IIM Bangalore Foundations of French, an SPIRO internship certificate, Simplilearn Full-Stack Development 101, and IIT Bombay C Training.\n\nOpen the [Certifications](/ADPS_resume/certifications) page to inspect the verification details.`,
  projects: `Deep's featured work includes the **SpiroEdu Learning & Payment Engine**, a **Forward Deployment AI Agent & Search Pipeline**, a **Cryptographic Hash & Block Verification Engine**, and an **Enterprise Relational DB Optimizer & Munging Pipeline**.\n\nOpen the [Projects](/ADPS_resume/projects) page for the project details and technology lists.`,
  skills: `Deep's documented stack includes **React 19, TypeScript, JavaScript, Tailwind CSS, Node.js, Express.js, REST APIs, JWT authentication, SQL/PostgreSQL, MongoDB, Java, C, blockchain, cryptography, Google Gemini integration, Git, and GitHub**.`,
  education: `Deep is an undergraduate **B.Tech Computer Engineering** student at **Shah & Anchor Kutchhi Engineering College (SAKEC)** in Mumbai, with an expected study period of **2024 to 2028**.`,
  objective: `Deep is seeking **Forward Deployment Engineer** and **Full-Stack Software Engineering** opportunities. His focus is integrating AI solutions, building secure backend systems, and deploying scalable software in complex client environments.`,
  contact: `You can reach **Deep Chaudhari** at [deepsc0606@gmail.com](mailto:deepsc0606@gmail.com) or [+91 7738266248](tel:+917738266248). He is based in Mumbai, Maharashtra, India. Use the [Contact](/ADPS_resume/contact) page to send an inquiry.`,
};

const OUT_OF_SCOPE_REPLY = `I can only answer questions about **Deep Chaudhari's resume, experience, skills, certifications, projects, career requirements, contact details, and this website's navigation**. Try asking about one of those topics.`;

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.#+\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(text) {
  return new Set(normalize(text).split(' ').filter((token) => token && !STOP_WORDS.has(token)));
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
  const ranked = INTENTS
    .map((intent) => ({ name: intent.name, score: scoreIntent(query, intent) }))
    .sort((left, right) => right.score - left.score);
  return ranked[0]?.score > 0 ? ranked[0].name : 'out_of_scope';
}

function findNavigationTarget(query) {
  const normalized = normalize(query);
  return NAVIGATION_TARGETS.find((target) => target.names.some((name) => normalized.includes(name)));
}

function answerResumeQuestion(query) {
  const intent = classifyIntent(query);
  if (intent === 'navigation') {
    const target = findNavigationTarget(query);
    return target
      ? `Opening the [${target.label}](${target.path}) page.`
      : `Use the navigation bar to open [Experience](${ROUTES.experience}), [Certifications](${ROUTES.certifications}), [Projects](${ROUTES.projects}), or [Contact](${ROUTES.contact}).`;
  }
  return ANSWERS[intent] || OUT_OF_SCOPE_REPLY;
}

export { OUT_OF_SCOPE_REPLY, answerResumeQuestion, classifyIntent };
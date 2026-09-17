export interface BotAction {
  label: string;
  type: 'download_resume' | 'view_resume' | 'contact' | 'call' | 'projects' | 'link';
  url?: string;
}

export interface BotResponse {
  text: string;
  quickReplies?: string[];
  action?: BotAction;
  triggerDownload?: boolean;
}

interface KnowledgeItem {
  keywords: string[];
  matches: (q: string) => boolean;
  response: () => BotResponse;
}

const COMMON_QUICK_REPLIES = [
  '🎓 Education & CGPA',
  '💼 Featured Projects',
  '⚡ Tech Stack',
  '📄 Download Resume',
  '📞 How to Contact?',
];

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // 1. Resume / Download Resume
  {
    keywords: ['resume', 'cv', 'curriculum vitae', 'download resume', 'pdf', 'biodata'],
    matches: (q) => /resume|cv|curriculum\s*vitae|pdf|biodata|bio\s*data/i.test(q),
    response: () => ({
      text: 'Done',
      quickReplies: ['🎓 Education & CGPA', '💼 Featured Projects', '⚡ Tech Stack', '📞 How to Contact?'],
      triggerDownload: true,
    }),
  },

  // 2. Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'sup', 'yo', 'good morning', 'good evening'],
    matches: (q) => /^(hi|hello|hey|greetings|yo|sup|good\s*(morning|afternoon|evening))\b/i.test(q.trim()),
    response: () => ({
      text: "Hello! I'm Devil , Souvik's AI Assistant. Ask me anything ",
      quickReplies: COMMON_QUICK_REPLIES,
    }),
  },

  // 3. Education & CGPA
  {
    keywords: ['education', 'college', 'university', 'cgpa', 'marks', 'school', 'degree', 'sister nivedita', 'authpur', 'grades'],
    matches: (q) => /education|college|university|cgpa|marks|grades|degree|academics|study|studies|sister\s*nivedita|authpur|school/i.test(q),
    response: () => ({
      text: `• Sister Nivedita University: B.Tech CSE (2024–2028)
• Current CGPA: 8.84 / 10
• Class XII (ISC): 75.24%
• Class X (ICSE): 83.74%`,
      quickReplies: ['💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume', '📞 How to Contact?'],
    }),
  },

  // 4. Featured Projects
  {
    keywords: ['projects', 'featured projects', 'work', 'apps', 'valak', 'erp', 'currency', 'systems'],
    matches: (q) => /projects?|apps?|built|works?|valak|erp|currency|systems?|applications?/i.test(q),
    response: () => ({
      text: `• College ERP System (React, Spring Boot, Node.js, SQL)
• VALAK (AI Desktop Assistant with Electron.js & Ollama)
• Currency Converter (Responsive live exchange rates app)`,
      quickReplies: ['🎓 Education & CGPA', '⚡ Tech Stack', '📄 Download Resume', '📞 How to Contact?'],
    }),
  },

  // 5. Tech Stack & Skills
  {
    keywords: ['skills', 'tech stack', 'stack', 'technologies', 'programming', 'languages', 'react', 'java', 'python', 'node'],
    matches: (q) => /skills?|tech\s*stack|stack|technolog(y|ies)|programming|languages?|coding|tools|frameworks?|react|java|node/i.test(q),
    response: () => ({
      text: 'Java, JavaScript, C, React.js, Node.js, Spring Boot, SQL, Python, Electron.js, and Git.',
      quickReplies: ['🎓 Education & CGPA', '💼 Featured Projects', '📄 Download Resume', '📞 How to Contact?'],
    }),
  },

  // 6. Contact
  {
    keywords: ['contact', 'how to contact', 'email', 'phone', 'hire', 'call', 'location', 'reach'],
    matches: (q) => /contact|how\s*to\s*contact|email|phone|call|hire|reach|mobile|number|address|location/i.test(q),
    response: () => ({
      text: `• Email: souvikk075@gmail.com
• Phone: +91 9831906881
• Location: Shyamnagar, West Bengal, India`,
      quickReplies: ['🎓 Education & CGPA', '💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume'],
    }),
  },

  // 7. Who is Souvik / About
  {
    keywords: ['who are you', 'who is souvik', 'about', 'bio', 'summary'],
    matches: (q) => /who\s*(is|are)|about\s*(souvik|him)|introduce|summary|tell\s*me\s*about/i.test(q),
    response: () => ({
      text: 'Souvik Kundu is a CS student at Sister Nivedita University (CGPA 8.84) building full-stack web and desktop AI applications.',
      quickReplies: ['🎓 Education & CGPA', '💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume'],
    }),
  },

  // 8. VALAK
  {
    keywords: ['valak', 'desktop assistant', 'ollama'],
    matches: (q) => /valak|desktop\s*assistant|ollama/i.test(q),
    response: () => ({
      text: 'VALAK is a cross-platform desktop AI assistant using Electron.js, Node.js, and offline Ollama LLMs with voice automation.',
      quickReplies: ['💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume'],
    }),
  },

  // 9. Certifications
  {
    keywords: ['certifications', 'certificates', 'courses'],
    matches: (q) => /certificat(ion|ions|e|es)|courses?/i.test(q),
    response: () => ({
      text: `• Java Multi-Threading Mastery
• Supermarket App OOPs in Java
• Advanced Software Engineering Job Simulation`,
      quickReplies: ['🎓 Education & CGPA', '⚡ Tech Stack', '📄 Download Resume'],
    }),
  },

  // 10. Internship / Experience
  {
    keywords: ['internship', 'experience', 'agragami'],
    matches: (q) => /internship|experience|agragami/i.test(q),
    response: () => ({
      text: '6-month software internship at Agragami Technologies (real-time location trackers), plus College ERP System and VALAK AI.',
      quickReplies: ['💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume'],
    }),
  },

  // 11. Languages spoken
  {
    keywords: ['languages spoken', 'bengali', 'hindi', 'english'],
    matches: (q) => /languages?\s*(spoken|fluent|know)|bengali|hindi|speak/i.test(q),
    response: () => ({
      text: 'English (Professional), Bengali (Native), Hindi (Fluent).',
      quickReplies: ['🎓 Education & CGPA', '⚡ Tech Stack', '📄 Download Resume'],
    }),
  },
];

export function getBotAnswer(query: string): BotResponse {
  const cleanQuery = query.toLowerCase().trim();

  // 1. Direct match with knowledge base items
  for (const item of KNOWLEDGE_BASE) {
    if (item.matches(cleanQuery)) {
      return item.response();
    }
  }

  // 2. Keyword score matching
  let bestItem: KnowledgeItem | null = null;
  let maxScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (cleanQuery.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestItem = item;
    }
  }

  if (bestItem && maxScore > 2) {
    return bestItem.response();
  }

  // 3. Fallback: Short & simple
  return {
    text: "I can help with Souvik's education, projects, technical skills, contact info, or resume download.",
    quickReplies: COMMON_QUICK_REPLIES,
  };
}

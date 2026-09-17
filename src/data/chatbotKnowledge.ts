export interface BotAction {
  label: string;
  type: 'download_resume' | 'view_resume' | 'contact' | 'call' | 'projects' | 'link';
  url?: string;
}

export interface BotResponse {
  text: string;
  quickReplies?: string[];
  action?: BotAction;
}

interface KnowledgeItem {
  keywords: string[];
  matches: (q: string) => boolean;
  response: () => BotResponse;
}

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // 1. Resume / CV questions
  {
    keywords: ['resume', 'cv', 'curriculum vitae', 'download resume', 'pdf', 'bio-data'],
    matches: (q) => /resume|cv|curriculum\s*vitae|pdf|biodata|bio\s*data/i.test(q),
    response: () => ({
      text: "Souvik's official resume is available for direct download and interactive viewing! It includes his B.Tech CSE coursework (CGPA 8.84), practical systems like the College ERP and VALAK AI Desktop Assistant, technical skills, and certifications.",
      quickReplies: ['View Resume Online', 'What is his CGPA?', 'Key Projects', 'Contact Info'],
      action: {
        label: 'Download Resume (PDF · 891 KB)',
        type: 'download_resume',
        url: '/Souvik_Kundu_Resume.pdf',
      },
    }),
  },

  // 2. Who is Souvik / Summary / Bio
  {
    keywords: ['who are you', 'who is souvik', 'about', 'bio', 'introduce', 'summary', 'background', 'profile'],
    matches: (q) => /who\s*(is|are)|about\s*(souvik|him|you)|introduce|summary|tell\s*me\s*about|background|profile/i.test(q),
    response: () => ({
      text: "Souvik Kundu is a passionate Computer Science & Engineering student at Sister Nivedita University with a stellar 8.84/10 CGPA. He specializes in full-stack web development, desktop applications, and AI-assisted software engineering using React, Node.js, Spring Boot, Electron.js, and Ollama.",
      quickReplies: ['What are his top skills?', 'His Education', 'Featured Projects', 'Download Resume'],
      action: {
        label: 'View Interactive Resume',
        type: 'view_resume',
      },
    }),
  },

  // 3. Education / College / Academics / CGPA
  {
    keywords: ['education', 'college', 'university', 'cgpa', 'marks', 'school', 'degree', 'sister nivedita', 'authpur', 'grades'],
    matches: (q) => /education|college|university|cgpa|marks|grades|degree|academics|study|studies|sister\s*nivedita|authpur|school/i.test(q),
    response: () => ({
      text: `Here is Souvik's academic background:
• **Undergraduate Degree**: B.Tech in Computer Science Engineering (5th Sem) at **Sister Nivedita University**, Kolkata (2024–2028).
• **Current CGPA**: **8.84 / 10.0** (Top tier academic standing).
• **Higher Secondary (Class XII)**: Authpur National Model Higher Secondary School (ISC 2023) — **75.24%**.
• **Secondary (Class X)**: Authpur National Model (ICSE 2021) — **83.74%**.`,
      quickReplies: ['Technical Skills', 'Core CS Subjects', 'Featured Projects', 'Download Resume'],
      action: {
        label: 'Inspect Academics on Resume',
        type: 'view_resume',
      },
    }),
  },

  // 4. Projects & Practical Systems
  {
    keywords: ['projects', 'work', 'apps', 'systems', 'portfolio', 'built', 'valak', 'erp', 'currency', 'agragami'],
    matches: (q) => /projects?|apps?|built|works?|valak|erp|currency|systems?|applications?/i.test(q),
    response: () => ({
      text: `Souvik has engineered several standout applications:
1. **VALAK — AI Desktop Assistant**: Cross-platform AI assistant using Electron.js, Node.js, and offline Ollama LLMs with hands-free voice automation.
2. **College ERP System**: Comprehensive university management suite built with React, Spring Boot, Node.js, and SQL for student records and schedules.
3. **Currency Converter**: Real-time responsive currency exchange web app with live financial APIs.
4. **Agragami Technologies Internship**: 6-month term developing real-time location tracker systems with WebSocket live streams.`,
      quickReplies: ['Tell me more about VALAK', 'What tech stack was used?', 'See GitHub', 'Download Resume'],
      action: {
        label: 'Explore Projects Section',
        type: 'projects',
      },
    }),
  },

  // 5. VALAK AI Desktop Assistant specific
  {
    keywords: ['valak', 'desktop assistant', 'ollama', 'electron', 'ai assistant'],
    matches: (q) => /valak|desktop\s*assistant|ollama|voice\s*assistant|local\s*llm/i.test(q),
    response: () => ({
      text: "**VALAK** is Souvik's flagship desktop AI assistant built using Electron.js, Node.js, and Ollama. It enables privacy-first local LLM inference without sending private data to cloud servers, and features voice interaction and desktop automation.",
      quickReplies: ['Other Projects', 'His AI Skills', 'Download Resume', 'Contact Souvik'],
    }),
  },

  // 6. Skills & Technical Stack
  {
    keywords: ['skills', 'stack', 'technologies', 'programming', 'languages', 'react', 'java', 'python', 'node', 'tools'],
    matches: (q) => /skills?|stack|technolog(y|ies)|programming|languages?|coding|tools|frameworks?|react|java|node/i.test(q),
    response: () => ({
      text: `Souvik's technical competencies include:
• **Languages**: Java, C, JavaScript, Python (Basic), SQL
• **Frontend**: React.js, HTML5, CSS3, Tailwind CSS, Framer Motion
• **Backend & APIs**: Node.js, Express, Spring Boot, REST APIs
• **Databases**: MySQL, PostgreSQL
• **Desktop & AI**: Electron.js, Ollama (Local LLMs), AI Workflow Automation
• **Tools**: Git, GitHub, VS Code, Canva
• **Core CS**: DBMS, OS, Computer Organization, TOC, Numerical Methods`,
      quickReplies: ['His Experience', 'Certifications', 'Languages Spoken', 'Contact Him'],
      action: {
        label: 'View Verified Resume',
        type: 'view_resume',
      },
    }),
  },

  // 7. Certifications
  {
    keywords: ['certifications', 'certificates', 'courses', 'licenses', 'credentials'],
    matches: (q) => /certificat(ion|ions|e|es)|courses?|credentials?/i.test(q),
    response: () => ({
      text: `Souvik holds the following verified certifications:
• **Java Multi-Threading Mastery**: From Basics To Advance
• **Supermarket App using OOPs Features in Java**
• **Java Classes and Objects**
• **Advanced Software Engineering Job Simulation**`,
      quickReplies: ['His Education', 'His Skills', 'Download Resume'],
      action: {
        label: 'View Certifications in Resume',
        type: 'view_resume',
      },
    }),
  },

  // 8. Contact / Hire / Phone / Email / Location
  {
    keywords: ['contact', 'email', 'phone', 'hire', 'call', 'location', 'where', 'address', 'shyamnagar', 'reach'],
    matches: (q) => /contact|email|phone|call|hire|reach|mobile|number|address|location|where\s*(is|are|live)/i.test(q),
    response: () => ({
      text: `You can reach Souvik directly:
• **Email**: souvikk075@gmail.com
• **Phone**: +91 9831906881
• **Location**: Shyamnagar, West Bengal, India
• **LinkedIn**: linkedin.com/in/souvikkundu0277593b1
• **GitHub**: github.com/Souvik7661
He is currently open to software engineering internships, freelance projects, and full-stack opportunities!`,
      quickReplies: ['Download Resume', 'Schedule a Call', 'Projects', 'Academic Record'],
      action: {
        label: 'Direct Call (+91 9831906881)',
        type: 'call',
        url: 'tel:9841906881',
      },
    }),
  },

  // 9. Languages spoken
  {
    keywords: ['languages spoken', 'bengali', 'hindi', 'english', 'fluency', 'speak'],
    matches: (q) => /languages?\s*(spoken|fluent|know)|bengali|hindi|speak|mother\s*tongue/i.test(q),
    response: () => ({
      text: "Souvik is multilingual and fluent in three languages:\n• **English**: Professional Working Proficiency\n• **Bengali**: Native Language\n• **Hindi**: Fluent",
      quickReplies: ['About Souvik', 'Education', 'Download Resume', 'Contact'],
    }),
  },

  // 10. Greetings & Small Talk
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'sup', 'yo', 'good morning', 'good evening'],
    matches: (q) => /^(hi|hello|hey|greetings|yo|sup|good\s*(morning|afternoon|evening))\b/i.test(q.trim()),
    response: () => ({
      text: "Hello! I'm Devil  Souvik's AI  Assistant. I have full access to his resume, academic records, software projects, and technical stack. What would you like to explore?",
      quickReplies: ['Tell me about Souvik', 'View His Resume', 'Projects & Systems', 'How to Hire Him'],
    }),
  },

  // 11. Internship / Experience
  {
    keywords: ['internship', 'experience', 'work experience', 'agragami', 'job'],
    matches: (q) => /internship|experience|job|employment|agragami/i.test(q),
    response: () => ({
      text: `Souvik's practical engineering experience includes:
• **College ERP System** (Jun 2026 – Present): Developing student portal, secure authentication, and administrative modules with React, Node.js, and Spring Boot.
• **Agragami Technologies**: Completed a 6-month software internship delivering real-time location tracker functionality, WebSocket streams, and responsive web features.
• **VALAK AI Desktop Assistant**: Jan 2026 – Present, active personal development on local LLM voice automation.`,
      quickReplies: ['What is his CGPA?', 'Download Resume', 'Contact Souvik'],
      action: {
        label: 'View Experience on Resume',
        type: 'view_resume',
      },
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

  // 3. Fallback with helpful guidance
  return {
    text: "I can answer anything regarding Souvik's software projects, academic performance (CGPA 8.84 at Sister Nivedita University), full-stack skill set, certifications, or provide his official resume. What would you like to check?",
    quickReplies: [
      'Who is Souvik?',
      'Download Resume',
      'What are his projects?',
      'How can I contact him?',
    ],
    action: {
      label: 'Download Resume PDF',
      type: 'download_resume',
      url: '/Souvik_Kundu_Resume.pdf',
    },
  };
}

import { BotResponse, BotAction, getBotAnswer } from '../data/chatbotKnowledge';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `You are Devil, the personal AI assistant for Souvik Kundu, embedded on his official portfolio website.
Your mission is to represent Souvik with supreme accuracy, intelligence, polish, and enthusiasm.

── COMPREHENSIVE KNOWLEDGE ABOUT SOUVIK KUNDU ──
• Full Name: Souvik Kundu
• Location: Shyamnagar, West Bengal, India
• Current Status: B.Tech Student in Computer Science & Engineering (CSE), Sister Nivedita University, Kolkata (2024–2028, currently 5th semester).
• Academic Performance: Current CGPA of 8.84 / 10.0. Strong grasp of Data Structures, Algorithms, DBMS, Operating Systems, Computer Organization, and Software Engineering.
• Prior Schooling: Authpur National Model Higher Secondary School (ISC Class XII: 75.24% in 2023; ICSE Class X: 83.74% in 2021).
• Contact Info:
  - Email: souvikk075@gmail.com
  - Phone: +91 9831906881
  - GitHub: https://github.com/Souvik7661
  - LinkedIn: https://www.linkedin.com/in/souvikkundu0277592b3/
  - Portfolio URL: https://portfolio-five-dun-wraecj36w1.vercel.app/
• Primary Technical Stack:
  - Languages: Java, JavaScript (ES6+), TypeScript, C, Python, SQL, HTML5, CSS3
  - Frontend: React.js, Next.js, Framer Motion, Tailwind CSS, Responsive Design, Web Accessibility
  - Backend: Node.js, Express.js, Java Spring Boot, RESTful APIs, WebSockets
  - Desktop & AI: Electron.js, Ollama local offline LLMs, Gemini AI API integration, AI automation
  - Databases: PostgreSQL, MySQL, MongoDB, SQLite
  - Tools: Git, GitHub, Postman, Vite, Linux CLI, Vercel
• Work & Practical Experience:
  - Agragami Technologies (Software Development Intern — 6 Months): Built real-time location tracker integration, high-frequency WebSocket data streaming, on-time client feature delivery.
  - Freelance / Independent Developer: Full-stack applications, interactive UI components, desktop tools.
• Featured Projects:
  1. College ERP System: Full-stack student portal with role authorization, high-performance database queries, REST APIs, built with React, Spring Boot, Node.js, and SQL.
  2. VALAK AI Desktop Assistant: Cross-platform desktop assistant using Electron.js, Node.js, and offline Ollama LLMs with voice UI and system automation.
  3. Currency Converter: Live financial app integrating real-time exchange rate APIs with interactive rate charts and state handling.
  4. Rock Paper Scissors Game: Interactive web game with streak tracking and smooth DOM animation.
  5. Personal Portfolio: Interactive showcase built with Framer Motion, 3D tilt, real-time Kolkata clock, and Devil AI Chatbot.
• Certifications:
  - Java Multi-Threading Mastery
  - Supermarket App OOPs in Java
  - Advanced Software Engineering Job Simulation (Forage)
• Spoken Languages:
  - English (Professional Working Proficiency)
  - Bengali (Native / First Language)
  - Hindi (Fluent)
• Availability & Aspirations:
  - Open for Software Engineering Internships, full-stack developer roles, freelance web/desktop projects, and open-source collaborations.

── CRITICAL INSTRUCTIONS & RESPONSE GUIDELINES ──
1. QUESTIONS ABOUT SOUVIK: Answer accurately, concisely, and warmly based on his verified background above.
2. UNKNOWN OR TANGENTIAL QUESTIONS: If the user asks about an unknown topic (e.g., a technology not listed like Docker, AWS, Go, Rust, microservices, hobbies, hypothetical scenarios, or industry trends), NEVER say "I don't know" or refuse. Instead, use relevant topics from his background (such as his solid CS foundation, 8.84 CGPA, multi-threading mastery, full-stack architectures, practical internship experience at Agragami, and passion for rapid self-learning) to give an intelligent, insightful answer connecting back to his capabilities.
3. CONCISENESS & FORMAT: Keep responses concise and scannable for a chat card (typically 2 to 4 sentences or clean bullet points). Use **bold highlights** for key terms, project names, and metrics.
4. IDENTITY: You are "Devil", Souvik's AI assistant. Maintain a sharp, confident, courteous, and tech-savvy tone.`;

interface ChatHistoryItem {
  sender: 'bot' | 'user';
  text: string;
}

export async function askDevilAI(
  userQuery: string,
  history: ChatHistoryItem[] = []
): Promise<BotResponse> {
  const cleanQuery = userQuery.trim();
  if (!cleanQuery) {
    return {
      text: "How can I assist you with Souvik's portfolio or background today?",
      quickReplies: ['🎓 Education & CGPA', '💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume'],
    };
  }

  // 1. Direct local short-circuit for explicit resume download
  const isDirectResumeDownload =
    /^(download\s*resume|get\s*resume|save\s*resume|download\s*cv)$/i.test(cleanQuery);
  if (isDirectResumeDownload) {
    return {
      text: "Here is Souvik's official curriculum vitae detailing his academic record (CGPA 8.84), full-stack projects, and internship experience. Downloading now!",
      action: {
        type: 'download_resume',
        label: 'Download Resume (PDF)',
      },
      triggerDownload: true,
      quickReplies: ['💼 Featured Projects', '⚡ Tech Stack', '📞 How to Contact?'],
    };
  }

  // 2. Prepare Gemini API Request
  try {
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Include recent history (last 6 turns for optimal context & speed)
    const recentHistory = history.slice(-6);
    for (const h of recentHistory) {
      contents.push({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      });
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: cleanQuery }],
    });

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350,
          topP: 0.9,
        },
      }),
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawText && typeof rawText === 'string') {
        const text = rawText.trim();
        return parseActionsAndQuickReplies(cleanQuery, text);
      }
    } else {
      console.warn('Gemini API returned status:', response.status);
    }
  } catch (err) {
    console.warn('Gemini API request failed or timed out, falling back to knowledge base:', err);
  }

  // 3. Fallback to robust local knowledge base if offline or API limit reached
  return getBotAnswer(cleanQuery);
}

function parseActionsAndQuickReplies(query: string, replyText: string): BotResponse {
  const q = query.toLowerCase();
  const r = replyText.toLowerCase();

  let action: BotAction | undefined;
  let triggerDownload = false;

  // Resume intent
  if (q.includes('resume') || q.includes('cv') || r.includes('resume') || r.includes('curriculum vitae')) {
    action = {
      type: 'download_resume',
      label: 'Download Resume (PDF)',
    };
    if (q.includes('download') || q.includes('get') || q.includes('pdf')) {
      triggerDownload = true;
    }
  }
  // Contact intent
  else if (q.includes('contact') || q.includes('hire') || q.includes('call') || q.includes('reach') || q.includes('phone') || q.includes('email')) {
    action = {
      type: 'call',
      label: 'Call +91 9831906881',
      url: 'tel:+919831906881',
    };
  }
  // Projects intent
  else if (q.includes('project') || q.includes('valak') || q.includes('erp') || q.includes('apps') || q.includes('built')) {
    action = {
      type: 'projects',
      label: 'View Featured Projects',
    };
  }

  // Contextual quick replies based on topic
  let quickReplies = ['🎓 Education & CGPA', '💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume'];

  if (q.includes('education') || q.includes('college') || q.includes('cgpa')) {
    quickReplies = ['💼 Featured Projects', '⚡ Tech Stack', '📄 Download Resume', '📞 How to Contact?'];
  } else if (q.includes('project') || q.includes('valak') || q.includes('erp')) {
    quickReplies = ['⚡ Tech Stack', '📄 Download Resume', '📞 Hire Souvik', '🎓 Education & CGPA'];
  } else if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    quickReplies = ['💼 Featured Projects', '📄 Download Resume', '🏢 Internship Experience', '📞 How to Contact?'];
  } else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
    quickReplies = ['📄 Download Resume', '💼 Featured Projects', '⚡ Tech Stack', '🎓 Education & CGPA'];
  }

  return {
    text: replyText,
    action,
    triggerDownload,
    quickReplies,
  };
}

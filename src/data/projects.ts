export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  upcoming?: boolean;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'College ERP System',
    category: 'Full-Stack Application',
    description: 'A modern college management platform designed to manage students, academics, attendance, records, authentication, and administrative workflows with secure role-based controls.',
    technologies: ['Java', 'Spring Boot', 'React.js', 'MySQL/PostgreSQL', 'Hibernate', 'Spring Security'],
    image: '/images/project-erp.png',
    github: 'https://github.com/Souvik7661/college-erp-system',
    live: 'https://demo-erp.example.com',
  },
  {
    id: 2,
    title: 'Currency Converter Web Application',
    category: 'Web Tool',
    description: 'Real-time financial converter application utilizing currency exchange APIs, responsive rate charts, interactive pair calculation, and clean client-side state handling.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Currency API', 'REST APIs'],
    image: '/images/currency-converter.png',
    github: 'https://github.com/Souvik7661/Currency-Converter/tree/main/Currency_Cal',
    live: 'https://currency-converter-liart-theta.vercel.app/',
  },
  {
    id: 3,
    title: 'Rock Paper Scissors Game',
    category: 'Interactive Game',
    description: 'Web game implementation with custom win-streak tracking, smooth DOM rendering, responsive touch support, and clean game state logic.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Web APIs'],
    image: '/images/rock-paper-scissors.png',
    github: 'https://github.com/Souvik7661/Rock-Paper-Scissors-game',
    live: 'https://rock-paper-scissors-game-eight-topaz.vercel.app/',
  },
  {
    id: 4,
    title: 'Employee Onboarding Portal',
    category: 'Upcoming Project',
    description: 'Automated onboarding workflow software designed for streamlined doc verification and user role provisioning.',
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB'],
    image: '/images/project-erp.png',
    upcoming: true,
  },
  {
    id: 5,
    title: 'Search & Sort Visualizer',
    category: 'Upcoming Project',
    description: 'Interactive algorithm visualization tool illustrating sorting mechanics and graph traversal in real-time.',
    technologies: ['TypeScript', 'React.js', 'Algorithms'],
    image: '/images/rock-paper-scissors.png',
    upcoming: true,
  },
];

// Alias export for components expecting `projects`
export const projects = projectsData;

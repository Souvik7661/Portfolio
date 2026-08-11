export interface SkillCategory {
  category: 'Programming' | 'Web Development' | 'Tools' | 'AI' | 'Creative' | 'Core Subjects';
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Programming',
    skills: ['C', 'JavaScript', 'SQL'],
  },
  {
    category: 'Web Development',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'REST APIs', 'React.js (Learning)'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Node.js (Basic)', 'Electron.js (Basic)'],
  },
  {
    category: 'AI',
    skills: ['Ollama', 'AI Models', 'Prompt Engineering'],
  },
  {
    category: 'Creative',
    skills: ['Canva', 'Adobe Premiere'],
  },
  {
    category: 'Core Subjects',
    skills: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Organization',
      'Theory of Computation',
      'Numerical Methods',
    ],
  },
];

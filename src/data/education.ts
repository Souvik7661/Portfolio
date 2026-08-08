export interface EducationDetails {
  degree: string;
  field: string;
  university: string;
  cgpa: string;
  graduationYear: string;
  location: string;
}

export const educationInfo: EducationDetails = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science & Engineering (CSE)',
  university: 'Sister Nivedita University',
  cgpa: '8.84',
  graduationYear: '2028',
  location: 'Shyamnagar, West Bengal, India',
};

export interface BeyondItem {
  category: string;
  title: string;
  description: string;
  tags: string[];
}

export const beyondClassroomData: BeyondItem[] = [
  {
    category: 'Hackathons',
    title: 'Tata Technologies InnoVent-27',
    description: 'Participating in innovation hackathons focused on engineering problem solving and modern tech applications.',
    tags: ['Hackathon', 'Innovation', 'Problem Solving'],
  },
  {
    category: 'Communities',
    title: 'Oracle Kolkata Community',
    description: 'Engaging with regional tech communities, developer sessions, and database engineering discussions.',
    tags: ['Developer Community', 'Networking', 'Oracle'],
  },
  {
    category: 'Academic Core',
    title: 'Computer Science Foundations',
    description: 'Mastering algorithmic efficiency, system design concepts, and theoretical computation models.',
    tags: ['DSA', 'DBMS', 'Operating Systems', 'TOC', 'Numerical Methods'],
  },
  {
    category: 'Creative Work',
    title: 'Digital Media & Visual Design',
    description: 'Designing visual collateral, brand graphics, and editing video media with precision and clarity.',
    tags: ['Canva', 'Adobe Premiere', 'UI/UX'],
  },
];

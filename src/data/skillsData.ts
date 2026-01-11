export interface Skill {
  name: string
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'AI/ML' | 'Tools' | 'Other'
  level: number // 0-100
  icon: string // Will use text-based icons
  color: string // Accent color for each skill
}

export const skillsData: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages', level: 90, icon: 'Py', color: '#3776AB' },
  { name: 'JavaScript', category: 'Languages', level: 85, icon: 'JS', color: '#F7DF1E' },
  { name: 'TypeScript', category: 'Languages', level: 85, icon: 'TS', color: '#3178C6' },
  { name: 'Java', category: 'Languages', level: 75, icon: 'Jv', color: '#007396' },
  { name: 'C', category: 'Languages', level: 70, icon: 'C', color: '#A8B9CC' },
  { name: 'PHP', category: 'Languages', level: 65, icon: 'Php', color: '#777BB4' },

  // Frontend
  { name: 'React', category: 'Frontend', level: 90, icon: '⚛', color: '#61DAFB' },
  { name: 'Angular', category: 'Frontend', level: 80, icon: 'Ng', color: '#DD0031' },
  { name: 'HTML/CSS', category: 'Frontend', level: 95, icon: '<>', color: '#E34F26' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 85, icon: 'Tw', color: '#06B6D4' },

  // Backend
  { name: 'Node.js', category: 'Backend', level: 85, icon: 'Nd', color: '#339933' },
  { name: 'FastAPI', category: 'Backend', level: 85, icon: 'FA', color: '#009688' },
  { name: 'Express', category: 'Backend', level: 80, icon: 'Ex', color: '#000000' },
  { name: 'Spring Boot', category: 'Backend', level: 70, icon: 'Sp', color: '#6DB33F' },

  // Database
  { name: 'MongoDB', category: 'Database', level: 85, icon: 'Mg', color: '#47A248' },
  { name: 'MySQL', category: 'Database', level: 85, icon: 'Sq', color: '#4479A1' },
  { name: 'Firebase', category: 'Database', level: 80, icon: 'Fb', color: '#FFCA28' },
  { name: 'PostgreSQL', category: 'Database', level: 70, icon: 'Pg', color: '#336791' },

  // AI/ML
  { name: 'LangChain', category: 'AI/ML', level: 90, icon: '🔗', color: '#FF0000' },
  { name: 'LLMs', category: 'AI/ML', level: 85, icon: '🤖', color: '#FF0000' },
  { name: 'HuggingFace', category: 'AI/ML', level: 80, icon: '🤗', color: '#FFD21E' },
  { name: 'RAG Models', category: 'AI/ML', level: 85, icon: '📚', color: '#FF0000' },
  { name: 'AI Agents', category: 'AI/ML', level: 80, icon: '🎯', color: '#FF0000' },
  { name: 'OpenAI API', category: 'AI/ML', level: 85, icon: 'Ai', color: '#10A37F' },

  // Tools
  { name: 'Git', category: 'Tools', level: 90, icon: 'Git', color: '#F05032' },
  { name: 'VS Code', category: 'Tools', level: 95, icon: 'VS', color: '#007ACC' },
  { name: 'Postman', category: 'Tools', level: 85, icon: 'Pm', color: '#FF6C37' },
  { name: 'Docker', category: 'Tools', level: 75, icon: 'Dk', color: '#2496ED' },
  { name: 'Figma', category: 'Tools', level: 70, icon: 'Fg', color: '#F24E1E' },

  // Other
  { name: 'REST APIs', category: 'Other', level: 90, icon: 'Api', color: '#FF0000' },
  { name: 'Agile/Scrum', category: 'Other', level: 80, icon: '🔄', color: '#FF0000' },
  { name: 'CI/CD', category: 'Other', level: 70, icon: '⚙️', color: '#FF0000' },
]

export const skillCategories = [
  'All Skills',
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'AI/ML',
  'Tools',
  'Other'
] as const

export type SkillCategory = typeof skillCategories[number]

export interface Experience {
  id: number
  role: string
  company: string
  location: string
  type: 'Full-time' | 'Freelance'
  startDate: string
  endDate: string | 'Present'
  description: string
  achievements: string[]
  highlights?: string[]
  technologies: string[]
  metrics?: {
    label: string
    value: string
  }[]
  color: string
}

export const experienceData: Experience[] = [
  {
    id: 1,
    role: 'Software Developer',
    company: 'UST',
    location: 'India',
    type: 'Full-time',
    startDate: 'Jan 2023',
    endDate: 'Present',
    description: 'Developing enterprise-scale applications and driving digital transformation for Fortune 500 clients.',
    achievements: [
      'Architected cloud-native microservices handling 2M+ daily transactions',
      'Reduced system latency by 65% through performance optimization',
      'Led team of 6 developers in delivering critical features ahead of schedule',
      'Implemented CI/CD pipeline reducing deployment time by 75%',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker', 'Kubernetes'],
    metrics: [
      { label: 'Projects', value: '15+' },
      { label: 'Team Size', value: '6' },
      { label: 'Code Quality', value: '98%' },
    ],
    color: '#667eea',
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    type: 'Freelance',
    startDate: 'Mar 2021',
    endDate: 'Present',
    description: 'Delivering custom web solutions and AI-powered applications for international clients.',
    achievements: [
      'Built 25+ production-ready applications for global clients',
      'Developed AI chatbot system with LangChain serving 10K+ users daily',
      'Created e-commerce platforms generating $500K+ in revenue',
      'Maintained 100% client satisfaction with 5-star ratings',
    ],
    technologies: ['React', 'Next.js', 'Python', 'LangChain', 'OpenAI', 'Firebase', 'Tailwind CSS'],
    metrics: [
      { label: 'Projects', value: '25+' },
      { label: 'Clients', value: '18' },
      { label: 'Rating', value: '5.0★' },
    ],
    color: '#f5576c',
  },
]

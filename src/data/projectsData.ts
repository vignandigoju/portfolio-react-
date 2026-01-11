export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  category: 'AI/ML' | 'Full Stack' | 'Mobile' | 'Enterprise'
  featured: boolean
  tags: string[]
  techStack: {
    frontend?: string[]
    backend?: string[]
    mobile?: string[]
    ai?: string[]
    database?: string[]
    other?: string[]
  }
  features: string[]
  highlights: {
    icon: string
    label: string
    value: string
  }[]
  links?: {
    github?: string
    demo?: string
    case?: string
  }
  status: 'Completed' | 'In Progress' | 'Client Project'
  year: string
}

export const projectsData: Project[] = [
  {
    id: 'pmdt',
    title: 'Project Management Assistant',
    subtitle: 'AI-Powered WBS & Sprint Planning',
    description: 'Enterprise AI tool that analyzes project documents and metadata to automatically generate comprehensive Work Breakdown Structures, user stories, epics, sprint plans, and Gantt charts. Streamlines project planning with intelligent document processing.',
    category: 'AI/ML',
    featured: true,
    tags: ['GenAI', 'Document Processing', 'Project Management', 'Automation'],
    techStack: {
      frontend: ['React', 'TypeScript'],
      backend: ['Python', 'FastAPI'],
      ai: ['LLM Integration', 'Document Parsing', 'NLP'],
      other: ['Gantt Chart Generation', 'Sprint Planning']
    },
    features: [
      'Automated WBS generation from project documents',
      'Intelligent user story and epic creation',
      'Smart sprint planning and timeline estimation',
      'Interactive Gantt chart visualization',
      'Multi-document metadata extraction'
    ],
    highlights: [
      { icon: 'automation', label: 'Time Saved', value: '70%' },
      { icon: 'accuracy', label: 'Accuracy', value: '90+%' },
      { icon: 'team', label: 'Team Size', value: '3-4' }
    ],
    status: 'Client Project',
    year: '2024'
  },
  {
    id: 'transcription-stories',
    title: 'AI Transcription to User Stories',
    subtitle: 'Video Meeting Intelligence',
    description: 'Innovative AI solution that converts video meeting recordings into accurate transcriptions and automatically generates structured user stories for agile development. Helps teams capture requirements directly from client conversations.',
    category: 'AI/ML',
    featured: true,
    tags: ['Video Processing', 'Transcription', 'GenAI', 'Agile'],
    techStack: {
      frontend: ['React'],
      backend: ['Python', 'FastAPI'],
      ai: ['Speech-to-Text', 'LLM', 'NLP', 'User Story Generation'],
      other: ['Video Processing']
    },
    features: [
      'Automated video transcription with high accuracy',
      'AI-powered user story extraction from conversations',
      'Structured requirement documentation',
      'Export to multiple formats (Jira, Excel, PDF)',
      'Speaker identification and timestamp tracking'
    ],
    highlights: [
      { icon: 'time', label: 'Processing', value: 'Real-time' },
      { icon: 'accuracy', label: 'Accuracy', value: '95%+' },
      { icon: 'team', label: 'Collaboration', value: 'Team Project' }
    ],
    status: 'Client Project',
    year: '2024'
  },
  {
    id: 'ai-chatbot',
    title: 'Intelligent RAG Chatbot',
    subtitle: 'Context-Aware AI Assistant',
    description: 'Advanced AI chatbot built with Retrieval-Augmented Generation (RAG) architecture. Integrates HuggingFace and Azure models to provide accurate, context-aware responses using custom knowledge bases.',
    category: 'AI/ML',
    featured: true,
    tags: ['RAG', 'LLM', 'Chatbot', 'Azure', 'HuggingFace'],
    techStack: {
      frontend: ['React', 'TypeScript'],
      backend: ['Python', 'FastAPI'],
      ai: ['RAG Architecture', 'HuggingFace Models', 'Azure OpenAI', 'Vector Database'],
      other: ['API Integration', 'WebSockets']
    },
    features: [
      'RAG-based contextual responses with custom data',
      'Multi-model support (HuggingFace + Azure)',
      'Real-time conversation with streaming responses',
      'Document upload and knowledge base creation',
      'Context-aware follow-up questions'
    ],
    highlights: [
      { icon: 'brain', label: 'Models', value: 'Multi-LLM' },
      { icon: 'speed', label: 'Response', value: '<2s' },
      { icon: 'star', label: 'Accuracy', value: '92%' }
    ],
    status: 'Completed',
    year: '2024'
  },
  {
    id: 'tailor-management',
    title: 'Tailor Shop Management System',
    subtitle: 'Full-Stack Booking & Tracking Platform',
    description: 'Comprehensive management system for tailor shops with appointment booking, measurement tracking, order management, and delivery scheduling. Features shop registration, customer management, and secure authentication.',
    category: 'Full Stack',
    featured: false,
    tags: ['Angular', 'Spring Boot', 'Security', 'Enterprise'],
    techStack: {
      frontend: ['Angular', 'TypeScript', 'Bootstrap'],
      backend: ['Java Spring Boot', 'Spring Security'],
      database: ['MySQL'],
      other: ['JWT Authentication', 'Role-based Access']
    },
    features: [
      'Customer appointment booking system',
      'Digital measurement recording and history',
      'Order tracking from booking to delivery',
      'Shop registration and multi-shop support',
      'Secure authentication with role-based access',
      'Manual delivery scheduling and notifications'
    ],
    highlights: [
      { icon: 'users', label: 'User Roles', value: '3+' },
      { icon: 'security', label: 'Security', value: 'Spring' },
      { icon: 'database', label: 'Database', value: 'MySQL' }
    ],
    status: 'Completed',
    year: '2024'
  },
  {
    id: 'survey-platform',
    title: 'Survey Management & Analytics',
    subtitle: 'Data Collection & Visualization Platform',
    description: 'Multi-platform survey management system with real-time analytics dashboard. Provides insights based on demographics including gender, education, age, location, and more. Built with both web and Android applications sharing a unified database.',
    category: 'Full Stack',
    featured: false,
    tags: ['Analytics', 'Dashboard', 'Mobile', 'Cross-Platform'],
    techStack: {
      frontend: ['HTML', 'CSS', 'JavaScript'],
      backend: ['PHP'],
      mobile: ['Android Studio', 'Java'],
      database: ['MySQL (Shared)'],
      other: ['Data Visualization', 'Charts']
    },
    features: [
      'Cross-platform data collection (Web + Android)',
      'Real-time analytics dashboard with visualizations',
      'Demographic-based filtering and insights',
      'Interactive charts for gender, age, education, location',
      'Unified database across platforms',
      'Export reports in multiple formats'
    ],
    highlights: [
      { icon: 'platforms', label: 'Platforms', value: 'Web + Android' },
      { icon: 'charts', label: 'Analytics', value: 'Real-time' },
      { icon: 'users', label: 'Data Points', value: 'Multi-dimensional' }
    ],
    status: 'Completed',
    year: '2023'
  }
]

// Category filters
export const projectCategories = [
  'All Projects',
  'AI/ML',
  'Full Stack',
  'Mobile',
  'Enterprise'
] as const

export type ProjectCategory = typeof projectCategories[number]

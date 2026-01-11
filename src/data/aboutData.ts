export interface AboutData {
  personal: {
    introduction: string
    tagline: string
    location: string
    company: string
  }
  
  stats: {
    experience: string
    education: string
    projects: string
    focus: string
  }
  
  values: {
    icon: string
    title: string
    description: string
  }[]
  
  currentFocus: {
    title: string
    items: string[]
  }
  
  interests: {
    title: string
    items: string[]
  }
}

export const aboutData: AboutData = {
  personal: {
    introduction: "Full-stack software developer with expertise in both backend and frontend development. I specialize in building scalable solutions with diverse tech stacks and databases. Currently focused on LLM integrations, AI agents, and automating complex workflows to solve real-world problems.",
    tagline: "Building intelligent solutions, one line of code at a time",
    location: "Hyderabad, Telangana",
    company: "UST"
  },

  stats: {
    experience: "2 Years",
    education: "B.E. in CSE",
    projects: "10+ Projects",
    focus: "LLM & AI Agents"
  },

  values: [
    {
      icon: "heart",
      title: "Empathy",
      description: "Understanding user needs and building solutions that truly matter to people"
    },
    {
      icon: "target",
      title: "Excellence",
      description: "Committed to delivering high-quality code and exceptional user experiences"
    },
    {
      icon: "rocket",
      title: "Innovation",
      description: "Constantly exploring new technologies and creative approaches to problem-solving"
    }
  ],

  currentFocus: {
    title: "Currently Working On",
    items: [
      "LLM integrations with modern web applications",
      "Building intelligent AI agents for automation",
      "Full-stack development with cutting-edge tech stacks",
      "Exploring new use cases for GenAI solutions"
    ]
  },

  interests: {
    title: "Beyond Code",
    items: [
      "Mobile Gaming 🎮",
      "Esports",
      "AI & ML Research",
      "Tech Communities",
      "Open Source"
    ]
  }
}

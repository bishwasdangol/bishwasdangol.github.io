import type { SkillGroup } from '@/models'

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Scalable server-side applications and REST APIs for web and mobile clients.',
    items: ['Python', 'Django', 'Django Rest Framework', 'Celery', 'Django Channels'],
    icon: 'server',
    highlighted: true,
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'User-facing features, built with and alongside Vue.js teams.',
    items: ['TypeScript / JavaScript', 'Vue.js', 'HTML / CSS'],
    icon: 'layout',
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational data management, query optimisation and vector search.',
    items: ['PostgreSQL', 'PGVector'],
    icon: 'database',
  },
  {
    id: 'apis',
    title: 'APIs & Architecture',
    description: 'API design and live, two-way communication between clients and servers.',
    items: ['RESTful API design', 'WebSockets', 'Real-time systems'],
    icon: 'api',
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    description: 'Containerised development, version control and delivery pipelines.',
    items: ['Docker', 'Docker Compose', 'Git', 'GitLab', 'CI/CD'],
    icon: 'container',
  },
  {
    id: 'cloud',
    title: 'Cloud',
    description:
      'AWS Academy Graduate – Cloud Architecting, with familiarity in cloud deployment concepts.',
    items: ['Cloud architecting', 'EC2 / S3 / RDS concepts'],
    icon: 'cloud',
  },
  {
    id: 'ai',
    title: 'AI/ML Integration',
    description: 'Chatbot and natural-language systems built on LLM frameworks.',
    items: ['LangChain', 'LangGraph'],
    icon: 'sparkles',
  },
]

import type { Certification, Education, Experience } from '@/models'

export const experiences: Experience[] = [
  {
    role: 'Software Engineer (Python Backend Developer)',
    company: 'Pathway Technologies and Services',
    location: 'Thapathali, Kathmandu',
    start: 'April 2022',
    end: 'Present',
    areas: [
      {
        title: 'API Development & System Design',
        bullets: [
          'Designed and implemented RESTful APIs with Django Rest Framework for web and mobile applications.',
        ],
        projectSlugs: ['crop-health-consultation', 'seed-import-permit'],
      },
      {
        title: 'Data-Driven Applications',
        projectSlugs: ['price-prediction', 'gis-land-inventory', 'seed-certification-qr'],
      },
      {
        title: 'Performance Optimization & Scalability',
        projectSlugs: ['gis-performance', 'crop-notification-system'],
      },
      {
        title: 'E-Commerce & AI Integration',
        projectSlugs: ['tt-bot', 'airline-api-integration'],
      },
      {
        title: 'Collaboration & Code Quality',
        bullets: [
          'Collaborated with Vue.js frontend teams to define API contracts and integrate server-side logic with user-facing features.',
          'Took part in code reviews to maintain coding standards, improve code quality and share knowledge across the team.',
        ],
      },
    ],
  },
]

export const education: Education[] = [
  {
    degree: 'Master of Science in Computer Engineering',
    specialization: 'Data Science and Analytics',
    institution: 'Tribhuvan University, Institute of Engineering (IOE), Pulchowk Campus',
    start: 'April 2024',
    end: 'May 2026',
    thesisSlug: 'malaria-xai-thesis',
  },
  {
    degree: 'Bachelor of Engineering in Computer Engineering',
    institution: 'Sagarmatha Engineering College (Tribhuvan University affiliated)',
    start: '2018',
    end: '2022',
  },
]

export const certifications: Certification[] = [
  {
    name: 'AWS Academy Graduate – Cloud Architecting',
    issuer: 'AWS Academy',
    url: 'https://www.credly.com/badges/6f2ecda6-a6e5-4459-9782-a301c89f662d/linked_in_profile',
  },
]

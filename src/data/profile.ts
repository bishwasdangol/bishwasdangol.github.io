import type { Profile } from '@/models'

export const profile: Profile = {
  name: 'Bishwas Dangol',
  firstName: 'Bishwas',
  initials: 'BD',
  title: 'Software Engineer',
  location: 'Kathmandu, Nepal',
  email: 'bishwasdangol1@gmail.com',
  pitch:
    'Software Engineer building scalable backends, real-time systems and AI-powered features with Python, Django and Vue.js.',
  summary: [
    "I'm a Software Engineer with 4+ years of experience designing and developing scalable applications: Python, Django and Django Rest Framework on the backend, and Vue.js, HTML, CSS and JavaScript on the frontend.",
    "I build RESTful APIs, optimise database performance and implement real-time communication systems. I'm experienced with Docker, Celery for asynchronous task processing, and PostgreSQL for data management.",
    'For my MSc in Data Science and Analytics at IOE Pulchowk Campus, I researched explainable deep learning for malaria diagnosis; part of that work is published in the Journal of Advanced College of Engineering and Management (2026).',
    "Next, I'm looking to bring my backend expertise and cloud learning to high-performance, cloud-native applications.",
  ],
  photo: `${import.meta.env.BASE_URL}images/profile.jpg`,
  yearsOfExperience: '4+',
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Nepali', level: 'Native' },
    { name: 'Newari', level: 'Native' },
  ],
  interests: ['Movies', 'Sports', 'Gaming', 'Music'],
  socials: [
    {
      label: 'Email',
      display: 'bishwasdangol1@gmail.com',
      url: 'mailto:bishwasdangol1@gmail.com',
      icon: 'mail',
    },
    {
      label: 'LinkedIn',
      display: 'linkedin.com/in/bishwas-dangol-5a8871212',
      url: 'https://www.linkedin.com/in/bishwas-dangol-5a8871212',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      display: 'github.com/bishwasdangol',
      url: 'https://github.com/bishwasdangol',
      icon: 'github',
    },
    {
      label: 'GitLab',
      display: 'gitlab.com/bishwas76',
      url: 'https://gitlab.com/bishwas76',
      icon: 'gitlab',
    },
  ],
}

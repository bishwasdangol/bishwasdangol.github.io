export interface ExperienceArea {
  title: string
  projectSlugs?: string[]
  bullets?: string[]
}

export interface Experience {
  role: string
  company: string
  location: string
  start: string
  end: string
  areas: ExperienceArea[]
}

export interface Education {
  degree: string
  specialization?: string
  institution: string
  start: string
  end: string
  thesisSlug?: string
}

export interface Certification {
  name: string
  issuer: string
  url: string
}

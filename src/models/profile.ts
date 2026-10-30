import type { IconName } from './icon'

export interface SocialLink {
  label: string
  display: string
  url: string
  icon: IconName
}

export interface Language {
  name: string
  level: string
}

export interface Profile {
  name: string
  firstName: string
  initials: string
  title: string
  location: string
  email: string
  pitch: string
  summary: string[]
  photo?: string
  yearsOfExperience: string
  languages: Language[]
  interests: string[]
  socials: SocialLink[]
}

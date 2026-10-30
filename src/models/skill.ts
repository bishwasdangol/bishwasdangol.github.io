import type { IconName } from './icon'

export interface SkillGroup {
  id: string
  title: string
  description: string
  items: string[]
  icon: IconName
  highlighted?: boolean
}

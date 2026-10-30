import { describe, it, expect } from 'vitest'

import { profile } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { projects, projectCategories } from '@/data/projects'
import { experiences, education, certifications } from '@/data/experience'
import { navItems } from '@/data/navigation'

describe('content data', () => {
  it('has ten projects with unique slugs', () => {
    expect(projects).toHaveLength(10)
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
  })

  it('gives every project category a filter option, and every option a project', () => {
    const values = projectCategories.map((c) => c.value)
    for (const p of projects) expect(values).toContain(p.category)
    for (const option of projectCategories.filter((c) => c.value !== 'all')) {
      expect(projects.some((p) => p.category === option.value)).toBe(true)
    }
  })

  it('features exactly the three chosen projects', () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.slug)
    expect(featured.sort()).toEqual(
      ['airline-api-integration', 'crop-health-consultation', 'tt-bot'].sort(),
    )
  })

  it('links experience areas only to real projects', () => {
    const slugs = new Set(projects.map((p) => p.slug))
    for (const area of experiences.flatMap((e) => e.areas)) {
      for (const slug of area.projectSlugs ?? []) expect(slugs.has(slug)).toBe(true)
    }
  })

  it('contains no forbidden content', () => {
    const all = JSON.stringify({
      profile,
      skillGroups,
      projects,
      experiences,
      education,
      certifications,
      navItems,
    })
    expect(all).not.toMatch(/9843787528|Mehepi|Rayamajhi|Eliott|lorem|AWS Certified|Download CV/i)
  })

  it('uses the AWS Academy wording', () => {
    expect(certifications[0]?.name).toBe('AWS Academy Graduate – Cloud Architecting')
  })

  it('has seven skill groups with backend highlighted', () => {
    expect(skillGroups).toHaveLength(7)
    expect(skillGroups.filter((g) => g.highlighted).map((g) => g.id)).toEqual(['backend'])
  })

  it('navigates to the six home sections', () => {
    expect(navItems.map((n) => n.sectionId)).toEqual([
      'about',
      'skills',
      'work',
      'research',
      'experience',
      'contact',
    ])
  })
})

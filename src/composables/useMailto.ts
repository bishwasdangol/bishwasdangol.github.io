import type { ContactFormValues } from '@/models'
import { profile } from '@/data/profile'

export const HIRE_ME_SUBJECT = 'Job opportunity for Bishwas Dangol'

export function buildMailto({
  to,
  subject,
  body,
}: {
  to: string
  subject?: string
  body?: string
}): string {
  const params: string[] = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return params.length ? `mailto:${to}?${params.join('&')}` : `mailto:${to}`
}

export const hireMeHref = buildMailto({ to: profile.email, subject: HIRE_ME_SUBJECT })

export function buildContactMailto(values: ContactFormValues): string {
  const name = values.name.trim()
  return buildMailto({
    to: profile.email,
    subject: values.subject.trim() || `Portfolio enquiry from ${name}`,
    body: `${values.message.trim()}\n\n— ${name} <${values.email.trim()}>`,
  })
}

// Hands the message to the visitor's email app.
export function openMailto(url: string): void {
  window.location.href = url
}

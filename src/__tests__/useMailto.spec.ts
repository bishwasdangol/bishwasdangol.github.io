import { describe, it, expect } from 'vitest'

import { buildContactMailto, buildMailto, hireMeHref } from '@/composables/useMailto'

describe('buildMailto', () => {
  it('returns a bare mailto when there is no subject or body', () => {
    expect(buildMailto({ to: 'a@b.com' })).toBe('mailto:a@b.com')
  })

  it('encodes reserved characters and newlines in subject and body', () => {
    expect(buildMailto({ to: 'a@b.com', subject: 'Hi & bye?', body: 'L1\nL2 #3' })).toBe(
      'mailto:a@b.com?subject=Hi%20%26%20bye%3F&body=L1%0AL2%20%233',
    )
  })

  it('encodes non-ASCII text', () => {
    expect(buildMailto({ to: 'a@b.com', body: 'नमस्ते' })).toBe(
      'mailto:a@b.com?body=' + encodeURIComponent('नमस्ते'),
    )
  })
})

describe('hireMeHref', () => {
  it('opens an email to Bishwas with the job subject', () => {
    expect(hireMeHref).toBe(
      'mailto:bishwasdangol1@gmail.com?subject=Job%20opportunity%20for%20Bishwas%20Dangol',
    )
  })
})

describe('buildContactMailto', () => {
  it('falls back to a default subject and signs the body with name and email', () => {
    const url = buildContactMailto({
      name: ' Ana ',
      email: 'ana@x.io',
      subject: '',
      message: 'Hello',
    })
    const params = new URLSearchParams(url.split('?')[1])
    expect(url.startsWith('mailto:bishwasdangol1@gmail.com?')).toBe(true)
    expect(params.get('subject')).toBe('Portfolio enquiry from Ana')
    expect(params.get('body')).toBe('Hello\n\n— Ana <ana@x.io>')
  })

  it('keeps a subject the visitor typed', () => {
    const url = buildContactMailto({
      name: 'Ana',
      email: 'ana@x.io',
      subject: ' Role ',
      message: 'Hi',
    })
    expect(new URLSearchParams(url.split('?')[1]).get('subject')).toBe('Role')
  })
})

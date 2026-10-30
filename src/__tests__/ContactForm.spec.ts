import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import ContactForm from '@/components/ContactForm.vue'
import { buildContactMailto, openMailto } from '@/composables/useMailto'

vi.mock('@/composables/useMailto', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/composables/useMailto')>()),
  openMailto: vi.fn<(url: string) => void>(),
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.mocked(openMailto).mockClear()
  })

  it('does not open the email app when required fields are empty', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('form').trigger('submit')
    expect(openMailto).not.toHaveBeenCalled()
    expect(wrapper.find('[data-test="error-name"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="error-email"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="error-message"]').exists()).toBe(true)
    expect(wrapper.find('#contact-name').attributes('aria-invalid')).toBe('true')
  })

  it('opens the email app with the filled-in message', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#contact-name').setValue('Ana')
    await wrapper.find('#contact-email').setValue('ana@x.io')
    await wrapper.find('#contact-message').setValue('Hello & welcome')
    await wrapper.find('form').trigger('submit')
    expect(openMailto).toHaveBeenCalledTimes(1)
    expect(openMailto).toHaveBeenCalledWith(
      buildContactMailto({
        name: 'Ana',
        email: 'ana@x.io',
        subject: '',
        message: 'Hello & welcome',
      }),
    )
  })

  it('flags only the email when it is malformed', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#contact-name').setValue('Ana')
    await wrapper.find('#contact-email').setValue('not-an-email')
    await wrapper.find('#contact-message').setValue('Hi')
    await wrapper.find('form').trigger('submit')
    expect(openMailto).not.toHaveBeenCalled()
    expect(wrapper.find('[data-test="error-email"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="error-name"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="error-message"]').exists()).toBe(false)
  })

  it('tells the visitor it opens their email app', () => {
    expect(mount(ContactForm).text()).toContain('Opens your email app.')
  })

  it('prompts each field with what to enter', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('#contact-name').attributes('placeholder')).toBe('Enter your name')
    expect(wrapper.find('#contact-email').attributes('placeholder')).toBe(
      'Enter your email address',
    )
    expect(wrapper.find('#contact-subject').attributes('placeholder')).toBe('Enter a subject')
    expect(wrapper.find('#contact-message').attributes('placeholder')).toBe(
      'Tell me about the role...',
    )
  })
})

describe('ContactForm feedback', () => {
  it('tells the visitor what to do if no email app opened', async () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('[data-test="mailto-status"]').exists()).toBe(false)
    await wrapper.find('#contact-name').setValue('Ana')
    await wrapper.find('#contact-email').setValue('ana@x.io')
    await wrapper.find('#contact-message').setValue('Hi')
    await wrapper.find('form').trigger('submit')
    const status = wrapper.find('[data-test="mailto-status"]')
    expect(status.attributes('aria-live')).toBe('polite')
    expect(status.text()).toContain('Nothing opened?')
    expect(status.find('a[href="mailto:bishwasdangol1@gmail.com"]').exists()).toBe(true)
  })
})

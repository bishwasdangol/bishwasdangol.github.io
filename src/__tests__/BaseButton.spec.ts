import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseButton from '@/components/BaseButton.vue'
import { mountWithRouter } from './mountWithRouter'

describe('BaseButton', () => {
  it('renders a link for href', () => {
    const wrapper = mount(BaseButton, { props: { href: 'mailto:x@y.z' }, slots: { default: 'Hi' } })
    expect(wrapper.find('a[href="mailto:x@y.z"]').exists()).toBe(true)
  })

  it('renders a router link for to', async () => {
    const wrapper = await mountWithRouter(BaseButton, '/', { props: { to: '/projects' } })
    expect(wrapper.find('a[href="/projects"]').exists()).toBe(true)
  })

  it('renders a button otherwise', () => {
    const wrapper = mount(BaseButton, { props: { type: 'submit' } })
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it.each(['primary', 'dark', 'outline'] as const)('has no shadow or glow (%s)', (variant) => {
    const wrapper = mount(BaseButton, { props: { variant } })
    expect(wrapper.classes().join(' ')).not.toMatch(/shadow|ring-/)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import { bcadd } from '../../src/php/bc/bcadd.ts'
import { bcscale } from '../../src/php/bc/bcscale.ts'
import { strtotime } from '../../src/php/datetime/strtotime.ts'

describe('issue 602 PHP parity follow-up', () => {
  beforeEach(() => {
    delete (globalThis as typeof globalThis & { $locutus?: unknown }).$locutus
  })

  it('tracks the PHP 8 bcscale getter/setter contract and applies shared default scale', () => {
    expect(bcscale()).toBe(0)
    expect(bcscale(null)).toBe(0)
    expect(bcscale(3)).toBe(0)
    expect(bcscale()).toBe(3)
    expect(bcadd(0.333333 as never, 0.4444444444444444 as never)).toBe('0.777')
    expect(bcscale('2')).toBe(3)
    expect(bcadd(0.333333 as never, 0.4444444444444444 as never)).toBe('0.77')
  })

  it('coerces numeric strtotime input the same way PHP does', () => {
    expect(strtotime(20260301 as never)).toBe(strtotime('20260301'))
  })
})

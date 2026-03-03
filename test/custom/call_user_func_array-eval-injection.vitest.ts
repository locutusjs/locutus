import { describe, expect, it } from 'vitest'

import { call_user_func_array } from '../../src/php/funchand/call_user_func_array.ts'

describe('call_user_func_array eval injection hardening', () => {
  it('does not execute attacker-controlled code embedded in callback method name', () => {
    const globalWithProbe = globalThis as typeof globalThis & { __locutus_pwned__?: number }
    delete globalWithProbe.__locutus_pwned__

    const payload = "'];globalThis.__locutus_pwned__=1337;//"

    expect(() => call_user_func_array(['Date', payload], [])).toThrow()
    expect(globalWithProbe.__locutus_pwned__).toBeUndefined()
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { ini_set } from '../../src/php/info/ini_set.ts'
import { preg_match } from '../../src/php/pcre/preg_match.ts'
import { sprintf } from '../../src/php/strings/sprintf.ts'
import { is_array } from '../../src/php/var/is_array.ts'

const clearLocutusRuntime = () => {
  delete (globalThis as typeof globalThis & { $locutus?: unknown }).$locutus
}

describe('browser playground smoke', () => {
  beforeEach(() => {
    clearLocutusRuntime()
  })

  it('keeps the basic demo flow working in a real browser runtime', () => {
    expect(sprintf('Hey %s, please check the console log', 'you')).toBe('Hey you, please check the console log')

    expect(preg_match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$', 'rony@pharaohtools.com')).toBe(true)
    expect(preg_match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$', 'ronypharaohtools.com')).toBe(false)

    expect(ini_set('locutus.objectsAsArrays', 'on')).toBeUndefined()
    expect(is_array({ name: 'locutus' })).toBe(true)

    expect(ini_set('locutus.objectsAsArrays', 'off')).toBe('on')
    expect(is_array({ name: 'locutus' })).toBe(false)
  })
})

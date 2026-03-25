import { describe, expect, it } from 'vitest'
import { unserialize } from '../../src/php/var/unserialize.ts'

describe('unserialize prototype pollution resistance', () => {
  it('treats __proto__ as a plain own key on arrays/objects', () => {
    const payload = 'a:2:{s:9:"__proto__";a:1:{s:7:"isAdmin";b:1;}s:4:"name";s:3:"bob";}'
    const result = unserialize(payload, 'throw') as Record<string, unknown>

    expect(Object.keys(result)).toEqual(['__proto__', 'name'])
    expect(Object.prototype.hasOwnProperty.call(result, '__proto__')).toBe(true)
    expect(result.name).toBe('bob')
    expect(result.isAdmin).toBeUndefined()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('treats __proto__ as a plain own key on stdClass objects too', () => {
    const payload = 'O:8:"stdClass":2:{s:9:"__proto__";a:1:{s:7:"isAdmin";b:1;}s:4:"name";s:3:"bob";}'
    const result = unserialize(payload, 'throw') as Record<string, unknown>

    expect(Object.keys(result)).toEqual(['__proto__', 'name'])
    expect(Object.prototype.hasOwnProperty.call(result, '__proto__')).toBe(true)
    expect(result.name).toBe('bob')
    expect(result.isAdmin).toBeUndefined()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })
})

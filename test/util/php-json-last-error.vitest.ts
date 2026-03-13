import { describe, expect, it } from 'vitest'
import { json_decode } from '../../src/php/json/json_decode.ts'
import { json_encode } from '../../src/php/json/json_encode.ts'
import { json_last_error } from '../../src/php/json/json_last_error.ts'

describe('php json last_error state', () => {
  const jsonEncodeRuntime = json_encode as (value: object) => string | null

  it('clears json_last_error after a successful json_decode following a syntax failure', () => {
    expect(json_decode('{')).toBeNull()
    expect(json_last_error()).toBe(4)

    expect(json_decode('[1,2,3]')).toEqual([1, 2, 3])
    expect(json_last_error()).toBe(0)
  })

  it('clears json_last_error after a successful json_encode following an encoding failure', () => {
    expect(json_encode(() => 'nope')).toBeNull()
    expect(json_last_error()).toBe(4)

    expect(json_encode({ ok: true })).toBe('{"ok":true}')
    expect(json_last_error()).toBe(0)
  })

  it('reports JSON_ERROR_INF_OR_NAN for non-finite numbers instead of clearing the prior error state', () => {
    expect(json_decode('{')).toBeNull()
    expect(json_last_error()).toBe(4)

    expect(json_encode({ bad: Number.NaN })).toBeNull()
    expect(json_last_error()).toBe(7)
  })

  it('allows toJSON to replace raw non-finite fields with a finite payload', () => {
    const input = {
      bad: Number.NaN,
      toJSON: () => ({ ok: 1 }),
    }

    expect(json_encode(input)).toBe('{"ok":1}')
    expect(json_last_error()).toBe(0)
  })

  it('still reports JSON_ERROR_INF_OR_NAN when toJSON returns non-finite numbers', () => {
    const input = {
      toJSON: () => ({ bad: Number.POSITIVE_INFINITY }),
    }

    expect(json_encode(input)).toBeNull()
    expect(json_last_error()).toBe(7)
  })

  it('reports JSON_ERROR_INF_OR_NAN for boxed non-finite numbers too', () => {
    const boxedNaN = Reflect.construct(Number, [Number.NaN])

    expect(jsonEncodeRuntime({ bad: boxedNaN })).toBeNull()
    expect(json_last_error()).toBe(7)
  })

  it('keeps the JSON.stringify receiver for native encode path compatibility', () => {
    const originalStringify = JSON.stringify
    let receiver: unknown

    JSON.stringify = function (this: typeof JSON, value, replacer, space) {
      receiver = this
      return Reflect.apply(originalStringify, this, [value, replacer, space])
    }

    try {
      expect(json_encode({ ok: true })).toBe('{"ok":true}')
      expect(receiver).toBe(JSON)
    } finally {
      JSON.stringify = originalStringify
    }
  })
})

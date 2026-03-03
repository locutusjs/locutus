import { describe, expect, it } from 'vitest'
import { ini_set } from '../../src/php/info/ini_set.ts'

describe('ini_set extension', () => {
  it('accumulates extension values without crashing', () => {
    const $global = globalThis as typeof globalThis & {
      $locutus?: { php?: { ini?: Record<string, { local_value?: unknown }> } }
    }

    delete $global.$locutus

    expect(() => ini_set('extension', 'mbstring')).not.toThrow()
    expect(() => ini_set('extension', 'gd')).not.toThrow()
    expect($global.$locutus?.php?.ini?.extension?.local_value).toEqual(['mbstring', 'gd'])
  })
})

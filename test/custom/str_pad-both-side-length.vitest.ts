import { describe, expect, it } from 'vitest'
import { str_pad } from '../../src/php/strings/str_pad.ts'

describe('php/strings str_pad STR_PAD_BOTH side length regression', () => {
  it('gives the extra padding character to the right side, matching PHP', () => {
    // PHP 8.3: str_pad('Kevin van Zonneveld', 30, '-', STR_PAD_BOTH)
    //   === '-----Kevin van Zonneveld------' (5 left, 6 right)
    expect(str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')).toBe('-----Kevin van Zonneveld------')
  })

  it('cycles a multi-character pad string independently on each side', () => {
    // PHP manual's own STR_PAD_BOTH example:
    // str_pad('Alien', 10, '-=', STR_PAD_BOTH) === '-=Alien-=-'
    expect(str_pad('Alien', 10, '-=', 'STR_PAD_BOTH')).toBe('-=Alien-=-')
  })

  it('splits an even amount of padding equally', () => {
    expect(str_pad('ab', 6, '-', 'STR_PAD_BOTH')).toBe('--ab--')
  })
})

import { describe, expect, it } from 'vitest'

import { ParseInLocation } from '../../src/golang/time/ParseInLocation.ts'

describe('ParseInLocation edge cases', () => {
  it('matches Go across forward-jump DST gaps and date-line shifts', () => {
    expect(ParseInLocation('2006-01-02 15:04:05', '2024-03-10 02:30:00', 'America/New_York').toISOString()).toBe(
      '2024-03-10T06:30:00.000Z',
    )
    expect(ParseInLocation('2006-01-02 15:04:05', '2024-10-06 02:15:00', 'Australia/Lord_Howe').toISOString()).toBe(
      '2024-10-05T15:45:00.000Z',
    )
    expect(ParseInLocation('2006-01-02 15:04:05', '2011-12-30 12:00:00', 'Pacific/Apia').toISOString()).toBe(
      '2011-12-30T22:00:00.000Z',
    )
  })

  it('rejects out-of-range numeric offsets', () => {
    expect(() => ParseInLocation('2006-01-02T15:04:05-07:00', '2026-03-03T13:14:15+25:00', 'America/New_York')).toThrow(
      'ParseInLocation(): invalid offset',
    )
    expect(() => ParseInLocation('2006-01-02T15:04:05-07:00', '2026-03-03T13:14:15-23:61', 'America/New_York')).toThrow(
      'ParseInLocation(): invalid offset',
    )
  })

  it('accepts years below 0100 like Go', () => {
    expect(ParseInLocation('2006-01-02', '0050-01-01', 'UTC').toISOString()).toBe('0050-01-01T00:00:00.000Z')
  })
})

import { describe, expect, it } from 'vitest'
import serialize from './serialize.js'

describe('src/php/var/serialize.js', () => {
  it('should pass example 1', () => {
    const expected = 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    const result = serialize(['Kevin', 'van', 'Zonneveld'])
    expect(result).toEqual(expected)
  })
})

const LUA_MIN_INTEGER = -(2 ** 63)
const LUA_MAX_INTEGER = 2 ** 63 - 1

export function type(value: unknown): 'integer' | 'float' | null {
  //      discuss at: https://locutus.io/lua/type/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors math.type by classifying JavaScript numbers as integer, float, or nil-like null.
  //       example 1: type(1)
  //       returns 1: 'integer'
  //       example 2: type(1.5)
  //       returns 2: 'float'
  //       example 3: type('1')
  //       returns 3: null

  if (typeof value !== 'number') {
    return null
  }

  return Number.isInteger(value) && value >= LUA_MIN_INTEGER && value <= LUA_MAX_INTEGER ? 'integer' : 'float'
}

export function str_shuffle(...args: Array<string | null | undefined>): string {
  //  discuss at: https://locutus.io/php/str_shuffle/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $shuffled = str_shuffle("abcdef")
  //   example 1: var $result = $shuffled.length
  //   returns 1: 6

  if (args.length === 0) {
    throw new Error('Wrong parameter count for str_shuffle()')
  }

  const input = args[0]
  if (input === null) {
    return ''
  }

  let str = String(input)

  let newStr = ''
  let rand
  let i = str.length

  while (i) {
    rand = Math.floor(Math.random() * i)
    newStr += str.charAt(rand)
    str = str.substring(0, rand) + str.substr(rand + 1)
    i--
  }

  return newStr
}

export function reverse(str: string): string {
  //  discuss at: https://locutus.io/tcl/reverse/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: reverse('hello')
  //   returns 1: 'olleh'
  //   example 2: reverse('abc')
  //   returns 2: 'cba'

  return String(str).split('').reverse().join('')
}

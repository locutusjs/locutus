import { setrawcookie } from '../network/setrawcookie.ts'

export function setcookie(name: string, value: string, expires: any, path: any, domain: any, secure: any): boolean {
  //      discuss at: https://locutus.io/php/setcookie/
  // parity verified: PHP 8.3
  //     original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //     bugfixed by: Andreas
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: setcookie('author_name', 'Kevin van Zonneveld')
  //       returns 1: true

  return setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure)
}

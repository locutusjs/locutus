// @ts-nocheck
import { strstr } from '../strings/strstr.ts'

export function strchr(haystack: string, needle: string, bool?: boolean): string {
  //      discuss at: https://locutus.io/php/strchr/
  // parity verified: PHP 8.3
  //     original by: Philip Peterson
  //       example 1: strchr('Kevin van Zonneveld', 'van')
  //       returns 1: 'van Zonneveld'
  //       example 2: strchr('Kevin van Zonneveld', 'van', true)
  //       returns 2: 'Kevin '

  return strstr(haystack, needle, bool)
}

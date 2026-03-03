import { getPhpRuntimeString, setPhpRuntimeEntry } from '../_helpers/_phpRuntimeState.ts'

export function strtok(str: string, tokens?: string): string | false {
  //  discuss at: https://locutus.io/php/strtok/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Use tab and newline as tokenizing characters as well
  //   example 1: var $string = "\t\t\t\nThis is\tan example\nstring\n"
  //   example 1: var $tok = strtok($string, " \n\t")
  //   example 1: var $b = ''
  //   example 1: while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
  //   example 1: var $result = $b
  //   returns 1: "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"

  if (typeof tokens === 'undefined') {
    tokens = str
    str = getPhpRuntimeString('strtokleftOver', '')
  }
  if (str.length === 0) {
    return false
  }
  if (tokens.indexOf(str.charAt(0)) !== -1) {
    return strtok(str.substring(1), tokens)
  }
  let i = 0
  for (; i < str.length; i++) {
    if (tokens.indexOf(str.charAt(i)) !== -1) {
      break
    }
  }
  setPhpRuntimeEntry('strtokleftOver', str.substring(i + 1))

  return str.substring(0, i)
}

import { isPhpAssocObject, type PhpAssoc, type PhpInput } from '../_helpers/_phpTypes.ts'

type ObjectValue = PhpInput | never

export function is_object(mixedVar: ObjectValue): mixedVar is PhpAssoc<ObjectValue> {
  //  discuss at: https://locutus.io/php/is_object/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Legaev Andrey
  // improved by: Michael White (https://getsprink.com)
  //   example 1: is_object('23')
  //   returns 1: false
  //   example 2: is_object({foo: 'bar'})
  //   returns 2: true
  //   example 3: is_object(null)
  //   returns 3: false

  return isPhpAssocObject(mixedVar)
}

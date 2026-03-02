import { getPhpObjectEntry } from '../_helpers/_phpRuntimeState.ts'
import { type PhpRuntimeValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'
import { echo } from '../strings/echo.ts'

type VarExportInput = PhpRuntimeValue

type VarExportType =
  | 'resource'
  | 'function'
  | 'null'
  | 'array'
  | 'object'
  | 'string'
  | 'number'
  | 'boolean'
  | 'undefined'
type VarExportResult = string | number | boolean | null

export function var_export(mixedExpression: VarExportInput, boolReturn: true, idtLevel?: number): VarExportResult
export function var_export(mixedExpression: VarExportInput, boolReturn?: false | undefined, idtLevel?: number): null
export function var_export(
  mixedExpression: VarExportInput,
  boolReturn?: boolean,
  idtLevel?: number,
): VarExportResult | null
export function var_export(
  mixedExpression: VarExportInput,
  boolReturn?: boolean,
  idtLevel = 2,
): VarExportResult | null {
  //  discuss at: https://locutus.io/php/var_export/
  // original by: Philip Peterson
  // improved by: johnrembo
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: Brian Tafoya (https://www.premasolutions.com/)
  //    input by: Hans Henrik (https://hanshenrik.tk/)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: simivar (https://github.com/simivar)
  // bugfixed by: simivar (https://github.com/simivar)
  // bugfixed by: simivar (https://github.com/simivar)
  //   example 1: var_export(null)
  //   returns 1: null
  //   example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true)
  //   returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld',\n)"
  //   example 3: var data = 'Kevin'
  //   example 3: var_export(data, true)
  //   returns 3: "'Kevin'"
  //   example 4: var_export({0: 'Kevin', 1: 'van', 'lastName': 'Zonneveld'}, true)
  //   returns 4: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  'lastName' => 'Zonneveld',\n)"
  //   example 5: var_export([], true)
  //   returns 5: "array (\n)"
  //   example 6: var_export({ test: [ 'a', 'b' ] }, true)
  //   returns 6: "array (\n  'test' =>\n  array (\n    0 => 'a',\n    1 => 'b',\n  ),\n)"

  let retstr: VarExportResult = ''
  let iret = ''
  let value = ''
  let cnt = 0
  const x: string[] = []
  let funcParts: RegExpMatchArray | null = null
  // We use the last argument (not part of PHP) to pass in
  // our indentation level
  let innerIndent = ''
  let outerIndent = ''
  const getFuncName = function (fn: { toString: () => string }): string {
    const name = /\W*function\s+([\w$]+)\s*\(/.exec(fn.toString())
    if (!name) {
      return '(Anonymous)'
    }
    return name[1] ?? '(Anonymous)'
  }

  const _isNormalInteger = function (input: string): boolean {
    const number = Math.floor(Number(input))
    return number !== Infinity && String(number) === input && number >= 0
  }

  const _makeIndent = function (indentLevel: number): string {
    return new Array(indentLevel + 1).join(' ')
  }
  const __getType = function (inp: VarExportInput): VarExportType | null {
    let i = 0
    let match: RegExpMatchArray | null = null
    let cons = ''
    const types: Array<'boolean' | 'number' | 'string' | 'array'> = ['boolean', 'number', 'string', 'array']
    const jsType = typeof inp
    let type: VarExportType | null =
      jsType === 'boolean' ||
      jsType === 'number' ||
      jsType === 'string' ||
      jsType === 'function' ||
      jsType === 'undefined' ||
      jsType === 'object'
        ? jsType
        : null
    if (type === 'object' && typeof inp === 'object' && inp !== null) {
      const constructorValue = getPhpObjectEntry(inp, 'constructor')
      if (typeof constructorValue === 'function' && getFuncName(constructorValue) === 'LOCUTUS_Resource') {
        return 'resource'
      }
    }
    if (type === 'function') {
      return 'function'
    }
    if (type === 'object' && !inp) {
      // Should this be just null?
      return 'null'
    }
    if (type === 'object' && typeof inp === 'object' && inp !== null) {
      const constructorValue = getPhpObjectEntry(inp, 'constructor')
      if (typeof constructorValue !== 'function') {
        return 'object'
      }
      cons = constructorValue.toString()
      match = cons.match(/(\w+)\(/)
      if (match) {
        cons = (match[1] ?? '').toLowerCase()
      }
      for (i = 0; i < types.length; i++) {
        const knownType = types[i]
        if (knownType && cons === knownType) {
          type = knownType
          break
        }
      }
    }
    return type
  }
  const type = __getType(mixedExpression)

  if (type === null) {
    retstr = 'NULL'
  } else if (type === 'array' || type === 'object') {
    const source = toPhpArrayObject<VarExportInput>(mixedExpression)
    outerIndent = _makeIndent(idtLevel - 2)
    innerIndent = _makeIndent(idtLevel)
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue
      }
      value = ' '
      const entry = source[key]
      const subtype = __getType(entry)
      if (subtype === 'array' || subtype === 'object') {
        value = '\n'
      }
      value += String(var_export(entry, true, idtLevel + 2))
      const mappedKey = _isNormalInteger(key) ? key : `'${key}'`
      x[cnt++] = innerIndent + mappedKey + ' =>' + value
    }
    if (x.length > 0) {
      iret = x.join(',\n') + ',\n'
    }
    retstr = outerIndent + 'array (\n' + iret + outerIndent + ')'
  } else if (type === 'function') {
    funcParts = String(mixedExpression).match(/function .*?\((.*?)\) \{([\s\S]*)\}/)
    const funcArgs = funcParts?.[1] ?? ''
    const funcBody = funcParts?.[2] ?? ''

    // For lambda functions, var_export() outputs such as the following:
    // '\000lambda_1'. Since it will probably not be a common use to
    // expect this (unhelpful) form, we'll use another PHP-exportable
    // construct, create_function() (though dollar signs must be on the
    // variables in JavaScript); if using instead in JavaScript and you
    // are using the namespaced version, note that create_function() will
    // not be available as a global
    retstr = "create_function ('" + funcArgs + "', '" + funcBody.replace(/'/g, "\\'") + "')"
  } else if (type === 'resource') {
    // Resources treated as null for var_export
    retstr = 'NULL'
  } else {
    if (typeof mixedExpression === 'string') {
      retstr = "'" + mixedExpression.replace(/([\\'])/g, '\\$1').replace(/\0/g, '\\0') + "'"
    } else if (mixedExpression === null) {
      retstr = null
    } else if (typeof mixedExpression === 'number') {
      retstr = Number(mixedExpression)
    } else if (typeof mixedExpression === 'boolean') {
      retstr = Boolean(mixedExpression)
    } else {
      retstr = String(mixedExpression)
    }
  }

  if (!boolReturn) {
    echo(retstr)
    return null
  }

  return retstr
}

const visitedObjects = new Map<object, true>() // Initialize a map to track visited objects

import { type PhpAssoc, type PhpValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'
import { echo } from '../strings/echo.ts'

type DumpValue = {} | null | undefined
type DomLikeNode = {
  nodeName: string
  nodeType?: number
  namespaceURI?: string
  nodeValue?: PhpValue
}

const hasNodeName = (value: PhpValue): value is DomLikeNode => {
  return typeof value === 'object' && value !== null && 'nodeName' in value
}

const isLocutusResource = (
  value: PhpValue,
  getFuncName: (fn: { toString: () => string }) => string,
): value is { var_dump: () => string } => {
  if (typeof value !== 'object' || value === null || !('var_dump' in value) || !('constructor' in value)) {
    return false
  }
  const maybeResource = value
  const varDump = Reflect.get(maybeResource, 'var_dump')
  const constructorValue = Reflect.get(maybeResource, 'constructor')
  return (
    typeof varDump === 'function' &&
    typeof constructorValue === 'function' &&
    getFuncName(constructorValue) === 'LOCUTUS_Resource'
  )
}

export function var_dump(...args: DumpValue[]): string {
  //  discuss at: https://locutus.io/php/var_dump/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Zahlii
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: For returning a string, use var_export() with the second argument set to true
  //   example 1: var_dump(1)
  //   returns 1: 'int(1)'
  //   example 2: const simpleCircular = {}
  //   example 2: simpleCircular.self = simpleCircular
  //   example 2: var_dump(simpleCircular)
  //   returns 2: 'array(1) {\n    [self] =>\n    Circular Reference Detected\n}\n'

  let output = ''
  const padChar = ' '
  const padVal = 4
  const _getFuncName = function (fn: { toString: () => string }): string {
    const name = /\W*function\s+([\w$]+)\s*\(/.exec(fn.toString())
    if (!name) {
      return '(Anonymous)'
    }
    return name[1] ?? '(Anonymous)'
  }

  const _repeatChar = function (len: number, padCharacter: string): string {
    let str = ''
    for (let i = 0; i < len; i++) {
      str += padCharacter
    }
    return str
  }
  const _getInnerVal = function (val: PhpValue, thickPad: string): string {
    let ret = ''
    if (val === null) {
      ret = 'NULL'
    } else if (typeof val === 'boolean') {
      ret = 'bool(' + val + ')'
    } else if (typeof val === 'string') {
      ret = 'string(' + val.length + ') "' + val + '"'
    } else if (typeof val === 'number') {
      if (Number.isInteger(val)) {
        ret = 'int(' + val + ')'
      } else {
        ret = 'float(' + val + ')'
      }
    } else if (typeof val === 'undefined') {
      // The remaining are not PHP behavior because these values
      // only exist in this exact form in JavaScript
      ret = 'undefined'
    } else if (typeof val === 'function') {
      const funcLines = val.toString().split('\n')
      ret = ''
      for (let i = 0, fll = funcLines.length; i < fll; i++) {
        const line = funcLines[i] ?? ''
        ret += (i !== 0 ? '\n' + thickPad : '') + line
      }
    } else if (val instanceof Date) {
      ret = 'Date(' + val + ')'
    } else if (val instanceof RegExp) {
      ret = 'RegExp(' + val + ')'
    } else if (hasNodeName(val)) {
      // Different than PHP's DOMElement
      switch (val.nodeType) {
        case 1:
          if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'https://www.w3.org/1999/xhtml') {
            // Undefined namespace could be plain XML, but namespaceURI not widely supported
            ret = 'HTMLElement("' + val.nodeName + '")'
          } else {
            ret = 'XML Element("' + val.nodeName + '")'
          }
          break
        case 2:
          ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')'
          break
        case 3:
          ret = 'TEXT_NODE(' + val.nodeValue + ')'
          break
        case 4:
          ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')'
          break
        case 5:
          ret = 'ENTITY_REFERENCE_NODE'
          break
        case 6:
          ret = 'ENTITY_NODE'
          break
        case 7:
          ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')'
          break
        case 8:
          ret = 'COMMENT_NODE(' + val.nodeValue + ')'
          break
        case 9:
          ret = 'DOCUMENT_NODE'
          break
        case 10:
          ret = 'DOCUMENT_TYPE_NODE'
          break
        case 11:
          ret = 'DOCUMENT_FRAGMENT_NODE'
          break
        case 12:
          ret = 'NOTATION_NODE'
          break
      }
    }
    return ret
  }

  const _formatArray = function (
    obj: PhpValue,
    curDepth: number,
    padVal: number,
    padChar: string,
    visitedObjectMap: Map<object, true>,
  ): string {
    if (curDepth > 0) {
      curDepth++
    }

    const basePad = _repeatChar(padVal * (curDepth - 1), padChar)
    const thickPad = _repeatChar(padVal * (curDepth + 1), padChar)
    let str = ''
    let val = ''

    if (typeof obj === 'object' && obj !== null) {
      if (visitedObjectMap.has(obj)) {
        // Circular reference detected, return a placeholder or a message
        return 'Circular Reference Detected\n'
      } else {
        // Mark this object as visited by adding it to the map
        visitedObjectMap.set(obj, true)
      }

      if (isLocutusResource(obj, _getFuncName)) {
        return obj.var_dump()
      }
      let lgth = 0
      const objRecord = toPhpArrayObject<PhpValue>(obj)
      for (const someProp in objRecord) {
        if (Object.prototype.hasOwnProperty.call(objRecord, someProp)) {
          lgth++
        }
      }
      str += 'array(' + lgth + ') {\n'
      for (const key in objRecord) {
        if (!Object.prototype.hasOwnProperty.call(objRecord, key)) {
          continue
        }
        const objVal = objRecord[key]
        if (
          typeof objVal === 'object' &&
          objVal !== null &&
          !(objVal instanceof Date) &&
          !(objVal instanceof RegExp) &&
          !hasNodeName(objVal)
        ) {
          str += thickPad
          str += '['
          str += key
          str += '] =>\n'
          str += thickPad
          str += _formatArray(objVal, curDepth + 1, padVal, padChar, visitedObjectMap)
        } else {
          val = _getInnerVal(objVal, thickPad)
          str += thickPad
          str += '['
          str += key
          str += '] =>\n'
          str += thickPad
          str += val
          str += '\n'
        }
      }
      str += basePad + '}\n'
    } else {
      str = _getInnerVal(obj, thickPad)
    }
    return str
  }

  output = _formatArray(args[0], 0, padVal, padChar, visitedObjects)
  for (let i = 1; i < args.length; i++) {
    output += '\n' + _formatArray(args[i], 0, padVal, padChar, visitedObjects)
  }

  echo(output)

  // Not how PHP does it, but helps us test:
  return output
}

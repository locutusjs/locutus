import { describe, expect, it } from 'vitest'

import { parseJsArrowFunction, parseJsExpression } from '../parity/lib/jsCallbackAst.ts'

describe('jsCallbackAst', () => {
  it('parses supported callback expressions into a stable tree', () => {
    expect(parseJsArrowFunction("(value) => (value % 2 === 0 ? 'even' : 'odd')")).toEqual({
      params: ['value'],
      body: {
        kind: 'conditional',
        test: {
          kind: 'binary',
          operator: '===',
          left: {
            kind: 'binary',
            operator: '%',
            left: { kind: 'identifier', name: 'value' },
            right: { kind: 'number', value: '2' },
          },
          right: { kind: 'number', value: '0' },
        },
        consequent: { kind: 'string', value: 'even' },
        alternate: { kind: 'string', value: 'odd' },
      },
    })
  })

  it('supports helper-shaped calls and property access used by parity examples', () => {
    expect(parseJsExpression('value.charAt(0)')).toEqual({
      kind: 'call',
      callee: {
        kind: 'property',
        object: { kind: 'identifier', name: 'value' },
        property: 'charAt',
      },
      args: [{ kind: 'number', value: '0' }],
    })

    expect(parseJsExpression('Number(acc) + Number(value)')).toEqual({
      kind: 'binary',
      operator: '+',
      left: {
        kind: 'call',
        callee: { kind: 'identifier', name: 'Number' },
        args: [{ kind: 'identifier', name: 'acc' }],
      },
      right: {
        kind: 'call',
        callee: { kind: 'identifier', name: 'Number' },
        args: [{ kind: 'identifier', name: 'value' }],
      },
    })
  })

  it('rejects unsupported callback forms', () => {
    expect(() => parseJsArrowFunction('(value = 1) => value')).toThrow('Default parameters are not supported')
    expect(() => parseJsArrowFunction('({ value }) => value')).toThrow(
      'Only identifier callback parameters are supported',
    )
    expect(() => parseJsArrowFunction('(value) => { return value }')).toThrow(
      'Statement-bodied arrow functions are not supported',
    )
  })
})

import ts from 'typescript'

export type JsExpression =
  | { kind: 'identifier'; name: string }
  | { kind: 'number'; value: string }
  | { kind: 'string'; value: string }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'null' }
  | { kind: 'array'; elements: JsExpression[] }
  | { kind: 'property'; object: JsExpression; property: string }
  | { kind: 'index'; object: JsExpression; index: JsExpression }
  | { kind: 'call'; callee: JsExpression; args: JsExpression[] }
  | { kind: 'unary'; operator: '!' | '-' | '+'; argument: JsExpression }
  | {
      kind: 'binary'
      operator:
        | '+'
        | '-'
        | '*'
        | '/'
        | '%'
        | '==='
        | '!=='
        | '>'
        | '>='
        | '<'
        | '<='
        | '&&'
        | '||'
      left: JsExpression
      right: JsExpression
    }
  | { kind: 'conditional'; test: JsExpression; consequent: JsExpression; alternate: JsExpression }

export interface JsArrowFunction {
  params: string[]
  body: JsExpression
}

function parseSourceExpression(sourceText: string): ts.Expression {
  const sourceFile = ts.createSourceFile(
    'callback.ts',
    `const __locutus_expr__ = (${sourceText});`,
    ts.ScriptTarget.ES2022,
    true,
    ts.ScriptKind.TS,
  )

  const statement = sourceFile.statements[0]
  if (!statement || !ts.isVariableStatement(statement)) {
    throw new Error('Unable to parse callback expression')
  }

  const declaration = statement.declarationList.declarations[0]
  if (!declaration?.initializer) {
    throw new Error('Unable to parse callback initializer')
  }

  return declaration.initializer
}

function unsupported(node: ts.Node, message?: string): never {
  const kind = ts.SyntaxKind[node.kind]
  throw new Error(message ? `${message} (${kind})` : `Unsupported callback expression node: ${kind}`)
}

export function parseJsExpression(sourceText: string): JsExpression {
  return convertTsExpression(parseSourceExpression(sourceText))
}

export function parseJsArrowFunction(sourceText: string): JsArrowFunction {
  let expression = parseSourceExpression(sourceText)
  while (ts.isParenthesizedExpression(expression)) {
    expression = expression.expression
  }
  if (!ts.isArrowFunction(expression)) {
    throw new Error('Expected an expression-bodied arrow function')
  }

  if (ts.isBlock(expression.body)) {
    throw new Error('Statement-bodied arrow functions are not supported')
  }

  const params = expression.parameters.map((parameter) => {
    if (parameter.dotDotDotToken) {
      throw new Error('Rest parameters are not supported')
    }
    if (parameter.initializer) {
      throw new Error('Default parameters are not supported')
    }
    if (!ts.isIdentifier(parameter.name)) {
      throw new Error('Only identifier callback parameters are supported')
    }
    return parameter.name.text
  })

  return {
    params,
    body: convertTsExpression(expression.body),
  }
}

function convertTsExpression(expression: ts.Expression): JsExpression {
  if (ts.isParenthesizedExpression(expression)) {
    return convertTsExpression(expression.expression)
  }

  if (ts.isIdentifier(expression)) {
    return { kind: 'identifier', name: expression.text }
  }

  if (ts.isNumericLiteral(expression)) {
    return { kind: 'number', value: expression.text }
  }

  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
    return { kind: 'string', value: expression.text }
  }

  if (expression.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'boolean', value: true }
  }

  if (expression.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'boolean', value: false }
  }

  if (expression.kind === ts.SyntaxKind.NullKeyword) {
    return { kind: 'null' }
  }

  if (ts.isArrayLiteralExpression(expression)) {
    return {
      kind: 'array',
      elements: expression.elements.map((element) => {
        if (ts.isSpreadElement(element)) {
          unsupported(element, 'Spread elements are not supported')
        }
        return convertTsExpression(element)
      }),
    }
  }

  if (ts.isPropertyAccessExpression(expression)) {
    return {
      kind: 'property',
      object: convertTsExpression(expression.expression),
      property: expression.name.text,
    }
  }

  if (ts.isElementAccessExpression(expression)) {
    if (!expression.argumentExpression) {
      throw new Error('Element access requires an index expression')
    }
    return {
      kind: 'index',
      object: convertTsExpression(expression.expression),
      index: convertTsExpression(expression.argumentExpression),
    }
  }

  if (ts.isCallExpression(expression)) {
    if (expression.typeArguments && expression.typeArguments.length > 0) {
      throw new Error('Generic callback calls are not supported')
    }

    return {
      kind: 'call',
      callee: convertTsExpression(expression.expression),
      args: expression.arguments.map((argument) => convertTsExpression(argument)),
    }
  }

  if (ts.isPrefixUnaryExpression(expression)) {
    if (
      expression.operator !== ts.SyntaxKind.ExclamationToken &&
      expression.operator !== ts.SyntaxKind.MinusToken &&
      expression.operator !== ts.SyntaxKind.PlusToken
    ) {
      unsupported(expression, 'Unsupported unary operator')
    }

    const operator = ts.tokenToString(expression.operator)
    if (operator !== '!' && operator !== '-' && operator !== '+') {
      unsupported(expression, 'Unsupported unary operator')
    }

    return {
      kind: 'unary',
      operator,
      argument: convertTsExpression(expression.operand),
    }
  }

  if (ts.isBinaryExpression(expression)) {
    const operator = ts.tokenToString(expression.operatorToken.kind)
    if (
      operator !== '+' &&
      operator !== '-' &&
      operator !== '*' &&
      operator !== '/' &&
      operator !== '%' &&
      operator !== '===' &&
      operator !== '!==' &&
      operator !== '>' &&
      operator !== '>=' &&
      operator !== '<' &&
      operator !== '<=' &&
      operator !== '&&' &&
      operator !== '||'
    ) {
      unsupported(expression, `Unsupported binary operator: ${operator ?? 'unknown'}`)
    }

    return {
      kind: 'binary',
      operator,
      left: convertTsExpression(expression.left),
      right: convertTsExpression(expression.right),
    }
  }

  if (ts.isConditionalExpression(expression)) {
    return {
      kind: 'conditional',
      test: convertTsExpression(expression.condition),
      consequent: convertTsExpression(expression.whenTrue),
      alternate: convertTsExpression(expression.whenFalse),
    }
  }

  unsupported(expression)
}

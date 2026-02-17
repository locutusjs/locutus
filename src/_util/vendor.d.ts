declare module 'globby' {
  interface Globby {
    (patterns: string | readonly string[], options?: unknown): Promise<string[]>
    sync(patterns: string | readonly string[], options?: unknown): string[]
  }

  const globby: Globby
  export default globby
}

declare module 'indent-string' {
  export default function indentString(input: string, indent?: string, count?: number): string
}

declare module 'js-yaml' {
  interface YamlApi {
    dump(value: unknown, options?: unknown): string
  }

  const YAML: YamlApi
  export default YAML
}

declare module 'lodash' {
  interface LodashApi {
    flattenDeep<T>(array: unknown[]): T[]
  }

  const _: LodashApi
  export default _
}

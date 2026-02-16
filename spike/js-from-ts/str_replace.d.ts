type SearchType = string | string[]
type ReplaceType = string | string[]
type SubjectType = string | string[]
interface CountObj {
  value: number
}
export default function str_replace(
  search: SearchType,
  replace: ReplaceType,
  subject: SubjectType,
  countObj?: CountObj,
): string | string[]
export {}

import mapKeys from "lodash/mapKeys"
import camelCase from "lodash/camelCase"

const mapKeyToCamelCase = (value: any, key: string): string => camelCase(key)

// TODO: Remove casts
export function mapDbNames<T>(obj: T): T {
  return mapKeys(obj as any, mapKeyToCamelCase) as T
}

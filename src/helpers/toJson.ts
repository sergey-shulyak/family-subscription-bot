export default function toJson(value: any): string {
  return JSON.stringify(value, null, 2)
}

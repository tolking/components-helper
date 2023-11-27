import { readFileSync } from 'node:fs'

export function read(path: string): string {
  return readFileSync(path, 'utf-8')
}

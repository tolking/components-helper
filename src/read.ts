import { readFileSync } from 'fs'

export function read(path: string): string {
  return readFileSync(path, 'utf-8')
}

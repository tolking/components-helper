import { readFileSync } from 'fs'

function read(path: string) {
  return readFileSync(path, 'utf-8')
}

export default read

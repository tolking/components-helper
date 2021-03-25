import type { Config } from './type'

const config: Config = {
  titleRegExp: '#+\\s+(.*)\\n+([^(#|\\n)]*)',
  tableRegExp: '#+\\s+(.*)\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+\\n((\\|?.+\\|.+\\n)+)',
}

export default config

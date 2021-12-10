import ts from 'rollup-plugin-typescript2'

const commonConf = {
  input: './src/index.ts',
  external: ['fast-glob', 'fs', 'path'],
  plugins: [
    ts({
      extensions: ['.ts'],
      tsconfig: './tsconfig.json',
    }),
  ],
}

const list = [
  {
    file: 'lib/index.es.js',
    format: 'es',
    exports: 'named',
    compact: true,
  },
  {
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named',
    compact: true,
  },
]

const buildConf = (options) => Object.assign({}, commonConf, options)

export default list.map((output) => buildConf({ output }))

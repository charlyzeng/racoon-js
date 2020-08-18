import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { main, module } from './package.json';

export default {
  input: './lib/index.js',
  output: [
    {
      file: main,
      format: 'umd',
      name: 'racoon',
      sourcemap: 'source-map'
    },
    {
      file: 'dist/racoon.js',
      format: 'umd',
      name: 'racoon',
      sourcemap: 'source-map'
    },
    {
      file: 'dist/racoon.min.js',
      format: 'umd',
      name: 'racoon',
      plugins: [terser()],
      sourcemap: 'source-map'
    },
    {
      file: module,
      format: 'esm',
      sourcemap: 'source-map'
    }
  ],
  plugins: [
    resolve({
      extensions: ['.js']
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js']
    })
  ]
};

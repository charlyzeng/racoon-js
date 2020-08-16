import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { main, module } from './package.json';

export default {
  input: './lib/index.js',
  output: [
    {
      file: main,
      format: 'umd',
      name: 'racoon'
    },
    {
      file: module,
      format: 'esm'
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

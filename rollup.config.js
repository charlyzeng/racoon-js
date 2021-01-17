import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { main, module } from './package.json';

export default {
  input: './lib/index.js',
  output: [
    // For using in nodejs, or using in browser by webpack, rollup, or other
    // bundle tools.
    {
      file: main,
      format: 'umd',
      name: 'racoon',
      sourcemap: 'source-map',
    },

    // For using in browser imported that imported by script tag.
    {
      file: 'dist/racoon.min.js',
      format: 'umd',
      name: 'racoon',
      plugins: [terser()],
      sourcemap: 'source-map',
    },

    // For using that imported by es5 module.
    {
      file: module,
      format: 'esm',
      sourcemap: 'source-map',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
  ],
};

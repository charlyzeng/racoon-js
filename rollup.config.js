import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: './lib/index.js',
  output: [
    {
      file: 'dist/racoon.umd.js',
      format: 'umd',
      name: 'racoon'
    },
    {
      file: 'dist/racoon.esm.js',
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

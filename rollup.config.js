import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import extensions from './extensions';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
  //  extensions({extensions: ['.js', '.jsx']}),
    external(),
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
};

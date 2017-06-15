import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/js/es6/ts/main.js',
  dest: './src/js/es5/main.js',
  format: 'iife',
  plugins: [ 
	buble(),
	babel({
      exclude: 'node_modules/**',
	  plugins: ['external-helpers'],
      externalHelpers: true
    }),
	eslint({
      //exclude: [
      //  'src/styles/**',
      //]
    }),
	uglify()
  ]
};

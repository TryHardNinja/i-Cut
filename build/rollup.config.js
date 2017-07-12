﻿import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/js/index.js',
  dest: './dist/js/index.js',
  // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
  // amd – 使用像requirejs一样的银木块定义
  // cjs – CommonJS，适用于node和browserify / Webpack ,还有必须添加 moduleName 字段。
  // es6 (default) – 保持ES6的格式
  // iife – 使用于<script> 标签引用的方式
  // umd – 适用于CommonJs和AMD风格通用模式
  format: 'iife',
  plugins: [ 	
	uglify()
  ]
};
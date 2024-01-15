import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'lib/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.min.js',
      plugins: [terser()]
    }, 
    {
      dir: 'dist',
      format: 'iife',
      entryFileNames: '[name].iife.min.js',
      name: 'DataSynchronizer',
      plugins: [terser()]
    },
    {
      dir: 'dist',
      format: 'amd',
      entryFileNames: '[name].amd.min.js',
      plugins: [terser()]
    },
    {
      dir: 'dist',
      format: 'umd',
      name: 'DataSynchronizer',
      entryFileNames: '[name].umd.min.js',
      plugins: [terser()]
    },
    {
      dir: 'dist',
      format: 'umd',
      entryFileNames: '[name].min.js',
      name: 'DataSynchronizer',
      plugins: [terser()]
    },
    {
      dir: 'dist',
      format: 'system',
      entryFileNames: '[name].system.min.js',
      plugins: [terser()]
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json'
    }),
    babel({
      configFile: "babel.config.js",
      exclude: "node_modules/**",
      babelHelpers: "runtime"
    })
    // getBabelOutputPlugin(
    //   {
    //     presets: [
    //       [
    //         "@babel/preset-env",
    //         {
    //           targets: "> 1%, last 2 versions, not ie <= 8",
    //           modules: false,
    //           useBuiltIns: "usage",
    //           corejs: 3,
    //         },
    //       ],
    //       // [
    //       "@babel/preset-typescript",
    //         // {
    //         //   allowDeclareFields: true,
    //         // }
    //       // ]
    //     ],
    //     plugins: [
    //       "@babel/plugin-external-helpers",
    //       [
    //         "@babel/transform-runtime",
    //         {
    //           "useESModules": true
    //         }
    //       ]
    //     ],
    //   }      
    // )
  ],
};
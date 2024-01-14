import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

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
    }
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json'
    })
  ],
};
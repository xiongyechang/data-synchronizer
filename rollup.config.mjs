import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import path from 'node:path';

const dist = 'dist';

const resolvePath = (filename) => path.join(process.cwd(), filename);

export default {
  input: 'lib/index.ts',
  output: [
    {
      dir: dist,
      format: 'esm',
      entryFileNames: '[name].esm.min.js',
      plugins: [terser()]
    },
    {
      dir: dist,
      format: 'esm',
      entryFileNames: '[name].esm.js',
    },
    {
      dir: dist,
      format: 'cjs',
      entryFileNames: '[name].cjs.min.js',
      plugins: [terser()]
    },
    {
      dir: dist,
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
    },
    {
      dir: dist,
      format: 'amd',
      entryFileNames: '[name].amd.js',
      plugins: [terser()]
    },
    {
      dir: dist,
      format: 'amd',
      entryFileNames: '[name].amd.js',
      plugins: [terser()]
    },
    {
      dir: dist,
      format: 'umd',
      entryFileNames: '[name].umd.js',
      name: "DataSynchronizer",
      plugins: [terser()]
    },
    {
      dir: dist,
      format: 'umd',
      entryFileNames: '[name].umd.js',
      name: "DataSynchronizer"
    },
  ],
  plugins: [
    getBabelOutputPlugin({
      configFile: resolvePath("babel.config.js"),
      allowAllFormats: true,
    }),
    typescript({
      tsconfig: resolvePath('tsconfig.json'),
    }),
  ],
};
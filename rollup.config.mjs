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
  ],
  plugins: [
    getBabelOutputPlugin({
      configFile: resolvePath("babel.config.js"),
    }),
    typescript({
      tsconfig: resolvePath('tsconfig.json'),
    }),
  ],
};
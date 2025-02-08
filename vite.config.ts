import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'List',
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
    extensions: ['.ts'],
  },
  plugins: [dts()],
});

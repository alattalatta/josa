import path from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    minify: false,
    sourcemap: true,
    target: 'esnext',
  },
  plugins: [dts({ rollupTypes: true })],
})

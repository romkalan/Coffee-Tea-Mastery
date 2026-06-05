import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from 'vite'

const base = '/Coffee-Tea-Mastery/';

const fixImagePathsPlugin: Plugin = {
  name: 'fix-image-paths',
  apply: 'build',
  renderChunk(code, _chunk) {
    if (code.includes('"/images/')) {
      return code.replace(/"(?=\/images\/)/g, `"${base.slice(0, -1)}`);
    }
    return null;
  },
};

export default defineConfig({
  plugins: [
    react(),
    fixImagePathsPlugin,
  ],
  envPrefix: 'VITE_',
  base,
  build: {
    outDir: 'docs',
  },
})

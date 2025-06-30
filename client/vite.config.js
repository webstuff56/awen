import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'warn-about-case-insensitive-imports',
      resolveId(source, importer) {
        if (importer && source.startsWith('.')) {
          const absolutePath = path.resolve(path.dirname(importer), source);
          const directory = path.dirname(absolutePath);
          const basename = path.basename(absolutePath);
          const files = fs.readdirSync(directory);
          const matchingFile = files.find(file => file.toLowerCase() === basename.toLowerCase());
          if (matchingFile && matchingFile !== basename) {
            console.warn(
              `Warning: Case-insensitive import detected. "${basename}" imported, but "${matchingFile}" exists.`
            );
          }
        }
      },
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});





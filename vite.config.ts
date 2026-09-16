import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'sync-scene-image-endpoint',
        configureServer(server) {
          server.middlewares.use('/api/sync-scene-image', (req, res) => {
            if (req.method === 'POST') {
              const chunks: Buffer[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', () => {
                try {
                  const { key, dataUrl } = JSON.parse(Buffer.concat(chunks).toString());
                  if (key && dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
                    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                    const buffer = Buffer.from(base64Data, 'base64');
                    const filename = `${key}.jpg`;
                    const publicDir = path.resolve(__dirname, 'public/images');
                    if (!fs.existsSync(publicDir)) {
                      fs.mkdirSync(publicDir, { recursive: true });
                    }
                    fs.writeFileSync(path.resolve(publicDir, filename), buffer);
                    fs.writeFileSync(path.resolve(publicDir, `${key.toLowerCase()}.jpg`), buffer);
                    fs.writeFileSync(path.resolve(publicDir, `${key}.jpeg`), buffer);
                    fs.writeFileSync(path.resolve(publicDir, `${key.toLowerCase()}.jpeg`), buffer);

                    const distDir = path.resolve(__dirname, 'dist/images');
                    if (fs.existsSync(distDir)) {
                      fs.writeFileSync(path.resolve(distDir, filename), buffer);
                      fs.writeFileSync(path.resolve(distDir, `${key.toLowerCase()}.jpg`), buffer);
                      fs.writeFileSync(path.resolve(distDir, `${key}.jpeg`), buffer);
                      fs.writeFileSync(path.resolve(distDir, `${key.toLowerCase()}.jpeg`), buffer);
                    }
                    console.log(`[Sync] Saved ${key} to disk (${buffer.length} bytes)`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, key, size: buffer.length }));
                    return;
                  }
                } catch (err) {
                  console.error('[Sync] Error saving scene image:', err);
                }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to process image' }));
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import deno from '@deno/vite-plugin';

import 'react';
import 'react-dom';

// same backend the app talks to via same-origin /api in production (see
// default.conf.template); override for local dev with BACKEND_URL=... deno task dev
const backendTarget = process.env.BACKEND_URL ?? 'http://localhost:7000';

export default defineConfig({
    root: './client',
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: backendTarget,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    plugins: [react(), deno()],
    optimizeDeps: {
        include: ['react/jsx-runtime'],
    },
});

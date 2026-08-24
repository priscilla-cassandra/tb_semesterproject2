import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        login: resolve(import.meta.dirname, 'html-pages/login.html'),
        register: resolve(import.meta.dirname, 'html-pages/register.html'),
        profile: resolve(import.meta.dirname, 'html-pages/profile.html'),
        editprofile: resolve(
          import.meta.dirname,
          'html-pages/editprofile.html',
        ),
        createlisting: resolve(
          import.meta.dirname,
          'html-pages/createlisting.html',
        ),
        editlisting: resolve(
          import.meta.dirname,
          'html-pages/editlisting.html',
        ),
        singlelisting: resolve(
          import.meta.dirname,
          'html-pages/singlelisting.html',
        ),
      },
    },
  },
});

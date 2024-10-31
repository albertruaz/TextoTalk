import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [solid()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  // server: {
  //   host: '0.0.0.0', // 네트워크 외부에서 접속 가능하도록 설정
  //   port: 5173, // 기본 포트
  // },
});

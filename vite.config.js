import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 获取当前路径
import path from 'path'
// 获取当前路径
const resolve = (dir) => {
  return path.join(__dirname, dir);
};


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@':  resolve('src'),
    },
  },
})

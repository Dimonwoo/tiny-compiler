import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path"; // 导入 path 模块，帮助我们解析路径

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  Components({
    resolvers: [NaiveUiResolver({ importStyle: true, resolveIcons: true })]
  })],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  base: './'
})

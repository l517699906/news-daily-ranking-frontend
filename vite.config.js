import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy: {
      // 使用 "/api" 作为前缀的请求会被转发到下面的 target 地址
      '/api': {
        target: 'http://localhost:8080/api',  // 后端目标接口地址
        changeOrigin: true,  // 是否改变源
      },
    }
  },
  build: {
    sourcemap: false, // 不生成 source map 文件
    rollupOptions: {
      output: {
        // 去除文件名中的 hash
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    },
    // 控制依赖的转译
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  css: {
    // 控制 CSS 的文件名 hash
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
});
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    VueRouter({}),
    vue(),
    Components({ resolvers: [HeadlessUiResolver(), ElementPlusResolver()] }),
    AutoImport({
      imports: ['vue', '@vueuse/head', VueRouterAutoImports],
      resolvers: [ElementPlusResolver()]
    }),
  ],
  server: {
    open: true,
  },
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
// @ts-ignore
import { resolve } from 'path'

// const viteSvgIcons = createSvgIconsPlugin({
//   // Specify the icon folder to be cached
//   iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
//   // Specify symbolId format
//   symbolId: 'icon-[dir]-[name]',
// })

export default defineConfig({
  plugins: [
    VueRouter({}),
    vue(),
    Components({ resolvers: [HeadlessUiResolver(), ElementPlusResolver()] }),
    AutoImport({
      imports: ['vue', '@vueuse/head', VueRouterAutoImports],
      resolvers: [ElementPlusResolver()]
    }),
    // viteSvgIcons,
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['@/../lib/vform3/designer.umd']
  },
  server: {
    open: true,
  },
})

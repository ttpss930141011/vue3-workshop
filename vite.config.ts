import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import mkcert from 'vite-plugin-mkcert'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import setting from './src/settings'
// import { visualizer } from 'rollup-plugin-visualizer'
const prodMock = setting.openProdMock
const devMock = setting.openDevMock
const pathSrc = resolve(__dirname, 'src')
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '') //獲取環境變量
  console.log(command, mode)
  return {
    base: setting.viteBasePath,
    define: {
      //define global var
      GLOBAL_STRING: JSON.stringify('i am global var from vite.config.js define'),
      GLOBAL_VAR: { test: 'i am global var from vite.config.js define' }
    },
    clearScreen: false, //設為 false 可以避免 Vite 清屏而錯過在終端中打印某些關鍵信息
    server: {
      hmr: { overlay: false }, //設置 server.hmr.overlay 為 false 可以禁用開發服務器錯誤的屏蔽。方便錯誤查看
      port: 5003, // 類型： number 指定服務器端口;
      open: false, // 類型： boolean | string在服務器啟動時自動在瀏覽器中打開應用程序；
      host: true,
      https: false,
      proxy: {
        '/api': {
          target: env.VITE_APP_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    preview: {
      port: 5006,
      host: true,
      strictPort: true
    },
    plugins: [
      vue({ reactivityTransform: true }),
      vueJsx(),
      UnoCSS({
        presets: [presetUno(), presetAttributify(), presetIcons()]
      }),
      DefineOptions(),
      mkcert(),
      //compatible with old browsers
      // legacy({
      //   targets: ['chrome 52'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/icons/common'), resolve(process.cwd(), 'src/icons/nav-bar')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // VueSetupExtend(),using  DefineOptions instant of it
      //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
      Components({
        dirs: ['src/components', 'src/icons'],
        extensions: ['vue'],
        deep: true,
        dts: './typings/components.d.ts'
      }),
      viteMockServe({
        supportTs: true,
        mockPath: 'mock',
        localEnabled: command === 'serve' && devMock,
        prodEnabled: prodMock,
        injectCode: `
          import { setupProdMockServer } from '../mock-prod-server';
          setupProdMockServer();
        `,
        logger: true
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'pinia/dist/pinia': ['storeToRefs']
          }
        ],
        //設定後會自動掃描目錄下的文件
        dirs: ['src/hooks/**', 'src/utils/**', 'src/store/**', 'src/api/**', 'src/directives/**'],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './eslintrc/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: './typings/auto-imports.d.ts'
      }),
      // auto config of index.html title
      createHtmlPlugin({
        inject: { data: { title: setting.title } }
      })
      //依賴分析插件
      // visualizer({
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true
      // })
    ],
    build: {
      chunkSizeWarningLimit: 10000, //消除觸發警告的 chunk, 默認500k
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@/': `${pathSrc}/`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' //remove i18n waring
      }
    },
    optimizeDeps: {
      //include: [...optimizeDependencies,...optimizeElementPlus] //on-demand element-plus use this
      include: ['moment-mini']
    }
  }
})

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import commonjs from '@rollup/plugin-commonjs'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from "path"

export default defineConfig({
  transpileDependencies: ['uview-plus', 'luch-request', '@dcloudio/uni-ui'],
  resolve: { // 这里配置需要注意：Vite新版本resolve配置改为对象形式，如下：
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, "src"),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, "src/components"),
      },
      {
        find: '@apis',
        replacement: resolve(__dirname, "src/apis"),
      },
      {
        find: '@views',
        replacement: resolve(__dirname, "src/views"),
      },
      {
        find: '@stores',
        replacement: resolve(__dirname, "src/stores"),
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, "src/utils"),
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, 'src/hooks')
      },
      {
        find: '@constants',
        replacement: resolve(__dirname, 'src/constants')
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, 'src/utils')
      }
    ],
  },
  plugins: [
    commonjs(),
    UnoCSS(),
    AutoImport({
      imports:["vue","vue-router"],
      dts:'src/auto-import.d.ts'    // 路径下自动生成文件夹存放全局指令
    }),
    uni(),
  ]
})

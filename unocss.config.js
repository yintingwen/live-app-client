import { defineConfig } from 'unocss/vite'
import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default defineConfig({
  presets: [
    presetWeapp()
  ],
  rules: [
    [/^p-(\d+)$/, match => ({ padding: `${match[1]}rpx` })],
    [/^pl-(\d+)$/, match => ({ ['padding-left']: `${match[1]}rpx` })],
    [/^pr-(\d+)$/, match => ({ ['padding-right']: `${match[1]}rpx` })],
    [/^pt-(\d+)$/, match => ({ ['padding-top']: `${match[1]}rpx` })],
    [/^pb-(\d+)$/, match => ({ ['padding-bottom']: `${match[1]}rpx` })],
  ],
  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ]
})
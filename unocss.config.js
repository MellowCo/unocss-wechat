import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer';

const include = [/\.wxml$/]

export default defineConfig(
  {
    include,
    presets: [
      presetWeapp(),
    ],

    transformers: [
      transformerClass({
        include,
        classTags: false
      })
    ]
  }
)

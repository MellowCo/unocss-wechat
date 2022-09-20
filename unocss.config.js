import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer';

export default defineConfig(
  {
    presets: [
      presetWeapp(),
    ],
    
    transformers:[
      transformerClass({
        include: [/\.wxml$/,]
      })
    ]
  }
)

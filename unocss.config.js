import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'

const include = [/\.wxml$/]

export default defineConfig({
    content:{
      pipeline:{
        include
      }
    },
    presets: [
      presetWeapp(),
    ],
    separators:'__',
  })

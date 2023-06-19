import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'

const include = [/\.wxml$/]

export default defineConfig(
  {
    include,
    presets: [
      presetWeapp(),
    ],
  }
)

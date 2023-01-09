
<H1 align='center'>
unocss-wechat
</H1>


<p align='center'>
<b>English</b> | <a href="https://github.com/MellowCo/unocss-wechat/blob/main/readme.zh-CN.md">简体中文</a>
</p>

miniprogram，unocss example

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141354363.gif)

---

related links
* [UnoCSS](https://github.com/unocss/unocss) - the instant on-demand atomic css engine.
* [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) - the unocss preset for wechat miniprogram.

---
## Usage
1. [use npm in miniprogram](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)，install `unocss unocss-preset-weapp`

```shell
npm -D i unocss unocss-preset-weapp
```

---
2. unocss.config.js
```js
import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig(
  {
    include: [/\.wxml$/],
    presets: [
      presetWeapp(),
    ],
  }
)
```

---
3. `package.json`，setting `script`
> use `@unocss/cli` to listen to file content，[documents](https://github.com/unocss/unocss/tree/main/packages/cli)
```json
{
  "devDependencies": {
    "unocss": "^0.45.21",
    "unocss-preset-weapp": "^0.1.13"
  },
  "scripts": {
     "unocss": "unocss pages/**/*.wxml -c unocss.config.js --watch -o unocss.wxss",
     "unocss:build": "unocss pages/**/*.wxml -c unocss.config.js -o  unocss.wxss"
  }
}
```


---
4. run `npm run unocss`
> `wxml` content changes, trigger the generation of new `unocss.wxss`

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141401533.png)


---
5. import `unocss.wxss`
>  in `app.wxss`, impoort generated ` unocss.wxss`

```css
/**app.wxss**/
@import "./unocss.wxss";

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 200rpx 0;
  height: 100%;
}
```

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141354363.gif)

---

## Notice
because the miniprogram does not support escape class, like `\` `\:` `\[` `\$` `\.`

`bg-#81ecec/50` need transform  `bg-hex-81ecec_50`，or use transformer

---
use vscode `unocss` plugin

1. vscode `settings.json`
```json
"files.associations": {
  "*.wxml": "html",
},
```

2. unocss.config.js setting `include`
```js
import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig(
  {
    include: [/\.wxml$/],
    presets: [
      presetWeapp(),
    ],
  }
)
```

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209212036840.gif)

---

## Transformer
@unocss/cli with [0.45.22](https://github.com/unocss/unocss/releases/tag/v0.45.22) version can use `transformer`

* unocss.config.js
> add `transformerClass`，setting include `wxml`
```js
import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer';

const include = [/\.wxml$/]

export default defineConfig({
  include,
  presets: [
    presetWeapp(),
  ],
  
  transformers:[
    transformerClass({
      include
    })
  ]
})
```

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209212019320.gif)




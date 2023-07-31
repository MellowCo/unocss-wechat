<H1 align='center'>
unocss-wechat
</H1>


<p align='center'>
<a href="https://github.com/MellowCo/unocss-wechat/blob/main/readme.md">English</a> | <b>简体中文</b>
</p>

原生小程序，unocss示例

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141354363.gif)

---

相关链接
* [UnoCSS](https://github.com/unocss/unocss) - 即时按需原子CSS引擎
* [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) - unocss小程序预设

---
## 设置 unocss 预设

> 两种方法任选一种

### 方法一： 使用通用配置

> 此方法使用 `unocss` 内置预设，通过以下配置解决
>
> 1. 解决小程序不支持 * 选择器
> 2. rem单位 转 rpx

1. [小程序中使用npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)，安装 `unocss`

```sh
npm -D unocss
```



2. unocss.config

```js
import { defineConfig, presetUno } from "unocss";

const remRE = /^-?[\.\d]+rem$/

export default defineConfig({
    presets: [
      presetUno(),
    ],
    theme:{
      // 解决小程序不支持 * 选择器
      preflightRoot: ["page,::before,::after"]
    },
    postprocess(util) {
      // 自定义rem 转 rpx
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string' && remRE.test(value))
          i[1] = `${value.slice(0, -3) * 16 * 2}rpx`
      })
    },
  })
```



---

### 方法二：使用 unocss-preset-weapp 预设

> `unocss-preset-weapp` 内部已经解决小程序不兼容的相关问题
>
> 由于小程序不支持 \\ \\: \\[ \\$ \\. 等转义类名, 

- 使用 `hex` 代替 `#` , `_` 代替 `:`  `/`
    * 例如 `bg-#81ecec/50` 可以使用 `bg-hex-81ecec_50` 表示

- 针对 `hover:` 和 `avtive:`, 可以设置 `separators` 指定分隔符
    * 例如设置 `separators` 为 `__`，`hover:bg-red-500` 可以使用 `hover__bg-red-500` 表示



1. [小程序中使用npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)，安装 `unocss unocss-preset-weapp`

```shell
npm -D unocss unocss-preset-weapp
```

---
2. unocss.config

```js
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
  separators:'__'
})
```

---
## 生成wxss文件

3. 在`package.json`，设置 `script`

> 使用 `@unocss/cli` 监听文件内容，[参考文档](https://github.com/unocss/unocss/tree/main/packages/cli)
```json
{
  "scripts": {
     "unocss": "unocss pages/**/*.wxml -c unocss.config.js --watch -o unocss.wxss",
     "unocss:build": "unocss pages/**/*.wxml -c unocss.config.js -o  unocss.wxss"
  }
}
```


---
4. 运行 `npm run unocss`
> `wxml` 内容变化，触发生成新的 `unocss.wxss`

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141401533.png)


---
5. 导入 `unocss.wxss`
> 在 `app.wxss` 导入生成的 `unocss.wxss`

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

## unocss插件

* vscode `settings.json`

```json
  // 文件类型
"files.associations": {
  "*.wxml": "html",
},
```

<img src="https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209212036840.gif" style="zoom:50%;" />



---

## 使用 transformer
> `transformer` 可以将 `小程序不支持 \\ \\: \\[ \\$ \\. 等转义类名`，根据规则替换

> 原生小程序使用 `transformer` 会改变原文件，不推荐使用

* unocss.confit.js
> 添加 `transformerClass`，设置转换 `wxml` 文件
```js
import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer';

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
  
  transformers:[
    transformerClass({
      include,
      classTags: false
    })
  ]
})
```

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209212019320.gif)


## 其它说明

- 原生小程序暂不支持 `box-shadow` 连体写法，像是`,`, `[` 这些符合因为平台限制，无法走 `transformer`，所以没有什么好的办法。建议使用[内置预设](https://github.com/MellowCo/unocss-preset-weapp#box-shadow), 如果无法满足需要，也可以直接写css。相关讨论：[issues](https://github.com/MellowCo/unocss-preset-weapp/issues/92)。



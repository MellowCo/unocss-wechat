# unocss-wechat

原生小程序，unocss示例

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141354363.gif)


相关链接
* [UnoCSS](https://github.com/unocss/unocss) - 即时按需原子CSS引擎
* [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) - UnoCSS 微信小程序预设
* [unplugin-transform-we-class](https://github.com/MellowCo/unplugin-transform-we-class) - 小程序原子化 CSS 转换转义类名插件
* [unplugin-unocss-attributify-wechat](https://github.com/MellowCo/unplugin-unocss-attributify-wechat) - 小程序 Attributify Mode 插件
* [unocss-webpack-uniapp2](https://github.com/MellowCo/unocss-webpack-uniapp2#unocss-webpack-uniapp2) - 兼容 UniApp Vue2 App开发插件
* [uni-vue3-starter](https://github.com/MellowCo/uni-vue3-starter) - Uniapp-Vite 模版
* 原子化css冲突问题，例 [tmui](https://tmui.design/) 内置 [原子化css](https://tmui.design/doc/CSSTool/css.html) 与 unocss 冲突问题，[解决方案](https://github.com/MellowCo/unplugin-unocss-attributify-wechat#%E5%8E%9F%E5%AD%90%E5%8C%96-css-%E5%86%B2%E7%AA%81%E9%97%AE%E9%A2%98)

---
## 使用方法
1. [小程序中使用npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)，安装 `unocss unocss-preset-weapp`

```shell
npm -D unocss unocss-preset-weapp
```

---
2. unocss.config.js
```js
import { defineConfig } from "unocss";
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig(
  {
    presets: [
      presetWeapp(),
    ],
  }
)
```

---
3. 在`package.json`，设置 `script`
> 使用 `@unocss/cli` 监听文件内容，[参考文档](https://github.com/unocss/unocss/tree/main/packages/cli)
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

## 注意事项
由于小程序不支持 \\ \\: \\[ \\$ \\. 等转义类名

`bg-#81ecec/50` 需要转为为 `bg-hex-81ecec_50`

# unocss-wechat

原生小程序，unocss示例
![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141354363.gif)


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
4. 导入 `unocss.wxss`
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

---

5. 运行 `npm run unocss`
> wxml 内容变化，触发生成新的 wxss
![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141401533.png)

![](https://fastly.jsdelivr.net/gh/MellowCo/image-host/2022/202209141354363.gif)

---

## 注意事项
由于小程序不支持 \\ \\: \\[ \\$ \\. 等转义类名

`bg-#81ecec/50` 需要转为为 `bg-hex-81ecec_50`

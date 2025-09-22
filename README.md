# @alitojs/command-design

## 使用教程

#### 执行命令

```
yarn add @alitojs/command-design

<!-- yarn add babel-plugin-import -D -->
```

<!-- #### 在 `.babelrc.js` 或 `babel.config.js` 下引入：

```js
module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import',
      {
        libraryName: '@alitojs/command-design',
        camel2DashComponentName: false,
        camel2UnderlineComponentName: false,
        style: (name) => {
          const cssName = name.split('/')[2];
          return `@alitojs/command-design/lib/style/${cssName}.css`;
        }
      }
    ]
  ]
};
``` -->

#### 使用

```js
<template>
<ColorTitle title='EanUI'/>
</template>

import { ColorTitle } from "@alitojs/components";
<script>
export default {
    components: { ColorTitle }
}
</script>
```

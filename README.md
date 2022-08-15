## install

```bash
pnpm i uno-preset-dark-theme -D
```

## config

```ts
export default defineConfig({
  rules: [],
  theme: {},
  presets: [
    presetTheme({
      element: "body",
      theme: {
        dark: {
          colors: {
            primary: "#e67e22",
            black: "#17171a",
          },
        },
        light: {
          colors: {
            primary: "#e67e22",
            black: "#17171a",
          },
        },
      },
    }),
    // other preset, such as PresetWind
    // but, this preset should be used with other presets
  ],
});
```

## usage

```tsx
// default: light
<body>
  <div className="bg-xxx"></div>
</body>
// default: dark
<body data-theme='dark'>
  <div className="bg-xxx"></div>
</body>
```

### arco palette

Now, support arco palette.

```ts
presetTheme({
  element: "body",
  enableArco: true,//SET to true
  // if arcoPalette empty, will use default
  // see: https://arco.design/palette/list
  arcoPalette: `{"light":{"red":["#FFECE8","#FDCDC5","#FBACA3","#F98981","#F76560","#F53F3F","#CB272D","#A1151E","#770813","#4D000A"]},"dark":{"red":["#4D000A","#770611","#A1161F","#CB2E34","#F54E4E","#F76965","#F98D86","#FBB0A7","#FDD1CA","#FFF0EC"]}}`,
}),
```


### Copyright

this code copied from [unocss/unocss](https://github.com/unocss/unocss/blob/7ac234c27a8d7d087523f0be313b154a1fd4afe7/packages/preset-theme/src/index.ts)

And, I modified something...

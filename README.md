## install

```bash
pnpm i uno-preset-dark-theme -D
```

## config

```ts
export default defineConfig({
  rules: [],
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
  presets: [
    presetTheme({
      element: "body",
    }),
    // other preset, such as PresetWind
    // but, this preset should be used with other presets
  ],
});
```

### Copyright

this code copied from [unocss/unocss](https://github.com/unocss/unocss/blob/7ac234c27a8d7d087523f0be313b154a1fd4afe7/packages/preset-theme/src/index.ts)

And, I modified something...

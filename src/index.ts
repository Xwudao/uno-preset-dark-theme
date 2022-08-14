import type { Preset } from "@unocss/core";
import { mergeDeep } from "@unocss/core";
import type { Theme } from "@unocss/preset-mini";
export interface PresetTheme {
  // theme object
  theme: Record<"dark" | "light", Theme>;
  // default: --un-preset-theme
  prefix?: string;
  // generated style attach to which element
  // eg: body{--var-name:'#fff'}
  //     body[data-theme="dark"]{--var-name:'#000'}
  element?: string;
}

export const presetTheme = (options: PresetTheme): Preset<Theme> => {
  const { prefix = "--un-preset-theme", element = "body" } = options;
  const { dark, light } = options.theme;
  // const themeValues = new Map<
  //   string,
  //   {
  //     light?: string;
  //     dark?: string;
  //   }
  // >();
  // const varsRE = new RegExp(`var\\((${prefix}.*)\\)`);

  const lightPreflightCss: string[] = [];
  const darkPreflightCss: string[] = [];

  const getTheme = (theme: any, keys: string[]) => {
    for (const key of keys) {
      theme = theme[key];
      if (theme === undefined) return;
    }
    return theme;
  };

  const recursiveTheme = (
    theme: Record<string, any>,
    preKeys: string[] = []
  ) => {
    Object.keys(theme).forEach((key) => {
      const val = Reflect.get(theme, key);
      const nextKeys = preKeys.concat(key);

      if (typeof val !== "object" && !Array.isArray(val)) {
        const varName = `${prefix}-${nextKeys.join("-")}`;

        lightPreflightCss.push(`${varName}: ${getTheme(light, nextKeys)}`);
        darkPreflightCss.push(`${varName}: ${getTheme(dark, nextKeys)}`);

        theme[key] = `var(${varName})`;
      } else {
        recursiveTheme(val, nextKeys);
      }
    });
    return theme;
  };

  const theme = recursiveTheme(mergeDeep(dark, light));

  return {
    name: "@unocss/preset-theme",
    theme: { ...theme },
    preflights: [
      {
        layer: "theme",
        async getCSS() {
          return `${element}{${lightPreflightCss.join(";")}}\n
          ${element}[data-theme='dark']{${darkPreflightCss.join(";")}}`;
        },
      },
    ],
    prefix: options.prefix,
  };
};

export default presetTheme;

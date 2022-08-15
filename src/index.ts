import type { Preset } from "@unocss/core";
import { mergeDeep } from "@unocss/core";
import type { Theme } from "@unocss/preset-mini";
import fs from "fs-extra";
import path from "path";
import presetArcoPalette from "./data/arco-palette.json";
import { formatArco } from "./format";
export interface PresetTheme {
  // theme object
  theme: Record<"dark" | "light", Theme>;
  // default: --un-preset-theme
  prefix?: string;
  // generated style attach to which element
  // eg: body{--var-name:'#fff'}
  //     body[data-theme="dark"]{--var-name:'#000'}
  element?: string;
  enableArco?: boolean;
  // arco raw palette
  arcoPalette?: string;
}

export const presetTheme = (options: PresetTheme): Preset<Theme> => {
  const {
    prefix = "--un-preset-theme",
    element = "body",
    enableArco = false,
    arcoPalette,
  } = options;
  options.theme = options.theme || {};
  if (enableArco) {
    let data = arcoPalette ? JSON.parse(arcoPalette) : presetArcoPalette;
    let formatedArcoPalette = formatArco(data as any);
    options.theme = mergeDeep(options.theme, formatedArcoPalette);
  }
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
        const short = +key / 100; // eg: 800 -> 8
        if (short === Math.round(short)) theme[short] = theme[key];
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

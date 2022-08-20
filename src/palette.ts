import { mergeDeep } from "@unocss/core";
import { parseColor, parseCssColor } from "@unocss/preset-mini/utils";
type Colors = Record<string, string | Record<string, string>>;
const processPalette = (
  palette: Record<"dark" | "light", Colors>,
  prefix: string,
  element: string
) => {
  const { dark, light } = palette;
  const lightPreflightCss: string[] = [];
  const darkPreflightCss: string[] = [];
  const varNameList: string[] = [];

  const getTheme = (theme: any, keys: string[]) => {
    for (const key of keys) {
      theme = theme[key];
      if (theme === undefined) return;
    }
    return parseCssColor(theme)?.components || "";
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
        varNameList.push(varName);

        theme[key] = `var(${varName})`;
        const short = +key / 100; // eg: 800 -> 8
        if (short === Math.round(short)) theme[short] = theme[key];
      } else {
        recursiveTheme(val, nextKeys);
      }
    });
    return theme;
  };

  return {
    colors: recursiveTheme(mergeDeep(dark, light)),
    css: `${element}{${lightPreflightCss.join(";")}}\n
    ${element}[data-theme='dark']{${darkPreflightCss.join(";")}}`,
    varNameList: varNameList,
  };
};

export { processPalette };

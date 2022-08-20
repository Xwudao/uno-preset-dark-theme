import { test, describe } from "vitest";
import { presetTheme, PresetTheme } from "../src/index";
describe("it", () => {
  test("should first", () => {
    const theme: PresetTheme = {
      theme: {
        dark: {},
        light: {},
      },
      pureCssVariables: {
        green: "var(--un-preset-theme-primary)",
      },
    };
    console.log(presetTheme(theme));
  });
});

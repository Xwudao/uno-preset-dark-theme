import { describe, expect, test } from "vitest";
import { processPalette } from "../src/palette";

describe("test-process", () => {
  test("should first", () => {
    let res = processPalette(
      {
        dark: {
          green: "#f1f1f1",
        },
        light: {
          green: "rgb(233,233,222)",
        },
      },
      "--test",
      "body"
    );
    console.log(res);
  });
});

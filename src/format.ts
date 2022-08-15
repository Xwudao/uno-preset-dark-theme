const formatArco = (arcoPalette: { dark: any; light: any }) => {
  const { dark, light } = arcoPalette;
  const darkKeys = Object.keys(dark);
  const lightKeys = Object.keys(light);
  const arco = { dark: { colors: {} }, light: { colors: {} } }; //{dark:{colors:{}},light:{colors:{}}}
  const formatColors = (keys: string[], dk: "dark" | "light") => {
    let colors = {} as any;
    keys.forEach((key) => {
      let val = [] as string[];
      switch (dk) {
        case "dark":
          val = Reflect.get(dark, key) as string[];
          break;
        case "light":
          val = Reflect.get(light, key) as string[];
          break;
      }
      colors[key] = {};
      val.forEach((v, i) => {
        let k = i + 1;
        if (k < 6) colors[key][k * 100] = v;
        if (k == 6) colors[key][`DEFAULT`] = v;
        if (k > 6) colors[key][(k - 1) * 100] = v;
      });
    });
    return colors;
  };

  let darkColors = formatColors(darkKeys, "dark");
  let lightColors = formatColors(lightKeys, "light");
  arco["dark"]["colors"] = darkColors;
  arco["light"]["colors"] = lightColors;
  return arco;
};
export { formatArco };

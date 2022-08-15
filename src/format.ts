const formatArco = (arcoPalette: { dark: any; light: any }) => {
  const { dark, light } = arcoPalette;
  const darkKeys = Object.keys(dark);
  const lightKeys = Object.keys(light);
  const arco = { dark: { colors: {} }, light: { colors: {} } }; //{dark:{colors:{}},light:{colors:{}}}
  const formatColors = (keys: string[]) => {
    let colors = {} as any;
    keys.forEach((key) => {
      const val = Reflect.get(dark, key) as string[];
      colors[key] = {};
      val.forEach((v, i) => {
        if (i < 6) colors[key][(i + 1) * 100] = v;
        if (i == 6) colors[key][`DEFAULT`] = v;
        if (i > 6) colors[key][(i - 1) * 100] = v;
      });
    });
    return colors;
  };

  let darkColors = formatColors(darkKeys);
  let lightColors = formatColors(lightKeys);
  arco["dark"]["colors"] = darkColors;
  arco["light"]["colors"] = lightColors;
  return arco;
};
export { formatArco };

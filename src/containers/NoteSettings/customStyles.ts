import { paletteColors } from '../../assets/DefaultTheme';
import { ColorName, ColorPrefix, CustomColor } from '../../patterns';

const generateCustomColors = (): {
  [key in CustomColor]: React.CSSProperties;
} => {
  const customColorStyle: {
    [key in CustomColor]: React.CSSProperties;
  } = {} as {
    [key in CustomColor]: React.CSSProperties;
  };
  const colorEntries = Object.entries(paletteColors);
  colorEntries.reduce((_, colors) => {
    const [colorName, colorValue] = colors as [ColorName, string];
    const prefixes: [
      Extract<ColorPrefix, 'COLOR'>,
      Extract<ColorPrefix, 'BG-COLOR'>
    ] = ['COLOR', 'BG-COLOR'];
    const colorPrefix = `${prefixes[0]}-${colorName}` as CustomColor;
    const bgColorPrefix = `${prefixes[1]}-${colorName}` as CustomColor;
    customColorStyle[colorPrefix] = {
      color: colorValue,
    };
    customColorStyle[bgColorPrefix] = {
      backgroundColor: colorValue,
    };

    return colors;
  }, colorEntries[0]);

  return customColorStyle;
};

const customStyles = generateCustomColors();
export default customStyles;

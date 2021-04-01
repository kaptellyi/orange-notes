import 'styled-components';

interface IPalette {
  active: string;
  orange: string;
  white: string;
  black: string;
  gray: string;
  lightGray: string;
  darkGray: string;
  disabled: string;
}

interface Button<T extends string, U extends string> {
  default: {
    bg: T;
    color: U;
  };
  activated: {
    bg: U;
    color: T;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: IPalette;
    button: Button<'white', 'black'>;
  }
}

import { DefaultTheme } from 'styled-components';
import { ColorName } from '../patterns';

const theme: DefaultTheme = {
  palette: {
    active: 'orange',
    orange: 'orange',
    white: 'white',
    black: 'black',
    gray: '#B1B1B1',
    lightGray: '#ebebeb',
    disabled: '#afafaf',
    darkGray: '#909090',
  },
  button: {
    default: {
      bg: 'white',
      color: 'black',
    },
    activated: {
      bg: 'black',
      color: 'white',
    },
  },
};

export const paletteColors: {
  [key in ColorName]: string;
} = {
  RED: '#FF0000',
  GREEN: '#8CBA51',
  LIME: '#BEF761',
  BLUE: '#0000ff',
  TILE: '#004156',
  SKY_BLUE: '#AEE8E4',
  PURPLE: '#9400D3',
  PINK: '#FFC0CB',
  ORANGE: '#FFC11E',
  YELLOW: '#f0ff33',
  BROWN: '#8B4513',
};

export default theme;

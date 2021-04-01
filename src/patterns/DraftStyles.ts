import { IconName } from '@fortawesome/fontawesome-svg-core';

export type DraftStyleName =
  | 'text-weight'
  | 'text-align'
  | 'palette'
  | 'block-type';

type TextWeightStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH';
export type AlignTextStyle = 'left' | 'center' | 'right';
export type PaletteStyleType = 'font-color' | 'highlight-color';
type BlockTypeStyle = 'ordered-list-item' | 'unordered-list-item';
export type StyleTypes =
  | TextWeightStyle
  | AlignTextStyle
  | PaletteStyleType
  | BlockTypeStyle;

export interface SubStyle<StyleType> {
  name: string;
  icon: IconName;
  style: StyleType;
}

interface DraftStyle<
  Name extends DraftStyleName,
  StyleType extends StyleTypes
> {
  name: Name;
  icon: IconName;
  subStyles?: SubStyle<StyleType>[];
}

export type DraftStyles =
  | DraftStyle<'text-weight', TextWeightStyle>
  | DraftStyle<'text-align', AlignTextStyle>
  | DraftStyle<'palette', PaletteStyleType>
  | DraftStyle<'block-type', BlockTypeStyle>;
export type SubStyles = SubStyle<StyleTypes>;
export interface InlineStyle {
  type: StyleTypes;
  active: boolean;
}

// Custom styles
export type ColorName =
  | 'RED'
  | 'GREEN'
  | 'LIME'
  | 'BLUE'
  | 'TILE'
  | 'SKY_BLUE'
  | 'PURPLE'
  | 'PINK'
  | 'ORANGE'
  | 'YELLOW'
  | 'BROWN';
export type ColorPrefix = 'COLOR' | 'BG-COLOR';
export type CustomColor = `${ColorPrefix}-${ColorName}`;

export type TriggeredPaletteStyle = {
  type: PaletteStyleType | undefined;
  style: ColorName | undefined;
};

export interface PaletteStyle {
  type: PaletteStyleType | undefined;
  style: {
    [key in ColorPrefix]: string | undefined;
  };
}

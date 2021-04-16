import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { paletteColors } from '../../assets/DefaultTheme';
import {
  ColorName,
  ColorPrefix,
  PaletteStyle,
  TriggeredPaletteStyle,
  PaletteStyleType,
  SubStyles,
} from '../../patterns';
import * as Styled from './Styled';
import SubStylesList from './SubStylesList';

interface Props {
  subStyles: SubStyles[];
  isOpen: boolean;
  paletteStyle?: PaletteStyle;
  makeStyleActive: (style: TriggeredPaletteStyle) => void;
}

const PaletteStylesList = ({
  isOpen,
  subStyles,
  paletteStyle,
  makeStyleActive,
}: Props): ReactElement => {
  const paletteRef = useRef<HTMLDivElement>(undefined!);
  const [activeBar, setActiveBar] = useState<PaletteStyleType>();

  const openBar = (style: PaletteStyleType) => {
    paletteRef.current.scrollTo(0, 0);
    setActiveBar(style);
  };

  const selectColor = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    colorName: ColorName
  ) => {
    e.preventDefault();
    makeStyleActive({
      type: activeBar,
      style: colorName,
    });
  };

  useEffect(() => {
    if (!isOpen) setActiveBar(undefined);
  }, [isOpen]);

  const colorEls = Object.entries(paletteColors).map(([name, color], i) => {
    const prefix: ColorPrefix =
      activeBar === 'font-color' ? 'COLOR' : 'BG-COLOR';
    const includesColor = paletteStyle?.style[prefix] === name;

    return (
      <Styled.PaletteItem
        key={i.toString()}
        color={color}
        active={includesColor === true}
        onMouseDown={(e) => selectColor(e, name as ColorName)}
      />
    );
  });

  return (
    <Styled.SubStylesWrapper isOpen={isOpen}>
      <SubStylesList
        subStyles={subStyles}
        makeActiveStyle={openBar}
        isElementActive={(activeStyle: PaletteStyleType) =>
          activeBar === activeStyle
        }
      />
      <Styled.PaletteWrapper isOpen={typeof activeBar === 'string'}>
        <Styled.Pallette ref={paletteRef}>{colorEls}</Styled.Pallette>
      </Styled.PaletteWrapper>
    </Styled.SubStylesWrapper>
  );
};

export default PaletteStylesList;

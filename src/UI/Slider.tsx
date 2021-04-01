import styled from 'styled-components';
import React, { ReactElement } from 'react';
import { SliderI } from '../patterns';

const Slider = styled.div.attrs({
  sliderWidth: 40,
})<SliderI>`
  width: ${({ sliderWidth }) => `${sliderWidth}px`};
  position: absolute;
  bottom: 0;
  height: 0.2em;
  background-color: orange;
  opacity: ${({ active }) => (active ? 1 : 0)};
  display: ${({ active }) => (active ? 'block' : 'none')};
  transform: ${({ sliderWidth, targetWidth, targetPosX }) =>
    targetWidth && targetPosX
      ? `translateX(${targetPosX - sliderWidth / 2 + targetWidth / 2}px)`
      : `translateX(0px)`};
  transition: transform 0.2s ease-in-out;
`;

export default ({ active, targetPosX, targetWidth }: SliderI): ReactElement => (
  <Slider active={active} targetPosX={targetPosX} targetWidth={targetWidth} />
);

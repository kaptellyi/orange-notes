import React, { ReactElement } from 'react';
import { FaIcon } from '../../assets/StyledComponents';
import { StyleTypes, SubStyles } from '../../patterns';
import * as Styled from './Styled';

interface Props {
  subStyles: SubStyles[];
  makeActiveStyle(style: StyleTypes): void;
  isElementActive(style: StyleTypes): boolean;
}

const SubStylesList = ({
  subStyles,
  makeActiveStyle,
  isElementActive,
}: Props): ReactElement => {
  const clickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    style: StyleTypes
  ) => {
    e.preventDefault();
    makeActiveStyle(style);
    isElementActive(style);
  };

  const subStylesEls = subStyles.map((subEl, i) => {
    return (
      <div
        role="button"
        key={i.toString()}
        onMouseDown={(e) => {
          clickHandler(e, subEl.style);
        }}
      >
        <FaIcon
          active={isElementActive(subEl.style as StyleTypes) ? 'true' : 'false'}
          icon={subEl.icon}
          data-testid={`sub-style-${subEl.style.toLowerCase()}`}
        />
        <Styled.SubStylingBtn>{subEl.name}</Styled.SubStylingBtn>
      </div>
    );
  });

  return <Styled.SubStylesBar>{subStylesEls}</Styled.SubStylesBar>;
};

export default SubStylesList;

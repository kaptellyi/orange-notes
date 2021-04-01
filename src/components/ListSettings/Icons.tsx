import { IconName } from '@fortawesome/fontawesome-svg-core';
import React, { ReactElement, useState } from 'react';
import { Button } from '../../assets/StyledComponents';
import * as Styled from './Styled';

const iconProps: IconName[] = [
  'file',
  'user-friends',
  'hamburger',
  'democrat',
  'plane',
  'building',
  'piggy-bank',
  'heart',
  'shopping-cart',
  'chart-line',
];

interface Props {
  activeIcon: IconName;
  changeIcon: (ip: IconName) => void;
}

const Icons = ({ activeIcon, changeIcon }: Props): ReactElement => {
  const iconEls = iconProps.map((ip, i) => (
    <Styled.Icon
      key={i.toString()}
      data-testid={`test-${ip}`}
      icon={ip}
      size="2x"
      active={ip === activeIcon ? 'true' : 'false'}
      onClick={() => changeIcon(ip)}
    />
  ));

  return (
    <>
      <Styled.IconsWrapper>
        <Styled.Icons>{iconEls}</Styled.Icons>
      </Styled.IconsWrapper>
    </>
  );
};

export default Icons;

import React, { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  visible: boolean;
  clickHandler?: () => void;
}

const appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: 0.2s ease-in-out ${appear};
`;

export default ({ visible, clickHandler }: Props): ReactElement | null =>
  visible ? <Backdrop onClick={clickHandler && clickHandler} /> : null;

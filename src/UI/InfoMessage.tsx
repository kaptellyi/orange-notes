import React, { ReactElement } from 'react';
import styled from 'styled-components';
import OrangeSrc from '../assets/illustrations/loading.svg';

interface Props {
  message: string;
}

const breakpoint = '(min-width: 768px)';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${breakpoint} {
    font-size: 2rem;
  }
`;

const Orange = styled.svg`
  height: 35vh;
  width: 80vw;
  background: url(${OrangeSrc}) no-repeat center;
`;

const Message = styled.p`
  margin-top: 1em;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
`;

const InfoMessage = ({ message }: Props): ReactElement => {
  return (
    <Wrapper>
      <Orange />
      <Message>{message}</Message>
    </Wrapper>
  );
};

export default InfoMessage;

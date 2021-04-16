import React, { ReactElement } from 'react';
import styled from 'styled-components';
import ErrorOrange from '../assets/illustrations/error-orange.svg';

const ErrorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const FourOFourContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1em;

  background-color: #fff;

  span {
    font-size: 24vh;
    text-align: center;
    font-weight: bold;
    color: #f7931e;
  }
`;

const FourOFour = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Orange = styled.svg`
  height: 100%;
  background: url(${ErrorOrange}) no-repeat center;
`;

const ErrorMessage = styled.p`
  max-width: 80%;
  text-align: center;
`;

interface Props {
  style?: React.CSSProperties;
  message?: string;
}

const ErrorPage = ({ style, message }: Props): ReactElement => {
  return (
    <ErrorContainer style={style}>
      <FourOFourContainer>
        <FourOFour>
          <span>4</span>
          <Orange />
          <span>4</span>
        </FourOFour>
        <ErrorMessage>{message || 'Something went wrong...'}</ErrorMessage>
      </FourOFourContainer>
    </ErrorContainer>
  );
};

export default ErrorPage;

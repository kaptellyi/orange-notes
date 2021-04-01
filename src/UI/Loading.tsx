import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { center } from '../assets/StyledComponents';
import LoadingOrange from '../assets/loader/loading.webm';

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const Loading = styled.div`
  height: 80vh;
  width: 94vw;

  video {
    width: 100%;
    height: 100%;
  }

  ${center};
`;

const LoadingBg = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  opacity: 0.8;
`;

export default (): ReactElement => {
  return (
    <LoadingWrapper>
      <LoadingBg />
      <Loading>
        <video autoPlay loop muted playsInline>
          <source src={LoadingOrange} />
          <source src="../assets/loading.mp4" />
          <img src="../assets/loading.gif" alt="Loading..." />
        </video>
      </Loading>
    </LoadingWrapper>
  );
};

import styled from 'styled-components';
import { breakpoints, centerX } from '../../../assets/StyledComponents';

export const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.white};
`;

export const Content = styled.div`
  height: 45%;
  width: 90%;
`;

export const ResultMessage = styled.h4`
  font-size: 1.6em;

  @media ${breakpoints.md} {
    font-size: 2.6em;
  }
`;

export const ResultORange = styled.svg<{ imgPath: string }>`
  height: 100%;
  width: 100%;
  background: ${({ imgPath }) => `url(${imgPath}) no-repeat center`};
`;

export const RedirectAlert = styled.div`
  bottom: 5%;
  font-size: 1.4em;
  font-weight: bold;

  span {
    color: ${({ theme }) => theme.palette.orange};
  }

  @media ${breakpoints.md} {
    font-size: 2.4em;
  }
  ${centerX}
`;

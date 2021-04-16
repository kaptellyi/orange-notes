import styled from 'styled-components';
import welcomeOrange from '../../assets/illustrations/guide/welcoming.svg';
import { breakpoints, centerX } from '../../assets/StyledComponents';

export const InfoWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 96%;
  height: 40vh;

  @media (orientation: landscape) {
    top: 0;
    height: 70vh;
  }
`;

export const TextBox = styled.div`
  width: 70%;
  position: absolute;
  left: 0;
  bottom: 0;
`;

export const Title = styled.h4`
  color: ${({ theme }) => theme.palette.orange};
  font-weight: bold;
  font-size: 1.5rem;

  @media ${breakpoints.md} and (orientation: portrait) {
    font-size: 3rem;
  }

  @media ${breakpoints.lg} {
    font-size: 3.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  @media ${breakpoints.md} and (orientation: portrait) {
    font-size: 2.2rem;
  }

  @media ${breakpoints.lg} {
    font-size: 2.7rem;
  }
`;

export const Orange = styled.svg`
  height: 80%;
  width: 55%;
  position: absolute;
  right: 0;
  bottom: 0;
  background: url(${welcomeOrange}) no-repeat center;
  background-size: cover;

  @media (orientation: landscape) {
    height: 50%;
  }

  @media ${breakpoints.md} {
    height: 100%;
  }

  @media (orientation: landscape) {
    height: 60%;
    width: 25%;
  }
`;

export const Buttons = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;

  button {
    font-weight: bold;
  }

  button:nth-child(1) {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.palette.orange};
    text-transform: uppercase;
  }

  button:nth-child(2) {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.palette.gray};
    text-transform: lowercase;
  }

  @media ${breakpoints.md} {
    button:nth-child(1) {
      font-size: 3rem;
      color: ${({ theme }) => theme.palette.orange};
      text-transform: uppercase;
    }

    button:nth-child(2) {
      font-size: 2.5rem;
    }
  }
`;

export const Pagination = styled.div<{ isLastCarouselItem: boolean }>`
  z-index: 100;
  display: inline-flex;
  bottom: 4%;
  opacity: ${({ isLastCarouselItem }) => (isLastCarouselItem ? 0 : 1)};

  * + * {
    margin-left: 0.5em;
  }
  ${centerX}

  transition: opacity 0.1s ease-in-out;
`;

export const PaginationItem = styled.div<{ active: boolean }>`
  height: 0.8em;
  width: 0.8em;
  border: 1px solid
    ${({ active, theme }) =>
      active ? theme.palette.active : theme.palette.gray};
  border-radius: 50%;
  background-color: transparent;
  transition: color 0.2s ease-in-out;

  @media ${breakpoints.md} {
    height: 1.4em;
    width: 1.4em;
  }
`;

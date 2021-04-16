import styled, { css, keyframes } from 'styled-components';
import { breakpoints } from '../../assets/StyledComponents';

const popupCircle = keyframes`
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(5.5);
      background-color: transparent;
    }
`;

const finishAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(3.5);
  }

  80% {
    height: 0.2em;
    width: 0.2em;
  }
`;

interface SearchProps {
  initAnim: boolean;
  finishAnim: boolean;
  focused: boolean;
  blurred: boolean;
  isEmpty: boolean;
}

// Triggers a specific animation relying on the search input state
const animationName = css<{ initAnim: boolean; finishAnim: boolean }>`
  animation-name: ${(props) => {
    if (props.initAnim) return popupCircle;
    if (props.finishAnim) return finishAnimation;
    return 'none';
  }};
`;

export const Search = styled.div<SearchProps>`
  $parent: Search;
  position: relative;
  transition: all 1s ease-in-out;

  &::after {
    content: '';
    display: ${({ focused, isEmpty }) =>
      focused || isEmpty === false ? 'none' : 'block'};
    position: absolute;
    height: 0.4em;
    width: 0.4em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.orange};
    opacity: 1;
    ${animationName};
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
  }

  input {
    height: 1.6em;
    width: ${({ isEmpty }) => (isEmpty ? '1.6em' : '100%')};
    position: relative;
    border-radius: ${({ isEmpty }) => (isEmpty ? '50%' : 'none')};

    border: 1px solid
      ${({ focused, theme }) =>
        focused ? theme.palette.active : theme.palette.gray};
  }

  @media ${breakpoints.md} {
    &::after {
      height: 0.6em;
      width: 0.6em;
    }

    input {
      height: 2em;
      width: ${({ isEmpty }) => (isEmpty ? '2em' : '100%')};
    }
  }
`;

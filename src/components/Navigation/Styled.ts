import styled, { keyframes } from 'styled-components';
import { breakpoints, FaIcon } from '../../assets/StyledComponents';

const selectedNavMoveIn = keyframes`
  from {
    transform: translate(-50%, -110%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const selectedNavMoveOut = keyframes`
  from {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, -110%);
  }
`;

export const Wrapper = styled.div<{ selectedNotesPresent: boolean }>`
  position: fixed;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 4px
    ${({ theme, selectedNotesPresent }) =>
      selectedNotesPresent ? theme.palette.orange : 'rgba(0, 0, 0, 0.15)'};
  z-index: 1;
`;

export const Navigation = styled.div<{ selectedNotesPresent: boolean }>`
  height: 3.5em;
  display: flex;
  justify-content: space-between;
  padding: 1em 0.5em;
  background-color: white;
  pointer-events: ${({ selectedNotesPresent }) =>
    selectedNotesPresent ? 'none' : 'all'};

  @media ${breakpoints.md} {
    min-height: 4em;
  }
`;

export const NavColumn = styled.div<{ visible?: boolean }>`
  display: inline-flex;
  align-items: center;
  display: ${(props) =>
    props.visible || props.visible === undefined ? 'normal' : 'none'};

  * + * {
    margin-left: 0.5em;
  }
`;

export const SelectedNotesNav = styled.div<{ active: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, ${({ active }) => (active ? '0' : '-110%')});
  width: 70%;
  height: 80%;
  box-shadow: 1px 4em 100px ${({ theme }) => theme.palette.orange};
  background-color: ${({ theme }) => theme.palette.orange};
  overflow: hidden;
  clip-path: polygon(100% 0%, 100% 0px, 94.07% 102.9%, 7.16% 104.37%, 0% 0%);
  padding: 0.05em;
  margin-top: -0.15em;
  animation: ${({ active }) =>
      active ? selectedNavMoveIn : selectedNavMoveOut}
    0.15s ease-in-out;
  z-index: -1;
`;

export const SelectedNotesNavInner = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  width: 100%;
  height: 100%;
  clip-path: polygon(100% 0%, 100% 0px, 94.07% 102.9%, 7.16% 104.37%, 0% 0%);
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1.2em;

  svg {
    &:active {
      color: ${({ theme }) => theme.palette.orange};
    }

    & + svg {
      margin-left: 0.5em;
    }
  }

  @media ${breakpoints.md} {
    padding: 0.5em 3.5em;
  }
`;

export const Icon = styled(FaIcon).attrs({
  size: 'lg',
})``;

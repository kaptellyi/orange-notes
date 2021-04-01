import styled, { css, keyframes } from 'styled-components';
import { breakpoints, FaIcon, NavItem } from '../../assets/StyledComponents';

const toolkitItemsAppear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const toolkitItemsDisappear = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  width: 4.5em;

  z-index: 1;
  transform: ${({ isOpen }) => `translateX(-${isOpen ? 0 : 9.3}em)`};
  transition: transform 0.3s ease-in-out;
`;

export const Sidebar = styled.div`
  left: 0;
  top: 0;
  height: 100%;
  margin: 0;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  background-color: white;
  border-right: 1px solid ${({ theme }) => theme.palette.gray};
  box-shadow: 0px 2.5px 4px rgb(206, 206, 206);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SidebarItem = styled(NavItem)<{ disabled: boolean }>`
  svg {
    color: ${({ disabled, theme }) => disabled && theme.palette.disabled};
  }
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;

export const Toolkit = styled.div`
  width: 4em;
  position: absolute;
  left: 110%;
  bottom: 0;
  right: 0;
`;

export const ToolkitItems = styled.div<{ showToolkit: boolean }>`
  height: 80%;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.white};
  border-top: 1px solid ${({ theme }) => theme.palette.gray};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  border-right: 1px solid ${({ theme }) => theme.palette.gray};
  animation: ${({ showToolkit }) =>
      showToolkit ? toolkitItemsAppear : toolkitItemsDisappear}
    0.1s ease-in-out;
`;

export const ToolkitToggler = styled.div`
  position: relative;
  height: 1em;
  width: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.7em;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.palette.black};

  &::after {
    content: '•';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }

  @media ${breakpoints.md} {
    height: 1.5em;
    width: 1.5em;
  }
`;

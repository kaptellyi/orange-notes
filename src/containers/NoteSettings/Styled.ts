import styled from 'styled-components';
import { breakpoints } from '../../assets/StyledComponents';

const Bar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: 10px 5px 20px 1px #f0f0f0;
`;

export const NoteSettings = styled.div<{ disabled: boolean }>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  @media ${breakpoints.md} {
    font-size: 1.4rem;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  padding: 1em;
  box-shadow: 10px 5px 20px 1px #f0f0f0;
`;

export const Title = styled.h4`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0.5em;
`;

export const Input = styled.input`
  width: 45%;
  border: none;
  border-bottom: 1.5px solid ${({ theme }) => theme.palette.lightGray};
  text-align: center;
  color: ${({ theme }) => theme.palette.black};

  &:focus {
    border-color: ${({ theme }) => theme.palette.darkGray};
  }

  @media ${breakpoints.md} {
    border-width: 2px;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 0 1em;
`;

export const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 0;
  z-index: 1;
`;

export const FrontStylesBar = styled(Bar)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 0.8em 1em;

  svg {
    font-size: 1.5em;
  }
`;

export const SubStylesWrapper = styled(Bar)<{ isOpen: boolean }>`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  transform: translateY(${({ isOpen }) => (isOpen ? '-100%' : '0')});
  transition: transform 0.2s ease-in-out;
`;

export const SubStylesBar = styled(Bar)`
  justify-content: space-evenly;
  padding: 0.8em 1em;
  transition: transform 0.2s ease-in-out;

  svg {
    font-size: 1.35em;
  }
`;

export const SubStylingBtn = styled.button`
  font-size: 0.8em;
  border: none;
  background: none;
  color: ${({ theme }) => theme.palette.black};
`;

export const PaletteWrapper = styled(Bar)<{ isOpen: boolean }>`
  justify-content: center;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '3em' : '0em')};
  transition: max-height 0.1s ease-in-out;
  background-color: #ebebeb;
`;

export const Pallette = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0.5em;

  * + * {
    margin-left: 2em;
  }
`;

export const PaletteItem = styled.div<{ color: string; active: boolean }>`
  width: 1.9em;
  height: 1.9em;
  flex-shrink: 0;
  border: ${({ active, theme }) =>
    active
      ? `3px solid ${theme.palette.orange}`
      : `2px solid ${theme.palette.black}`};
  border-radius: 50%;
  background-color: ${({ color }) => `${color}`};
  box-shadow: ${({ active }) =>
    active ? 'inset 0 0 1em rgba(0, 0, 0, 0.3)' : 'none'};
`;

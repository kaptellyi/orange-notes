import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { keyframes } from 'styled-components';
import { breakpoints, center, FaIcon } from '../../assets/StyledComponents';

// Animation
const appear = keyframes`
  from {
    transform: translateY(-100%);
  } 
  to {
    transform: translateY(0);
  }
`;

const disappear = keyframes`
  from {
    transform: translateY(0);
  } 
  to {
    transform: translateY(-100%);
  }
`;

export const ListSettings = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 4px solid ${({ theme }) => theme.palette.orange};
  background-color: ${({ theme }) => theme.palette.white};
  animation: ${({ isOpen }) => (isOpen ? appear : disappear)} 0.4s ease-in-out;

  @media ${breakpoints.md} {
    font-size: 1.4rem;
  }
`;

export const ListName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Input = styled.input`
  width: 80%;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid rgb(146, 146, 146);
  text-align: center;
  transition: all 0.3s ease-in-out;
  color: ${({ theme }) => theme.palette.black};
`;

export const ListType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5em;

  h4 {
    margin-bottom: 0.6em;
  }
`;

export const TypeOptions = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4em 1em;
  border: 1px solid black;
  border-radius: 20px;
`;

export const ActiveOption = styled.span`
  margin: 0 0.2em;
`;

export const IconsWrapper = styled.div`
  width: 100%;
  margin: 1em 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  border-top: 1px solid ${({ theme }) => theme.palette.gray};
  font-size: calc(14px + 1 * (100vw / 320) / (414 - 320));
`;

export const Icons = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0.5em 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  justify-items: center;
  @media ${breakpoints.md} {
    grid-template-columns: repeat(10, 1fr);
  }
`;

export const Icon = styled(FaIcon)`
  margin: 0.2em 0.5em;
`;

export const StngsButtons = styled.div`
  button:first-of-type {
    margin: 0em 0.5em;
  }
`;

export const DeleteListIcon = styled(FontAwesomeIcon)<{
  active: 'true' | 'false';
}>`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 1.7em;

  color: ${({ active, theme }) =>
    active === 'true' ? theme.palette.black : theme.palette.disabled};
`;

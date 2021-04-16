import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';

export const breakpoints = {
  sm: `(min-width: 414px)`,
  md: `(min-width: 768px)`,
  lg: `(min-width: 1200px)`,
};

export const FaIcon = styled(FontAwesomeIcon)<{
  active?: 'true' | 'false';
  size?: SizeProp;
}>`
  color: ${({ active }) => (active === 'true' ? 'orange' : 'black')};
  position: relative;

  @media ${breakpoints.md} {
    font-size: 2rem;
  } ;
`;

export const Button = styled.button`
  padding: 0.4em 1em;
  background-size: 400%;
  background-color: ${({ theme }) => theme.button.default.bg};
  border: 1px solid ${({ theme }) => theme.palette.black};
  border-radius: 20px;
  color: ${({ theme }) => theme.button.default.color};
  outline: none;

  &:active {
    background-color: ${({ theme }) => theme.button.activated.bg};
    color: ${({ theme }) => theme.button.activated.color};
  }
`;

export const NavItem = styled.div`
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
  padding: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.lightGray};
  border-top: 1px solid ${({ theme }) => theme.palette.lightGray};
  box-shadow: inset 10px 5px 20px 1px #f0f0f0;

  @media ${breakpoints.md} {
    font-size: 2.2rem;
  } ;
`;

export const centerX = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const centerY = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

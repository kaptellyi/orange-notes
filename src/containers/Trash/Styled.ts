import styled from 'styled-components';
import { NavItem } from '../../assets/StyledComponents';

export const RemovedNotes = styled.div`
  padding: 1.5em;
`;

export const RemovedNote = styled.div`
  &:last-child {
    margin-bottom: 10em;
  }

  & + & {
    margin-top: 1.5em;
  }
`;

export const Toolkit = styled.div`
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.palette.black};
  z-index: 100;
  background-color: ${({ theme }) => theme.palette.white};
`;

export const ToolkitItem = styled(NavItem)<{ disabled: boolean }>`
  color: ${({ disabled, theme }) =>
    disabled ? theme.palette.disabled : theme.palette.black};
  background-color: ${({ theme }) => theme.palette.white};
`;

export const ToolkitBackItem = styled(NavItem)``;

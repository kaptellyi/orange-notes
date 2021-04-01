import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { breakpoints } from '../../assets/StyledComponents';
import './styles.scss';

export const Content = styled.div`
  padding: 4.5em 0 1em 0;
  width: 100vw;
  display: flex;
  justify-content: center;

  @media ${breakpoints.md} {
    font-size: 1.6rem;
    padding-top: 3.5em;
  }
`;

export const AddNoteWrapper = styled.div<{ disabled: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5em;
  box-shadow: inset 10px 25px 20px 1px rgba(240, 240, 240, 1);
  border: 1.5px solid ${({ theme }) => theme.palette.orange};
  border-radius: 50%;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;

export const AddNote = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.palette.orange};
`;

import styled from 'styled-components';

export const NotesWrapper = styled.div`
  width: 90%;
  display: grid;

  gap: 1em;

  /* div + div {
    display: none;
  } */
`;

export const ActiveNote = styled.div<{ pinned: boolean }>`
  div {
    border-bottom-color: ${({ pinned, theme }) =>
      pinned ? theme.palette.active : 'transparent'};
  }

  &:last-child {
    margin-bottom: 7em;
  }
`;

import styled from 'styled-components';

export const Note = styled.div<{ selected: boolean }>`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 25vh;
  padding: 0.3em;
  background-color: white;
  color: orange;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.palette.orange : theme.palette.lightGray};
  box-shadow: 0px 4px 4px
    ${({ theme, selected }) =>
      selected ? theme.palette.orange : 'rgba(0, 0, 0, 0.3)'};
  border-bottom: 3px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: ${({ selected }) => (selected ? 'none' : 'auto')};
`;

export const NoteHeader = styled.div`
  max-height: 25%;
`;

export const NoteTitle = styled.h4`
  height: 100%;
  overflow: hidden;
`;

export const NoteContent = styled.div`
  margin: 0.4em 0;
  color: black;
  overflow: hidden;

  p {
    word-break: break-all;
  }
`;

export const NoteFooter = styled.div`
  width: 100%;
  display: flex;
  margin-top: auto;
`;

export const NoteDate = styled.small``;

export const NoteTime = styled.small`
  margin-left: auto;
`;

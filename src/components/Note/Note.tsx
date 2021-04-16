import React, { ReactElement, useRef } from 'react';
import { NoteI } from '../../patterns';
import { convertMonth } from '../../utils';
import * as Styled from './Styled';

type ClickHandler = ((note: HTMLDivElement) => void) | (() => void);

interface Props {
  note: NoteI;
  selected: boolean;
  clickHandler: ClickHandler;
}

export const Note = ({ note, selected, clickHandler }: Props): ReactElement => {
  const { name, content, timeStamp } = note;
  const noteRef = useRef<HTMLDivElement>(undefined!);
  const date = {
    day: new Date(timeStamp).getDate(),
    month: convertMonth(new Date(timeStamp).getMonth()),
  };
  const time = {
    hours: new Date(timeStamp).getHours(),
    minutes: new Date(timeStamp).getMinutes(),
  };

  return (
    <Styled.Note
      data-testid={selected ? 'note-selected' : 'note'}
      selected={selected}
      onTouchStart={() => clickHandler(noteRef.current)}
      ref={noteRef}
    >
      <Styled.NoteHeader>
        <Styled.NoteTitle>{name}</Styled.NoteTitle>
      </Styled.NoteHeader>
      <Styled.NoteContent>
        <p>{content.blocks[0].text}</p>
      </Styled.NoteContent>
      <Styled.NoteFooter>
        <Styled.NoteDate>{`${date.day} ${date.month}`}</Styled.NoteDate>
        <Styled.NoteTime>{`${time.hours}:${time.minutes}`}</Styled.NoteTime>
      </Styled.NoteFooter>
    </Styled.Note>
  );
};

export default Note;

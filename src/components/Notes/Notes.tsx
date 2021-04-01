import React, { ReactElement } from 'react';
import Note from '../Note';
import { NoteI, NoteSortType } from '../../patterns';
import * as Styled from './Styled';

interface Props {
  notes: NoteI[];
  sortType: NoteSortType;
  isSelected: (note: NoteI) => boolean;
  clickNote: (note: NoteI, noteEl: HTMLDivElement) => void;
}

const ActiveNote = ({
  notes,
  isSelected,
  clickNote,
  sortType,
}: Props): ReactElement => {
  let pinnedNote: JSX.Element | null = null;

  const noteEls = notes.map((n, i) => {
    const activeNoteEl = (
      <Styled.ActiveNote className="note" pinned={n.pinned} key={n.id}>
        <Note
          note={n}
          selected={isSelected(n)}
          clickHandler={(noteEl: HTMLDivElement) => clickNote(n, noteEl)}
        />
      </Styled.ActiveNote>
    );

    if (n.pinned) {
      pinnedNote = activeNoteEl;
      return undefined;
    }

    return activeNoteEl;
  });

  return (
    <>
      <Styled.NotesWrapper className={`notes-wrapper sort-type--${sortType}`}>
        {[pinnedNote, ...noteEls]}
      </Styled.NotesWrapper>
    </>
  );
};

export default ActiveNote;

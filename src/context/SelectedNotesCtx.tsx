import React, { ReactElement, useState } from 'react';
import { useCreateContext } from '../hooks';
import { NoteI } from '../patterns';

interface CtxProps {
  selectedNotes: NoteI[];
  selectNote: (note: NoteI) => void;
  clearSelectedNotes: () => void;
}

const [useSelectedNotes, CtxProvider] = useCreateContext<CtxProps>();

const SelectedNotesProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}): ReactElement => {
  const [selectedNotes, setSelectedNotes] = useState<NoteI[]>([]);

  const selectNote = (note: NoteI) => {
    const matchedNote = selectedNotes.find((n) => n.id === note.id);
    let newSelectedNotes: NoteI[] = [];
    if (matchedNote)
      newSelectedNotes = selectedNotes.filter((n) => n.id !== matchedNote.id);
    else newSelectedNotes = [...selectedNotes, note];
    return setSelectedNotes(newSelectedNotes);
  };

  const clearSelectedNotes = () => setSelectedNotes([]);

  return (
    <CtxProvider value={{ selectedNotes, selectNote, clearSelectedNotes }}>
      {children}
    </CtxProvider>
  );
};

export { useSelectedNotes, SelectedNotesProvider };

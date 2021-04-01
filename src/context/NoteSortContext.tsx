import React, { FC, useState } from 'react';
import { useCreateContext } from '../hooks';
import { NoteI, NoteSortType } from '../patterns';

interface ContextProps {
  sortType: NoteSortType;
  filteredNotes: NoteI[] | null;
  sortFilteredNotes: (noteTitle: string, notes: NoteI[]) => void;
  clearFilteredNotes: () => void;
  toggleSortType: () => void;
}

const [useNoteSort, CtxProvider] = useCreateContext<ContextProps>();

const initialSortType =
  (localStorage.getItem('sortType') as NoteSortType) || 'column';
const NoteSortTypeProvider: FC = ({ children }) => {
  const [sortType, setSortType] = useState<NoteSortType>(initialSortType);
  const [filteredNotes, setFilteredNotes] = useState<NoteI[] | null>(null);

  const toggleSortType = () => {
    setSortType(prev => {
      const newType = prev === 'column' ? 'square' : 'column';
      localStorage.setItem('sortType', newType);
      return newType;
    });
  };

  const sortFilteredNotes = (noteTitle: string, notes: NoteI[]) => {
    const filtered = notes.filter(n =>
      n.name.toLowerCase().includes(noteTitle.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const clearFilteredNotes = () => setFilteredNotes(null);

  return (
    <CtxProvider
      value={{
        sortType,
        filteredNotes,
        toggleSortType,
        clearFilteredNotes,
        sortFilteredNotes,
      }}
    >
      {children}
    </CtxProvider>
  );
};

export { useNoteSort, NoteSortTypeProvider };

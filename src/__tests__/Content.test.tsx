import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestState } from '../jest';
import { NoteI } from '../patterns';
import Content from '../containers/Content';
import { SelectedNotesProvider } from '../context/SelectedNotesCtx';
import { convertMonth } from '../utils';
import { NoteSortTypeProvider } from '../context/NoteSortContext';
import { AppState } from '../store/configStore';
import { mockedNoteLists, mockedNoteText } from '../jest/mockedData';

// Replace every note's name on the identical one
const noteName = 'Note';
const mockedList = {
  ...mockedNoteLists[0],
  notes: mockedNoteLists[0].notes.map((n) => ({ ...n, name: noteName })),
};
const mockedNote = mockedList.notes[0];

const initState = (notes: NoteI[]): AppState => {
  const list = { ...mockedList, notes };

  return {
    listsReducer: {
      loading: false,
      error: null,
      lists: [list],
      activeList: list,
    },
  };
};

const renderWithState = (notes: NoteI[]) =>
  render(
    <TestState initialState={initState(notes)}>
      <MemoryRouter>
        <SelectedNotesProvider>
          <NoteSortTypeProvider>
            <Content />
          </NoteSortTypeProvider>
        </SelectedNotesProvider>
      </MemoryRouter>
    </TestState>
  );

describe('Content', () => {
  it('renders notes', () => {
    renderWithState(mockedList.notes);
    const notes = screen.getAllByText(noteName);

    expect(notes).toHaveLength(mockedList.notes.length);
  });

  it('render note with content', () => {
    renderWithState([mockedNote]);
    const noteTitle = screen.getByText(mockedNote.name);
    const noteContent = screen.getByText(mockedNoteText);
    const month = convertMonth(new Date(mockedNote.timeStamp).getMonth());
    const day = new Date(mockedNote.timeStamp).getDate().toString();
    const time = [
      new Date(mockedNote.timeStamp).getHours().toString(),
      new Date(mockedNote.timeStamp).getMinutes().toString(),
    ];

    const noteDate = screen.getAllByText(`${day} ${month}`);
    const noteTime = screen.getAllByText(`${time[0]}:${time[1]}`);
  });

  it('selects note', () => {
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: any) => cb());
    renderWithState([mockedNote]);
    const note = screen.getByTestId('note');
    fireEvent.touchStart(note);

    expect(note).toHaveAttribute('data-testid', 'note-selected');
  });
});

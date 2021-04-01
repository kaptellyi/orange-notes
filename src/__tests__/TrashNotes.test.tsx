import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestState } from '../jest';
import TrashNotes from '../containers/Trash';
import { AppState } from '../store/configStore';
import { SelectedNotesProvider } from '../context/SelectedNotesCtx';
import { mockedNoteLists } from '../jest/mockedData';

const renderWithState = (initialState?: AppState) =>
  render(
    <MemoryRouter>
      <TestState initialState={initialState}>
        <SelectedNotesProvider>
          <TrashNotes />
        </SelectedNotesProvider>
      </TestState>
    </MemoryRouter>
  );

// Replace every note's name on the identical one
const noteName = 'Note';
const mockedList = {
  ...mockedNoteLists[0],
  removedNotes: mockedNoteLists[0].removedNotes.map((n) => ({
    ...n,
    name: noteName,
  })),
};

const initialState: AppState = {
  listsReducer: {
    loading: false,
    error: null,
    lists: [mockedList],
    activeList: mockedList,
  },
};

describe('TrashNotes', () => {
  it('renders removed notes', () => {
    renderWithState(initialState);

    expect(screen.getAllByText(noteName)).toHaveLength(mockedList.notes.length);
  });
});

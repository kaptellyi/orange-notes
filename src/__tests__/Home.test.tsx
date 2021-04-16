import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TestState } from '../jest';
import { NotesList } from '../patterns';
import { SelectedNotesProvider } from '../context/SelectedNotesCtx';
import { NoteSortTypeProvider } from '../context/NoteSortContext';
import Home from '../containers/Home';
import { mockedNoteLists, mockedUserCtxVal } from '../jest/mockedData';

jest.mock('../context/UserContext', () => ({
  useUser: () => mockedUserCtxVal,
}));

const mockedList = mockedNoteLists[0];

const mockedNote = mockedList.notes[0];

const initState = (lists: NotesList[]) => ({
  listsReducer: {
    loading: false,
    error: null,
    lists,
    activeList: lists[0],
  },
});

const renderWithState = (lists: NotesList[]) =>
  render(
    <TestState initialState={initState(lists)}>
      <MemoryRouter>
        <SelectedNotesProvider>
          <NoteSortTypeProvider>
            <Home />
          </NoteSortTypeProvider>
        </SelectedNotesProvider>
      </MemoryRouter>
    </TestState>
  );

describe('Home', () => {
  describe('Search', () => {
    it('sorts notes', () => {
      renderWithState([mockedList]);

      const searchEl = screen.getByTestId('search');
      userEvent.type(searchEl, mockedNote.name);
      expect(searchEl).toHaveDisplayValue(mockedNote.name);
      const filteredNotes = screen.getAllByText(mockedNote.name);
      expect(filteredNotes).toHaveLength(1);
    });
  });

  describe('Sidebar', () => {
    it('change active list', () => {
      renderWithState(mockedNoteLists);
      const defActiveList = screen.getByTestId(`sidebar-${mockedList.icon}`);
      const nextActiveList = screen.getByTestId(
        `sidebar-${mockedNoteLists[1].icon}`
      );
      expect(defActiveList.getAttribute('active')).toBe('true');

      fireEvent.click(nextActiveList);
      expect(defActiveList.getAttribute('active')).toBe('false');
      expect(nextActiveList.getAttribute('active')).toBe('true');
    });
  });
});

import React from 'react';
import { Router } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { TestState } from '../jest';
import { SelectedNotesProvider } from '../context/SelectedNotesCtx';
import TrashToolkit from '../containers/Trash/TrashToolkit';
import { AppState } from '../store/configStore';
import { mockedNoteLists } from '../jest/mockedData';
import TrashNotes from '../containers/Trash';

const createHistory = (path: string) =>
  createMemoryHistory({
    initialEntries: [
      {
        pathname: path,
      },
    ],
  });

const mockedList = mockedNoteLists[0];

const initialState: AppState = {
  listsReducer: {
    loading: false,
    error: null,
    lists: [mockedList],
    activeList: mockedList,
  },
};

const renderWithState = (path: string) =>
  render(
    <TestState initialState={initialState}>
      <Router history={createHistory(path)}>
        <SelectedNotesProvider>
          <TrashToolkit />
          <TrashNotes />
        </SelectedNotesProvider>
      </Router>
    </TestState>
  );

describe('TrashNotes', () => {
  it('renders initial buttons', () => {
    renderWithState('/trash');
    const restoreBtn = screen.getByTestId('restore');
    const removeBtn = screen.getByTestId('remove');

    screen.getByTestId('r-home');
    expect(screen.queryByTestId('goBack')).not.toBeInTheDocument();
    expect(restoreBtn).toHaveAttribute('disabled');
    expect(removeBtn).toHaveAttribute('disabled');
  });

  it('initial buttons become active when there are notes selected', () => {
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: any) => cb());
    renderWithState('/trash');
    const restoreBtn = screen.getByTestId('restore');
    const removeBtn = screen.getByTestId('remove');
    const note = screen.getAllByTestId('note')[0];

    fireEvent.touchStart(note);
    expect(restoreBtn).not.toHaveAttribute('disabled');
    expect(removeBtn).not.toHaveAttribute('disabled');
  });

  it('renders goBack button', () => {
    renderWithState('/trash/view-note');

    screen.getByTestId('goBack');
  });
});

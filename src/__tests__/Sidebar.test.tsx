import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { TestTheme } from '../jest';
import Sidebar from '../components/Sidebar';
import { SelectedNotesProvider } from '../context/SelectedNotesCtx';
import { mockedNoteLists } from '../jest/mockedData';

const mockedFn = jest.fn();
const changeActiveListMocked = jest.fn();

const mockedList = mockedNoteLists[0];

const renderWithState = () =>
  render(
    <TestTheme>
      <MemoryRouter>
        <SelectedNotesProvider>
          <Sidebar
            activeList={mockedList}
            lists={mockedNoteLists}
            selectedNotes={[]}
            changeList={changeActiveListMocked}
            closeSidebar={mockedFn}
            createList={mockedFn}
            openTrash={mockedFn}
            isOpen
          />
        </SelectedNotesProvider>
      </MemoryRouter>
    </TestTheme>
  );

describe('Sidebar', () => {
  const sidebarTestId = 'sidebar';

  beforeEach(() => {
    renderWithState();
  });

  it('renders lists', () => {
    const sidebarItemEls = screen.getAllByTestId(sidebarTestId, {
      exact: false,
    });

    expect(sidebarItemEls).toHaveLength(mockedNoteLists.length);
  });
});

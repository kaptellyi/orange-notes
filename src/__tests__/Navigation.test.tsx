import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Navigation from '../components/Navigation';
import { NoteSortTypeProvider } from '../context/NoteSortContext';
import { TestState, TestTheme } from '../jest';
import { Category } from '../patterns';
import { mockedNoteLists } from '../jest/mockedData';

const mockedFn = jest.fn();

const mockedList = mockedNoteLists[0];

const renderWithState = (
  list: Category | undefined,
  selectedNotesNotEmpty: boolean
) =>
  render(
    <TestTheme>
      <NoteSortTypeProvider>
        <Navigation
          sortType="column"
          list={list}
          selectedNotesNotEmpty={selectedNotesNotEmpty}
          searchNotes={mockedFn}
          openListSettings={mockedFn}
          toggleSidebar={mockedFn}
          clearSelectedNotes={mockedFn}
          removeSelectedNotes={mockedFn}
          toggleSortType={mockedFn}
        />
      </NoteSortTypeProvider>
    </TestTheme>
  );

describe('Navigation', () => {
  describe("items regarding a list's type are", () => {
    it('not rendered without lists', () => {
      renderWithState(undefined, true);
      const navItems = screen.queryAllByTestId('nav-test-item');

      expect(navItems).toHaveLength(0);
      expect(screen.queryByTestId('search')).not.toBeInTheDocument();
    });

    it('rendered with lists', () => {
      renderWithState(mockedList, true);
      const navItems = screen.queryAllByTestId('nav-test-item');

      expect(navItems).toHaveLength(navItems.length);
      expect(screen.getByTestId('search')).toBeInTheDocument();
    });
  });

  describe('applies search states correctly', () => {
    beforeEach(() => renderWithState(mockedList, true));

    it('gets focused and blurred empty search', () => {
      const searchWrapper = screen.getByTestId('static');
      const searchInp = screen.getByTestId('search');
      fireEvent.click(searchWrapper);
      expect(searchWrapper).toHaveAttribute('data-testid', 'focus');
      fireEvent.blur(searchInp);
      expect(searchWrapper).toHaveAttribute('data-testid', 'not-active');
    });

    it('gets focused and blurred with NOT empty search', () => {
      const searchWrapper = screen.getByTestId('static');
      const searchInp = screen.getByTestId('search');
      fireEvent.click(searchWrapper);
      expect(searchWrapper).toHaveAttribute('data-testid', 'focus');
      userEvent.type(searchInp, 'text');
      expect(searchWrapper).toHaveAttribute('data-testid', 'focused');
      fireEvent.blur(searchInp);
      expect(searchWrapper).toHaveAttribute('data-testid', 'blurred');
    });
  });

  it('selected notes navigation is opened if there are selected notes', () => {
    renderWithState(mockedList, true);

    const selectedNotesNav = screen.getByTestId('selected-nav');
  });
});

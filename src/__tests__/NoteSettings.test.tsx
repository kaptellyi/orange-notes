import React from 'react';
import qs from 'query-string';
import { createMemoryHistory, MemoryHistory } from 'history';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Router } from 'react-router';
import NoteSettings from '../containers/NoteSettings';
import { TestState, TestTheme } from '../jest';
import { AppState } from '../store/configStore';
import {
  mockedNoteLists,
  mockedNotes,
  mockedNoteText,
} from '../jest/mockedData';

const notesWithPinned = mockedNotes.map((n, i) =>
  i === mockedNotes.length - 1 ? { ...n, pinned: true } : n
);
const mockedList = { ...mockedNoteLists[0], notes: notesWithPinned };
const mockedNote = mockedList.notes[0];

const initialState: AppState = {
  listsReducer: {
    loading: false,
    error: null,
    lists: [mockedList],
    activeList: mockedList,
  },
};

const query = {
  listId: mockedList.id,
  noteId: mockedNote.id,
  viewType: 'normal',
};

const history = (viewType: 'normal' | 'removed') =>
  createMemoryHistory({
    initialEntries: [
      {
        pathname: '/note-settings',
        search: qs.stringify({ ...query, viewType }),
      },
    ],
  });

const renderWithState = (history?: MemoryHistory) =>
  render(
    <TestState initialState={initialState}>
      <Router history={history || createMemoryHistory()}>
        <TestTheme>
          <NoteSettings />
        </TestTheme>
      </Router>
    </TestState>
  );

describe('NoteSettings', () => {
  describe('without note', () => {
    beforeEach(() => renderWithState());

    it('renders defaults correctly', () => {
      const inputEl = screen.getByTestId('settings-title');
      const alignLeftEl = screen.getByTestId('sub-style-left');

      expect(inputEl).toHaveDisplayValue('');
      screen.getByText('Plan to conquer the world...');
      expect(alignLeftEl).toHaveAttribute('active', 'true');
      screen.getByTestId('slider-inactive');
      // confirm button is disabled
      expect(screen.getByTestId('confirmation-btn')).toHaveAttribute(
        'data-icon',
        'times'
      );
    });

    it('interacts with style bars correctly', () => {
      const textAlignStyle = screen.getByTestId('draft-style-text-weight');
      const blockTypeStyle = screen.getByTestId('draft-style-block-type');
      const sliderEl = screen.getByTestId('slider-inactive');

      // activates bar
      fireEvent.mouseDown(textAlignStyle);
      expect(textAlignStyle).toHaveAttribute('active', 'true');
      expect(sliderEl).toHaveAttribute('data-testid', 'slider-active');

      // deactivates active bar
      fireEvent.mouseDown(textAlignStyle);
      expect(textAlignStyle).toHaveAttribute('active', 'false');
      expect(sliderEl.getAttribute('data-testid')).toBe('slider-inactive');

      // activates first bar again and then activates another bar
      fireEvent.mouseDown(textAlignStyle);
      expect(textAlignStyle).toHaveAttribute('active', 'true');
      fireEvent.mouseDown(blockTypeStyle);
      expect(textAlignStyle).toHaveAttribute('active', 'false');
      expect(blockTypeStyle).toHaveAttribute('active', 'true');
      expect(sliderEl).toHaveAttribute('data-testid', 'slider-active');
    });

    it('interacts with sub styles correctly', () => {
      const boldBtn = screen.getByTestId('sub-style-bold');
      const italicBtn = screen.getByTestId('sub-style-bold');
      const underlineBtn = screen.getByTestId('sub-style-bold');

      // first we need to open the style bar with appropriate styles
      // text weight styles may be selected in sync
      fireEvent.mouseDown(screen.getByTestId('draft-style-text-weight'));
      fireEvent.mouseDown(boldBtn);
      fireEvent.mouseDown(italicBtn);
      fireEvent.mouseDown(underlineBtn);
      expect(boldBtn).toHaveAttribute('active', 'true');
      expect(italicBtn).toHaveAttribute('active', 'true');
      expect(underlineBtn).toHaveAttribute('active', 'true');

      // deactivates styles
      fireEvent.mouseDown(boldBtn);
      expect(boldBtn).toHaveAttribute('active', 'false');

      // only one block style must be active
      fireEvent.mouseDown(screen.getByTestId('draft-style-block-type'));
      const unorderedBlockType = screen.getByTestId(
        'sub-style-unordered-list-item'
      );
      const orderedBlockType = screen.getByTestId(
        'sub-style-ordered-list-item'
      );
      fireEvent.mouseDown(unorderedBlockType);
      expect(unorderedBlockType).toHaveAttribute('active', 'true');
      // styles can be selected through text
      fireEvent.mouseDown(screen.getByText('number list'));
      expect(unorderedBlockType).toHaveAttribute('active', 'false');
      expect(orderedBlockType).toHaveAttribute('active', 'true');
    });
  });

  describe('On edit state', () => {
    beforeEach(() => {
      renderWithState();

      const settingsTitle = screen.getByTestId('settings-title');
      const editorEl = screen.getByRole('textbox', {
        name: 'aria label',
      });
      const pasteEvent = createEvent.paste(editorEl, {
        clipboardData: {
          types: ['text/html'],
          getData: () => '<b><i>conquer what?...</b><i/>',
        },
      });
      userEvent.type(settingsTitle, '123');

      fireEvent(editorEl, pasteEvent);
    });

    it('default properties get changed', () => {
      // placeholder gets disappeared
      expect(
        screen.queryByText('Plan to conquer the world...')
      ).not.toBeInTheDocument();
      screen.getByText('conquer what?...');

      // cancel button gets swiped with confirm button
      expect(screen.getByTestId('confirmation-btn')).toHaveAttribute(
        'data-icon',
        'check'
      );
    });

    it('catches inline styles', () => {
      expect(screen.getByTestId('sub-style-bold').getAttribute('active')).toBe(
        'true'
      );
      expect(
        screen.getByTestId('sub-style-italic').getAttribute('active')
      ).toBe('true');
    });
  });

  describe('with delegated note', () => {
    it("contains note's properties", () => {
      renderWithState(history('normal'));
      const placeholderEl = screen.queryByText('Plan to conquer the world...');

      expect(placeholderEl).not.toBeInTheDocument();
      screen.getByDisplayValue(mockedNote.name);
      screen.getByText(mockedNoteText);
    });

    it('style bars do not get rendered if view type is removed', () => {
      renderWithState(history('removed'));

      expect(
        screen.queryByTestId('draft-style-text-weight')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('draft-style-text-align')
      ).not.toBeInTheDocument();
    });

    it('re-pins note', () => {
      renderWithState(history('normal'));
      const pinnedBtn = screen.getByTestId('draft-style-pinned');

      fireEvent.mouseDown(pinnedBtn);
      screen.getByText(
        "You've already got a pinned note. Are you sure you want to make this note pinned?"
      );
      fireEvent.click(screen.getByText('Confirm'));
      expect(pinnedBtn).toHaveAttribute('active', 'true');
    });
  });
});

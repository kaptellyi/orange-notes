import React from 'react';
import {
  render,
  screen,
  fireEvent,
  getByText as getContainerText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ListSettings from '../components/ListSettings';
import { Category } from '../patterns';
import withMarkup, { TestTheme } from '../jest';
import { mockedNoteLists } from '../jest/mockedData';

const mockedList = mockedNoteLists[0];

const mockedFn = jest.fn();
const mockedCreateList = jest.fn();
const mockedEditList = jest.fn();
const mockedDeleteList = jest.fn();

const renderWithTheme = (activeList: Category | undefined) =>
  render(
    <TestTheme>
      <ListSettings
        activeList={activeList}
        closeSettings={mockedFn}
        createList={mockedCreateList}
        editList={mockedEditList}
        deleteCurrentList={mockedDeleteList}
        isOpen
      />
    </TestTheme>
  );

describe('<ListSettings />', () => {
  describe('without any list', () => {
    beforeEach(() => renderWithTheme(undefined));

    it('renders with default properties', () => {
      expect(screen.getByDisplayValue('Untitled')).toBeInTheDocument();
      expect(screen.getByText('notes')).toBeInTheDocument();
      expect(screen.getByTestId('test-file')).toBeInTheDocument();
    });
  });

  describe('with a list', () => {
    beforeEach(() => renderWithTheme(mockedList));

    it('renders with active list properties', () => {
      const activeIcon = screen.getByTestId(`test-${mockedList.icon}`);
      expect(screen.getByDisplayValue(mockedList.name)).toBeInTheDocument();
      expect(screen.getByText(mockedList.type)).toBeInTheDocument();
      expect(activeIcon).toBeInTheDocument();
    });

    it('updates active list', () => {
      const expectedList: Category = {
        ...mockedList,
        name: 'piiigs <3',
        icon: 'heart',
      };
      const nameInputEl = screen.getByDisplayValue(mockedList.name);
      const iconEl = screen.getByTestId(`test-${expectedList.icon}`);
      const submitEl = screen.getByText('Confirm');

      fireEvent.input(nameInputEl, { target: { value: expectedList.name } });
      fireEvent.click(iconEl);
      fireEvent.click(submitEl);
      expect(nameInputEl).toHaveDisplayValue(expectedList.name);
      expect(iconEl).toHaveAttribute('active');
      expect(mockedEditList).toHaveBeenCalled();
    });

    it('deletes active list', () => {
      const getByTextWithMarkup = withMarkup(screen.getByText);
      const deleteListBtn = screen.getByTestId('delete-list');
      const modalMsg = `Are you sure you want to delete ${mockedList.name}?`;

      fireEvent.click(deleteListBtn);
      const modalContainer = screen.getByTestId('modal-container');
      getByTextWithMarkup(modalMsg);

      const confirmDeleteBtn = getContainerText(modalContainer, 'Confirm');
      fireEvent.click(confirmDeleteBtn);
      expect(mockedDeleteList).toHaveBeenCalled();
    });
  });
});

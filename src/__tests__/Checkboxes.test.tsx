import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckboxesList, CheckboxI } from '../patterns';
import { TestState } from '../jest';
import Checkboxes from '../components/Checkboxes';
import { AppState } from '../store/configStore';

const mockedFn = jest.fn();

const mockedActiveList: CheckboxesList = {
  name: 'Mocked List',
  icon: 'piggy-bank',
  id: 'someid',
  type: 'checkboxes',
  checkboxes: [],
  createdAt: 0,
};

const mockedCheckboxes: CheckboxI[] = [
  {
    completed: false,
    id: 'id-1',
    text: '',
  },
  {
    completed: false,
    id: 'id-2',
    text: '',
  },
];

const initialState = (checkboxes: CheckboxI[]): AppState => ({
  listsReducer: {
    loading: false,
    error: null,
    activeList: { ...mockedActiveList, checkboxes },
    lists: [{ ...mockedActiveList, checkboxes }],
  },
});

const renderWithState = (checkboxes: CheckboxI[]) => {
  render(
    <TestState initialState={initialState(checkboxes)}>
      <Checkboxes
        checkboxes={checkboxes}
        createCheckbox={mockedFn}
        removeCheckbox={mockedFn}
        storeCheckbox={mockedFn}
      />
    </TestState>
  );
};

describe('Checkboxes', () => {
  beforeEach(() => renderWithState(mockedCheckboxes));

  it('renders checkboxes of active list', () => {
    const checkboxes = screen.getAllByDisplayValue('');
    expect(checkboxes).toHaveLength(mockedCheckboxes.length);
  });

  it('creates another checkbox', () => {
    const addCheckboxBtn = screen.getByText('add a to-do item');
    fireEvent.click(addCheckboxBtn);
    expect(mockedFn).toHaveBeenCalled();
  });

  it('sets checked to true does not get fired if text is empty', () => {
    const checkedCheckbox = screen.getAllByRole(
      'checkbox'
    )[0] as HTMLInputElement;

    fireEvent.click(checkedCheckbox);
    expect(mockedFn).not.toHaveBeenCalled();
  });

  it('sets checked to true if text is not empty', () => {
    const checkboxInput = screen.getAllByDisplayValue('')[0];
    const checkedCheckbox = screen.getAllByRole(
      'checkbox'
    )[0] as HTMLInputElement;

    fireEvent.input(checkboxInput, {
      target: { value: 'text' },
    });
    expect(checkboxInput).toHaveValue('text');
    fireEvent.click(checkedCheckbox);
    expect(mockedFn).toHaveBeenCalled();
  });
});

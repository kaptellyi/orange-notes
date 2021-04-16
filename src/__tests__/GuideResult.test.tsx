import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import GuideResult from '../containers/Guide/GuideResult';
import { TestState, TestTheme } from '../jest';
import { mockedUserCtxVal } from '../jest/mockedData';

jest.mock('../context/UserContext', () => ({
  useUser: () => mockedUserCtxVal,
}));

const renderWithState = () =>
  render(
    <MemoryRouter>
      <TestState>
        <GuideResult imgPath="" msg="" initRedirect />
      </TestState>
    </MemoryRouter>
  );

describe('GuideResult', () => {
  it('counts 5 seconds until redirect', async () => {
    jest.useFakeTimers();
    renderWithState();

    screen.getByText('5');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    screen.getByText('4');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    screen.getByText('3');
    // 2...1...
    await waitFor(() => screen.getByText('0'));
  });
});

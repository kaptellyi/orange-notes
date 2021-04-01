import { configureStore, Store } from '@reduxjs/toolkit';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '../assets/DefaultTheme';
import { AppState, rootReducer } from '../store/configStore';

interface ChildrenI {
  children: ReactElement | ReactElement[];
}

interface State {
  initialState?: AppState;
  store?: Store;
}

const createDefStore = (initialState?: AppState): Store => {
  return configureStore({ reducer: rootReducer, preloadedState: initialState });
};

export const TestTheme = ({ children }: ChildrenI): ReactElement => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const TestState = ({
  children,
  initialState,
  store = createDefStore(initialState),
}: State & ChildrenI): ReactElement => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

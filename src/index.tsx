import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './App';
import store from './store';
import { AuthUserProvider } from './context/UserContext';
import reportWebVitals from './reportWebVitals';
import theme from './assets/DefaultTheme';
import './assets/base.css';
import ErrorBoundary from './containers/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthUserProvider>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </AuthUserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

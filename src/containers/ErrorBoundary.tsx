import React, { Component } from 'react';
import ErrorPage from '../UI/ErrorPage';

interface State {
  errorDesc: string | null;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<any, State> {
  constructor(props: Component) {
    super(props);
    this.state = { hasError: false, errorDesc: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState((prev) => ({ ...prev, errorDesc: error.name }));
    console.error(`error: ${error}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          style={{ position: 'absolute' }}
          message="something went wrong..."
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

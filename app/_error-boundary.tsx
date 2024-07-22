'use client';
import { Button } from '@/components/ui/button';
import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    //console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center'>
          <h2>Oops, Something went wrong!</h2>
          <Button className='mt-5' type="button" onClick={() => this.setState({ hasError: false })}>
            Try again?
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

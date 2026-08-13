"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-6" role="alert">
          <div className="w-full max-w-md space-y-6 text-center">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Что-то пошло не так
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Произошла неожиданная ошибка. Попробуйте обновить страницу или вернуться на главную.
              </p>
            </div>

            {/* Error details in development */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left">
                <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                  Подробности ошибки
                </summary>
                <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-red-50 p-3 text-xs text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={this.handleReset}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Попробовать снова
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                <Home className="h-4 w-4" />
                На главную
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for smaller components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    throw error;
  }

  return setError;
}

// Fallback component for route-level error handling
export function RouteErrorFallback({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body>
        <div className="bg-background flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="bg-destructive/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive h-10 w-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Ошибка загрузки страницы</h1>
              <p className="text-muted-foreground">
                Не удалось отобразить содержимое этой страницы.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="text-left">
                <summary className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
                  Debug info
                </summary>
                <pre className="bg-muted mt-2 max-h-60 overflow-auto rounded-lg p-4 text-left text-xs">
                  {error.message}
                  {"\n"}
                  Digest: {error.digest}
                </pre>
              </details>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={reset}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 transition-colors"
              >
                Попробовать снова
              </button>
              <a
                href="/"
                className="border-input hover:bg-accent rounded-lg border px-6 py-3 transition-colors"
              >
                На главную
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default ErrorBoundary;


import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';

const ErrorElement: React.FC = () => {
  const error = useRouteError();

  let title = 'Something went wrong';
  let description = 'An unexpected error occurred. Please try again later.';

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    description = error.statusText || 'Unknown error';
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 text-red-700 p-8">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg text-center max-w-xl">{description}</p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Go to Home
      </a>
    </div>
  );
};

export default ErrorElement;

'use client';

import { useEffect } from "react";
import { LinkSlashIcon } from '@heroicons/react/24/outline';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
    <main className="flex h-full flex-col items-center justify-center">
      <LinkSlashIcon className="w-10 text-gray-400" />
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-chief-300 px-4 py-2 text-sm text-white transition-colors hover:bg-chief-100"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>    
    );
}
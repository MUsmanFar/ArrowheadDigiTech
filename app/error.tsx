'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error boundary', { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Something went wrong</h1>
        <p className="text-slate-600 mb-8">An unexpected error occurred. Please try again.</p>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="px-5 py-2 rounded-full bg-slate-900 text-white"
          >
            Try again
          </button>
          <Link href="/" className="text-blue-600 hover:underline">
            Return home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

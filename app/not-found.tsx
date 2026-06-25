import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Page not found</h1>
        <p className="text-slate-600 mb-8">The page you requested does not exist.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return home
        </Link>
      </main>
      <Footer />
    </div>
  );
}

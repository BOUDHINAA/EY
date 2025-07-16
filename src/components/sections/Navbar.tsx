'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-[#2e2e38]">
        SimulAItor
      </Link>
      <div className="space-x-6 text-[#2e2e38] font-medium">
        <Link href="/articles" className="hover:text-[#ffc72c] transition-colors">
          Articles
        </Link>
        <Link href="/about" className="hover:text-[#ffc72c] transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-[#ffc72c] transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
}

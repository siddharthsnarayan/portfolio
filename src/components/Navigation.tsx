"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { name: 'All Projects', path: '/all-projects' },
  { name: 'Architecture', path: '/architecture' },
  { name: 'Urban Design', path: '/urban-design' },
  { name: 'CV', path: '/cv' },
  { name: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide navigation on the landing page
  if (pathname === '/') {
    return null;
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center p-6 sticky top-0 bg-black z-50 border-b border-gray-800">
        <Link href="/all-projects" className="text-sm font-bold uppercase tracking-widest">
          Siddharth Sridhar Narayan
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black z-40 pt-24 px-6">
          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-lg uppercase tracking-widest ${
                  pathname === item.path ? 'font-bold text-white' : 'text-gray-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Header */}
      <header className="hidden lg:flex justify-between items-center w-full px-12 py-8 fixed top-0 left-0 bg-black z-50">
        {/* Left: Navigation Links */}
        <nav className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm uppercase tracking-widest hover:text-white transition-colors ${
                pathname === item.path ? 'font-bold text-white' : 'text-gray-400'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right: Name */}
        <div>
          <Link href="/all-projects" className="text-xl font-bold uppercase tracking-widest text-white">
            Siddharth Sridhar Narayan
          </Link>
        </div>
      </header>
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Academics', href: '#academics' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Text Based */}
          <div className="flex items-center">
            <a href="#home" className="flex flex-col">
              <h1 className="font-serif font-bold text-xl text-red-600 leading-tight">Gurukul English</h1>
              <p className="text-xs text-gray-600 font-medium tracking-wide">HIGH SCHOOL</p>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-red-600 font-medium text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-2 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-50 transition-colors"
              >
                Staff Login
              </Link>
              <Link
                to="/parent-login"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                Parent Portal
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 px-4 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 px-4 space-y-2">
              <Link
                to="/login"
                className="block w-full py-3 text-center font-medium text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Staff Login
              </Link>
              <Link
                to="/parent-login"
                className="block w-full py-3 text-center font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Parent Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

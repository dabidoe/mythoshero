import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Assets', href: '/assets' },
    { name: 'The Forge', href: '/forge' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-bold font-heading tracking-tighter text-cyan-500 cursor-pointer">MythOS</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              <span className={`text-sm uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer ${
                location === link.href ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
              }`}>
                {link.name}
              </span>
            </Link>
          ))}
          <a
            href="https://app.mythos.quest"
            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Launch App
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-4 space-y-4">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                <div
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm uppercase tracking-widest font-medium cursor-pointer ${
                    location === link.href ? 'text-cyan-400' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </div>
              </Link>
            ))}
            <a
              href="https://app.mythos.quest"
              className="block w-full text-center bg-cyan-500 text-black px-6 py-3 rounded-lg font-bold mt-4"
            >
              Launch App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
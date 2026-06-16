import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ShoppingBag, Home, FlaskConical, BookOpen, Tag, Heart } from 'lucide-react';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'HOME', icon: Home },
    { path: '/quiz', label: 'PEPTIDES', icon: FlaskConical },
    { path: '/parse', label: 'TOPICS', icon: Tag },
    { path: '/research', label: 'GUIDES', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" title="Cape Town Peptide Club — Home">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="text-white/70 group-hover:text-[#c8ff00] transition-colors">
            <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path d="M24 4v40" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="font-mono-tech text-[10px] tracking-[0.2em] text-white font-bold group-hover:text-[#c8ff00] transition-colors hidden sm:inline">CTPC</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-mono-tech text-[10px] tracking-[0.15em] transition-colors ${
                isActive(link.path)
                  ? 'text-[#c8ff00] font-bold'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.ridethetide.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-[10px] tracking-[0.15em] text-[#8b7aff] hover:text-[#a89aff] transition-colors flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" />SHOP
          </a>
        </div>

        {/* Right: Confessions CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/trials"
            className={`px-4 py-1.5 font-mono-tech text-[10px] tracking-wider transition-all flex items-center gap-1.5 ${
              isActive('/trials')
                ? 'bg-[#c8ff00] text-black'
                : 'border border-[#c8ff00]/40 text-[#c8ff00] hover:bg-[#c8ff00]/10 hover:border-[#c8ff00]'
            }`}
          >
            <Heart className="w-3 h-3" />
            CONFESSIONS
          </Link>
        </div>

        <button
          className="md:hidden text-white/60"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/[0.06] px-6 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 font-mono-tech text-xs tracking-wider ${
                isActive(link.path) ? 'text-[#c8ff00]' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.ridethetide.site/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block py-2 font-mono-tech text-xs tracking-wider text-[#8b7aff] hover:text-[#a89aff]"
          >
            SHOP (RIDE THE TIDE)
          </a>
          <Link
            to="/trials"
            onClick={() => setMobileOpen(false)}
            className="block py-2 font-mono-tech text-xs tracking-wider text-[#c8ff00] hover:text-[#d8ff40]"
          >
            CONFESSIONS
          </Link>
        </div>
      )}
    </nav>
  );
}

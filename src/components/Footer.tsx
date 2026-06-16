import { Link } from 'react-router';
import { MessageCircle, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="text-[#c8ff00]">
                <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <path d="M24 4v40" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="font-mono-tech text-[10px] tracking-[0.2em] text-white font-bold">CAPE TOWN PEPTIDE CLUB</span>
            </div>
            <p className="text-white/25 text-xs leading-relaxed max-w-sm">
              South Africa&apos;s premier peptide science community. Anonymous confessions, research guides, and an open peptide directory. No sales, no prescriptions, no affiliation.
            </p>
          </div>
          <div>
            <h4 className="font-mono-tech text-[9px] tracking-[0.2em] text-white/40 mb-3 uppercase">Confessions</h4>
            <ul className="space-y-2">
              <li><Link to="/trials" className="text-white/25 text-xs hover:text-[#c8ff00] transition-colors">All Confessions</Link></li>
              <li><Link to="/parse" className="text-white/25 text-xs hover:text-[#c8ff00] transition-colors">By Topic</Link></li>
              <li><Link to="/quiz" className="text-white/25 text-xs hover:text-[#c8ff00] transition-colors">By Peptide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-tech text-[9px] tracking-[0.2em] text-white/40 mb-3 uppercase">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/research" className="text-white/25 text-xs hover:text-[#c8ff00] transition-colors">Guides</Link></li>
              <li>
                <a href="https://www.ridethetide.site/" target="_blank" rel="noopener noreferrer" className="text-white/25 text-xs hover:text-[#c8ff00] transition-colors flex items-center gap-1">
                  Shop <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/27215550192" target="_blank" rel="noopener noreferrer" className="text-white/25 text-xs hover:text-[#25D366] transition-colors flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-[10px] font-mono-tech">
            &copy; 2026 Cape Town Peptide Club. Research reference, not medical advice.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/15 text-[9px] font-mono-tech">Not a clinic. Not your doctor.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router';
import { MessageCircle, ExternalLink, Smartphone, ArrowRight, FlaskConical } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Ecosystem strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 p-4 border border-white/[0.06] rounded-xl bg-white/[0.01]">
          <a
            href="https://peptide-south-africa.co.za?utm_source=club&utm_medium=footer&utm_campaign=ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <Smartphone className="w-5 h-5 text-[#8b7aff] shrink-0" />
            <div>
              <p className="text-white text-xs font-medium group-hover:text-[#a89aff] transition-colors">PSA App — Protocol Tracker</p>
              <p className="text-white/25 text-[10px]">Dosing reminders, progress tracking, stack builder</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#8b7aff] ml-auto transition-colors" />
          </a>
          <a
            href="https://peptide-south-africa.com/shop?utm_source=club&utm_medium=footer&utm_campaign=ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <FlaskConical className="w-5 h-5 text-[#c8ff00] shrink-0" />
            <div>
              <p className="text-white text-xs font-medium group-hover:text-[#c8ff00] transition-colors">Peptide South Africa — Shop</p>
              <p className="text-white/25 text-[10px]">HPLC-verified. Same-day dispatch. COA on every batch.</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#c8ff00] ml-auto transition-colors" />
          </a>
        </div>

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
              South Africa&apos;s premier peptide science community. Anonymous confessions, research guides, and an open peptide directory. Part of the Peptide South Africa ecosystem.
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
            <h4 className="font-mono-tech text-[9px] tracking-[0.2em] text-white/40 mb-3 uppercase">Ecosystem</h4>
            <ul className="space-y-2">
              <li><Link to="/research" className="text-white/25 text-xs hover:text-[#c8ff00] transition-colors">Guides</Link></li>
              <li>
                <a href="https://peptide-south-africa.com/shop?utm_source=club&utm_medium=footer&utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" className="text-white/25 text-xs hover:text-[#c8ff00] transition-colors flex items-center gap-1">
                  Shop <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://peptide-south-africa.co.za?utm_source=club&utm_medium=footer&utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" className="text-white/25 text-xs hover:text-[#8b7aff] transition-colors flex items-center gap-1">
                  PSA App <ExternalLink className="w-2.5 h-2.5" />
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

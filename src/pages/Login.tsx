import { Link } from 'react-router';
import { FlaskConical, ArrowRight, Lock, Mail, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';

export default function Login() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-14">
      <SEO
        title="Join the Cape Town Peptide Club"
        description="Join the Cape Town Peptide Club guestlist. Invite-only events, research peptide protocols, and exclusive member access."
        noindex
      />

      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white/60">
              <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M24 4v40" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <div>
            <h1 className="font-sans text-2xl text-white font-semibold tracking-tight">Member Access</h1>
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mt-2">Cape Town Peptide Club</p>
          </div>
        </div>

        {/* Status card */}
        <div className="border border-white/[0.08] bg-white/[0.02] p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#8b7aff]" />
            <span className="font-mono text-[10px] tracking-wider text-white/60 uppercase">Invite-Only Community</span>
          </div>
          <p className="font-sans text-sm text-white/50 leading-relaxed" style={{ fontWeight: 300 }}>
            The Cape Town Peptide Club is a private, invite-only community of researchers, clinicians, and biohackers. Full member access with research dashboard is coming soon.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8b7aff] animate-pulse" />
            <span className="font-mono text-[9px] text-[#8b7aff] tracking-wider">Next event: Nov 16, 2026</span>
          </div>
        </div>

        {/* Onboarding CTAs */}
        <div className="space-y-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase block text-center">What you can do now</span>

          <Link
            to="/"
            className="flex items-center gap-3 p-4 border border-white/[0.08] hover:border-[#8b7aff]/30 hover:bg-[#8b7aff]/[0.03] transition-all group"
          >
            <FlaskConical className="w-4 h-4 text-white/30 group-hover:text-[#8b7aff] transition-colors" />
            <div className="flex-1">
              <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">Join the Guestlist</span>
              <p className="font-sans text-[11px] text-white/30 mt-0.5">Get your invite for the next event</p>
            </div>
            <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#8b7aff]" />
          </Link>

          <Link
            to="/quiz"
            className="flex items-center gap-3 p-4 border border-white/[0.08] hover:border-[#8b7aff]/30 hover:bg-[#8b7aff]/[0.03] transition-all group"
          >
            <Mail className="w-4 h-4 text-white/30 group-hover:text-[#8b7aff] transition-colors" />
            <div className="flex-1">
              <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">Find My Protocol</span>
              <p className="font-sans text-[11px] text-white/30 mt-0.5">3-question quiz for your research stack</p>
            </div>
            <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#8b7aff]" />
          </Link>

          <a
            href="https://peptide-south-africa.com/shop?utm_source=club&utm_medium=login&utm_campaign=ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-white/[0.08] hover:border-[#8b7aff]/30 hover:bg-[#8b7aff]/[0.03] transition-all group"
          >
            <FlaskConical className="w-4 h-4 text-white/30 group-hover:text-[#8b7aff] transition-colors" />
            <div className="flex-1">
              <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">Shop Peptides</span>
              <p className="font-sans text-[11px] text-white/30 mt-0.5">Browse HPLC-verified compounds at Peptide South Africa</p>
            </div>
            <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#8b7aff]" />
          </a>

          <a
            href="https://wa.me/27215550192"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-[#25D366]/20 hover:border-[#25D366]/40 bg-[#25D366]/[0.03] hover:bg-[#25D366]/[0.06] transition-all group"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]/60 group-hover:text-[#25D366]" />
            <div className="flex-1">
              <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">Chat on WhatsApp</span>
              <p className="font-sans text-[11px] text-white/30 mt-0.5">Speak to our team Mon-Fri 9-5 SAST</p>
            </div>
            <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#25D366]" />
          </a>
        </div>

        {/* Back */}
        <div className="text-center pt-4">
          <Link to="/" className="font-mono text-[10px] tracking-wider text-white/30 hover:text-white/60 transition-colors">
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

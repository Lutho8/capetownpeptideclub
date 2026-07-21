import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, BookOpen, Clock, AlertTriangle, ArrowRight, Smartphone, ShoppingBag } from 'lucide-react';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import NeuralWebBackground from '@/components/effects/NeuralWebBackground';
import TypewriterText from '@/components/effects/TypewriterText';
import HolographicCard from '@/components/effects/HolographicCard';
import GlitchReveal from '@/components/effects/GlitchReveal';

/* ─── Guide Data ─── */
interface Guide {
  id: string; title: string; description: string;
  readTime: string; content: string[]; topics: string[];
}

const GUIDES: Guide[] = [
  {
    id: 'reconstituting-peptides', title: 'Reconstituting Peptides',
    description: 'How to mix lyophilized powder with bacteriostatic water, storage temperatures, shelf life, and common mistakes.',
    readTime: '4 min read',
    content: ['Most peptides arrive as lyophilized powder in vials. They must be reconstituted with bacteriostatic water before use...', 'Slowly inject the water down the side of the vial — never directly onto the powder...', 'Storage after reconstitution: keep refrigerated at 2-8°C...', 'Common mistakes: using sterile water instead of bacteriostatic water...'],
    topics: ['BPC-157', 'TB-500', 'GHK-Cu', 'CJC-1295', 'Ipamorelin'],
  },
  {
    id: 'injecting-peptides', title: 'Injecting Peptides',
    description: 'Subcutaneous injection technique, syringe selection, injection sites, rotation, and community reports.',
    readTime: '5 min read',
    content: ['Subcutaneous injection is the most common route for peptides. Use 29-31 gauge insulin syringes...', 'Common injection sites: abdomen, thigh outer region, upper arm back area...', 'Pinch the skin, insert at 45-90 degrees, inject slowly...', 'Community tip: inject in the evening for GH-related peptides...'],
    topics: ['BPC-157', 'TB-500', 'Semaglutide', 'Tirzepatide', 'Retatrutide'],
  },
  {
    id: 'peptide-side-effects', title: 'Peptide Side Effects',
    description: 'The most commonly reported adverse effects across GLP-1s, GH secretagogues, healing peptides.',
    readTime: '6 min read',
    content: ['GLP-1 agonists: nausea, vomiting, diarrhea, constipation, extreme appetite suppression...', 'GH secretagogues: water retention, joint pain, carpal tunnel symptoms...', 'Healing peptides: generally well-tolerated. Some report temporary fatigue...', 'Start at lower doses and titrate up slowly...'],
    topics: ['Semaglutide', 'Tirzepatide', 'CJC-1295', 'BPC-157', 'TB-500'],
  },
  {
    id: 'best-peptide-stacks', title: 'Best Peptide Stacks',
    description: 'Community-reported combinations — healing stacks, GH protocols, weight loss pairings.',
    readTime: '7 min read',
    content: ['Fat loss stack: CJC-1295 + Ipamorelin + Semaglutide/Tirzepatide...', 'Recovery stack: BPC-157 + TB-500 at 500mcg each daily...', 'Anti-aging stack: Epitalon + GHK-Cu + NAD+...', 'The "everything" stack: Retatrutide + CJC/ipa + BPC + MOTS-c + TA-1...'],
    topics: ['CJC-1295', 'Ipamorelin', 'BPC-157', 'TB-500', 'Retatrutide'],
  },
  {
    id: 'peptides-for-weight-loss', title: 'Peptides for Weight Loss',
    description: 'GLP-1 peptides — semaglutide, tirzepatide, retatrutide. Real protocols and outcomes.',
    readTime: '8 min read',
    content: ['Semaglutide: Start at 0.25mg weekly, titrate up by 0.25mg every 4 weeks...', 'Tirzepatide: Start at 2.5mg weekly, titrate to 5mg, 10mg, 15mg...', 'Retatrutide: The triple agonist shows the most dramatic results...', 'AOD-9604: A fragment of HGH that targets fat metabolism...'],
    topics: ['Semaglutide', 'Tirzepatide', 'Retatrutide', 'AOD-9604'],
  },
  {
    id: 'growth-hormone-peptides', title: 'Growth Hormone Peptides',
    description: 'GH secretagogues — CJC-1295, ipamorelin, MK-677, sermorelin. Protocols and sleep effects.',
    readTime: '6 min read',
    content: ['CJC-1295 (with DAC): 1-2mg per week, single injection...', 'Ipamorelin: 200-300mcg, 1-3x daily. The cleanest GH secretagogue...', 'Sermorelin: 100-200mcg before bed...', 'MK-677: 10-25mg daily oral. Increases GH and IGF-1...'],
    topics: ['CJC-1295', 'Ipamorelin', 'Sermorelin'],
  },
  {
    id: 'peptides-for-recovery', title: 'Peptides for Recovery',
    description: 'BPC-157, TB-500, GHK-Cu — injury protocols, injection sites, timelines.',
    readTime: '5 min read',
    content: ['BPC-157: 250-500mcg daily, subcutaneous near injury site or systemic...', 'TB-500: 2-5mg twice weekly. Works systemically...', 'GHK-Cu: 1-2mg daily, subcutaneous or topical...', 'The classic recovery stack: BPC-157 + TB-500 for 4-8 weeks...'],
    topics: ['BPC-157', 'TB-500', 'GHK-Cu'],
  },
];

/* ─── Ecosystem Banner ─── */
function EcosystemBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 relative z-10">
      <a href="https://peptide-south-africa.co.za?utm_source=club&utm_medium=guides_page&utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-[#8b7aff]/20 rounded-xl bg-black/60 backdrop-blur-sm hover:bg-[#8b7aff]/[0.05] transition-colors group">
        <Smartphone className="w-5 h-5 text-[#8b7aff] shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-medium">Track your protocol in the PSA App</p>
          <p className="text-white/30 text-[10px]">Dosing reminders, progress tracking, stack builder</p>
        </div>
        <ArrowRight className="w-4 h-4 text-[#8b7aff] group-hover:translate-x-0.5 transition-transform" />
      </a>
      <a href="https://peptide-south-africa.com/shop?utm_source=club&utm_medium=guides_page&utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-[#c8ff00]/20 rounded-xl bg-black/60 backdrop-blur-sm hover:bg-[#c8ff00]/[0.05] transition-colors group">
        <ShoppingBag className="w-5 h-5 text-[#c8ff00] shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-medium">HPLC-Verified Peptides — Same-Day Dispatch</p>
          <p className="text-white/30 text-[10px]">COA on every batch. Cape Town stocked.</p>
        </div>
        <ArrowRight className="w-4 h-4 text-[#c8ff00] group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}

/* ─── Sub-Nav ─── */
function SubNav({ active }: { active: string }) {
  const pills = [
    { to: '/quiz', label: 'peptides' },
    { to: '/parse', label: 'topics' },
    { to: '/research', label: 'guides' },
  ];
  return (
    <div className="flex items-center justify-center gap-2 py-5 relative z-10">
      {pills.map((p) => (
        <Link key={p.to} to={p.to}
          className={`px-4 py-1.5 text-[11px] font-medium rounded-full border transition-all ${active === p.label ? 'bg-white/[0.08] text-white/70 border-white/20' : 'text-white/25 border-white/[0.06] hover:text-white/50 hover:border-white/15'}`}
        >{p.label}</Link>
      ))}
    </div>
  );
}

export default function Research() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  if (selectedGuide) {
    return (
      <div className="min-h-screen bg-black pt-14 relative">
        <SEO title={`${selectedGuide.title} | CTPC Guide`} description={selectedGuide.description} path="/research" />
        <NeuralWebBackground />

        <div className="relative z-10 max-w-2xl mx-auto px-5">
          <SubNav active="guides" />
          <button onClick={() => setSelectedGuide(null)} className="flex items-center gap-1 text-white/25 text-[11px] hover:text-white/50 transition-colors mt-4 mb-6">
            <ArrowLeft className="w-3 h-3" /> back to guides
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 text-[9px] font-mono-tech tracking-wider text-white/30 bg-white/[0.05] rounded border border-white/[0.08] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />{selectedGuide.readTime}
            </span>
          </div>

          <h1 className="font-serif-display text-2xl md:text-3xl text-white mb-3 leading-snug">
            <TypewriterText text={selectedGuide.title} speed={50} delay={100} />
          </h1>
          <p className="text-white/35 text-sm leading-relaxed mb-8">{selectedGuide.description}</p>

          <div className="space-y-5 pb-16">
            {selectedGuide.content.map((paragraph, i) => (
              <GlitchReveal key={i} delay={i * 0.1}>
                <div className="flex gap-3">
                  <span className="text-[#c8ff00]/30 font-mono-tech text-[10px] mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-white/65 text-sm leading-relaxed">{paragraph}</p>
                </div>
              </GlitchReveal>
            ))}
          </div>

          <div className="flex items-start gap-2 p-4 border border-amber-500/20 bg-amber-500/[0.03] rounded-xl mb-8">
            <AlertTriangle className="w-4 h-4 text-amber-400/60 shrink-0 mt-0.5" />
            <p className="text-amber-400/50 text-[11px] leading-relaxed">
              Research reference, not medical advice. CTPC is not a clinic and not your doctor. Consult a licensed physician before any decision involving peptide use.
            </p>
          </div>

          <div className="pb-20">
            <h3 className="text-white/25 text-[10px] font-mono-tech tracking-wider uppercase mb-3">Related peptides</h3>
            <div className="flex flex-wrap gap-2">
              {selectedGuide.topics.map((t) => (
                <span key={t} className="px-2.5 py-1 text-[10px] text-white/35 bg-white/[0.05] rounded-full border border-white/[0.06]">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-14 relative">
      <SEO title="Guides | Practical Peptide Topics | CTPC" description="7 practical guides drawn from community confessions." path="/research" />
      <NeuralWebBackground />

      <div className="relative z-10">
        <SubNav active="guides" />

        <div className="text-center pt-8 pb-6 px-5">
          <h1 className="font-serif-display text-4xl md:text-6xl text-white">
            <TypewriterText text="guides" speed={70} delay={200} />
          </h1>
          <p className="text-white/30 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Practical topics drawn from {GUIDES.length} community confessions.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-5">
          <EcosystemBanner />

          <div className="space-y-3 pb-20">
            {GUIDES.map((guide, i) => (
              <HolographicCard key={guide.id} className="w-full" onClick={() => setSelectedGuide(guide)}>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[#c8ff00]/30 font-mono-tech text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="text-white text-sm font-medium">{guide.title}</h3>
                      </div>
                      <p className="text-white/25 text-xs leading-relaxed line-clamp-2">{guide.description}</p>
                    </div>
                    <span className="text-white/15 text-[9px] font-mono-tech shrink-0 flex items-center gap-1">
                      <BookOpen className="w-2.5 h-2.5" />{guide.readTime}
                    </span>
                  </div>
                </div>
              </HolographicCard>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

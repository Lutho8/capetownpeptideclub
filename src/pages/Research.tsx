import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, BookOpen, FlaskConical, Clock, AlertTriangle } from 'lucide-react';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

/* ─── Guide Data ─── */
interface Guide {
  id: string;
  title: string;
  description: string;
  readTime: string;
  content: string[];
  topics: string[];
}

const GUIDES: Guide[] = [
  {
    id: 'reconstituting-peptides',
    title: 'Reconstituting Peptides',
    description: 'How to mix lyophilized powder with bacteriostatic water, storage temperatures, shelf life, and common mistakes to avoid.',
    readTime: '4 min read',
    content: [
      'Most peptides arrive as lyophilized (freeze-dried) powder in vials. They must be reconstituted with bacteriostatic water before use. Bacteriostatic water contains 0.9% benzyl alcohol which prevents bacterial growth and extends shelf life.',
      'Slowly inject the water down the side of the vial — never directly onto the powder. Let it dissolve naturally. Do not shake. Gently swirl if needed. Most peptides dissolve within 1-2 minutes.',
      'Storage after reconstitution: keep refrigerated at 2-8\u00B0C. Most community reports indicate 4-6 weeks of stability for reconstituted peptides. Some, like BPC-157, show stability up to 8 weeks when properly stored.',
      'Common mistakes: using sterile water instead of bacteriostatic water (shorter shelf life), shaking the vial vigorously (can degrade the peptide), storing at room temperature after reconstitution, and using tap water (never do this).',
    ],
    topics: ['BPC-157', 'TB-500', 'GHK-Cu', 'CJC-1295', 'Ipamorelin'],
  },
  {
    id: 'injecting-peptides',
    title: 'Injecting Peptides',
    description: 'Subcutaneous injection technique, syringe selection, injection sites, rotation, and what the community reports.',
    readTime: '5 min read',
    content: [
      'Subcutaneous (under the skin) injection is the most common route for peptides. Use 29-31 gauge insulin syringes, 0.5ml capacity with 8mm (5/16") needles. These are readily available at most pharmacies in South Africa without prescription.',
      'Common injection sites: abdomen (avoid 5cm around the navel), thigh outer region, upper arm back area, and love handles. Rotate sites to prevent lipohypertrophy (fatty lumps under skin from repeated injections).',
      'Pinch the skin, insert at 45-90 degrees depending on body fat, inject slowly, hold for 5 seconds after plunger depression, withdraw gently, and apply light pressure with a cotton swab. Do not rub the injection site.',
      'Community tip: inject in the evening for GH-related peptides as natural GH pulses occur during sleep. For BPC-157, some users report better results with local injection near the injury site, though systemic administration also shows benefits.',
    ],
    topics: ['BPC-157', 'TB-500', 'Semaglutide', 'Tirzepatide', 'Retatrutide'],
  },
  {
    id: 'peptide-side-effects',
    title: 'Peptide Side Effects',
    description: 'The most commonly reported adverse effects across GLP-1s, GH secretagogues, healing peptides, and more.',
    readTime: '6 min read',
    content: [
      'GLP-1 agonists (semaglutide, tirzepatide, retatrutide): nausea, vomiting, diarrhea, constipation, appetite suppression (often extreme), fatigue, and potential gallbladder issues. The nausea typically subsides after 2-4 weeks of use.',
      'GH secretagogues (CJC-1295, ipamorelin, sermorelin): water retention, joint pain, carpal tunnel symptoms, increased hunger (with GHRPs), numbness/tingling in extremities, and potential insulin resistance with long-term use.',
      'Healing peptides (BPC-157, TB-500): generally well-tolerated. Some users report temporary fatigue, headache, or mild nausea. A small percentage report feeling "off" or experiencing mood changes during initial use.',
      'The community consistently reports that starting at lower doses and titrating up slowly reduces side effect severity. Always have a plan for managing side effects before starting any peptide protocol.',
    ],
    topics: ['Semaglutide', 'Tirzepatide', 'CJC-1295', 'BPC-157', 'TB-500'],
  },
  {
    id: 'best-peptide-stacks',
    title: 'Best Peptide Stacks',
    description: 'Community-reported combinations — healing stacks, GH protocols, weight loss pairings, and what people actually run.',
    readTime: '7 min read',
    content: [
      'Fat loss stack: CJC-1295 + Ipamorelin + Semaglutide/Tirzepatide. The GH boost from CJC/ipa helps preserve lean mass during aggressive weight loss. Community reports show 15-25% bodyweight reduction over 3-6 months.',
      'Recovery stack: BPC-157 + TB-500 at 500mcg each daily. Some add GHK-Cu for skin/wound benefits. Typical protocol runs 4-8 weeks. Best results reported with local injection near injury sites when possible.',
      'Anti-aging stack: Epitalon (10mg/day for 10 days, 2x/year) + GHK-Cu + NAD+. This is the "maintenance" stack for users past the initial optimization phase. Less dramatic effects but reported improvements in sleep, skin, and energy.',
      'The "everything" stack (reported by advanced users): Retatrutide + CJC-1295/Ipamorelin + BPC-157 + MOTS-c + TA-1. This is expensive and complex. Most experienced users report better results with simpler, focused stacks.',
    ],
    topics: ['CJC-1295', 'Ipamorelin', 'BPC-157', 'TB-500', 'Retatrutide'],
  },
  {
    id: 'peptides-for-weight-loss',
    title: 'Peptides for Weight Loss',
    description: 'GLP-1 peptides — semaglutide, tirzepatide, retatrutide. Real protocols, side effects, and outcomes from the community.',
    readTime: '8 min read',
    content: [
      'Semaglutide (Ozempic/Wegovy): Start at 0.25mg weekly, titrate up by 0.25mg every 4 weeks to a max of 2.4mg. Community reports average 10-15% bodyweight loss over 6 months. The weekly injection schedule is convenient.',
      'Tirzepatide (Mounjaro/Zepbound): Start at 2.5mg weekly, titrate to 5mg, 10mg, 15mg. Community reports 15-22% weight loss. The dual GIP/GLP-1 mechanism seems to produce better results than semaglutide alone for many users.',
      'Retatrutide: The triple agonist (GIP/GLP-1/glucagon) shows the most dramatic results — community reports 20-28% weight loss. Currently the most effective but also the most expensive option.',
      'AOD-9604: A fragment of HGH that targets fat metabolism without affecting blood sugar. Community reports are mixed — some see 2-4kg fat loss over 12 weeks, others report minimal effects. Best suited for the last few stubborn kilos.',
    ],
    topics: ['Semaglutide', 'Tirzepatide', 'Retatrutide', 'AOD-9604'],
  },
  {
    id: 'growth-hormone-peptides',
    title: 'Growth Hormone Peptides',
    description: 'GH secretagogues — CJC-1295, ipamorelin, MK-677, sermorelin. Protocols, sleep effects, and body composition outcomes.',
    readTime: '6 min read',
    content: [
      'CJC-1295 (with DAC): 1-2mg per week, single injection. The DAC extends half-life to ~8 days. Community reports: better sleep quality within the first week, gradual fat loss over 8-12 weeks, improved skin quality.',
      'Ipamorelin: 200-300mcg, 1-3x daily. The cleanest GH secretagogue — minimal cortisol and prolactin elevation. Best taken on an empty stomach. Many users stack with CJC-1295 for synergistic effects.',
      'Sermorelin: 100-200mcg before bed. Naturally pulses GH release similar to endogenous GHRH. Community favorite for sleep improvement and recovery. Less dramatic than CJC-1295 but more natural-feeling.',
      'MK-677 (Ibutamoren): 10-25mg daily oral. Increases GH and IGF-1. Side effects include increased appetite (beneficial for some), water retention, and potential insulin resistance. Not technically a peptide but commonly grouped with them.',
    ],
    topics: ['CJC-1295', 'Ipamorelin', 'Sermorelin'],
  },
  {
    id: 'peptides-for-recovery',
    title: 'Peptides for Recovery',
    description: 'BPC-157, TB-500, GHK-Cu — injury protocols, injection sites, timelines, and what the community reports.',
    readTime: '5 min read',
    content: [
      'BPC-157: 250-500mcg daily, subcutaneous near injury site or systemic. Community reports tendon repair in 4-6 weeks, gut healing in 2-4 weeks, and general anti-inflammatory effects. The "stable gastric pentadecapeptide" lives up to the hype for most users.',
      'TB-500 (Thymosin Beta-4): 2-5mg twice weekly. Works systemically to promote cell migration and angiogenesis. Best for muscle tears, joint issues, and post-surgical recovery. Many users report feeling "looser" within the first week.',
      'GHK-Cu: 1-2mg daily, subcutaneous or topical. The copper peptide shows remarkable wound healing and anti-inflammatory properties. Community reports: faster healing from cuts/burns, improved skin quality, and reduced joint pain.',
      'The classic recovery stack: BPC-157 (500mcg) + TB-500 (5mg, 2x/week) for 4-8 weeks. Add GHK-Cu for skin/wound-specific issues. Inject BPC near the injury when possible; TB-500 can be injected anywhere.',
    ],
    topics: ['BPC-157', 'TB-500', 'GHK-Cu'],
  },
];

/* ─── Sub-Nav ─── */
function SubNav({ active }: { active: string }) {
  const pills = [
    { to: '/quiz', label: 'peptides' },
    { to: '/parse', label: 'topics' },
    { to: '/research', label: 'guides' },
  ];
  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {pills.map((p) => (
        <Link
          key={p.to}
          to={p.to}
          className={`px-4 py-1.5 text-[11px] font-medium rounded-full border transition-all ${
            active === p.label
              ? 'bg-white/[0.08] text-white/70 border-white/20'
              : 'text-white/25 border-white/[0.06] hover:text-white/50 hover:border-white/15'
          }`}
        >
          {p.label}
        </Link>
      ))}
    </div>
  );
}

export default function Research() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  if (selectedGuide) {
    return (
      <div className="min-h-screen bg-black pt-14">
        <SEO title={`${selectedGuide.title} | CTPC Guide`} description={selectedGuide.description} path="/research" />
        <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.012) 2px, rgba(200,255,0,0.012) 4px)' }} />

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

          <h1 className="font-serif-display text-2xl md:text-3xl text-white mb-3 leading-snug">{selectedGuide.title}</h1>
          <p className="text-white/35 text-sm leading-relaxed mb-8">{selectedGuide.description}</p>

          <div className="space-y-5 pb-16">
            {selectedGuide.content.map((paragraph, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[#c8ff00]/30 font-mono-tech text-[10px] mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-white/65 text-sm leading-relaxed">{paragraph}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
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
    <div className="min-h-screen bg-black pt-14">
      <SEO title="Guides | Practical Peptide Topics | CTPC" description="7 practical guides drawn from community confessions — reconstitution, injection, side effects, stacks, weight loss, GH, and recovery protocols." path="/research" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.012) 2px, rgba(200,255,0,0.012) 4px)' }} />

      <div className="relative z-10">
        <SubNav active="guides" />

        {/* Hero */}
        <div className="text-center pt-8 pb-6 px-5">
          <h1 className="font-serif-display text-4xl md:text-6xl text-white">Guides</h1>
          <p className="text-white/30 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Practical topics drawn from {GUIDES.length} community confessions — what users actually report about technique, storage, and protocol.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-5">
          <div className="space-y-3 pb-20">
            {GUIDES.map((guide, i) => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="w-full text-left p-4 border border-white/[0.06] rounded-xl bg-white/[0.01] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[#c8ff00]/30 font-mono-tech text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-white text-sm font-medium group-hover:text-[#c8ff00] transition-colors">
                        {guide.title}
                      </h3>
                    </div>
                    <p className="text-white/25 text-xs leading-relaxed line-clamp-2">{guide.description}</p>
                  </div>
                  <span className="text-white/15 text-[9px] font-mono-tech shrink-0 flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5" />{guide.readTime}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

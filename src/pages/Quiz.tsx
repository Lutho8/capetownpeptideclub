import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, FlaskConical, Search, X, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';

/* ─── Peptide Data ─── */
interface Peptide {
  name: string;
  code: string;
  description: string;
  reportCount: number;
  alsoKnownAs: string[];
  oftenMentionedWith: string[];
}

interface Category {
  name: string;
  peptides: Peptide[];
}

const CATEGORIES: Category[] = [
  {
    name: 'Weight Loss & Metabolic',
    peptides: [
      {
        name: 'Retatrutide',
        code: 'retatrutide',
        description: 'Triple agonist at GIP, GLP-1, and glucagon receptors. Phase 3 trials show 24% mean weight loss — the most effective option currently available.',
        reportCount: 47,
        alsoKnownAs: ['reta', 'LY3437943', 'Reb3'],
        oftenMentionedWith: ['Tirzepatide', 'Semaglutide', 'CJC-1295'],
      },
      {
        name: 'Tirzepatide',
        code: 'tirzepatide',
        description: 'Dual GIP and GLP-1 receptor agonist sold as Mounjaro and Zepbound. Approved for type 2 diabetes and obesity; weekly injectable.',
        reportCount: 18,
        alsoKnownAs: ['tirz', 'Mounjaro', 'Zepbound', 'LY3298176'],
        oftenMentionedWith: ['Retatrutide', 'Semaglutide'],
      },
      {
        name: 'Semaglutide',
        code: 'semaglutide',
        description: 'GLP-1 receptor agonist sold as Ozempic and Wegovy. Approved for type 2 diabetes and weight management; available as weekly injectable or oral tablet.',
        reportCount: 8,
        alsoKnownAs: ['ozempic', 'wegovy', 'rybelsus', 'sem'],
        oftenMentionedWith: ['Tirzepatide', 'Retatrutide'],
      },
      {
        name: 'AOD-9604',
        code: 'aod-9604',
        description: 'Fragment of human growth hormone (176-191) that mimics the fat-burning effects of HGH without affecting blood sugar or IGF-1 levels.',
        reportCount: 3,
        alsoKnownAs: ['AOD', 'HGH fragment 176-191'],
        oftenMentionedWith: ['Retatrutide', 'Tirzepatide'],
      },
      {
        name: 'MOTS-c',
        code: 'mots-c',
        description: 'Mitochondrial-derived peptide that activates AMPK, improving insulin sensitivity and metabolic function. Known as an "exercise mimetic."',
        reportCount: 2,
        alsoKnownAs: ['mots', 'mitochondrial open reading frame'],
        oftenMentionedWith: ['Retatrutide', 'NAD+'],
      },
    ],
  },
  {
    name: 'Healing & Recovery',
    peptides: [
      {
        name: 'BPC-157',
        code: 'bpc-157',
        description: 'Body protective compound derived from human gastric juice. Animal studies focus on tendon repair, joint healing, and gut tissue regeneration.',
        reportCount: 15,
        alsoKnownAs: ['bpc157', 'bpc 157', 'body protective compound', 'BPC'],
        oftenMentionedWith: ['TB-500', 'GHK-Cu'],
      },
      {
        name: 'GHK-Cu',
        code: 'ghk-cu',
        description: 'Copper-binding tripeptide naturally present in human plasma. Studied for wound healing, tissue remodeling, and skin anti-aging effects.',
        reportCount: 12,
        alsoKnownAs: ['copper peptide', 'GHK', 'glycyl-l-histidyl-l-lysine'],
        oftenMentionedWith: ['BPC-157', 'TB-500', 'Retatrutide'],
      },
      {
        name: 'TB-500',
        code: 'tb-500',
        description: 'Synthetic fragment of thymosin beta-4, a protein found in blood platelets and wound fluid. Studied for tissue repair and cell migration signaling.',
        reportCount: 6,
        alsoKnownAs: ['thymosin beta-4', 'TB4', 'tb500'],
        oftenMentionedWith: ['BPC-157', 'GHK-Cu'],
      },
      {
        name: 'KPV',
        code: 'kpv',
        description: 'C-terminal tripeptide of alpha-MSH with anti-inflammatory properties. Research focuses on gut inflammation, Crohn\'s disease, and wound healing.',
        reportCount: 2,
        alsoKnownAs: ['lysine-proline-valine', 'alpha-msh fragment'],
        oftenMentionedWith: ['BPC-157', 'Thymosin Alpha-1'],
      },
      {
        name: 'Thymosin Alpha-1',
        code: 'thymosin-alpha-1',
        description: 'Naturally occurring thymic peptide involved in T-cell maturation and immune modulation. Used clinically for viral infections and immune deficiency.',
        reportCount: 1,
        alsoKnownAs: ['TA-1', 'thymalfasin', 'Zadaxin'],
        oftenMentionedWith: ['BPC-157', 'KPV', 'Retatrutide'],
      },
    ],
  },
  {
    name: 'Growth & Performance',
    peptides: [
      {
        name: 'CJC-1295',
        code: 'cjc-1295',
        description: 'Synthetic analogue of growth hormone-releasing hormone. Extends the half-life of endogenous GHRH through DAC technology.',
        reportCount: 5,
        alsoKnownAs: ['cjc1295', 'CJC', 'GHRH analogue'],
        oftenMentionedWith: ['Ipamorelin', 'Retatrutide'],
      },
      {
        name: 'Ipamorelin',
        code: 'ipamorelin',
        description: 'Selective growth hormone secretagogue often stacked with CJC-1295. Mimics ghrelin with a clean receptor profile and minimal off-target effects.',
        reportCount: 3,
        alsoKnownAs: ['ipa', 'ipamorelin acetate'],
        oftenMentionedWith: ['CJC-1295', 'Retatrutide'],
      },
      {
        name: 'Sermorelin',
        code: 'sermorelin',
        description: 'Synthetic analogue of the first 29 amino acids of endogenous GHRH. Used clinically to assess pituitary function and stimulate GH production.',
        reportCount: 1,
        alsoKnownAs: ['sermorelin acetate', 'GHRH 1-29'],
        oftenMentionedWith: ['CJC-1295', 'Ipamorelin'],
      },
    ],
  },
  {
    name: 'Sexual Health',
    peptides: [
      {
        name: 'PT-141',
        code: 'pt-141',
        description: 'Melanocortin receptor agonist approved by the FDA (2019) as Vyleesi for hypoactive sexual desire disorder in premenopausal women.',
        reportCount: 4,
        alsoKnownAs: ['Vyleesi', 'bremelanotide', 'PT141'],
        oftenMentionedWith: ['Kisspeptin', 'Melanotan II'],
      },
      {
        name: 'Melanotan II',
        code: 'melanotan-ii',
        description: 'Synthetic melanocortin analogue that stimulates melanogenesis and has libido-enhancing side effects. Popular in tanning and bodybuilding communities.',
        reportCount: 6,
        alsoKnownAs: ['MT-2', 'MT2', 'melanotan'],
        oftenMentionedWith: ['PT-141', 'GHK-Cu'],
      },
      {
        name: 'Kisspeptin',
        code: 'kisspeptin',
        description: 'Neuropeptide that regulates GnRH release and the reproductive hormone axis. Studied for libido, fertility, and hormonal health effects.',
        reportCount: 1,
        alsoKnownAs: ['KP-54', 'metastin'],
        oftenMentionedWith: ['PT-141'],
      },
    ],
  },
  {
    name: 'Cognitive & Neuro',
    peptides: [
      {
        name: 'Selank',
        code: 'selank',
        description: 'Synthetic heptapeptide with anxiolytic properties. Modulates enkephalin breakdown and interleukin-6 expression. No sedation or withdrawal reported.',
        reportCount: 2,
        alsoKnownAs: ['TP-7', 'threonine-proline'],
        oftenMentionedWith: ['Semax', 'Retatrutide'],
      },
      {
        name: 'Semax',
        code: 'semax',
        description: 'Synthetic peptide derived from ACTH 4-10. Increases BDNF and activates TrkB receptors. Used clinically in Russia for cognitive enhancement and stroke recovery.',
        reportCount: 1,
        alsoKnownAs: ['ACTH 4-10', 'semax acetate'],
        oftenMentionedWith: ['Selank', 'GHK-Cu'],
      },
      {
        name: 'SS-31',
        code: 'ss-31',
        description: 'Mitochondrial-targeted peptide that protects cardiolipin and improves cellular energy production. Research focuses on neuroprotection and metabolic health.',
        reportCount: 1,
        alsoKnownAs: ['elamipretide', 'Bendavia'],
        oftenMentionedWith: ['MOTS-c', 'NAD+'],
      },
    ],
  },
  {
    name: 'Longevity & Cellular',
    peptides: [
      {
        name: 'Epithalon',
        code: 'epithalon',
        description: 'Synthetic version of Epithalamin, a pineal gland peptide. Activates telomerase and may extend cellular lifespan. Popular in anti-aging protocols.',
        reportCount: 2,
        alsoKnownAs: ['epitalon', 'epithalone', 'AGAG'],
        oftenMentionedWith: ['NAD+', 'GHK-Cu'],
      },
      {
        name: 'NAD+',
        code: 'nad+',
        description: 'Nicotinamide adenine dinucleotide — an essential redox cofactor and substrate for sirtuins. Central to cellular energy metabolism and DNA repair pathways.',
        reportCount: 3,
        alsoKnownAs: ['NAD', 'nicotinamide adenine dinucleotide'],
        oftenMentionedWith: ['Epithalon', 'MOTS-c'],
      },
    ],
  },
];

const TOTAL_PEPTIDES = CATEGORIES.reduce((sum, c) => sum + c.peptides.length, 0);

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

export default function Quiz() {
  const [selectedPeptide, setSelectedPeptide] = useState<{ peptide: Peptide; category: string } | null>(null);
  const [search, setSearch] = useState('');

  // Filter peptides by search
  const filteredCategories = search
    ? CATEGORIES.map((cat) => ({
        ...cat,
        peptides: cat.peptides.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.alsoKnownAs.some((aka) => aka.toLowerCase().includes(search.toLowerCase()))
        ),
      })).filter((cat) => cat.peptides.length > 0)
    : CATEGORIES;

  if (selectedPeptide) {
    const { peptide, category } = selectedPeptide;
    return (
      <div className="min-h-screen bg-black pt-14">
        <SEO title={`${peptide.name} | CTPC Directory`} description={peptide.description} path="/quiz" />
        <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.012) 2px, rgba(200,255,0,0.012) 4px)' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-5">
          <SubNav active="peptides" />

          <button onClick={() => setSelectedPeptide(null)} className="flex items-center gap-1 text-white/25 text-[11px] hover:text-white/50 transition-colors mt-4 mb-6">
            <ArrowLeft className="w-3 h-3" /> back to directory
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 text-[9px] font-mono-tech tracking-wider text-white/30 bg-white/[0.05] rounded border border-white/[0.08]">
              {category}
            </span>
          </div>

          <h1 className="font-serif-display text-3xl md:text-4xl text-white mb-2">{peptide.name}</h1>
          <p className="text-white/40 text-sm leading-relaxed mb-4">{peptide.description}</p>

          <div className="inline-flex items-center px-3 py-1 bg-white/[0.05] rounded-full border border-white/[0.08] mb-6">
            <span className="text-[#c8ff00] text-sm font-semibold mr-1.5">{peptide.reportCount}</span>
            <span className="text-white/30 text-[11px]">anonymous reports</span>
          </div>

          {/* Also known as */}
          <div className="mb-5">
            <h3 className="text-white/20 text-[10px] font-mono-tech tracking-wider uppercase mb-2">Also known as</h3>
            <div className="flex flex-wrap gap-2">
              {peptide.alsoKnownAs.map((aka) => (
                <span key={aka} className="px-2.5 py-0.5 text-[10px] text-white/30 bg-white/[0.05] rounded-full border border-white/[0.06]">{aka}</span>
              ))}
            </div>
          </div>

          {/* Often mentioned with */}
          <div className="mb-5">
            <h3 className="text-white/20 text-[10px] font-mono-tech tracking-wider uppercase mb-2">Often mentioned with</h3>
            <div className="flex flex-wrap gap-2">
              {peptide.oftenMentionedWith.map((omw) => (
                <span key={omw} className="px-2.5 py-0.5 text-[10px] text-white/30 bg-white/[0.05] rounded-full border border-white/[0.06]">{omw}</span>
              ))}
            </div>
          </div>

          {/* Link to confessions */}
          <div className="pb-20">
            <Link
              to="/trials"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8ff00]/10 border border-[#c8ff00]/20 text-[#c8ff00] text-xs font-mono-tech rounded-lg hover:bg-[#c8ff00]/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Read {peptide.reportCount} confession{peptide.reportCount !== 1 ? 's' : ''} mentioning {peptide.name}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-14">
      <SEO title={`Peptide Directory | ${TOTAL_PEPTIDES} Compounds | CTPC`} description={`${TOTAL_PEPTIDES} peptides organised by category with anonymous community reports. Browse healing, growth, weight loss, cognitive, and longevity compounds.`} path="/quiz" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.012) 2px, rgba(200,255,0,0.012) 4px)' }} />

      <div className="relative z-10">
        <SubNav active="peptides" />

        {/* Hero */}
        <div className="text-center pt-8 pb-6 px-5">
          <h1 className="font-serif-display text-4xl md:text-6xl text-white">peptide directory</h1>
          <p className="text-white/30 text-sm mt-3 max-w-md mx-auto">
            {TOTAL_PEPTIDES} peptides organised by category · anonymous reports from the underground
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-5">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search peptides or aliases..."
              className="w-full pl-9 pr-9 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 text-xs placeholder:text-white/15 focus:outline-none focus:border-[#c8ff00]/30 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results summary */}
          {search && (
            <div className="mb-4">
              <span className="text-white/25 text-[10px] font-mono-tech">
                Found {filteredCategories.reduce((sum, c) => sum + c.peptides.length, 0)} peptide{filteredCategories.reduce((sum, c) => sum + c.peptides.length, 0) !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
              </span>
            </div>
          )}

          <div className="space-y-10 pb-20">
            {filteredCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical className="w-3.5 h-3.5 text-white/15" />
                  <h2 className="text-white/20 text-[10px] font-mono-tech tracking-[0.2em] uppercase">
                    {category.name}
                  </h2>
                </div>
                <div className="space-y-2">
                  {category.peptides.map((peptide) => (
                    <button
                      key={peptide.code}
                      onClick={() => setSelectedPeptide({ peptide, category: category.name })}
                      className="w-full text-left p-4 border border-white/[0.06] rounded-xl bg-white/[0.01] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-medium group-hover:text-[#c8ff00] transition-colors mb-1">
                            {peptide.name}
                          </h3>
                          <p className="text-white/22 text-xs leading-relaxed line-clamp-2">{peptide.description}</p>
                        </div>
                        <span className="text-white/18 text-[11px] font-mono-tech shrink-0">
                          {peptide.reportCount} {peptide.reportCount === 1 ? 'report' : 'reports'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-8 h-8 text-white/10 mx-auto mb-3" />
                <p className="text-white/25 text-sm">No peptides match &ldquo;{search}&rdquo;.</p>
                <button onClick={() => setSearch('')} className="text-[#c8ff00]/60 text-xs mt-2 hover:text-[#c8ff00]">View all</button>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

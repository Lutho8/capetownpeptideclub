import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Send, Heart, Search, X, TrendingUp, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import { CONFESSIONS } from '@/data/confessions';
import Footer from '@/components/Footer';

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

/* ─── Confession Card ─── */
function ConfessionCard({ confession }: { confession: typeof CONFESSIONS[0] }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(confession.likes);

  return (
    <div className="group border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.14] hover:bg-white/[0.03] transition-all duration-300">
      <p className="text-white/75 text-[13px] leading-[1.7] whitespace-pre-wrap">
        {confession.text}
      </p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white/15 text-[11px] font-mono-tech">#{confession.id}</span>
          {confession.peptides.map((pep) => (
            <span key={pep} className="px-2.5 py-0.5 text-[10px] text-white/30 bg-white/[0.04] rounded-full border border-white/[0.06] group-hover:border-white/[0.10] transition-colors">
              {pep}
            </span>
          ))}
        </div>
        <button
          onClick={() => { setLiked(!liked); setLikeCount(liked ? likeCount - 1 : likeCount + 1); }}
          className="flex items-center gap-1 text-white/15 hover:text-red-400 transition-colors"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${liked ? 'fill-red-400 text-red-400' : ''}`} />
          <span className="text-[10px] font-mono-tech">{likeCount}</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Trending Peptides Sidebar ─── */
function TrendingPeptides() {
  const peptides = [
    { name: 'Retatrutide', count: 47, color: '#c8ff00' },
    { name: 'Tirzepatide', count: 18, color: '#ff9933' },
    { name: 'BPC-157', count: 15, color: '#ff4d4d' },
    { name: 'GHK-Cu', count: 12, color: '#66ff99' },
    { name: 'CJC-1295', count: 5, color: '#8b7aff' },
    { name: 'PT-141', count: 4, color: '#ff66aa' },
  ];
  return (
    <div className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.01] sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-[#c8ff00]" />
        <h3 className="text-white/50 text-[10px] font-mono-tech tracking-wider uppercase">Most Discussed</h3>
      </div>
      <div className="space-y-2.5">
        {peptides.map((p, i) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="text-white/15 font-mono-tech text-[10px] w-4">{i + 1}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs">{p.name}</span>
                <span className="text-white/20 text-[10px] font-mono-tech">{p.count}</span>
              </div>
              <div className="h-1 bg-white/[0.04] rounded-full mt-1 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(p.count / 47) * 100}%`, backgroundColor: p.color, opacity: 0.5 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Trials() {
  const [confessText, setConfessText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState('');

  const handleConfess = () => {
    if (!confessText.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setConfessText(''); }, 2000);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return CONFESSIONS;
    const q = search.toLowerCase();
    return CONFESSIONS.filter((c) =>
      c.text.toLowerCase().includes(q) ||
      c.peptides.some((p) => p.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-black pt-14">
      <SEO title={`Anonymous Peptide Confessions | ${CONFESSIONS.length} Reports | CTPC`} description={`${CONFESSIONS.length} anonymous protocols, side effects, and confessions from the peptide underground. Searchable by peptide or keyword.`} path="/trials" />

      {/* Scan-line background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.015) 2px, rgba(200,255,0,0.015) 4px)' }} />

      <div className="relative z-10">
        <SubNav active="confessions" />

        {/* Hero */}
        <div className="text-center pt-8 pb-6 px-5">
          <h1 className="font-serif-display text-4xl md:text-6xl text-white leading-tight">
            <span className="text-white/25">anonymous</span> peptide<br />
            <span className="text-[#c8ff00]">confessions</span>
          </h1>
          <p className="text-white/30 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            {CONFESSIONS.length} anonymous reports from the underground. Real protocols, real side effects, real outcomes. Searchable by peptide name or keyword.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            {/* Main Column */}
            <div>
              {/* Search + Confess */}
              <div className="mb-6 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search confessions by peptide or keyword..."
                    className="w-full pl-9 pr-9 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 text-xs placeholder:text-white/15 focus:outline-none focus:border-[#c8ff00]/30 transition-colors"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    value={confessText}
                    onChange={(e) => setConfessText(e.target.value)}
                    placeholder="Share your experience anonymously..."
                    rows={3}
                    className="w-full p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white/70 text-sm placeholder:text-white/15 focus:outline-none focus:border-[#c8ff00]/30 resize-none transition-colors pr-24"
                  />
                  <button
                    onClick={handleConfess}
                    disabled={!confessText.trim() || submitted}
                    className="absolute bottom-3 right-3 px-4 py-1.5 bg-[#c8ff00] text-black text-[11px] font-medium rounded-full hover:bg-[#d8ff40] transition-colors disabled:opacity-30 flex items-center gap-1"
                  >
                    {submitted ? 'submitted' : (<><Send className="w-3 h-3" />confess</>)}
                  </button>
                </div>
              </div>

              {/* Results count */}
              {search && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/30 text-[10px] font-mono-tech">
                    {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for &ldquo;{search}&rdquo;
                  </span>
                  <button onClick={() => setSearch('')} className="text-[#c8ff00]/60 text-[10px] font-mono-tech hover:text-[#c8ff00]">clear search</button>
                </div>
              )}

              {/* Confession Feed */}
              <div className="space-y-4 pb-20">
                {filtered.map((c) => (
                  <ConfessionCard key={c.id} confession={c} />
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-16">
                    <MessageCircle className="w-8 h-8 text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No confessions match your search.</p>
                    <button onClick={() => setSearch('')} className="text-[#c8ff00]/60 text-xs mt-2 hover:text-[#c8ff00]">View all</button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <TrendingPeptides />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

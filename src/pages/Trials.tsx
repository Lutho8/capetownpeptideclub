import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router';
import { Send, Heart, MessageCircle, ArrowRight, Download, Smartphone, ShoppingBag, FlaskConical } from 'lucide-react';
import SEO from '@/components/SEO';
import { CONFESSIONS } from '@/data/confessions';
import Footer from '@/components/Footer';
import NeuralWebBackground from '@/components/effects/NeuralWebBackground';
import TypewriterText from '@/components/effects/TypewriterText';
import HolographicCard from '@/components/effects/HolographicCard';
import GlitchReveal from '@/components/effects/GlitchReveal';
import LaserInput from '@/components/effects/LaserInput';

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
function ConfessionCard({ confession, index }: { confession: typeof CONFESSIONS[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(confession.likes);
  const [expanded, setExpanded] = useState(false);

  const toggleLike = useCallback(() => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount(next ? likeCount + 1 : likeCount - 1);
      return next;
    });
  }, [likeCount]);

  const isLong = confession.text.length > 400;
  const displayText = expanded || !isLong ? confession.text : confession.text.slice(0, 400) + '...';

  return (
    <HolographicCard className="w-full">
      <div className="p-5">
        {/* Confession number badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#c8ff00]/30 font-mono-tech text-[10px]">
            #{String(index + 1).padStart(3, '0')} — anonymous
          </span>
          <span className="text-white/10 text-[9px] font-mono-tech">
            {confession.peptides.length > 1 ? 'multi-compound' : confession.peptides[0]}
          </span>
        </div>

        <GlitchReveal delay={0.05 * (index % 5)}>
          <p className="text-white/75 text-[13px] leading-[1.7] whitespace-pre-wrap">
            {displayText}
          </p>
        </GlitchReveal>

        {isLong && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="text-[#c8ff00]/50 text-[11px] font-mono-tech mt-2 hover:text-[#c8ff00] transition-colors"
          >
            {expanded ? 'show less' : 'read more'}
          </button>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-2 flex-wrap">
            {confession.peptides.map((pep) => (
              <span key={pep} className="px-2.5 py-0.5 text-[10px] text-white/30 bg-white/[0.04] rounded-full border border-white/[0.06]">
                {pep}
              </span>
            ))}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); toggleLike(); }}
            className="flex items-center gap-1 text-white/15 hover:text-red-400 transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 transition-colors ${liked ? 'fill-red-400 text-red-400' : ''}`} />
            <span className="text-[10px] font-mono-tech">{likeCount}</span>
          </button>
        </div>
      </div>
    </HolographicCard>
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
    <div className="space-y-4 relative z-10">
      <div className="border border-white/[0.06] rounded-xl p-5 bg-black/60 backdrop-blur-sm sticky top-20">
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

      {/* Ecosystem: PSA App CTA */}
      <div className="border border-white/[0.06] rounded-xl p-5 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4 text-[#8b7aff]" />
          <h3 className="text-white/50 text-[10px] font-mono-tech tracking-wider uppercase">PSA App</h3>
        </div>
        <p className="text-white/35 text-xs leading-relaxed mb-3">
          Track your protocol, monitor progress, and get personalised dosing reminders — all in one place.
        </p>
        <a
          href="https://peptide-south-africa.co.za?utm_source=club&utm_medium=confessions_sidebar&utm_campaign=ecosystem"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8b7aff]/10 border border-[#8b7aff]/30 text-[#a89aff] text-[11px] font-medium rounded-full hover:bg-[#8b7aff]/20 transition-colors"
        >
          <Download className="w-3 h-3" />
          Open App
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Ecosystem: Shop CTA */}
      <div className="border border-white/[0.06] rounded-xl p-5 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag className="w-4 h-4 text-[#c8ff00]" />
          <h3 className="text-white/50 text-[10px] font-mono-tech tracking-wider uppercase">Shop Peptides</h3>
        </div>
        <p className="text-white/35 text-xs leading-relaxed mb-3">
          HPLC-verified research peptides. Same-day dispatch from Cape Town. COA on every batch.
        </p>
        <a
          href="https://peptide-south-africa.com/shop?utm_source=club&utm_medium=confessions_sidebar&utm_campaign=ecosystem"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c8ff00]/10 border border-[#c8ff00]/30 text-[#c8ff00] text-[11px] font-medium rounded-full hover:bg-[#c8ff00]/20 transition-colors"
        >
          <FlaskConical className="w-3 h-3" />
          Browse Store
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

/* ─── Community CTA Banner ─── */
function CommunityCTA() {
  return (
    <div className="border border-[#c8ff00]/20 rounded-xl p-6 bg-[#c8ff00]/[0.02] mb-8 relative z-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-white text-sm font-medium mb-1">Share your experience anonymously</h3>
          <p className="text-white/35 text-xs leading-relaxed">
            Join {CONFESSIONS.length}+ anonymous reports from the peptide underground. No accounts. No names. Just honest experiences.
          </p>
        </div>
        <Link
          to="/parse"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#c8ff00] text-black text-[11px] font-medium rounded-full hover:bg-[#d8ff40] transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Browse Topics
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default function Trials() {
  const [confessText, setConfessText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  const handleConfess = () => {
    if (!confessText.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setConfessText(''); }, 2000);
  };

  const filtered = useMemo(() => {
    let results = [...CONFESSIONS];
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter((c) =>
        c.text.toLowerCase().includes(q) ||
        c.peptides.some((p) => p.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'popular') {
      results.sort((a, b) => b.likes - a.likes);
    }
    return results;
  }, [search, sortBy]);

  return (
    <div className="min-h-screen bg-black pt-14 relative">
      <SEO
        title={`Peptide Confessions — ${CONFESSIONS.length} Anonymous Reports | CTPC`}
        description={`${CONFESSIONS.length} anonymous protocols, side effects, and confessions from the peptide underground. Searchable by peptide or keyword. Part of the Peptide South Africa ecosystem.`}
        path="/trials"
      />

      {/* WebGL Neural Network Background */}
      <NeuralWebBackground />

      <div className="relative z-10">
        <SubNav active="confessions" />

        {/* Hero — Terminal typing effect */}
        <div className="text-center pt-8 pb-6 px-5 relative z-10">
          <h1 className="font-serif-display text-4xl md:text-6xl text-white leading-tight">
            <span className="text-white/25">
              <TypewriterText text="peptide" speed={80} delay={200} showCursor={false} />
            </span>
            <br />
            <span className="text-[#c8ff00]">
              <TypewriterText text="confessions" speed={80} delay={600} showCursor />
            </span>
          </h1>
          <p className="text-white/30 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            {CONFESSIONS.length} anonymous reports from the underground. Real protocols, real side effects, real outcomes.
            <span className="block mt-1 text-white/20 text-xs">
              No accounts. No names. Just honest experiences.
            </span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
            {/* Main Column */}
            <div>
              {/* Search + Confess + Sort */}
              <div className="mb-6 space-y-3">
                <LaserInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search confessions by peptide or keyword..."
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
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

                {/* Sort tabs */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSortBy('latest')}
                    className={`px-3 py-1 text-[10px] font-mono-tech rounded-full border transition-all ${
                      sortBy === 'latest'
                        ? 'bg-white/[0.08] text-white/70 border-white/20'
                        : 'text-white/25 border-white/[0.06] hover:text-white/50'
                    }`}
                  >
                    latest
                  </button>
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`px-3 py-1 text-[10px] font-mono-tech rounded-full border transition-all ${
                      sortBy === 'popular'
                        ? 'bg-white/[0.08] text-white/70 border-white/20'
                        : 'text-white/25 border-white/[0.06] hover:text-white/50'
                    }`}
                  >
                    most liked
                  </button>
                  <span className="ml-auto text-white/20 text-[10px] font-mono-tech">
                    {filtered.length} confession{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Community CTA */}
              {!search && <CommunityCTA />}

              {/* Confession Feed */}
              <div className="space-y-4 pb-20">
                {filtered.map((c, i) => (
                  <ConfessionCard key={c.id} confession={c} index={i} />
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-16 relative z-10">
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

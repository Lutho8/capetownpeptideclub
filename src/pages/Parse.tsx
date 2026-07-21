import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, TrendingUp, MessageCircle, Search, X, ArrowRight, Smartphone, ShoppingBag, FlaskConical, BookOpen, Users } from 'lucide-react';
import SEO from '@/components/SEO';
import { CONFESSIONS } from '@/data/confessions';
import Footer from '@/components/Footer';

/* ─── Topic Data with real confession counts ─── */
interface TopicConfession {
  id: number;
  text: string;
  peptides: string[];
}

interface Topic {
  id: string;
  title: string;
  description: string;
  reportCount: number;
  confessions: TopicConfession[];
  guide?: string;
}

function getTopicConfessions(topicIds: string[]): TopicConfession[] {
  const idSet = new Set(topicIds);
  return CONFESSIONS.filter((c) => c.peptides.some((p) => idSet.has(p))).map((c) => ({
    id: c.id,
    text: c.text,
    peptides: c.peptides,
  }));
}

function countTopic(topicIds: string[]): number {
  const idSet = new Set(topicIds);
  return CONFESSIONS.filter((c) => c.peptides.some((p) => idSet.has(p))).length;
}

const TOPICS: Topic[] = [
  {
    id: 'peptides-for-weight-loss',
    title: 'Weight Loss',
    description: 'GLP-1 agonists and metabolic peptides — semaglutide, tirzepatide, retatrutide. The most discussed category.',
    reportCount: 0,
    confessions: [],
    guide: 'Real user timelines, dosing protocols, and what to expect weeks 1-12.',
  },
  {
    id: 'peptides-for-recovery',
    title: 'Recovery & Healing',
    description: 'BPC-157, TB-500, GHK-Cu — injury repair, gut healing, and tissue regeneration.',
    reportCount: 0,
    confessions: [],
    guide: 'Local vs systemic injection, protocol length, and when to expect results.',
  },
  {
    id: 'best-peptide-stacks',
    title: 'Stacks & Protocols',
    description: 'What combinations people actually run — CJC/ipamorelin, BPC/TB, and advanced personal protocols.',
    reportCount: 0,
    confessions: [],
    guide: 'Beginner, intermediate, and advanced stacks with real user feedback.',
  },
  {
    id: 'peptide-side-effects',
    title: 'Side Effects',
    description: 'The uncomfortable truths — nausea, hair loss, hormonal disruption, and what nobody mentions in the marketing.',
    reportCount: 0,
    confessions: [],
    guide: 'How to manage common sides and when to stop.',
  },
  {
    id: 'peptides-for-women',
    title: 'Women\'s Experiences',
    description: 'Period disruption, libido changes, PT-141 experiences — reports the general community rarely discusses.',
    reportCount: 0,
    confessions: [],
    guide: 'Female-specific considerations and compound selection.',
  },
  {
    id: 'mental-health',
    title: 'Mental Health & Drive',
    description: 'How peptides affect mood, anxiety, motivation, focus, and the mental side of biohacking.',
    reportCount: 0,
    confessions: [],
    guide: 'Nootropic peptides, motivation changes, and emotional regulation.',
  },
  {
    id: 'sourcing',
    title: 'Sourcing & Pricing',
    description: 'The economics of peptides — clinic vs grey market, testing, and supply chain realities.',
    reportCount: 0,
    confessions: [],
    guide: 'How to verify purity, read COAs, and avoid scams.',
  },
  {
    id: 'success-stories',
    title: 'Success Stories',
    description: 'Life-changing outcomes — diabetes remission, migraine cures, injury recovery that defied conventional medicine.',
    reportCount: 0,
    confessions: [],
    guide: 'Long-term maintenance and keeping results.',
  },
  {
    id: 'peptides-for-skin',
    title: 'Skin & Hair',
    description: 'GHK-Cu, BPC-157, and their effects on skin aging, scarring, dermatitis, and hair quality.',
    reportCount: 0,
    confessions: [],
    guide: 'Topical vs injectable, and realistic timelines.',
  },
  {
    id: 'peptides-for-sexual-health',
    title: 'Sexual Health',
    description: 'PT-141, kisspeptin, melanotan — libido enhancement and the reports too honest for mainstream forums.',
    reportCount: 0,
    confessions: [],
    guide: 'Dosing, timing, and combination strategies.',
  },
  {
    id: 'growth-hormone-peptides',
    title: 'Growth Hormone',
    description: 'CJC-1295, ipamorelin, sermorelin — sleep quality, recovery, body composition.',
    reportCount: 0,
    confessions: [],
    guide: 'Sleep architecture changes and long-term GH protocols.',
  },
  {
    id: 'retatrutide',
    title: 'Retatrutide Deep Dive',
    description: 'The triple agonist — weight loss, dose protocols, side effects, and the community obsession.',
    reportCount: 0,
    confessions: [],
    guide: 'Complete retatrutide guide: from first pin to maintenance.',
  },
];

// Populate real counts and confessions
const TOPIC_PEPTIDE_MAP: Record<string, string[]> = {
  'peptides-for-weight-loss': ['Retatrutide', 'Tirzepatide', 'Semaglutide', 'AOD-9604', 'MOTS-c', 'Tesamorelin'],
  'peptides-for-recovery': ['BPC-157', 'TB-500', 'GHK-Cu', 'KPV', 'Thymosin Alpha-1'],
  'best-peptide-stacks': ['Retatrutide', 'CJC-1295', 'Ipamorelin', 'BPC-157', 'TB-500', 'GHK-Cu', 'MOTS-c', 'Sermorelin'],
  'peptide-side-effects': ['Retatrutide', 'Tirzepatide', 'Semaglutide', 'BPC-157', 'Tesamorelin', 'NAD+', 'CJC-1295'],
  'peptides-for-women': ['PT-141', 'BPC-157', 'TB-500', 'Retatrutide', 'Tirzepatide', 'MOTS-c'],
  'mental-health': ['Retatrutide', 'Tirzepatide', 'Semaglutide', 'Selank', 'Semax', 'SS-31'],
  'sourcing': ['Retatrutide', 'Tirzepatide', 'BPC-157', 'GHK-Cu'],
  'success-stories': ['Retatrutide', 'Tirzepatide', 'Semaglutide', 'BPC-157', 'Selank'],
  'peptides-for-skin': ['GHK-Cu', 'BPC-157', 'Thymosin Alpha-1', 'KPV'],
  'peptides-for-sexual-health': ['PT-141', 'Kisspeptin', 'Melanotan II', 'Retatrutide'],
  'growth-hormone-peptides': ['CJC-1295', 'Ipamorelin', 'Sermorelin'],
  'retatrutide': ['Retatrutide'],
};

TOPICS.forEach((t) => {
  const peptideIds = TOPIC_PEPTIDE_MAP[t.id] || [];
  t.reportCount = countTopic(peptideIds);
  t.confessions = getTopicConfessions(peptideIds);
});

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

/* ─── Ecosystem Banner ─── */
function EcosystemBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
      <a
        href="https://peptide-south-africa.co.za?utm_source=club&utm_medium=topics_page&utm_campaign=ecosystem"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 border border-[#8b7aff]/20 rounded-xl bg-[#8b7aff]/[0.02] hover:bg-[#8b7aff]/[0.05] transition-colors group"
      >
        <Smartphone className="w-5 h-5 text-[#8b7aff] shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-medium">Track your protocol in the PSA App</p>
          <p className="text-white/30 text-[10px]">Dosing reminders, progress tracking, stack builder</p>
        </div>
        <ArrowRight className="w-4 h-4 text-[#8b7aff] group-hover:translate-x-0.5 transition-transform" />
      </a>
      <a
        href="https://peptide-south-africa.com/shop?utm_source=club&utm_medium=topics_page&utm_campaign=ecosystem"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 border border-[#c8ff00]/20 rounded-xl bg-[#c8ff00]/[0.02] hover:bg-[#c8ff00]/[0.05] transition-colors group"
      >
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

export default function Parse() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [search, setSearch] = useState('');

  const filteredTopics = search
    ? TOPICS.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
    : TOPICS;

  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-black pt-14">
        <SEO title={`${selectedTopic.title} | CTPC Community Topic`} description={selectedTopic.description} path="/parse" />
        <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.012) 2px, rgba(200,255,0,0.012) 4px)' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-5">
          <SubNav active="topics" />

          <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-1 text-white/25 text-[11px] hover:text-white/50 transition-colors mt-4 mb-6">
            <ArrowLeft className="w-3 h-3" /> back to topics
          </button>

          <h1 className="font-serif-display text-3xl md:text-4xl text-white mb-2">{selectedTopic.title}</h1>
          <p className="text-white/35 text-sm leading-relaxed mb-4">{selectedTopic.description}</p>

          {/* Community guide snippet */}
          {selectedTopic.guide && (
            <div className="flex items-start gap-2 p-3 border border-white/[0.06] rounded-lg bg-white/[0.01] mb-6">
              <BookOpen className="w-3.5 h-3.5 text-[#c8ff00]/50 shrink-0 mt-0.5" />
              <p className="text-white/40 text-xs leading-relaxed">{selectedTopic.guide}</p>
            </div>
          )}

          <div className="inline-flex items-center px-3 py-1 bg-white/[0.05] rounded-full border border-white/[0.08] mb-8">
            <span className="text-[#c8ff00] text-sm font-semibold mr-1.5">{selectedTopic.confessions.length}</span>
            <span className="text-white/30 text-[11px]">anonymous reports</span>
          </div>

          {selectedTopic.confessions.length === 0 ? (
            <div className="text-center py-16 border border-white/[0.06] rounded-xl">
              <MessageCircle className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-white/25 text-sm">No confessions tagged for this topic yet.</p>
              <Link to="/trials" className="text-[#c8ff00]/60 text-xs mt-2 inline-block hover:text-[#c8ff00]">Browse all confessions</Link>
            </div>
          ) : (
            <div className="space-y-4 pb-20">
              {selectedTopic.confessions.map((c) => (
                <div key={c.id} className="border border-white/[0.06] rounded-xl p-5 bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all">
                  <p className="text-white/75 text-[13px] leading-[1.7]">{c.text}</p>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-white/15 text-[11px] font-mono-tech">#{c.id}</span>
                    {c.peptides.map((p) => (
                      <span key={p} className="px-2.5 py-0.5 text-[10px] text-white/30 bg-white/[0.05] rounded-full border border-white/[0.06]">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-14">
      <SEO title="Community Topics | Browse Confessions by Theme | CTPC" description={`${TOPICS.length} topics covering weight loss, recovery, side effects, stacks, mental health, and more. Browse anonymous peptide confessions by theme.`} path="/parse" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,255,0,0.012) 2px, rgba(200,255,0,0.012) 4px)' }} />

      <div className="relative z-10">
        <SubNav active="topics" />

        {/* Hero */}
        <div className="text-center pt-8 pb-6 px-5">
          <h1 className="font-serif-display text-4xl md:text-6xl text-white">community topics</h1>
          <p className="text-white/30 text-sm mt-3 max-w-md mx-auto">
            {TOPICS.length} categories · browse confessions by theme · curated community guides
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-5">
          {/* Ecosystem CTAs */}
          <EcosystemBanner />

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-9 pr-9 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 text-xs placeholder:text-white/15 focus:outline-none focus:border-[#c8ff00]/30 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-2 pb-20">
            {filteredTopics.sort((a, b) => b.reportCount - a.reportCount).map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="w-full text-left p-4 border border-white/[0.06] rounded-xl bg-white/[0.01] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium group-hover:text-[#c8ff00] transition-colors mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-white/25 text-xs leading-relaxed line-clamp-2">{topic.description}</p>
                    {topic.guide && (
                      <p className="text-white/15 text-[10px] mt-1 flex items-center gap-1">
                        <BookOpen className="w-2.5 h-2.5" />
                        {topic.guide}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <TrendingUp className="w-3 h-3 text-white/15 group-hover:text-[#c8ff00]/50 transition-colors" />
                    <span className="text-white/20 text-[11px] font-mono-tech group-hover:text-white/40 transition-colors">
                      {topic.reportCount > 0 ? `${topic.reportCount} reports` : '—'}
                    </span>
                  </div>
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

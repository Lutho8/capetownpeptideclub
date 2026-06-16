import { useState, useMemo } from 'react';
import { PEPTIDES } from '@/data/staticData';
import { Search, FlaskConical, ChevronDown } from 'lucide-react';
import SEO, { BreadcrumbSchema } from '@/components/SEO';

export default function Peptides() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const categories = useMemo(() => {
    const cats = new Set(PEPTIDES.map((p) => p.category));
    return Array.from(cats).sort();
  }, []);

  const filtered = useMemo(() => {
    return PEPTIDES.filter((p) => {
      const matchSearch = !search || p.shortCode.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !category || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const pageSize = 20;
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const selectedPeptide = PEPTIDES.find((p) => p.id === selectedId);

  const statusColor = (status?: string) => {
    switch (status) {
      case 'approved': return 'text-green-700 bg-green-50';
      case 'phase3': return 'text-blue-700 bg-blue-50';
      case 'phase2': return 'text-indigo-700 bg-indigo-50';
      case 'phase1': return 'text-purple-700 bg-purple-50';
      case 'preclinical': return 'text-[#637c65] bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] pt-14">
      <SEO
        title="Peptide Database Archive | 31 Research Compounds | Cape Town Peptide Club"
        description="Browse 31 HPLC-verified research peptides. Search by category, status, and code. BPC-157, TB-500, Semaglutide, Retatrutide, GHK-Cu and more. Cape Town, South Africa."
        path="/#/peptides"
        keywords="peptide database, research compounds, BPC-157, TB-500, Semaglutide, peptide archive, South Africa"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Peptide Archive', path: '/#/peptides' }]} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
          <a href="#/" className="font-mono text-[10px] text-[#637c65] hover:text-[#00211e] transition-colors">Home</a>
          <span className="font-mono text-[10px] text-[#637c65]">/</span>
          <span className="font-mono text-[10px] text-[#00211e] font-semibold">Peptide Archive</span>
        </nav>

        <div className="mb-8">
          <div className="font-mono-tech text-[10px] tracking-[0.3em] text-[#637c65] mb-2">PEPTIDE DATABASE</div>
          <h1 className="font-serif-display text-4xl text-[#00211e]">The Archive</h1>
          <p className="font-sans-body text-sm text-[#637c65] mt-2">
            {PEPTIDES.length} peptides with community data and literature references.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#637c65]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search peptides..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[rgba(0,33,30,0.15)] font-sans-body text-sm text-[#00211e] placeholder:text-[#637c65]/50 focus:outline-none focus:border-[#00211e]"
            />
          </div>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(0); }}
              className="appearance-none pl-4 pr-10 py-2 bg-white border border-[rgba(0,33,30,0.15)] font-mono-tech text-xs text-[#00211e] focus:outline-none focus:border-[#00211e] cursor-pointer"
            >
              <option value="">ALL CATEGORIES</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c.toUpperCase()}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#637c65] pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border border-[rgba(0,33,30,0.1)]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(0,33,30,0.1)] bg-white">
                    <th className="text-left py-2 px-3 font-mono-tech text-[9px] tracking-wider text-[#637c65]">CODE</th>
                    <th className="text-left py-2 px-3 font-mono-tech text-[9px] tracking-wider text-[#637c65]">NAME</th>
                    <th className="text-left py-2 px-3 font-mono-tech text-[9px] tracking-wider text-[#637c65]">CATEGORY</th>
                    <th className="text-left py-2 px-3 font-mono-tech text-[9px] tracking-wider text-[#637c65]">STATUS</th>
                    <th className="text-right py-2 px-3 font-mono-tech text-[9px] tracking-wider text-[#637c65]">MENTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className={`border-b border-[rgba(0,33,30,0.05)] cursor-pointer transition-colors ${selectedId === p.id ? 'bg-[rgba(0,33,30,0.05)]' : 'hover:bg-[rgba(0,33,30,0.02)]'}`}
                    >
                      <td className="py-2.5 px-3 font-mono-tech text-xs text-[#00211e] font-bold">{p.shortCode}</td>
                      <td className="py-2.5 px-3 font-sans-body text-xs text-[#00211e]">{p.name}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 font-mono-tech text-[9px] bg-[rgba(99,124,101,0.1)] text-[#637c65] uppercase">{p.category}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 font-mono-tech text-[9px] uppercase ${statusColor(p.researchStatus)}`}>{p.researchStatus || 'unknown'}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono-tech text-xs text-[#c1e033]">{(p.communityMentions ?? 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="font-mono-tech text-[10px] text-[#637c65] hover:text-[#00211e] disabled:opacity-30 transition-colors">PREVIOUS</button>
                <span className="font-mono-tech text-[10px] text-[#637c65]">PAGE {page + 1} OF {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages} className="font-mono-tech text-[10px] text-[#637c65] hover:text-[#00211e] disabled:opacity-30 transition-colors">NEXT</button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedPeptide ? (
              <div className="border border-[rgba(0,33,30,0.15)] p-6 space-y-5 sticky top-20 bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FlaskConical className="w-4 h-4 text-[#c1e033]" />
                    <span className="font-mono-tech text-xs text-[#637c65]">{selectedPeptide.shortCode}</span>
                  </div>
                  <h3 className="font-serif-display text-2xl text-[#00211e]">{selectedPeptide.name}</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 font-mono-tech text-[9px] uppercase ${statusColor(selectedPeptide.researchStatus)}`}>{selectedPeptide.researchStatus || 'unknown'}</span>
                </div>
                {selectedPeptide.description && (
                  <p className="font-sans-body text-xs text-[#637c65] leading-relaxed">{selectedPeptide.description}</p>
                )}
                <div className="space-y-2">
                  {selectedPeptide.typicalDosage && (
                    <div className="flex justify-between"><span className="font-mono-tech text-[9px] text-[#637c65]">DOSAGE</span><span className="font-mono-tech text-[10px] text-[#00211e]">{selectedPeptide.typicalDosage}</span></div>
                  )}
                  {selectedPeptide.route && (
                    <div className="flex justify-between"><span className="font-mono-tech text-[9px] text-[#637c65]">ROUTE</span><span className="font-mono-tech text-[10px] text-[#00211e]">{selectedPeptide.route}</span></div>
                  )}
                  {selectedPeptide.halfLife && (
                    <div className="flex justify-between"><span className="font-mono-tech text-[9px] text-[#637c65]">HALF-LIFE</span><span className="font-mono-tech text-[10px] text-[#00211e]">{selectedPeptide.halfLife}</span></div>
                  )}
                </div>
                {selectedPeptide.sideEffects && selectedPeptide.sideEffects.length > 0 && (
                  <div>
                    <div className="font-mono-tech text-[9px] tracking-wider text-[#637c65] mb-2">KNOWN SIDE EFFECTS</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedPeptide.sideEffects.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-[rgba(255,0,0,0.06)] font-mono-tech text-[9px] text-[#ff0000]">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedPeptide.mechanism && (
                  <div>
                    <div className="font-mono-tech text-[9px] tracking-wider text-[#637c65] mb-1">MECHANISM</div>
                    <p className="font-sans-body text-xs text-[#637c65] leading-relaxed">{selectedPeptide.mechanism}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-[rgba(0,33,30,0.15)] p-8 text-center">
                <p className="font-mono-tech text-xs text-[#637c65]">Select a peptide to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

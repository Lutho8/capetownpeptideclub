import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowLeft, Check, Zap, FlaskConical, Clock, AlertTriangle } from 'lucide-react';
import SEO, { BreadcrumbSchema } from '@/components/SEO';

const WEEKS = [
  {
    week: 1,
    focus: 'Establish baseline & loading',
    compounds: [
      { name: 'Retatrutide', dose: '1mg twice weekly', timing: 'Mon/Thu morning, subcutaneous' },
      { name: 'BPC-157', dose: '250mcg daily', timing: 'Morning, subcutaneous near injury site' },
    ],
    notes: 'Monitor for any initial side effects. Maintain research log.',
  },
  {
    week: 2,
    focus: 'Increase metabolic activation',
    compounds: [
      { name: 'Retatrutide', dose: '2mg twice weekly', timing: 'Mon/Thu morning' },
      { name: 'BPC-157', dose: '250mcg daily', timing: 'Morning' },
    ],
    notes: 'Document energy levels, appetite changes, and any tissue response markers.',
  },
  {
    week: 3,
    focus: 'Maintenance dosing established',
    compounds: [
      { name: 'Retatrutide', dose: '5mg once weekly', timing: 'Monday morning' },
      { name: 'BPC-157', dose: '250mcg daily', timing: 'Morning, last week of cycle' },
    ],
    notes: 'Final week of BPC-157 loading phase. Continue Retatrutide.',
  },
  {
    week: 4,
    focus: 'Solo maintenance phase',
    compounds: [
      { name: 'Retatrutide', dose: '5mg once weekly', timing: 'Monday morning' },
    ],
    notes: 'BPC-157 cycle complete. Continue Retatrutide solo. Review week 1 vs week 4 data.',
  },
];

const CTA_PRODUCTS = [
  { name: 'Retatrutide', price: 1519, image: '/vial-reta.png', tag: 'PRIMARY' },
  { name: 'BPC-157', price: 899, image: '/vial-bpc157.png', tag: 'SUPPORT' },
];

export default function FatLoss() {
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="min-h-screen bg-black pt-14">
      <SEO
        title="Fat Loss Research Protocol | 4-Week Retatrutide Guide | Cape Town Peptide Club"
        description="Research-grade 4-week fat loss protocol using Retatrutide + BPC-157. Dosing schedules, timing, and monitoring guidelines. HPLC-verified compounds. Ships nationwide SA."
        path="/#/protocols/fat-loss"
        keywords="fat loss protocol, Retatrutide dosing, weight loss peptides South Africa, peptide protocol guide, BPC-157 fat loss"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Protocols', path: '/#/protocols' },
        { name: 'Fat Loss Protocol', path: '/#/protocols/fat-loss' },
      ]} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <a href="#/" className="font-mono text-[10px] text-white/30 hover:text-white/60 transition-colors">Home</a>
          <span className="font-mono text-[10px] text-white/15">/</span>
          <a href="#/" className="font-mono text-[10px] text-white/30 hover:text-white/60 transition-colors">Protocols</a>
          <span className="font-mono text-[10px] text-white/15">/</span>
          <span className="font-mono text-[10px] text-white/60">Fat Loss</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#8b7aff] uppercase">GUIDED PROTOCOL</span>
          <h1 className="font-sans text-4xl md:text-5xl text-white font-semibold" style={{ letterSpacing: '-0.035em', lineHeight: 0.95 }}>Fat Loss Research Protocol</h1>
          <p className="font-sans text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>A 4-week structured research protocol combining Retatrutide (GLP-1/GIP/Glucagon triple agonist) with BPC-157 tissue support. Designed for metabolic research.</p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-white/30" /><span className="font-mono text-[10px] text-white/40">4 WEEKS</span></div>
            <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-white/30" /><span className="font-mono text-[10px] text-white/40">2 COMPOUNDS</span></div>
            <div className="flex items-center gap-1.5"><FlaskConical className="w-3.5 h-3.5 text-white/30" /><span className="font-mono text-[10px] text-white/40">HPLC-VERIFIED</span></div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-3 p-4 border border-red-500/20 bg-red-500/[0.03] mb-12">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="font-sans text-xs text-red-300/70 leading-relaxed">This protocol is for <strong>research purposes only</strong>. Not for human consumption. Consult a licensed healthcare provider. Individual results will vary. All compounds are sold strictly for laboratory research.</p>
        </div>

        {/* Week Timeline */}
        <div className="space-y-8 mb-16">
          {/* Week selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {WEEKS.map((w, i) => (
              <button key={w.week} onClick={() => setActiveWeek(i)} className={`shrink-0 px-4 py-2 font-mono text-[10px] tracking-wider uppercase border transition-all ${activeWeek === i ? 'bg-[#8b7aff] text-white border-[#8b7aff]' : 'bg-transparent text-white/40 border-white/[0.08] hover:border-white/20 hover:text-white/60'}`}>
                WEEK {w.week}
              </button>
            ))}
          </div>

          {/* Active week content */}
          <div className="border border-white/[0.08] bg-white/[0.02] p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#8b7aff] tracking-wider">WEEK {WEEKS[activeWeek].week}</span>
                <h3 className="font-sans text-xl text-white font-semibold mt-1">{WEEKS[activeWeek].focus}</h3>
              </div>
            </div>
            <div className="space-y-4">
              {WEEKS[activeWeek].compounds.map((c) => (
                <div key={c.name} className="flex gap-4 items-start p-4 border border-white/[0.06] bg-white/[0.02]">
                  <div className="w-2 h-2 rounded-full bg-[#8b7aff] mt-1.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-sans text-sm text-white font-medium">{c.name}</p>
                    <p className="font-mono text-[10px] text-white/40"><span className="text-white/60">{c.dose}</span> · {c.timing}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-sans text-xs text-white/30 leading-relaxed italic">{WEEKS[activeWeek].notes}</p>
          </div>
        </div>

        {/* Get the stack CTA */}
        <div className="border border-white/[0.08] bg-white/[0.02] p-8 space-y-6 mb-12">
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#8b7aff] uppercase">Get the stack</span>
            <h3 className="font-sans text-2xl text-white font-semibold">Everything you need for this protocol</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CTA_PRODUCTS.map((p) => (
              <div key={p.name} className="flex items-center gap-4 p-4 border border-white/[0.06]">
                <div className="w-16 h-16 bg-[#f5f5f5] flex items-center justify-center shrink-0"><img src={p.image} alt={p.name} className="w-12 h-12 object-contain mix-blend-multiply" /></div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[8px] tracking-wider text-[#8b7aff]">{p.tag}</span>
                  <p className="font-sans text-sm text-white font-medium">{p.name}</p>
                  <p className="font-sans text-xs text-white/40">R{p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3 bg-[#8b7aff] text-white font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-[#9d8eff] transition-colors">SHOP THIS STACK <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <p className="text-center font-mono text-[9px] text-white/20">Protocol total: R{CTA_PRODUCTS.reduce((s, p) => s + p.price, 0).toLocaleString()} · Free shipping over R2,500</p>
        </div>

        {/* Back to protocols */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wider text-white/30 hover:text-white/60 transition-colors"><ArrowLeft className="w-3 h-3" /> BACK TO HOME</Link>
        </div>
      </div>
    </div>
  );
}

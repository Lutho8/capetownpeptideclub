import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { Search, ShoppingBag, X, Check, ShieldCheck, Truck, Snowflake, FlaskConical, Clock, Star, MessageCircle, Lock } from 'lucide-react';

/* ─── ZAR prices (1 USD ≈ 18.3 ZAR) ─── */
const ALL_PRODUCTS = [
  { id: 1, name: 'BPC-157', price: 899, usd: 49, category: 'PEPTIDES', purity: '99.4% HPLC', image: '/vial-bpc157.png', desc: 'Gastric-derived 15-residue peptide. Tissue-repair and angiogenesis research.', stock: 14 },
  { id: 2, name: 'BPC-157 + TB-500 Blend', price: 1449, usd: 79, category: 'BLENDS', purity: '99.2% HPLC', image: '/vial-bpc-tb.png', desc: 'Tissue-repair duo. The most requested blend for recovery and regenerative research.', stock: 8 },
  { id: 3, name: 'GLOW Stack', price: 1629, usd: 89, category: 'BLENDS', purity: '99.1% HPLC', image: '/vial-glow.png', desc: 'Triple-compound aesthetic and dermal regeneration stack.', stock: 22 },
  { id: 4, name: 'Retatrutide', price: 1519, usd: 83, category: 'PEPTIDES', purity: '99.4% HPLC', image: '/vial-reta.png', desc: 'Triple agonist (GLP-1 / GIP / Glucagon). Next-generation metabolic compound.', stock: 5 },
  { id: 5, name: 'GHK-Cu', price: 769, usd: 42, category: 'PEPTIDES', purity: '99.6% HPLC', image: '/vial-ghk.png', desc: 'Copper-binding tripeptide. Collagen induction and skin-matrix research.', stock: 31 },
  { id: 6, name: 'CJC-1295 + Ipamorelin', price: 749, usd: 41, category: 'PEPTIDES', purity: '99.3% HPLC', image: '/vial-cjc-ipa.png', desc: 'GH-secretagogue pairing. Pulsatile release research protocol.', stock: 11 },
];

const FILTERS = ['ALL', 'BULK', 'PEPTIDES', 'BLENDS', 'LONGEVITY', 'NOOTROPICS', 'IMMUNOMODULATORS', 'SUPPLIES'];

const LIVE_SALES = [
  { name: 'Dr. Van Niekerk', item: 'BPC-157', time: '2m ago' },
  { name: 'J. Ritter', item: 'GLOW Stack', time: '5m ago' },
  { name: 'Prof. Jacobs', item: 'Retatrutide', time: '8m ago' },
  { name: 'M. Du Preez', item: 'BPC-157 + TB-500', time: '12m ago' },
  { name: 'A. Patel', item: 'GHK-Cu', time: '15m ago' },
  { name: 'T. Mokoena', item: 'CJC-1295 + Ipamorelin', time: '19m ago' },
];

/* ─── Age Gate ─── */
function AgeGate({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex flex-col items-center gap-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white">
            <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M24 4v40" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <div>
            <h1 className="font-sans text-2xl text-white font-semibold tracking-tight">rtd peptides.</h1>
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mt-1">Research compounds. HPLC-verified. Cape Town.</p>
          </div>
        </div>
        <p className="font-sans text-sm text-white/50">You must be 18 years or older to enter. Are you of legal age?</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onEnter} className="px-8 py-3 bg-white text-black font-sans text-sm font-medium tracking-wide hover:bg-white/90 transition-colors">ENTER</button>
          <button onClick={() => window.location.href = 'https://google.com'} className="px-8 py-3 border border-white/30 text-white/60 font-sans text-sm tracking-wide hover:border-white/50 hover:text-white/80 transition-colors">LEAVE</button>
        </div>
        <p className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase">For research use only · Est. Cape Town · Ships nationwide</p>
      </div>
    </div>
  );
}

/* ─── Cart Drawer ─── */
function CartDrawer({ cart, onClose, onRemove }: { cart: typeof ALL_PRODUCTS; onClose: () => void; onRemove: (id: number) => void }) {
  const total = cart.reduce((s, p) => s + p.price, 0);
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#fafafa] flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
          <span className="font-sans text-sm font-medium text-black/80">Cart ({cart.length})</span>
          <button onClick={onClose} className="p-1 hover:bg-black/5 rounded"><X className="w-4 h-4 text-black/50" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="font-sans text-sm text-black/30 text-center py-12">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-[#f0f0f0] flex items-center justify-center shrink-0"><img src={item.image} alt={item.name} className="w-12 h-12 object-contain" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-black/80 truncate">{item.name}</p>
                  <p className="font-sans text-xs text-black/40">R{item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="p-1 hover:bg-black/5 rounded shrink-0"><X className="w-3.5 h-3.5 text-black/30" /></button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t border-black/8 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-black/50">Subtotal</span>
              <span className="font-sans text-xl font-semibold text-black">R{total.toLocaleString()}</span>
            </div>
            {total < 2500 && <p className="font-mono text-[9px] text-black/30">Add R{(2500 - total).toLocaleString()} more for free shipping</p>}
            {total >= 2500 && <p className="font-mono text-[9px] text-green-600 flex items-center gap-1"><Truck className="w-3 h-3" />Free shipping unlocked</p>}
            <button className="w-full py-3 bg-black text-white font-sans text-sm font-medium tracking-wide hover:bg-black/80 transition-colors">CHECKOUT</button>
            <div className="flex items-center justify-center gap-3 pt-1">
              <Lock className="w-3 h-3 text-black/20" />
              <p className="font-mono text-[9px] text-center text-black/25 tracking-wider">EFT · Instant EFT · CARD · USDC · SOL</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Navigation ─── */
function ShopNav({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 80); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-black/6' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className={scrolled ? 'text-black' : 'text-white'}>
            <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path d="M24 4v40" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className={`font-mono text-[11px] tracking-[0.15em] font-bold ${scrolled ? 'text-black' : 'text-white'}`}>RTD</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['SHOP', 'LABS', 'TRIALS', 'FAQ', 'CONTACT'].map((label) => (
            <a key={label} href={label === 'SHOP' ? '#shop' : label === 'FAQ' ? '#faq' : label === 'CONTACT' ? '#contact' : '#'} className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${scrolled ? 'text-black/50 hover:text-black' : 'text-white/50 hover:text-white'}`}>{label}</a>
          ))}
        </div>
        <button onClick={onCartOpen} className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
          <ShoppingBag className={`w-5 h-5 ${scrolled ? 'text-black/60' : 'text-white/60'}`} />
          {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[9px] font-mono rounded-full flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, inCart, onToggle }: { product: typeof ALL_PRODUCTS[0]; inCart: boolean; onToggle: () => void }) {
  const lowStock = product.stock <= 8;
  return (
    <div className="group bg-white border border-black/[0.06] hover:border-black/[0.12] hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300">
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="font-mono text-[9px] tracking-[0.15em] text-black/35 uppercase">{product.category}</span>
        <span className="font-mono text-[9px] tracking-wider text-black/30">{product.purity}</span>
      </div>
      <div className="h-48 bg-[#f5f5f5] flex items-center justify-center mt-3 mx-4 mb-4 relative">
        <img src={product.image} alt={product.name} className="h-36 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
        {lowStock && <span className="absolute top-2 right-2 bg-red-50 text-red-500 font-mono text-[8px] tracking-wider px-2 py-0.5 uppercase">Only {product.stock} left</span>}
      </div>
      <div className="px-4 pb-4 space-y-2">
        <h3 className="font-sans text-lg font-semibold text-black/85 leading-tight">{product.name}</h3>
        <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.38)', fontWeight: 300 }}>{product.desc}</p>
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="font-sans text-base font-semibold text-black/80">R{product.price.toLocaleString()}</span>
            <span className="font-mono text-[9px] text-black/25 ml-2">~${product.usd} USD</span>
          </div>
          <button onClick={onToggle} className={`flex items-center gap-1.5 px-4 py-2 border font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-200 ${inCart ? 'bg-black text-white border-black' : 'border-black/20 text-black/60 hover:border-black/40 hover:text-black hover:bg-black/[0.03]'}`}>
            {inCart ? <><Check className="w-3 h-3" /> ADDED</> : <>ADD <span className="text-[12px]">→</span></>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Live Sales Toast ─── */
function LiveSales({ visible }: { visible: boolean }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const cycle = setInterval(() => {
      setShow(true);
      setIndex((i) => (i + 1) % LIVE_SALES.length);
      setTimeout(() => setShow(false), 4000);
    }, 12000);
    const first = setTimeout(() => { setShow(true); }, 5000);
    return () => { clearInterval(cycle); clearTimeout(first); };
  }, [visible]);
  if (!show) return null;
  const sale = LIVE_SALES[index];
  return (
    <div className="fixed bottom-6 left-6 z-[70] bg-white border border-black/[0.08] shadow-lg px-4 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-xs">
      <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center shrink-0"><ShoppingBag className="w-3.5 h-3.5 text-black/40" /></div>
      <div className="min-w-0">
        <p className="font-sans text-[11px] text-black/70 truncate"><span className="font-semibold">{sale.name}</span> just ordered</p>
        <p className="font-mono text-[9px] text-black/40">{sale.item} · {sale.time}</p>
      </div>
    </div>
  );
}

/* ─── Trust Bar ─── */
function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: 'HPLC VERIFIED', desc: 'Every batch tested' },
    { icon: Snowflake, label: 'COLD-CHAIN', desc: 'Ice-packed shipping' },
    { icon: Truck, label: 'DISCREET', desc: 'Unmarked packaging' },
    { icon: FlaskConical, label: 'SA-BASED', desc: 'Cape Town lab' },
    { icon: Clock, label: '48H DISPATCH', desc: 'Ships in 2 days' },
    { icon: Star, label: '300+ REVIEWS', desc: '4.9★ average' },
  ];
  return (
    <section className="bg-white border-y border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-black/25 shrink-0" />
              <div>
                <p className="font-mono text-[9px] tracking-[0.15em] text-black/60">{label}</p>
                <p className="font-sans text-[10px] text-black/30">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Shop Page ─── */
export default function Shop() {
  const [ageVerified, setAgeVerified] = useState(() => { if (typeof window !== 'undefined') return localStorage.getItem('rtd-age') === 'verified'; return false; });
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<typeof ALL_PRODUCTS>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAgeEnter = useCallback(() => { localStorage.setItem('rtd-age', 'verified'); setAgeVerified(true); }, []);

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchesFilter = activeFilter === 'ALL' || p.category === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleCart = useCallback((product: typeof ALL_PRODUCTS[0]) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === product.id);
      if (exists) return prev.filter((c) => c.id !== product.id);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1500);
      return [...prev, product];
    });
  }, []);

  const cartTotal = cart.reduce((s, p) => s + p.price, 0);

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <SEO
        title="Shop Research Peptides South Africa | Cape Town Peptide Club"
        description="Buy HPLC-verified research peptides in South Africa. BPC-157, Retatrutide, GHK-Cu, CJC-1295 from R749. Cold-chain delivery nationwide. Cape Town lab. EFT, Card, Crypto."
        path="/#/shop"
        keywords="buy peptides South Africa, peptide shop Cape Town, BPC-157 South Africa, Retatrutide SA, GHK-Cu, research compounds ZAR, peptide supplier, buy peptides online South Africa"
      />
      {!ageVerified && <AgeGate onEnter={handleAgeEnter} />}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={(id) => setCart((p) => p.filter((c) => c.id !== id))} />}
      <LiveSales visible={ageVerified} />

      <ShopNav cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* ═══ HERO — Vril video bg + scan effects ═══ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden bg-black">
        <video className="absolute inset-0 w-full h-full object-cover" src="/vril-bg.mp4" autoPlay muted loop playsInline aria-hidden="true" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)' }} />
        <div className="absolute bottom-0 inset-x-0 h-48" style={{ background: 'linear-gradient(to top, #fafafa 0%, rgba(0,0,0,0) 100%)' }} />
        {/* Scan-line */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 38% 55% at 68% 48%, rgba(139,122,255,0.07) 0, transparent 70%)', animation: 'glowPulse 5s ease-in-out infinite', zIndex: 2 }} />
        <div className="absolute left-[38%] right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0, rgba(139,122,255,0.25) 30%, rgba(139,122,255,0.45) 60%, transparent)', animation: 'scanSweep 8s cubic-bezier(.4,0,.6,1) infinite', zIndex: 3 }} />

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 max-w-7xl mx-auto px-6">
          <h1 className="font-sans text-white leading-none" style={{ fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 700, letterSpacing: '-0.04em' }}>rtd peptides.</h1>
          <p className="font-sans text-sm mt-4 max-w-md" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>Research compounds. HPLC-verified. Cape Town. Ships nationwide in 48 hours.</p>
          <a href="#shop" className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-white/30 text-white/70 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/50 transition-all w-fit">SHOP <span className="text-sm">→</span></a>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.08] bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            {[{ label: 'COMPOUNDS', value: '23' }, { label: 'PURITY', value: '99%+ HPLC' }, { label: 'SHIPPING', value: 'Nationwide SA' }, { label: 'PAY', value: 'EFT · Card · Crypto' }].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2"><span className="font-mono text-[9px] tracking-[0.15em] text-white/30">{label}</span><span className="font-mono text-[10px] tracking-wider text-white/60">{value}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <TrustBar />

      {/* ═══ SHOP SECTION ═══ */}
      <section id="shop" className="py-20 max-w-7xl mx-auto px-6">
        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/25" />
            <input type="text" placeholder="Search compounds..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-black/[0.08] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20 transition-colors" />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase transition-all ${activeFilter === f ? 'bg-black text-white' : 'bg-white text-black/40 border border-black/[0.08] hover:border-black/20 hover:text-black/60'}`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Free shipping banner */}
        <div className="flex items-center gap-3 px-5 py-3 bg-black/[0.03] border border-black/[0.06] mb-8">
          <Truck className="w-4 h-4 text-black/30" />
          <p className="font-mono text-[10px] tracking-wider text-black/50">Free shipping on orders over <span className="text-black/70 font-semibold">R2,500</span> · Cold-chain delivery nationwide</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} inCart={cart.some((c) => c.id === product.id)} onToggle={() => toggleCart(product)} />
          ))}
        </div>

        {filtered.length === 0 && <p className="text-center font-sans text-sm text-black/30 py-16">No compounds match your search.</p>}

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-black/40 uppercase hover:text-black/70 transition-colors">View all 23 <span className="text-sm">→</span></button>
        </div>
      </section>

      {/* ═══ CONVERSION — WHY RESEARCHERS CHOOSE RTD ═══ */}
      <section className="py-20 border-t border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-12">
            <div className="font-mono text-[10px] tracking-[0.3em] text-black/30 uppercase">Why researchers choose RTD</div>
            <h2 className="font-sans text-3xl font-semibold text-black/80" style={{ letterSpacing: '-0.02em' }}>Built for South African researchers.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'HPLC-tested every batch', desc: 'Independent third-party verification on every vial. Certificate of analysis included with every order. No exceptions.', icon: ShieldCheck },
              { title: 'Cold-chain to your door', desc: 'Vacuum-sealed, ice-packed, temperature-monitored shipping from Cape Town. Arrives in 2–5 business days nationwide.', icon: Snowflake },
              { title: 'No customs. No delays.', desc: 'South African stock held locally. No international shipping delays, no customs holds, no surprise duties.', icon: Truck },
              { title: 'Pay how you want', desc: 'EFT, Instant EFT, Credit/Debit Card, SnapScan, USDC, SOL. Secure checkout. No accounts required.', icon: Lock },
              { title: 'Wholesale for labs', desc: 'Bulk pricing for clinics, research institutions, and compounding pharmacies. MOQ from 50 vials.', icon: FlaskConical },
              { title: 'Not sure? WhatsApp us.', desc: 'Speak to a real human about your research protocol. +27 21 555 0192. Available Mon–Fri 9–5 SAST.', icon: MessageCircle },
            ].map(({ title, desc, icon: Icon }) => (
              <div key={title} className="space-y-3 p-5 border border-black/[0.06] hover:border-black/[0.12] transition-colors">
                <Icon className="w-5 h-5 text-black/30" />
                <h3 className="font-sans text-base font-semibold text-black/80">{title}</h3>
                <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.35)', fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 border-t border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[{ num: '01', title: 'Choose.', desc: 'Minimum 3 vials. Mix and match any compounds.' }, { num: '02', title: 'Pay.', desc: 'EFT · Card · SnapScan · Crypto. No accounts needed.' }, { num: '03', title: 'Receive.', desc: '2–5 business days nationwide. Discreet, ice-packed, tracked.' }].map(({ num, title, desc }) => (
              <div key={num} className="space-y-3">
                <span className="font-mono text-[10px] tracking-wider text-black/25">{num}</span>
                <h3 className="font-sans text-xl font-semibold text-black/80">{title}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.35)', fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEAD CONVERSION — WHATSAPP CTA ═══ */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-sans text-2xl md:text-3xl text-white font-semibold" style={{ letterSpacing: '-0.02em' }}>Need help choosing the right compounds?</h2>
          <p className="font-sans text-sm max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>Chat with our research team on WhatsApp. We will help you build the right protocol for your study.</p>
          <a href="https://wa.me/27215550192" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-sans text-sm font-medium tracking-wide hover:bg-[#20bd5a] transition-colors">
            <MessageCircle className="w-4 h-4" />Chat on WhatsApp
          </a>
          <p className="font-mono text-[9px] text-white/20 tracking-wider">+27 21 555 0192 · Mon–Fri 9–5 SAST</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer id="contact" className="bg-[#0a0a0a] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="text-white/60"><path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M24 4v40" stroke="currentColor" strokeWidth="1.5"/><path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="1.5"/></svg>
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/60 font-bold">RTD</span>
              </div>
              <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>Research peptides. HPLC-verified. Cape Town. Ships nationwide.</p>
            </div>
            <div className="space-y-3"><h4 className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Catalog</h4>{['Peptides', 'Blends', 'Longevity', 'Nootropics', 'Supplies'].map((item) => <a key={item} href="#" className="block font-sans text-xs hover:text-[#8b7aff] transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>{item}</a>)}</div>
            <div className="space-y-3"><h4 className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Tools</h4>{['Reconstitution', 'FAQ', 'Contact', 'Full catalog'].map((item) => <a key={item} href="#" className="block font-sans text-xs hover:text-[#8b7aff] transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>{item}</a>)}</div>
            <div className="space-y-3"><h4 className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Contact</h4>{['@ridethetide', 'Wholesale', 'Certificates'].map((item) => <a key={item} href="#" className="block font-sans text-xs hover:text-[#8b7aff] transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>{item}</a>)}</div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(255,255,255,0.15)' }}>RTD © 2026 · Cape Town, South Africa</p>
            <p className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(255,255,255,0.15)' }}>For research use only</p>
          </div>
        </div>
      </footer>

      {/* Added toast */}
      {addedId && (
        <div className="fixed bottom-6 right-6 z-[70] bg-black text-white px-5 py-3 font-mono text-[11px] tracking-wider flex items-center gap-2" style={{ animation: 'fadeInUp 0.3s ease' }}>
          <Check className="w-3.5 h-3.5 text-[#8b7aff]" /> Added to cart
        </div>
      )}

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

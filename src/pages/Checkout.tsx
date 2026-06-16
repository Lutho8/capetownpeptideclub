import { Link } from 'react-router';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import SEO, { BreadcrumbSchema } from '@/components/SEO';

export default function Checkout() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-14">
      <SEO
        title="Secure Checkout | Cape Town Peptide Club"
        description="Complete your order securely. EFT, Card, SnapScan, USDC, SOL accepted. Ships nationwide from Cape Town in 48 hours."
        path="/#/checkout"
        noindex
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/#/shop' },
        { name: 'Cart', path: '/#/cart' },
        { name: 'Checkout', path: '/#/checkout' },
      ]} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <a href="#/" className="font-mono text-[10px] text-black/30 hover:text-black/60 transition-colors">Home</a>
          <span className="font-mono text-[10px] text-black/15">/</span>
          <a href="#/shop" className="font-mono text-[10px] text-black/30 hover:text-black/60 transition-colors">Shop</a>
          <span className="font-mono text-[10px] text-black/15">/</span>
          <a href="#/cart" className="font-mono text-[10px] text-black/30 hover:text-black/60 transition-colors">Cart</a>
          <span className="font-mono text-[10px] text-black/15">/</span>
          <span className="font-mono text-[10px] text-black/60">Checkout</span>
        </nav>

        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-5 h-5 text-black/30" />
          <div>
            <h1 className="font-sans text-2xl text-black/80 font-semibold">Secure checkout</h1>
            <p className="font-mono text-[10px] text-black/30 tracking-wider">EFT · CARD · SNAPSCAN · USDC · SOL</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <div className="border border-black/[0.08] bg-white p-6 space-y-4">
              <h3 className="font-sans text-sm font-semibold text-black/70">Shipping details</h3>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First name" className="px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
                <input placeholder="Last name" className="px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
              </div>
              <input placeholder="Email" type="email" className="w-full px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
              <input placeholder="Phone (+27... )" className="w-full px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
              <input placeholder="Street address" className="w-full px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
              <div className="grid grid-cols-3 gap-3">
                <input placeholder="City" className="px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
                <input placeholder="Province" className="px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
                <input placeholder="Postal code" className="px-3 py-2 border border-black/[0.1] font-sans text-sm text-black/70 placeholder:text-black/25 outline-none focus:border-black/20" />
              </div>
            </div>

            <div className="border border-black/[0.08] bg-white p-6 space-y-4">
              <h3 className="font-sans text-sm font-semibold text-black/70">Payment method</h3>
              <div className="space-y-2">
                {['EFT (Electronic Funds Transfer)', 'Credit / Debit Card', 'SnapScan', 'USDC (Solana)', 'SOL'].map((method) => (
                  <label key={method} className="flex items-center gap-3 p-3 border border-black/[0.08] cursor-pointer hover:border-black/15 transition-colors">
                    <input type="radio" name="payment" className="accent-black" />
                    <span className="font-sans text-sm text-black/60">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-black/30">
              <Lock className="w-3 h-3" />
              <span className="font-mono text-[9px] tracking-wider">SSL-encrypted · For research use only</span>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="border border-black/[0.08] bg-white p-6 space-y-4 h-fit sticky top-20">
            <h3 className="font-sans text-sm font-semibold text-black/70">Order summary</h3>
            <p className="font-sans text-xs text-black/30">Your cart is empty. Add items from the shop.</p>
            <div className="pt-4 border-t border-black/[0.06] space-y-2">
              <div className="flex justify-between"><span className="font-sans text-xs text-black/40">Subtotal</span><span className="font-sans text-xs text-black/60">R0</span></div>
              <div className="flex justify-between"><span className="font-sans text-xs text-black/40">Shipping</span><span className="font-sans text-xs text-black/60">Calculated</span></div>
              <div className="flex justify-between pt-2 border-t border-black/[0.06]"><span className="font-sans text-sm font-semibold text-black/70">Total</span><span className="font-sans text-lg font-semibold text-black">R0</span></div>
            </div>
            <button disabled className="w-full py-3 bg-black/20 text-white/40 font-mono text-[11px] tracking-[0.15em] uppercase cursor-not-allowed">COMPLETE ORDER</button>
            <div className="text-center">
              <Link to="/shop" className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wider text-black/30 hover:text-black/60 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

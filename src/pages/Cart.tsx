import { Link } from 'react-router';
import { ShoppingBag, X, ArrowRight, Lock } from 'lucide-react';
import SEO, { BreadcrumbSchema } from '@/components/SEO';

export default function Cart() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-14">
      <SEO
        title="Your Cart | Cape Town Peptide Club"
        description="Review your research peptide selection. HPLC-verified compounds. Ships nationwide from Cape Town in 48 hours."
        path="/#/cart"
        noindex
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Shop', path: '/#/shop' }, { name: 'Cart', path: '/#/cart' }]} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
          <a href="#/" className="font-mono text-[10px] text-black/30 hover:text-black/60 transition-colors">Home</a>
          <span className="font-mono text-[10px] text-black/15">/</span>
          <a href="#/shop" className="font-mono text-[10px] text-black/30 hover:text-black/60 transition-colors">Shop</a>
          <span className="font-mono text-[10px] text-black/15">/</span>
          <span className="font-mono text-[10px] text-black/60">Cart</span>
        </nav>

        <div className="text-center space-y-6 py-16">
          <ShoppingBag className="w-12 h-12 text-black/15 mx-auto" />
          <h1 className="font-sans text-2xl text-black/80 font-semibold">Your cart is empty</h1>
          <p className="font-sans text-sm text-black/40 max-w-md mx-auto" style={{ fontWeight: 300 }}>Add research compounds from the shop to build your protocol stack. Minimum 3 vials per order.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-black/80 transition-colors">
            CONTINUE SHOPPING <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 pt-8 border-t border-black/[0.06]">
          <Lock className="w-3 h-3 text-black/15" />
          <p className="font-mono text-[9px] text-center text-black/20 tracking-wider">Secure checkout · EFT · Card · Crypto</p>
        </div>
      </div>
    </div>
  );
}

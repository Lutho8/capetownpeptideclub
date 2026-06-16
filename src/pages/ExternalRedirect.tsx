import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <SEO
        title="Shop Peptides | Cape Town Peptide Club"
        description="Browse and purchase HPLC-verified research peptides at Ride The Tide."
      />
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-[#8b7aff] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-mono text-[11px] tracking-wider text-white/50">Redirecting to shop...</p>
        <a href={url} className="font-mono text-[10px] text-[#8b7aff] hover:text-[#a89aff] transition-colors underline underline-offset-2">
          Click here if not redirected
        </a>
      </div>
    </div>
  );
}

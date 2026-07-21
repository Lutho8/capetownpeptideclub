import { useRef, useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface LaserInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function LaserInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: LaserInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />

      {/* Laser scan line animation */}
      {focused && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <div
            className="absolute top-0 bottom-0 w-[2px]"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(200,255,0,0.4), transparent)',
              boxShadow: '0 0 8px 2px rgba(200,255,0,0.2)',
              animation: 'laserScan 2s ease-in-out infinite',
            }}
          />
        </div>
      )}

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="relative z-10 w-full pl-9 pr-9 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 text-xs placeholder:text-white/15 focus:outline-none focus:border-[#c8ff00]/40 transition-all duration-300"
        style={{
          boxShadow: focused
            ? '0 0 20px rgba(200,255,0,0.06), inset 0 0 20px rgba(200,255,0,0.02)'
            : 'none',
        }}
      />

      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white/20 hover:text-white/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      <style>{`
        @keyframes laserScan {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

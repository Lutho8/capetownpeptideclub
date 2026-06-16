import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router';
import {
  CheckCircle, Clock, MapPin, Users, Sparkles, FlaskConical,
  Utensils, MessageCircle, ChevronDown, ChevronUp,
  Phone, X, Menu, Star, Award, CalendarDays, Shield,
  Zap, Brain, HeartPulse, TrendingUp, ArrowRight, Ticket, Tag, BookOpen,
  Coffee, Wifi, Car, GraduationCap, ExternalLink, ArrowUpRight, Lock
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '@/components/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─── */
interface FAQItem { q: string; a: string; }
interface Speaker { name: string; title: string; org: string; bio: string; image: string; }
interface AgendaItem { time: string; title: string; speaker: string; room: string; type: string; }
interface Testimonial { name: string; role: string; text: string; rating: number; }

/* ─── Event Data ─── */
const EVENT_DATE = new Date('2026-11-16T09:00:00+02:00');
const EARLY_BIRD_DEADLINE = new Date('2026-08-31T23:59:00+02:00');

const TICKETS = [
  {
    id: 'general',
    name: 'General Admission',
    price: 200,
    usdPrice: 11,
    description: 'Full-day access to all sessions, networking areas, and exhibition hall.',
    features: [
      'All speaker sessions & keynotes',
      'Exhibition hall access',
      'Morning & afternoon refreshments',
      'Lunch included',
      'Networking reception',
      'Digital course materials',
      'Certificate of attendance',
    ],
    cta: 'Secure My Seat — R200',
    popular: false,
  },
  {
    id: 'vip',
    name: 'VIP Access',
    price: 450,
    usdPrice: 25,
    description: 'Premium experience with exclusive networking, priority seating, and private consultations.',
    features: [
      'Everything in General Admission',
      'Priority front-row seating',
      'VIP-only networking lounge',
      '1-on-1 peptide consultation (15 min)',
      'Exclusive speaker dinner invitation',
      'Premium gift bag with peptide samples',
      'Early access to event recordings',
      'Private WhatsApp group access',
    ],
    cta: 'Get VIP Access — R450',
    popular: true,
  },
  {
    id: 'virtual',
    name: 'Virtual Pass',
    price: 120,
    usdPrice: 7,
    description: 'Livestream access to all sessions with interactive Q&A and replay access.',
    features: [
      'Livestream all sessions',
      'Interactive Q&A chat',
      '7-day replay access',
      'Digital course materials',
      'Virtual networking lounge',
      'Certificate of attendance',
    ],
    cta: 'Get Virtual Pass — R120',
    popular: false,
  },
];

const SPEAKERS: Speaker[] = [
  { name: 'Dr. Sarah Chen', title: 'Peptide Therapeutics Lead', org: 'UCT Medical School', bio: '15 years in regenerative medicine. Led 3 Phase-2 peptide trials for metabolic disease.', image: '/speaker-1.png' },
  { name: 'Prof. Michael Okafor', title: 'Endocrinologist & Researcher', org: 'Groote Schuur Hospital', bio: 'Specialist in GLP-1 receptor agonists and metabolic peptide therapies. Published 40+ papers.', image: '/speaker-2.png' },
  { name: 'Dr. Amina Patel', title: 'Functional Medicine Practitioner', org: 'Cape Integrative Health', bio: 'Pioneer in peptide protocols for autoimmune conditions including Hashimoto\'s thyroiditis.', image: '/speaker-1.png' },
  { name: 'James Mthembu', title: 'Founder', org: 'Ride The Tide (RTD)', bio: 'Built South Africa\'s largest peptide community. Advocate for responsible biohacking.', image: '/speaker-2.png' },
  { name: 'Dr. Lukas Verster', title: 'Sports Medicine Specialist', org: 'Stellenbosch University', bio: 'Expert in healing peptides for athletic performance and injury recovery.', image: '/speaker-1.png' },
  { name: 'Nadia Hassan', title: 'Regulatory Affairs Director', org: 'SAHPRA Consultant', bio: 'Navigating peptide regulation in South Africa. Former SAHPRA senior reviewer.', image: '/speaker-2.png' },
];

const AGENDA: AgendaItem[] = [
  { time: '08:00', title: 'Registration & Welcome Coffee', speaker: '—', room: 'Main Lobby', type: 'networking' },
  { time: '09:00', title: 'Opening Keynote: The Future of Peptide Medicine in South Africa', speaker: 'Dr. Sarah Chen', room: 'Atlantic Ballroom', type: 'keynote' },
  { time: '09:45', title: 'GLP-1 Agonists: Beyond Weight Loss', speaker: 'Prof. Michael Okafor', room: 'Atlantic Ballroom', type: 'talk' },
  { time: '10:30', title: 'Morning Tea & Exhibition', speaker: '—', room: 'Exhibition Hall', type: 'break' },
  { time: '11:00', title: 'Healing Peptides: BPC-157 & TB-500 Deep Dive', speaker: 'Dr. Lukas Verster', room: 'Room A', type: 'workshop' },
  { time: '11:00', title: 'Peptides for Autoimmune Conditions', speaker: 'Dr. Amina Patel', room: 'Room B', type: 'workshop' },
  { time: '12:30', title: 'Networking Lunch', speaker: '—', room: 'Seaview Terrace', type: 'break' },
  { time: '13:30', title: 'Community Trials: What 286,000 Messages Reveal', speaker: 'James Mthembu', room: 'Atlantic Ballroom', type: 'keynote' },
  { time: '14:15', title: 'Navigating SAHPRA: Peptide Regulation in SA', speaker: 'Nadia Hassan', room: 'Atlantic Ballroom', type: 'talk' },
  { time: '15:00', title: 'Afternoon Tea & Exhibition', speaker: '—', room: 'Exhibition Hall', type: 'break' },
  { time: '15:30', title: 'Panel: The Ethics of Biohacking & Self-Experimentation', speaker: 'All Speakers', room: 'Atlantic Ballroom', type: 'panel' },
  { time: '16:30', title: 'Live Q&A + Networking Reception', speaker: '—', room: 'Exhibition Hall', type: 'networking' },
  { time: '17:30', title: 'Closing Remarks & Prize Draw', speaker: 'James Mthembu', room: 'Atlantic Ballroom', type: 'keynote' },
];

const FAQ_DATA: FAQItem[] = [
  { q: 'What is included in the R200 entrance fee?', a: 'Your R200 ticket includes full access to all speaker sessions, the exhibition hall, morning and afternoon refreshments, lunch, the networking reception, digital course materials, and a certificate of attendance. There are no hidden costs.' },
  { q: 'Where exactly in Cape Town is the event?', a: 'The event is held at a private Atlantic Seaboard venue in Cape Town. The exact address is shared only with registered attendees 7 days before the event for security and privacy reasons.' },
  { q: 'Can I get a refund if I cannot attend?', a: 'Full refunds are available up to 14 days before the event. Within 14 days, tickets are transferable to another attendee but non-refundable. Virtual passes can be refunded up to 48 hours before the event.' },
  { q: 'Is this event only for medical professionals?', a: 'Not at all. Cape Town Peptide Club welcomes biohackers, fitness enthusiasts, researchers, clinicians, and anyone curious about peptide science. Content is presented at an accessible level with optional deep-dive sessions for advanced attendees.' },
  { q: 'Will sessions be recorded?', a: 'Yes. All main stage sessions are recorded. General and VIP ticket holders get access to recordings for 7 days after the event. VIP tickets include early access and extended 30-day replay access.' },
  { q: 'Is parking available?', a: 'Yes, secure on-site parking is available at no extra cost. We also recommend Uber for the networking reception where drinks are served.' },
  { q: 'What COVID-19 precautions are in place?', a: 'We follow all SA Department of Health guidelines. Enhanced ventilation, hand sanitiser stations, and optional mask zones are provided. Attendees who feel unwell are asked to switch to the virtual pass at no extra charge.' },
  { q: 'How do I become a speaker or sponsor?', a: 'Contact us at info@capetownpeptideclub.co.za with your proposal. We are accepting sponsor applications until September 30, 2026.' },
];

const TESTIMONIALS: Testimonial[] = [
  { name: 'Marcus J.', role: 'Fitness Coach, Cape Town', text: 'The last CTPC event completely changed how I approach recovery. The BPC-157 protocol I learned about cut my client\'s injury rehab time in half. Worth every rand.', rating: 5 },
  { name: 'Dr. Priya N.', role: 'Functional Medicine GP', text: 'Finally, a South African event that takes peptides seriously. The quality of speakers rivals international conferences I\'ve attended in the US. I\'m bringing my entire practice team this year.', rating: 5 },
  { name: 'Thabo M.', role: 'Biohacker & Entrepreneur', text: 'I\'ve been to every CTPC event. The networking alone is worth 10x the ticket price. Met my current peptide supplier and my business partner in the same afternoon.', rating: 5 },
  { name: 'Sarah L.', role: 'Hashimoto\'s Advocate', text: 'The autoimmune peptide session gave me hope after years of thyroid struggles. The community here actually understands what we\'re going through. Game-changing.', rating: 5 },
];

/* ─── GSAP Scroll Pin Hook ─── */
function useScrollPin(ref: React.RefObject<HTMLElement | null>, triggerId: string) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 20%',
        end: 'bottom 80%',
        pin: true,
        pinSpacing: true,
      });
    });
    return () => ctx.revert();
  }, [ref]);
}

/* ─── Countdown Hook ─── */
function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: false,
    };
  }, [target]);
  const [time, setTime] = useState(calc);
  useEffect(() => { const i = setInterval(() => setTime(calc()), 1000); return () => clearInterval(i); }, [calc]);
  return time;
}

/* ─── Components ─── */

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const accepted = localStorage.getItem('ctpc_cookies_accepted');
    if (!accepted) setVisible(true);
  }, []);
  if (!visible) return null;
  const accept = () => { localStorage.setItem('ctpc_cookies_accepted', '1'); setVisible(false); };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#111] border-t border-white/10 px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/60 text-center md:text-left leading-relaxed">
          We use cookies to enhance your experience, analyse traffic, and serve personalised content.
          By continuing, you agree to our <button onClick={() => document.getElementById('terms-modal')?.classList.remove('hidden')} className="underline text-[#8b7aff] hover:text-[#a89aff]">Terms &amp; Conditions</button> and <button onClick={() => document.getElementById('privacy-modal')?.classList.remove('hidden')} className="underline text-[#8b7aff] hover:text-[#a89aff]">Privacy Policy</button>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={accept} className="px-4 py-2 bg-[#8b7aff] text-black font-mono-tech text-[10px] tracking-wider hover:bg-[#a89aff] transition-colors">ACCEPT ALL</button>
          <button onClick={accept} className="px-4 py-2 border border-white/20 text-white/60 font-mono-tech text-[10px] tracking-wider hover:border-white/40 hover:text-white/80 transition-colors">ESSENTIAL ONLY</button>
        </div>
      </div>
    </div>
  );
}

function StickyCountdown() {
  const t = useCountdown(EVENT_DATE);
  const [showBar, setShowBar] = useState(true);
  if (t.expired || !showBar) return null;
  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-[#8b7aff] text-black">
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-mono-tech text-[9px] tracking-wider shrink-0 hidden sm:inline">EVENT IN:</span>
          <div className="flex items-center gap-1 font-mono-tech text-[11px] font-bold">
            <span>{String(t.days).padStart(2, '0')}d</span>
            <span className="text-black/40">:</span>
            <span>{String(t.hours).padStart(2, '0')}h</span>
            <span className="text-black/40">:</span>
            <span>{String(t.minutes).padStart(2, '0')}m</span>
            <span className="text-black/40">:</span>
            <span>{String(t.seconds).padStart(2, '0')}s</span>
          </div>
          <span className="text-[9px] font-mono-tech ml-2 hidden md:inline opacity-70">Nov 16, 2026 &mdash; Atlantic Seaboard, Cape Town</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://tally.so/r/VL4q0y" target="_blank" rel="noopener noreferrer" className="font-mono-tech text-[9px] tracking-wider underline hover:no-underline shrink-0">GET TICKETS R200</a>
          <button onClick={() => setShowBar(false)} className="shrink-0"><X className="w-3 h-3" /></button>
        </div>
      </div>
    </div>
  );
}

/* ─── Sticky Bottom Purchase Bar ─── */
function StickyPurchaseBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const t = useCountdown(EVENT_DATE);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] bg-black/95 backdrop-blur-lg border-t border-[#8b7aff]/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#8b7aff] font-mono-tech text-[9px] tracking-[0.2em]">EVENT IN</span>
            <span className="text-white font-mono-tech text-xs font-bold tabular-nums">
              {String(t.days).padStart(2, '0')}:{String(t.hours).padStart(2, '0')}:{String(t.minutes).padStart(2, '0')}
            </span>
          </div>
          <div className="w-px h-6 bg-white/[0.1] hidden sm:block" />
          <div>
            <p className="text-white text-xs font-medium">Cape Town Peptide Club 2026</p>
            <p className="text-white/30 font-mono-tech text-[9px]">Nov 16, 2026 — Atlantic Seaboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#8b7aff] font-mono-tech text-lg font-bold hidden md:inline">R200</span>
          <span className="text-white/20 font-mono-tech text-[9px] hidden lg:inline">~$11 USD</span>
          <a
            href="https://tally.so/r/VL4q0y"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#8b7aff] text-black font-mono-tech text-[10px] tracking-[0.15em] hover:bg-[#a89aff] transition-all flex items-center gap-2 group animate-cta-pulse"
          >
            <Lock className="w-3 h-3" />
            SECURE SEAT
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <button onClick={() => setDismissed(true)} className="text-white/20 hover:text-white/50 transition-colors p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating Center Badge ─── */
function FloatingCenterBadge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const ticketsEl = document.getElementById('tickets');
      const testimonialsEl = document.getElementById('testimonials');
      if (!ticketsEl || !testimonialsEl) return;
      const scroll = window.scrollY + window.innerHeight / 2;
      setVisible(scroll > ticketsEl.offsetTop && scroll < testimonialsEl.offsetTop);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50] pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center gap-3">
        <div className="px-5 py-3 border border-[#8b7aff]/40 bg-black/90 backdrop-blur-md rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
          <p className="font-mono-tech text-[9px] tracking-[0.3em] text-[#8b7aff]">ONLY 120 SEATS</p>
          <p className="font-mono-tech text-[9px] tracking-wider text-white/40 mt-1">Nov 16, 2026 — Atlantic Seaboard</p>
        </div>
        <a
          href="https://tally.so/r/VL4q0y"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-[#8b7aff] text-black font-mono-tech text-[9px] tracking-[0.15em] hover:bg-[#a89aff] transition-colors flex items-center gap-1.5"
        >
          <Ticket className="w-3 h-3" />
          R200 — GET YOURS
        </a>
        <button onClick={() => setDismissed(true)} className="text-white/20 hover:text-white/40 text-[8px] font-mono-tech">dismiss</button>
      </div>
    </div>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/27215550192"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 text-white" fill="white" />
    </a>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const t = useCountdown(EVENT_DATE);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed background image with object-fit: cover */}
      <img
        src="/event-venue-hero.jpg"
        alt="Cape Town Atlantic Seaboard"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.25) saturate(0.6)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      {/* Scan-line effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,122,255,0.03) 2px, rgba(139,122,255,0.03) 4px)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#8b7aff]/30 text-[#8b7aff] font-mono-tech text-[10px] tracking-[0.2em] mb-6">
          <Sparkles className="w-3 h-3" />
          INVITE-ONLY EVENT
        </div>

        <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-4">
          Cape Town<br />
          <span className="text-[#8b7aff]">Peptide Club</span>
        </h1>

        <p className="text-white/50 font-sans-body text-sm md:text-base max-w-lg mx-auto mb-8">
          South Africa&apos;s premier peptide science gathering. A full day of research, networking, and breakthrough protocols with leading clinicians and researchers.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
          {[
            { v: t.days, l: 'DAYS' },
            { v: t.hours, l: 'HRS' },
            { v: t.minutes, l: 'MIN' },
            { v: t.seconds, l: 'SEC' },
          ].map((u) => (
            <div key={u.l} className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 border border-white/10 bg-white/[0.03] flex items-center justify-center font-mono-tech text-xl md:text-2xl text-white font-bold">
                {String(u.v).padStart(2, '0')}
              </div>
              <div className="font-mono-tech text-[8px] tracking-wider text-white/30 mt-1">{u.l}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a href="https://tally.so/r/VL4q0y" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-[#8b7aff] text-black font-mono-tech text-xs tracking-[0.15em] hover:bg-[#a89aff] transition-colors flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            SECURE SEAT — R200
          </a>
          <a href="#agenda" className="px-8 py-3.5 border border-white/20 text-white font-mono-tech text-xs tracking-[0.15em] hover:border-white/50 hover:bg-white/5 transition-colors flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            VIEW AGENDA
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 text-white/30 font-mono-tech text-[10px]">
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />Atlantic Seaboard, CT</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="w-3 h-3" />Nov 16, 2026</span>
          <span className="flex items-center gap-1.5"><Users className="w-3 h-3" />Limited to 120 seats</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono-tech text-[8px] tracking-widest text-white/20">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}

/* ─── Sticky Sub-Nav ─── */
function StickySubNav() {
  const [activeSection, setActiveSection] = useState('highlights');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'highlights', label: 'HIGHLIGHTS' },
    { id: 'speakers', label: 'SPEAKERS' },
    { id: 'agenda', label: 'AGENDA' },
    { id: 'tickets', label: 'TICKETS' },
    { id: 'testimonials', label: 'TESTIMONIALS' },
    { id: 'faq', label: 'FAQ' },
    { id: 'venue', label: 'VENUE' },
  ];

  if (!scrolled) return null;

  return (
    <div className="sticky top-14 z-40 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 overflow-x-auto">
        <div className="flex items-center gap-1 py-2 min-w-max">
          <a
            href="https://tally.so/r/VL4q0y"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-[#8b7aff] text-black font-mono-tech text-[9px] tracking-wider hover:bg-[#a89aff] transition-colors shrink-0 mr-2"
          >
            REGISTER
          </a>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActiveSection(link.id)}
              className={`px-3 py-1 font-mono-tech text-[9px] tracking-wider transition-colors shrink-0 ${
                activeSection === link.id
                  ? 'text-[#8b7aff] bg-[#8b7aff]/10'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Community Narrative ─── */
function CommunitySection() {
  return (
    <section id="highlights" className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">BUILT BY OUR COMMUNITY</span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-white mt-3 leading-tight">
              Join the fastest-growing peptide science community in South Africa
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-white/50 text-sm leading-relaxed">
              In just two years, Cape Town Peptide Club has grown from a small WhatsApp group of curious biohackers into the largest gathering of peptide researchers and practitioners on the African continent. That growth is a testament to this incredible community.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              After last year&apos;s event, you told us what you wanted more of: deeper clinical content, real community data from our 286,000+ parsed messages, and practical protocols you can apply the very next day. We heard you.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              CTPC 2026 is built around a single promise: every session focuses squarely on the most effective peptides being discussed in our community, the latest research driving the field forward, and how leading clinicians are using them to create transformative patient outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── What's Included ─── */
function WhatsIncludedSection() {
  const items = [
    { icon: Users, title: '120 Attendees', desc: 'Curated, invite-only gathering of serious practitioners' },
    { icon: FlaskConical, title: '6 Expert Speakers', desc: 'Clinicians, researchers, and industry founders' },
    { icon: Utensils, title: 'Gourmet Lunch', desc: 'Full catering with dietary options covered' },
    { icon: Coffee, title: 'Refreshments', desc: 'Morning & afternoon tea with premium coffee' },
    { icon: BookOpen, title: 'Course Materials', desc: 'Digital handbook with all protocols and data' },
    { icon: Award, title: 'Certificate', desc: 'Attendance certificate for CPD/CEU points' },
    { icon: Wifi, title: 'Free WiFi', desc: 'High-speed internet throughout the venue' },
    { icon: Car, title: 'Secure Parking', desc: 'On-site parking included with every ticket' },
    { icon: MessageCircle, title: 'Private Community', desc: 'Lifetime access to CTPC WhatsApp group' },
  ];
  return (
    <section id="included" className="py-20 md:py-28 bg-black relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">WHAT&apos;S INCLUDED</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">Everything You Need</h2>
          <p className="text-white/40 text-sm mt-3 max-w-md mx-auto">No hidden fees. No upsells. Your ticket covers the full experience.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.title} className="group p-5 border border-white/[0.06] bg-white/[0.02] hover:border-[#8b7aff]/30 hover:bg-[#8b7aff]/[0.03] transition-all">
              <item.icon className="w-5 h-5 text-[#8b7aff] mb-3" />
              <h3 className="font-mono-tech text-xs tracking-wider text-white mb-1">{item.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sponsors ─── */
function SponsorsSection() {
  const tiers = [
    {
      label: 'HEADLINE PARTNER',
      color: '#8b7aff',
      sponsors: [
        { name: 'Ride The Tide', role: 'Peptide Supply Partner', initial: 'RT' },
      ],
    },
    {
      label: 'COMMUNITY PARTNERS',
      color: '#ff9933',
      sponsors: [
        { name: 'Peptide Confessions', role: 'Anonymous Reports Platform', initial: 'PC' },
        { name: 'KIMI Research', role: 'AI Research Tools', initial: 'KR' },
      ],
    },
    {
      label: 'SUPPORTING',
      color: '#66ff99',
      sponsors: [
        { name: 'Cape Integrative Health', role: 'Functional Medicine', initial: 'CI' },
        { name: 'Stellenbosch Univ.', role: 'Sports Medicine Research', initial: 'SU' },
        { name: 'UCT Medical School', role: 'Academic Partner', initial: 'UC' },
      ],
    },
  ];
  return (
    <section className="py-16 md:py-20 bg-[#0a0a0a] border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-white/30">OUR PARTNERS</span>
          <h2 className="font-serif-display text-2xl md:text-3xl text-white mt-2">Supported By</h2>
        </div>
        <div className="space-y-8">
          {tiers.map((tier) => (
            <div key={tier.label}>
              <div className="text-center mb-4">
                <span className="font-mono-tech text-[9px] tracking-[0.2em]" style={{ color: tier.color }}>{tier.label}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {tier.sponsors.map((s) => (
                  <div key={s.name} className="flex items-center gap-3 px-5 py-3 border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors">
                    <div className="w-8 h-8 flex items-center justify-center font-mono-tech text-[10px] font-bold border" style={{ borderColor: `${tier.color}40`, color: tier.color }}>
                      {s.initial}
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">{s.name}</p>
                      <p className="text-white/25 text-[9px]">{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/15 text-[9px] font-mono-tech mt-8">
          Interested in sponsoring CTPC 2026? Contact us at info@capetownpeptideclub.co.za
        </p>
      </div>
    </section>
  );
}

/* ─── Speakers ─── */
function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.speaker-card', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="speakers" ref={sectionRef} className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">SPEAKERS &amp; FACULTY</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">Learn From the Best</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEAKERS.map((s) => (
            <div key={s.name} className="group speaker-card">
              <div className="aspect-square bg-white/[0.03] border border-white/[0.06] overflow-hidden mb-4">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <h3 className="font-mono-tech text-sm text-white tracking-wider">{s.name}</h3>
              <p className="text-[#8b7aff] text-[10px] font-mono-tech tracking-wider mt-0.5">{s.title}</p>
              <p className="text-white/30 text-[10px] font-mono-tech mt-0.5">{s.org}</p>
              <p className="text-white/40 text-xs leading-relaxed mt-2">{s.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Agenda ─── */
function AgendaSection() {
  const [expanded, setExpanded] = useState(true);
  const typeColor = (t: string) => {
    if (t === 'keynote') return 'bg-[#8b7aff]/20 text-[#8b7aff]';
    if (t === 'workshop') return 'bg-emerald-900/30 text-emerald-400';
    if (t === 'panel') return 'bg-amber-900/30 text-amber-400';
    if (t === 'break') return 'bg-white/5 text-white/30';
    if (t === 'networking') return 'bg-blue-900/30 text-blue-400';
    return 'bg-white/5 text-white/50';
  };
  return (
    <section id="agenda" className="py-20 md:py-28 bg-black relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">AGENDA</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">A Day of Discovery</h2>
        </div>

        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between py-3 border-b border-white/10 mb-4">
          <span className="font-mono-tech text-[10px] tracking-wider text-white/40">NOVEMBER 16, 2026 — ATLANTIC SEABOARD, CAPE TOWN</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
        </button>

        {expanded && (
          <div className="space-y-2">
            {AGENDA.map((item, i) => (
              <div key={i} className={`flex items-start gap-4 p-4 border border-white/[0.04] ${item.type === 'break' || item.type === 'networking' ? 'bg-white/[0.02]' : 'bg-white/[0.03]'} hover:border-white/10 transition-colors`}>
                <div className="w-14 shrink-0 font-mono-tech text-xs text-white/30 pt-0.5">{item.time}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm text-white font-medium">{item.title}</h3>
                    <span className={`px-2 py-0.5 font-mono-tech text-[8px] tracking-wider uppercase ${typeColor(item.type)}`}>{item.type}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    {item.speaker !== '—' && <span className="text-white/40 text-xs">{item.speaker}</span>}
                    <span className="text-white/20 text-[10px] font-mono-tech flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{item.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Tickets ─── */
function TicketsSection() {
  return (
    <section id="tickets" className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">REGISTRATION</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">Secure Your Seat</h2>
          <p className="text-white/40 text-sm mt-3 max-w-md mx-auto">Limited to 120 attendees. Prices increase after August 31, 2026.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TICKETS.map((ticket) => (
            <div key={ticket.id} className={`relative p-6 border ${ticket.popular ? 'border-[#8b7aff]/40 bg-[#8b7aff]/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'} flex flex-col`}>
              {ticket.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#8b7aff] text-black font-mono-tech text-[8px] tracking-wider">MOST POPULAR</div>
              )}
              <div className="mb-4">
                <h3 className="font-mono-tech text-sm tracking-wider text-white">{ticket.name}</h3>
                <p className="text-white/40 text-xs mt-1">{ticket.description}</p>
              </div>
              <div className="mb-5">
                <span className="font-serif-display text-4xl text-white">R{ticket.price}</span>
                <span className="text-white/30 text-xs ml-1">~${ticket.usdPrice} USD</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {ticket.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-white/50 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-[#8b7aff] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://tally.so/r/VL4q0y"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 text-center font-mono-tech text-xs tracking-[0.1em] transition-colors ${ticket.popular ? 'bg-[#8b7aff] text-black hover:bg-[#a89aff]' : 'border border-white/20 text-white hover:border-[#8b7aff]/50 hover:bg-[#8b7aff]/10'}`}
              >
                {ticket.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Embedded Tally Registration Form */}
        <div className="mt-12 border border-[#8b7aff]/20 bg-white/[0.02]">
          <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="font-mono-tech text-[10px] tracking-wider text-[#8b7aff]">REGISTER NOW</span>
              <h3 className="text-white text-sm mt-0.5">Complete the form below to secure your seat</h3>
            </div>
            <Shield className="w-5 h-5 text-[#8b7aff]/50" />
          </div>
          <div className="p-1 bg-white rounded-sm m-4">
            <iframe
              src="https://tally.so/embed/VL4q0y?alignLeft=1&hideTitle=1"
              width="100%"
              height="580"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Cape Town Peptide Club Event Registration"
              style={{ display: 'block' }}
            />
          </div>
        </div>

        <p className="text-center text-white/20 text-[10px] font-mono-tech mt-6">
          Your information is secure and will never be shared. Payment instructions are sent after registration.
        </p>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="py-20 md:py-28 bg-black relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">FAQ</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">Common Questions</h2>
        </div>

        <div className="space-y-2">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="border border-white/[0.06] overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors">
                <span className="text-sm text-white pr-4">{faq.q}</span>
                {openIdx === i ? <ChevronUp className="w-4 h-4 text-[#8b7aff] shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
              </button>
              {openIdx === i && (
                <div className="px-4 pb-4 text-white/50 text-xs leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-xs mt-8">
          Still have questions?{' '}
          <a href="https://wa.me/27215550192" target="_blank" rel="noopener noreferrer" className="text-[#8b7aff] hover:underline">Chat with us on WhatsApp</a>{' '}
          or email <a href="mailto:info@capetownpeptideclub.co.za" className="text-[#8b7aff] hover:underline">info@capetownpeptideclub.co.za</a>
        </p>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        x: (i: number) => (i % 2 === 0 ? -40 : 40),
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">TESTIMONIALS</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">What Attendees Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card p-6 border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? 'text-amber-400' : 'text-white/10'}`} fill={j < t.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-white text-xs font-medium">{t.name}</p>
                <p className="text-white/30 text-[10px]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CME / Accreditation ─── */
function CMESection() {
  return (
    <section className="py-20 md:py-28 bg-black relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">ACCREDITATION</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">Earn CPD Points</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-[#8b7aff] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white text-sm font-medium">HPCSA Accredited</h3>
                <p className="text-white/40 text-xs leading-relaxed mt-1">This event is accredited by the Health Professions Council of South Africa for 6 CPD points in Category 1.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#8b7aff] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white text-sm font-medium">Certificate of Attendance</h3>
                <p className="text-white/40 text-xs leading-relaxed mt-1">All attendees receive a verifiable digital certificate within 48 hours of event completion.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-[#8b7aff] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white text-sm font-medium">Digital Course Materials</h3>
                <p className="text-white/40 text-xs leading-relaxed mt-1">Comprehensive handbook with all protocols, dosing guidelines, and safety data discussed during sessions.</p>
              </div>
            </div>
          </div>

          <div className="border border-white/[0.06] p-6 bg-white/[0.02] text-center">
            <Shield className="w-10 h-10 text-[#8b7aff] mx-auto mb-3" />
            <h3 className="font-mono-tech text-lg text-white tracking-wider">6 CPD Points</h3>
            <p className="text-white/30 text-xs mt-2">HPCSA Category 1</p>
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-white/40 text-[10px] font-mono-tech">Accreditation #CTPC-2026-001</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Venue ─── */
function VenueSection() {
  return (
    <section id="venue" className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">VENUE</span>
          <h2 className="font-serif-display text-3xl md:text-5xl text-white mt-3">Atlantic Seaboard, Cape Town</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="aspect-video bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            <img src="/event-venue-hero.jpg" alt="Cape Town Atlantic Seaboard Venue" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="space-y-4">
            <h3 className="font-mono-tech text-sm text-white tracking-wider">Private Atlantic Seaboard Venue</h3>
            <p className="text-white/40 text-xs leading-relaxed">
              The exact address is shared exclusively with registered attendees 7 days before the event. Located on Cape Town&apos;s stunning Atlantic Seaboard with panoramic ocean views, the venue offers:
            </p>
            <ul className="space-y-2">
              {[
                'Ocean-view main ballroom (120 capacity)',
                '2 breakout workshop rooms',
                'Exhibition hall with sponsor booths',
                'Seaview terrace for lunch & networking',
                'Secure underground parking',
                'Wheelchair accessible throughout',
                '5 minutes from Camps Bay beach',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white/50 text-xs">
                  <CheckCircle className="w-3 h-3 text-[#8b7aff] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-white/[0.06] flex items-center gap-4 text-white/30 text-[10px] font-mono-tech">
              <span className="flex items-center gap-1"><Car className="w-3 h-3" />Free parking</span>
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3" />High-speed WiFi</span>
              <span className="flex items-center gap-1"><Coffee className="w-3 h-3" />Full catering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Platform teaser ─── */
function PlatformTeaserSection() {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b7aff]">THE PLATFORM</span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-white mt-3 leading-tight">
              Research Tools for<br />Serious Biohackers
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mt-4">
              Beyond the event, CTPC provides free tools to parse community messages, query our research database of 31 peptides and 10 clinical papers, and track observational trials.
            </p>
            <div className="mt-6 space-y-3">
              <Link to="/quiz" className="flex items-center gap-3 p-3 border border-white/[0.06] hover:border-[#c8ff00]/30 hover:bg-[#c8ff00]/[0.03] transition-all group">
                <div className="w-8 h-8 bg-[#c8ff00]/10 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-4 h-4 text-[#c8ff00]" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-medium group-hover:text-[#c8ff00] transition-colors">Peptide Directory</h4>
                  <p className="text-white/30 text-[10px]">25+ peptides organized by category with anonymous community reports.</p>
                </div>
                <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#c8ff00] ml-auto shrink-0 transition-colors" />
              </Link>
              <Link to="/parse" className="flex items-center gap-3 p-3 border border-white/[0.06] hover:border-[#c8ff00]/30 hover:bg-[#c8ff00]/[0.03] transition-all group">
                <div className="w-8 h-8 bg-[#c8ff00]/10 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-[#c8ff00]" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-medium group-hover:text-[#c8ff00] transition-colors">Topics</h4>
                  <p className="text-white/30 text-[10px]">Browse confessions by theme — weight loss, recovery, side effects, stacks.</p>
                </div>
                <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#c8ff00] ml-auto shrink-0 transition-colors" />
              </Link>
              <Link to="/research" className="flex items-center gap-3 p-3 border border-white/[0.06] hover:border-[#c8ff00]/30 hover:bg-[#c8ff00]/[0.03] transition-all group">
                <div className="w-8 h-8 bg-[#c8ff00]/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-[#c8ff00]" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-medium group-hover:text-[#c8ff00] transition-colors">Guides</h4>
                  <p className="text-white/30 text-[10px]">Practical how-tos — reconstitution, injection, stacking, side effects.</p>
                </div>
                <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#c8ff00] ml-auto shrink-0 transition-colors" />
              </Link>
              <Link to="/peptides" className="flex items-center gap-3 p-3 border border-white/[0.06] hover:border-[#8b7aff]/30 hover:bg-[#8b7aff]/[0.03] transition-all group">
                <div className="w-8 h-8 bg-[#8b7aff]/10 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-[#8b7aff]" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-medium group-hover:text-[#8b7aff] transition-colors">Peptide Database</h4>
                  <p className="text-white/30 text-[10px]">31 compounds with mechanisms, dosages, and community data</p>
                </div>
                <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#8b7aff] ml-auto shrink-0 transition-colors" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <img src="/event-injection.jpg" alt="Peptide preparation" className="w-full h-full object-cover opacity-70" />
            </div>
            <div className="aspect-[3/4] bg-white/[0.03] border border-white/[0.06] overflow-hidden mt-6">
              <img src="/event-panel.jpg" alt="Speaker panel" className="w-full h-full object-cover opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Bar ─── */
function TrustBar() {
  return (
    <section className="py-8 border-y border-white/[0.04] bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            { label: '286K+', desc: 'Messages Parsed' },
            { label: '31', desc: 'Peptides Tracked' },
            { label: '22', desc: 'Community Trials' },
            { label: '10', desc: 'Clinical Papers' },
            { label: '120', desc: 'Seats Available' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif-display text-xl text-white">{stat.label}</div>
              <div className="font-mono-tech text-[8px] tracking-wider text-white/30 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Privacy Modal ─── */
function PrivacyModal() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const el = document.getElementById('privacy-modal');
    if (!el) return;
    const show = () => setHidden(false);
    el.addEventListener('click', show);
    return () => el.removeEventListener('click', show);
  }, []);
  if (hidden) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4" onClick={() => setHidden(true)}>
      <div className="bg-[#111] border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono-tech text-sm tracking-wider text-white">Privacy Policy</h2>
          <button onClick={() => setHidden(true)} className="text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <div className="text-white/50 text-xs leading-relaxed space-y-3">
          <p><strong className="text-white">1. Data Collection.</strong> We collect your name, email, and payment information when you register for events. We also collect anonymous analytics data via cookies.</p>
          <p><strong className="text-white">2. Use of Data.</strong> Your data is used to process registrations, send event updates, and improve our services. We never sell your data to third parties.</p>
          <p><strong className="text-white">3. Cookies.</strong> We use essential cookies for site functionality and optional analytics cookies. You can manage preferences via the cookie banner.</p>
          <p><strong className="text-white">4. Third Parties.</strong> Payment processing is handled by PayFast and SnapScan. We do not store your card details.</p>
          <p><strong className="text-white">5. Your Rights.</strong> You may request data deletion at any time by emailing info@capetownpeptideclub.co.za.</p>
          <p><strong className="text-white">6. Contact.</strong> For privacy inquiries, contact our Data Protection Officer at info@capetownpeptideclub.co.za.</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Terms Modal ─── */
function TermsModal() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const el = document.getElementById('terms-modal');
    if (!el) return;
    const show = () => setHidden(false);
    el.addEventListener('click', show);
    return () => el.removeEventListener('click', show);
  }, []);
  if (hidden) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4" onClick={() => setHidden(true)}>
      <div className="bg-[#111] border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono-tech text-sm tracking-wider text-white">Terms &amp; Conditions</h2>
          <button onClick={() => setHidden(true)} className="text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <div className="text-white/50 text-xs leading-relaxed space-y-3">
          <p><strong className="text-white">1. Event Registration.</strong> All ticket sales are final. Refunds are available up to 14 days before the event. Within 14 days, tickets are transferable but non-refundable.</p>
          <p><strong className="text-white">2. Event Conduct.</strong> CTPC reserves the right to remove any attendee for disruptive behaviour without refund. Professional, respectful conduct is expected at all times.</p>
          <p><strong className="text-white">3. Intellectual Property.</strong> All presentations, materials, and recordings are the property of CTPC and speakers. Unauthorized recording or distribution is prohibited.</p>
          <p><strong className="text-white">4. Medical Disclaimer.</strong> Content presented at CTPC events is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider.</p>
          <p><strong className="text-white">5. Limitation of Liability.</strong> CTPC is not liable for any health outcomes resulting from protocols discussed at our events. Attendees assume full responsibility for their actions.</p>
          <p><strong className="text-white">6. Governing Law.</strong> These terms are governed by the laws of the Republic of South Africa.</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-16 border-t border-white/[0.06] bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="text-[#8b7aff]">
                <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <path d="M24 4v40" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 14l20 10 20-10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="font-mono-tech text-xs tracking-[0.2em] text-white font-bold">CAPE TOWN PEPTIDE CLUB</span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed max-w-sm">
              South Africa&apos;s premier peptide science community. Research, education, and responsible biohacking since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-mono-tech text-[10px] tracking-wider text-white mb-3">CONFessions</h4>
            <ul className="space-y-2">
              <li><Link to="/trials" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">All Confessions</Link></li>
              <li><Link to="/parse" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">Topics</Link></li>
              <li><Link to="/research" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">Guides</Link></li>
              <li><Link to="/quiz" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">Peptide Directory</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-tech text-[10px] tracking-wider text-white mb-3">EVENT</h4>
            <ul className="space-y-2">
              <li><a href="#tickets" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">Get Tickets</a></li>
              <li><a href="#agenda" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">Agenda</a></li>
              <li><a href="#speakers" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">Speakers</a></li>
              <li><a href="mailto:info@capetownpeptideclub.co.za" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors">Contact</a></li>
              <li>
                <a href="https://www.ridethetide.site/" target="_blank" rel="noopener noreferrer" className="text-white/30 text-xs hover:text-[#8b7aff] transition-colors flex items-center gap-1">
                  Shop <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-[10px] font-mono-tech">
            &copy; 2026 Cape Town Peptide Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => document.getElementById('privacy-modal')?.classList.remove('hidden')} className="text-white/20 text-[10px] font-mono-tech hover:text-white/40 transition-colors">Privacy Policy</button>
            <button onClick={() => document.getElementById('terms-modal')?.classList.remove('hidden')} className="text-white/20 text-[10px] font-mono-tech hover:text-white/40 transition-colors">Terms &amp; Conditions</button>
            <a href="https://wa.me/27215550192" target="_blank" rel="noopener noreferrer" className="text-white/20 text-[10px] font-mono-tech hover:text-[#25D366] transition-colors flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Home Component ─── */
export default function Home() {
  // JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  // Event Schema
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: 'Cape Town Peptide Club 2026',
    description: 'South Africa\'s premier peptide science gathering. A full day of research, networking, and breakthrough protocols.',
    startDate: '2026-11-16T09:00:00+02:00',
    endDate: '2026-11-16T17:30:00+02:00',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'Atlantic Seaboard Private Venue',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cape Town',
        addressRegion: 'Western Cape',
        addressCountry: 'ZA',
      },
    },
    offers: TICKETS.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      price: t.price,
      priceCurrency: 'ZAR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-05-01T00:00:00+02:00',
      url: 'https://www.capetownpeptideclub.co.za/#/',
    })),
    performer: SPEAKERS.map((s) => ({
      '@type': 'Person',
      name: s.name,
      jobTitle: s.title,
      worksFor: { '@type': 'Organization', name: s.org },
    })),
    organizer: {
      '@type': 'Organization',
      name: 'Cape Town Peptide Club',
      url: 'https://www.capetownpeptideclub.co.za',
    },
  };

  return (
    <main className="bg-black">
      <SEO
        title="Cape Town Peptide Club 2026 | Paid Event R200 | Peptide Science Conference"
        description="Join 120 attendees on Nov 16, 2026 in Cape Town. Full-day peptide science conference with 6 speakers, workshops, networking, and CPD points. Tickets from R200."
        path="/"
        keywords="peptide conference South Africa, Cape Town peptide event, biohacking conference, peptide science 2026, BPC-157 seminar, GLP-1 workshop, CPD points peptides"
      />

      {/* Schemas */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>

      <StickyCountdown />
      <HeroSection />
      <StickySubNav />
      <CommunitySection />
      <TrustBar />
      <WhatsIncludedSection />
      <SponsorsSection />
      <SpeakersSection />
      <AgendaSection />
      <TicketsSection />
      <TestimonialsSection />
      <FAQSection />
      <CMESection />
      <VenueSection />
      <PlatformTeaserSection />
      <Footer />
      <StickyPurchaseBar />
      <FloatingCenterBadge />
      <WhatsAppFloat />
      <CookieConsent />
      <div id="privacy-modal" className="hidden"><PrivacyModal /></div>
      <div id="terms-modal" className="hidden"><TermsModal /></div>
    </main>
  );
}

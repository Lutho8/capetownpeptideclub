import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlitchRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function GlitchReveal({ children, className = '', delay = 0 }: GlitchRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const originalHTML = el.innerHTML;

    // Initial scramble state
    el.style.opacity = '0';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      delay,
    });

    tl.to(el, {
      opacity: 1,
      duration: 0.1,
    });

    // Extract text nodes and animate them
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const text = node.textContent;
        const span = document.createElement('span');
        span.className = 'glitch-char';
        node.parentNode?.replaceChild(span, node);

        const chars: HTMLSpanElement[] = [];
        for (let i = 0; i < text.length; i++) {
          const c = document.createElement('span');
          c.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          c.style.display = 'inline';
          c.style.color = 'rgba(200,255,0,0.6)';
          span.appendChild(c);
          chars.push(c);
        }

        chars.forEach((charEl, i) => {
          const finalChar = text[i];
          const scrambleDuration = 0.4 + Math.random() * 0.4;
          const charDelay = i * 0.02;

          tl.to(
            charEl,
            {
              duration: scrambleDuration,
              delay: charDelay,
              onUpdate: function () {
                const progress = this.progress();
                if (progress < 0.7) {
                  charEl.textContent =
                    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                } else {
                  charEl.textContent = finalChar;
                }
                // Chromatic aberration during scramble
                const offset = (1 - progress) * 3;
                charEl.style.textShadow = `${offset}px 0 rgba(255,0,0,0.3), ${-offset}px 0 rgba(0,255,255,0.3)`;
              },
              onComplete: () => {
                charEl.style.textShadow = 'none';
                charEl.style.color = '';
              },
            },
            0
          );
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(walk);
      }
    };

    // Wait for initial opacity, then scramble
    tl.call(() => {
      const cloned = el.cloneNode(true) as HTMLElement;
      el.innerHTML = '';
      el.appendChild(cloned);
      Array.from(cloned.childNodes).forEach(walk);
    });

    return () => {
      tl.kill();
      if (el) el.innerHTML = originalHTML;
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

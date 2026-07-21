import { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  className = '',
  speed = 60,
  delay = 300,
  showCursor = true,
  cursorChar = '▋',
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const typeNext = useCallback(() => {
    if (indexRef.current < text.length) {
      const char = text[indexRef.current];
      const nextDelay = speed + (Math.random() - 0.5) * speed * 0.6;
      setDisplayed((prev) => prev + char);
      indexRef.current++;
      timeoutRef.current = setTimeout(typeNext, nextDelay);
    } else {
      onComplete?.();
    }
  }, [text, speed, onComplete]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      typeNext();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, typeNext]);

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, [showCursor]);

  if (!started) {
    return <span className={className}>&nbsp;</span>;
  }

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className="inline-block ml-[1px] transition-opacity duration-100"
          style={{ opacity: cursorVisible ? 1 : 0 }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}

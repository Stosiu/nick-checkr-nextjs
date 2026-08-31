'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

interface Options {
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  paused?: boolean;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function useTypewriter(words: string[], options: Options = {}) {
  const { typeMs = 90, deleteMs = 40, holdMs = 1600, paused = false } = options;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? '');
  const [deleting, setDeleting] = useState(false);

  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  useEffect(() => {
    if (reduced || paused) return;

    const word = words[index % words.length];

    if (!deleting) {
      const timer = setTimeout(
        () => (text === word ? setDeleting(true) : setText(word.slice(0, text.length + 1))),
        text === word ? holdMs : typeMs,
      );
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText(word.slice(0, text.length - 1));
    }, deleteMs);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduced, paused, typeMs, deleteMs, holdMs]);

  return reduced ? words[0] : text;
}

'use client';

import { ArrowRight, RotateCcw, Search } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTypewriter } from '@/hooks/use-typewriter';

const SAMPLE_NICKS = [
  'cooldev42',
  'pixel_wizard',
  'jane_doe',
  'ghost_writer',
  'neo_matrix',
  'byte_me',
];

interface Props {
  onSearch: (nickname: string) => void;
  onClear: () => void;
  currentSearch: string | null;
}

export function SearchForm({ onSearch, onClear, currentSearch }: Props) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const typed = useTypewriter(SAMPLE_NICKS, { paused: focused || value.length > 0 });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  if (currentSearch) {
    return (
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2">
          <span className="font-mono text-lg font-bold text-brand-400">{currentSearch}</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            setValue('');
            onClear();
          }}
          className="gap-2 rounded-full text-white/40 hover:text-white/70"
        >
          <RotateCcw className="h-4 w-4" />
          Try another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <Input
          aria-label="Nickname"
          placeholder=""
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-12 pl-10 text-base"
        />
        {!value && !focused && (
          <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-base text-white/30">
            Try{' '}
            <span className="font-mono text-white/50">{typed}</span>
            <span className="ml-0.5 animate-pulse font-mono text-brand-400">|</span>
          </span>
        )}
      </div>
      <Button type="submit" disabled={!value.trim()} className="h-12 px-6 text-base">
        <ArrowRight className="mr-2 h-5 w-5" />
        Search everywhere
      </Button>
    </form>
  );
}

'use client';

import { RotateCcw, Search } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  onSearch: (nickname: string) => void;
  onClear: () => void;
  currentSearch: string | null;
}

export function SearchForm({ onSearch, onClear, currentSearch }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  if (currentSearch) {
    return (
      <div className="flex items-center gap-3">
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
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
      <Input
        placeholder="Enter a nickname..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-12 flex-1 text-base"
      />
      <Button type="submit" disabled={!value.trim()} className="h-12 px-6 text-base">
        <Search className="mr-2 h-5 w-5" />
        Search everywhere
      </Button>
    </form>
  );
}

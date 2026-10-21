'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="select-all rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-sm text-white">
        {email}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/[0.15] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-brand-400" /> : <Copy className="h-3.5 w-3.5" />}
        <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
      </button>
    </div>
  );
}

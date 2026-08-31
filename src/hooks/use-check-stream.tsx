'use client';

import { createContext, useContext, useEffect, useRef, useSyncExternalStore } from 'react';

import { CheckStore, type CheckProgress, type ServiceResult } from '@/lib/check-store';
import { AvailabilityStatus } from '@/services';

const FLUSH_INTERVAL_MS = 80;

const StoreContext = createContext<CheckStore | null>(null);

interface ProviderProps {
  nick: string | null;
  serviceNames: string[];
  children: React.ReactNode;
}

export function CheckStreamProvider({ nick, serviceNames, children }: ProviderProps) {
  const storeRef = useRef<CheckStore>(null);
  storeRef.current ??= new CheckStore();
  const store = storeRef.current;

  useEffect(() => {
    if (!nick) {
      store.reset([], false);
      return;
    }

    store.reset(serviceNames, true);

    const abort = new AbortController();
    let buffer: Array<[string, ServiceResult]> = [];
    let timer: ReturnType<typeof setTimeout> | undefined;

    const flush = () => {
      timer = undefined;
      if (buffer.length === 0) return;
      const batch = buffer;
      buffer = [];
      store.applyBatch(batch);
    };

    const schedule = () => {
      timer ??= setTimeout(flush, FLUSH_INTERVAL_MS);
    };

    void (async () => {
      try {
        const res = await fetch(`/api/check/stream?nick=${encodeURIComponent(nick)}`, {
          signal: abort.signal,
        });
        if (!res.ok || !res.body) throw new Error(`Stream failed (HTTP ${res.status})`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let carry = '';

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          carry += decoder.decode(value, { stream: true });
          const lines = carry.split('\n');
          carry = lines.pop() ?? '';
          for (const line of lines) {
            if (!line) continue;
            const message = JSON.parse(line);
            if (message.type === 'result') {
              buffer.push([message.service, { status: message.status, detail: message.detail }]);
            }
          }
          if (buffer.length > 0) schedule();
        }

        flush();
        store.finish();
      } catch (err) {
        if (abort.signal.aborted) return;
        flush();
        store.finish(err instanceof Error ? err.message : 'Check failed');
      }
    })();

    return () => {
      abort.abort();
      if (timer) clearTimeout(timer);
    };
  }, [nick, serviceNames, store]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

function useStore(): CheckStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useCheckStream must be used inside CheckStreamProvider');
  return store;
}

export function useServiceResult(service: string): ServiceResult | undefined {
  const store = useStore();
  return useSyncExternalStore(
    (listener) => store.subscribeService(service, listener),
    () => store.getService(service),
    () => undefined,
  );
}

export function useServiceStatusLookup(): (service: string) => AvailabilityStatus | undefined {
  const store = useStore();
  useSyncExternalStore(store.subscribeProgress, store.getProgress, store.getProgress);
  return (service: string) => store.getService(service)?.status;
}

export function useCheckProgress(): CheckProgress {
  const store = useStore();
  return useSyncExternalStore(store.subscribeProgress, store.getProgress, store.getProgress);
}

import { createHash } from 'crypto';
import { services } from '@/services/data/services';

let cached: string | null = null;

export function getServicesHash(): string {
  if (cached) return cached;
  const names = services.map((s) => s.name).sort().join(',');
  cached = createHash('sha256').update(names).digest('hex').slice(0, 8);
  return cached;
}

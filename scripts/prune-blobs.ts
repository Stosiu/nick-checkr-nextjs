import { del, list } from '@vercel/blob';

import { getServicesHash } from '../src/lib/services-hash';

const apply = process.argv.includes('--delete');
const currentPrefix = `checks/${getServicesHash()}/`;

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is not set');
    process.exit(1);
  }

  const stale: { url: string; pathname: string }[] = [];
  let cursor: string | undefined;

  do {
    const page = await list({ prefix: 'checks/', cursor, limit: 1000 });
    for (const blob of page.blobs) {
      if (!blob.pathname.startsWith(currentPrefix)) {
        stale.push({ url: blob.url, pathname: blob.pathname });
      }
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const generations = new Set(stale.map((b) => b.pathname.split('/')[1]));
  console.log(`current generation: ${currentPrefix}`);
  console.log(`stale blobs: ${stale.length} across ${generations.size} older generation(s)`);

  if (stale.length === 0) return;

  if (!apply) {
    console.log('dry run; pass --delete to remove them');
    for (const b of stale.slice(0, 20)) console.log(`  ${b.pathname}`);
    if (stale.length > 20) console.log(`  ... and ${stale.length - 20} more`);
    return;
  }

  for (let i = 0; i < stale.length; i += 100) {
    const batch = stale.slice(i, i + 100);
    await del(batch.map((b) => b.url));
    console.log(`deleted ${Math.min(i + batch.length, stale.length)}/${stale.length}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

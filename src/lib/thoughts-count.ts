import fs from 'fs';
import path from 'path';

const THOUGHTS_DIR = path.join(process.cwd(), 'content/thoughts');

export function getThoughtsCount(): number {
  if (!fs.existsSync(THOUGHTS_DIR)) return 0;
  return fs
    .readdirSync(THOUGHTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory()).length;
}

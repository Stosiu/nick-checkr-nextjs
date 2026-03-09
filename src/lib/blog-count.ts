import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getPostCount(): number {
  if (!fs.existsSync(BLOG_DIR)) return 0;
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory()).length;
}

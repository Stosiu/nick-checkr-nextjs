import fs from 'fs';
import path from 'path';
import type { Root, Element, ElementContent } from 'hast';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/blog');

export type PostImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  image: PostImage | null;
  description: string | null;
  imageCaption: string | null;
  tldr: string | null;
  readingTime: number;
  wordCount: number;
  content: string;
};

export type TocEntry = {
  id: string;
  text: string;
  level: number;
};

export type Post = PostMeta & {
  html: string;
  toc: TocEntry[];
};

function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

async function generateImageData(slug: string, filename: string): Promise<PostImage | null> {
  const imagePath = path.join(IMAGES_DIR, slug, filename);
  if (!fs.existsSync(imagePath)) return null;

  const { default: sharp } = await import('sharp');
  const buffer = fs.readFileSync(imagePath);
  const metadata = await sharp(buffer).metadata();
  const blurBuffer = await sharp(buffer).resize(20).blur().toBuffer();
  const blurDataURL = `data:image/${metadata.format};base64,${blurBuffer.toString('base64')}`;

  return {
    src: `/images/blog/${slug}/${filename}`,
    width: metadata.width ?? 1200,
    height: metadata.height ?? 630,
    blurDataURL,
  };
}

async function parsePost(slug: string): Promise<(Omit<PostMeta, 'image'> & { imageFilename: string | null }) | null> {
  const filePath = path.join(BLOG_DIR, slug, 'index.md');
  if (!fs.existsSync(filePath)) return null;

  const { default: matter } = await import('gray-matter');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return {
    slug,
    title: data.title ?? slug,
    date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
    tags: Array.isArray(data.tags) ? data.tags : [],
    imageFilename: data.image ?? null,
    description: data.description ?? null,
    imageCaption: data.imageCaption ?? null,
    tldr: data.tldr ?? null,
    readingTime,
    wordCount,
    content,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const parsed = await parsePost(slug);
      if (!parsed) return null;
      const { imageFilename, ...rest } = parsed;
      const image = imageFilename ? await generateImageData(slug, imageFilename) : null;
      return { ...rest, image } as PostMeta;
    }),
  );
  return posts
    .filter((t): t is PostMeta => t !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function renderMarkdown(content: string): Promise<{ html: string; toc: TocEntry[] }> {
  const [
    { unified },
    { default: remarkParse },
    { default: remarkGfm },
    { default: remarkRehype },
    { default: rehypeStringify },
    { default: rehypeSlug },
    { default: rehypeAutolinkHeadings },
    { default: rehypeSanitize, defaultSchema },
    { visit },
  ] = await Promise.all([
    import('unified'),
    import('remark-parse'),
    import('remark-gfm'),
    import('remark-rehype'),
    import('rehype-stringify'),
    import('rehype-slug'),
    import('rehype-autolink-headings'),
    import('rehype-sanitize'),
    import('unist-util-visit'),
  ]);

  function rehypeImageFigure() {
    return (tree: Root) => {
      visit(tree, 'element', (node, index, parent) => {
        if (node.tagName !== 'img' || index === undefined || !parent) return;
        const alt = (node.properties?.alt as string) || '';
        if (!alt) return;
        const figure: Element = {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [
            node,
            {
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [{ type: 'text', value: alt }],
            },
          ],
        };
        parent.children[index] = figure;
      });
    };
  }

  const sanitizeSchema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames ?? []), 'figure', 'figcaption'],
    attributes: {
      ...defaultSchema.attributes,
      h1: [...(defaultSchema.attributes?.h1 ?? []), 'id'],
      h2: [...(defaultSchema.attributes?.h2 ?? []), 'id'],
      h3: [...(defaultSchema.attributes?.h3 ?? []), 'id'],
      h4: [...(defaultSchema.attributes?.h4 ?? []), 'id'],
      h5: [...(defaultSchema.attributes?.h5 ?? []), 'id'],
      h6: [...(defaultSchema.attributes?.h6 ?? []), 'id'],
      a: [...(defaultSchema.attributes?.a ?? []), 'className'],
      img: [...(defaultSchema.attributes?.img ?? []), 'alt'],
    },
  };

  function extractToc(tree: Root): TocEntry[] {
    const entries: TocEntry[] = [];
    visit(tree, 'element', (node: Element) => {
      const match = node.tagName.match(/^h([2-3])$/);
      if (!match || !node.properties?.id) return;
      const text = node.children
        .filter((c: ElementContent): c is ElementContent & { type: 'text'; value: string } => c.type === 'text')
        .map((c: { value: string }) => c.value)
        .join('');
      if (text) {
        entries.push({ id: String(node.properties.id), text, level: Number(match[1]) });
      }
    });
    return entries;
  }

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeImageFigure);

  const mdast = processor.parse(content);
  const hast = await processor.run(mdast);

  const sanitized = await unified()
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .run(hast);

  const toc = extractToc(sanitized as Root);
  const html = unified().use(rehypeStringify).stringify(sanitized as Root);
  return { html, toc };
}

export async function getRelatedPosts(slug: string, tags: string[], count = 2): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const others = all.filter((t) => t.slug !== slug);

  const scored = others.map((t) => {
    const shared = t.tags.filter((tag) => tags.includes(tag)).length;
    return { post: t, score: shared };
  });

  scored.sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());

  return scored.slice(0, count).map((s) => s.post);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const parsed = await parsePost(slug);
  if (!parsed) return null;

  const { imageFilename, ...rest } = parsed;
  const image = imageFilename ? await generateImageData(slug, imageFilename) : null;
  const { html, toc } = await renderMarkdown(rest.content);
  return { ...rest, image, html, toc };
}

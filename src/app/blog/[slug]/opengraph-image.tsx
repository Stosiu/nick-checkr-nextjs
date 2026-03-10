import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getPostBySlug } from '@/lib/blog';

export const alt = 'NickCheckr Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const [interSemiBold, interRegular] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Regular.ttf')),
  ]);

  const title = post?.title ?? 'NickCheckr Blog';
  const tags = post?.tags?.slice(0, 3) ?? [];
  const readingTime = post?.readingTime ?? 0;
  const date = post?.date ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '60px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 600,
                color: '#0a0a0a',
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              NickCheckr Blog
            </span>
          </div>

          <span
            style={{
              fontSize: title.length > 50 ? '42px' : '52px',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  backgroundColor: 'rgba(52, 211, 153, 0.08)',
                  fontSize: '14px',
                  color: '#34d399',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            {date && <span>{date}</span>}
            {readingTime > 0 && <span>{readingTime} min read</span>}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interSemiBold, style: 'normal', weight: 600 },
        { name: 'Inter', data: interRegular, style: 'normal', weight: 400 },
      ],
    },
  );
}

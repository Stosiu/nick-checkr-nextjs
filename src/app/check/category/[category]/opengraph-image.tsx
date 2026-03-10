import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getCategoryBySlug, getServicesInCategory } from '@/lib/platform-utils';
import { services } from '@/services/data/services';

export const alt = 'NickCheckr — Category Username Checker';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug) ?? slug;
  const categoryServices = getServicesInCategory(category);

  const [interSemiBold, interRegular] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Regular.ttf')),
  ]);

  const topPlatforms = categoryServices.slice(0, 6).map((s) => s.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '60px',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
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
            NickCheckr
          </span>
        </div>

        <span
          style={{
            fontSize: '56px',
            fontWeight: 600,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          {category} Username Checker
        </span>

        <span
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Check {categoryServices.length} platforms at once
        </span>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {topPlatforms.map((name) => (
            <span
              key={name}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                backgroundColor: 'rgba(52, 211, 153, 0.08)',
                fontSize: '14px',
                color: '#34d399',
              }}
            >
              {name}
            </span>
          ))}
          {categoryServices.length > 6 && (
            <span
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              +{categoryServices.length - 6} more
            </span>
          )}
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

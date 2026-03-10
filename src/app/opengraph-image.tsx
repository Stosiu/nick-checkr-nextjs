import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { services } from '@/services/data/services';

export const alt = 'NickCheckr — Check username availability';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [interSemiBold, interRegular] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Regular.ttf')),
  ]);

  const categories = ['Social Media', 'Developer', 'Gaming', 'Creative', 'Domain Names'];

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
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 600,
              color: '#0a0a0a',
            }}
          >
            N
          </div>
          <span style={{ fontSize: '42px', fontWeight: 600, color: '#ffffff' }}>
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
            marginBottom: '20px',
          }}
        >
          Is your nick taken?
        </span>

        <span
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
          }}
        >
          Check username availability across {services.length}+ platforms
        </span>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {categories.map((cat) => (
            <span
              key={cat}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              {cat}
            </span>
          ))}
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

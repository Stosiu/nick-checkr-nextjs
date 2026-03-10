import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { services } from '@/services/data/services';
import { getServiceBySlug } from '@/lib/platform-utils';

export const alt = 'NickCheckr — Username Checker';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  const service = getServiceBySlug(platform);

  const [interSemiBold, interRegular] = await Promise.all([
    readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf')),
    readFile(join(process.cwd(), 'assets/Inter-Regular.ttf')),
  ]);

  const name = service?.name ?? platform;
  const category = service?.category ?? '';

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
            fontSize: '60px',
            fontWeight: 600,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          Check {name} username
        </span>

        <span
          style={{
            fontSize: '28px',
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Is your desired username available on {name}?
        </span>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {category && (
            <span
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                backgroundColor: 'rgba(52, 211, 153, 0.08)',
                fontSize: '16px',
                color: '#34d399',
              }}
            >
              {category}
            </span>
          )}
          <span
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            + {services.length - 1} other platforms
          </span>
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

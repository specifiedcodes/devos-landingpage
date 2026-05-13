import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs'; // needs fs for MDX read
export const dynamic = 'force-dynamic';

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Engineering: { text: '#67e8f9', bg: 'rgba(34, 211, 238, 0.12)', border: 'rgba(34, 211, 238, 0.35)' },
  Product: { text: '#a5b4fc', bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.35)' },
  Guides: { text: '#6ee7b7', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.35)' },
  'AI Agents': { text: '#c4b5fd', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.35)' },
  DevOps: { text: '#fcd34d', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.35)' },
  Changelog: { text: '#fda4af', bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.35)' },
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const { meta } = post;
  const cat = categoryColors[meta.category] || {
    text: '#a5b4fc',
    bg: 'rgba(99, 102, 241, 0.12)',
    border: 'rgba(99, 102, 241, 0.35)',
  };

  // Trim title so it fits in the layout without truncation flicker.
  const title = meta.title.length > 110 ? meta.title.slice(0, 107) + '…' : meta.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Ambient orb top-left */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0) 70%)',
            display: 'flex',
          }}
        />
        {/* Ambient orb bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -200,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168, 85, 247, 0.30) 0%, rgba(168, 85, 247, 0) 70%)',
            display: 'flex',
          }}
        />

        {/* Top: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: '#0a0a0f',
              border: '2px solid rgba(129, 140, 248, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#e5e7eb',
                fontFamily: 'monospace',
                lineHeight: 1,
                display: 'flex',
              }}
            >
              D
            </div>
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: -0.5,
              display: 'flex',
            }}
          >
            <span style={{ color: '#818cf8' }}>Dev</span>
            <span style={{ color: 'white' }}>OS</span>
          </div>
        </div>

        {/* Middle: category + title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1 }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                color: cat.text,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                padding: '10px 22px',
                borderRadius: 999,
                display: 'flex',
              }}
            >
              {meta.category}
            </div>
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              color: 'white',
              display: 'flex',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: byline + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: '#9ca3af',
              display: 'flex',
            }}
          >
            {meta.author}
          </div>
          <div
            style={{
              fontSize: 24,
              fontFamily: 'monospace',
              color: '#818cf8',
              display: 'flex',
            }}
          >
            devos.team/blog
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  );
}

import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs'; // needs fs for MDX read
// ISR with 1h window — once a post is published its OG image is effectively
// immutable. FB/LinkedIn/Twitter scrapers need cacheable responses, and
// CDN-cacheable also avoids cold-start latency on each scrape.
export const revalidate = 3600;

export const alt = 'DevOS Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Engineering: { text: '#67e8f9', bg: 'rgba(34, 211, 238, 0.12)', border: 'rgba(34, 211, 238, 0.35)' },
  Product: { text: '#a5b4fc', bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.35)' },
  Guides: { text: '#6ee7b7', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.35)' },
  'AI Agents': { text: '#c4b5fd', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.35)' },
  DevOps: { text: '#fcd34d', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.35)' },
  Changelog: { text: '#fda4af', bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.35)' },
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Fallback to brand card if post not found
  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)',
            color: 'white',
            fontSize: 72,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <span style={{ color: '#818cf8' }}>Dev</span>
          <span>OS</span>
        </div>
      ),
      size,
    );
  }

  const { meta } = post;
  const cat = categoryColors[meta.category] || {
    text: '#a5b4fc',
    bg: 'rgba(99, 102, 241, 0.12)',
    border: 'rgba(99, 102, 241, 0.35)',
  };

  // Trim title for predictable layout (wide aspect = more room than square)
  const title = meta.title.length > 130 ? meta.title.slice(0, 127) + '…' : meta.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Ambient orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -180,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(99, 102, 241, 0.32) 0%, rgba(99, 102, 241, 0) 70%)',
            display: 'flex',
          }}
        />
        {/* Ambient orb bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -180,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(168, 85, 247, 0) 70%)',
            display: 'flex',
          }}
        />

        {/* Top: brand + category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: '#0a0a0f',
                border: '2px solid rgba(129, 140, 248, 0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 30,
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
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: -0.5,
                display: 'flex',
              }}
            >
              <span style={{ color: '#818cf8' }}>Dev</span>
              <span style={{ color: 'white' }}>OS</span>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                color: cat.text,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                padding: '8px 18px',
                borderRadius: 999,
                display: 'flex',
              }}
            >
              {meta.category}
            </div>
          </div>
        </div>

        {/* Middle: title */}
        <div
          style={{
            fontSize: title.length > 70 ? 56 : 64,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            color: 'white',
            display: 'flex',
            zIndex: 1,
          }}
        >
          {title}
        </div>

        {/* Bottom: author + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: 22,
          }}
        >
          <div style={{ fontSize: 22, color: '#9ca3af', display: 'flex' }}>
            {meta.author}
          </div>
          <div
            style={{
              fontSize: 22,
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
    size,
  );
}

import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs'; // needs fs for MDX read + font fetch
export const revalidate = 3600;

export const alt = 'DevOS Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Engineering: { text: '#67e8f9', bg: 'rgba(34, 211, 238, 0.14)', border: 'rgba(34, 211, 238, 0.40)' },
  Product: { text: '#a5b4fc', bg: 'rgba(99, 102, 241, 0.14)', border: 'rgba(99, 102, 241, 0.40)' },
  Guides: { text: '#6ee7b7', bg: 'rgba(16, 185, 129, 0.14)', border: 'rgba(16, 185, 129, 0.40)' },
  'AI Agents': { text: '#c4b5fd', bg: 'rgba(168, 85, 247, 0.14)', border: 'rgba(168, 85, 247, 0.40)' },
  DevOps: { text: '#fcd34d', bg: 'rgba(245, 158, 11, 0.14)', border: 'rgba(245, 158, 11, 0.40)' },
  Changelog: { text: '#fda4af', bg: 'rgba(244, 63, 94, 0.14)', border: 'rgba(244, 63, 94, 0.40)' },
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Brand-only fallback
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
            background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
            color: 'white',
            fontSize: 96,
            fontWeight: 800,
            fontFamily: 'system-ui',
            letterSpacing: -3,
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
  const cat = categoryColors[meta.category] || categoryColors['AI Agents'];

  const title = meta.title.length > 100 ? meta.title.slice(0, 97) + '…' : meta.title;
  const excerpt = (meta.excerpt || '').length > 160
    ? (meta.excerpt || '').slice(0, 157) + '…'
    : meta.excerpt || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 64,
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #131326 50%, #0a0a0f 100%)',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -100,
            width: 540,
            height: 540,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(129, 140, 248, 0.40) 0%, rgba(129, 140, 248, 0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, rgba(168, 85, 247, 0) 70%)',
            display: 'flex',
          }}
        />
        {/* Vertical accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 80,
            bottom: 80,
            width: 4,
            background: 'linear-gradient(180deg, #818cf8 0%, #22d3ee 100%)',
            display: 'flex',
          }}
        />

        {/* Top row: brand + category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: '#0a0a0f',
                border: '2px solid #818cf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: '#f8fafc',
                  fontFamily: 'system-ui',
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
                letterSpacing: -0.8,
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
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: cat.text,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
                padding: '10px 20px',
                borderRadius: 999,
                display: 'flex',
              }}
            >
              {meta.category}
            </div>
          </div>
        </div>

        {/* Middle: title + excerpt — flex-grow fills available space */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 20,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 54 : 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: 'white',
              display: 'flex',
            }}
          >
            {title}
          </div>
          {excerpt && (
            <div
              style={{
                fontSize: 24,
                fontWeight: 400,
                lineHeight: 1.4,
                color: '#9ca3af',
                display: 'flex',
              }}
            >
              {excerpt}
            </div>
          )}
        </div>

        {/* Bottom row: author + url */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            marginTop: 28,
            paddingTop: 22,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: '#cbd5e1',
              display: 'flex',
            }}
          >
            {meta.author}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
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

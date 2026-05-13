import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs'; // needs fs for MDX read + font fetch
export const revalidate = 3600;

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Engineering: { text: '#67e8f9', bg: 'rgba(34, 211, 238, 0.14)', border: 'rgba(34, 211, 238, 0.40)' },
  Product: { text: '#a5b4fc', bg: 'rgba(99, 102, 241, 0.14)', border: 'rgba(99, 102, 241, 0.40)' },
  Guides: { text: '#6ee7b7', bg: 'rgba(16, 185, 129, 0.14)', border: 'rgba(16, 185, 129, 0.40)' },
  'AI Agents': { text: '#c4b5fd', bg: 'rgba(168, 85, 247, 0.14)', border: 'rgba(168, 85, 247, 0.40)' },
  DevOps: { text: '#fcd34d', bg: 'rgba(245, 158, 11, 0.14)', border: 'rgba(245, 158, 11, 0.40)' },
  Changelog: { text: '#fda4af', bg: 'rgba(244, 63, 94, 0.14)', border: 'rgba(244, 63, 94, 0.40)' },
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
  const cat = categoryColors[meta.category] || categoryColors['AI Agents'];

  const title = meta.title.length > 90 ? meta.title.slice(0, 87) + '…' : meta.title;
  const excerpt = (meta.excerpt || '').length > 140
    ? (meta.excerpt || '').slice(0, 137) + '…'
    : meta.excerpt || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 72,
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
            top: -240,
            left: -200,
            width: 640,
            height: 640,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(129, 140, 248, 0.42) 0%, rgba(129, 140, 248, 0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -240,
            right: -200,
            width: 580,
            height: 580,
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
            top: 100,
            bottom: 100,
            width: 5,
            background: 'linear-gradient(180deg, #818cf8 0%, #22d3ee 100%)',
            display: 'flex',
          }}
        />

        {/* Top: brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#0a0a0f',
              border: '2px solid #818cf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 38,
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
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: -1,
              display: 'flex',
            }}
          >
            <span style={{ color: '#818cf8' }}>Dev</span>
            <span style={{ color: 'white' }}>OS</span>
          </div>
        </div>

        {/* Middle: category + title + excerpt — fills the square nicely */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 28,
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 1.8,
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
              fontSize: title.length > 50 ? 64 : 76,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.8,
              color: 'white',
              display: 'flex',
            }}
          >
            {title}
          </div>

          {excerpt && (
            <div
              style={{
                fontSize: 28,
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

        {/* Bottom: author + url */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            paddingTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: '#cbd5e1',
              display: 'flex',
            }}
          >
            {meta.author}
          </div>
          <div
            style={{
              fontSize: 24,
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
    {
      width: 1080,
      height: 1080,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  );
}

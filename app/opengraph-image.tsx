import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const revalidate = 86400; // 24h — homepage rarely changes

export const alt = 'DevOS - Build, Test & Deploy with Autonomous AI Agents';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function HomeOG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
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
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(129, 140, 248, 0.45) 0%, rgba(129, 140, 248, 0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -240,
            left: -180,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168, 85, 247, 0.36) 0%, rgba(168, 85, 247, 0) 70%)',
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

        {/* Brand mark */}
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

        {/* Headline */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 24,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: 'white',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Build software with
          </div>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #22d3ee 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            autonomous AI agents.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.4,
              color: '#9ca3af',
              display: 'flex',
              marginTop: 4,
            }}
          >
            Planner, Developer, QA, and DevOps agents — autonomously coordinated.
          </div>
        </div>

        {/* Agent chips + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            paddingTop: 22,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[
              { label: 'Planner', color: '#a5b4fc', bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.4)' },
              { label: 'Developer', color: '#6ee7b7', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' },
              { label: 'QA', color: '#fcd34d', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)' },
              { label: 'DevOps', color: '#fda4af', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)' },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: c.color,
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  padding: '8px 16px',
                  borderRadius: 999,
                  display: 'flex',
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: '#818cf8',
              display: 'flex',
            }}
          >
            devos.team
          </div>
        </div>
      </div>
    ),
    size,
  );
}

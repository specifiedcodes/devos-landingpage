'use client';

import { useState, useEffect } from 'react';

const terminalLines = [
  { text: '$ devos start "Build a SaaS dashboard"', type: 'command' as const, delay: 0 },
  { text: '', type: 'blank' as const, delay: 800 },
  { text: '  Planner → Analyzing requirements...', type: 'planner' as const, delay: 1200 },
  { text: '  Planner → Architecture designed (Next.js + NestJS)', type: 'planner' as const, delay: 2400 },
  { text: '  Planner → Created 3 epics, 12 stories', type: 'planner' as const, delay: 3400 },
  { text: '', type: 'blank' as const, delay: 3800 },
  { text: '  Developer → Implementing auth module...', type: 'developer' as const, delay: 4200 },
  { text: '  Developer → 14 files changed, 842 insertions(+)', type: 'developer' as const, delay: 5400 },
  { text: '', type: 'blank' as const, delay: 5800 },
  { text: '  QA → Running test suite...', type: 'qa' as const, delay: 6200 },
  { text: '  QA → 47 tests passed · 94% coverage', type: 'qa' as const, delay: 7400 },
  { text: '', type: 'blank' as const, delay: 7800 },
  { text: '  DevOps → Building & deploying to Railway...', type: 'devops' as const, delay: 8200 },
  { text: '  DevOps → Live at dashboard.railway.app', type: 'devops' as const, delay: 9600 },
  { text: '', type: 'blank' as const, delay: 10000 },
  { text: '  ✓ Sprint complete · 12/12 stories done', type: 'success' as const, delay: 10600 },
];

const colorMap: Record<string, string> = {
  command: 'text-gray-200',
  planner: 'text-indigo-400',
  developer: 'text-emerald-400',
  qa: 'text-amber-400',
  devops: 'text-rose-400',
  success: 'text-green-400',
  blank: '',
};

const iconMap: Record<string, string> = {
  planner: '🧠',
  developer: '💻',
  qa: '🔍',
  devops: '🚀',
  success: '',
};

export function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    terminalLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    // Restart the animation after it completes
    const restartTimer = setTimeout(() => {
      setVisibleLines(0);
      // Small delay before restarting
      const resetTimer = setTimeout(() => {
        terminalLines.forEach((line, index) => {
          const timer = setTimeout(() => {
            setVisibleLines(index + 1);
          }, line.delay);
          timers.push(timer);
        });
      }, 500);
      timers.push(resetTimer);
    }, 13000);
    timers.push(restartTimer);

    return () => timers.forEach(clearTimeout);
  }, [visibleLines === 0]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c14]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-gray-500 font-code ml-2">devos — orchestrator</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 md:p-5 font-code text-[13px] leading-6 min-h-[320px] max-h-[360px] overflow-hidden">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={`${colorMap[line.type]} transition-opacity duration-300`}
            style={{ opacity: i < visibleLines ? 1 : 0 }}
          >
            {line.type === 'blank' ? (
              <br />
            ) : (
              <span>
                {iconMap[line.type] && (
                  <span className="mr-1">{iconMap[line.type]}</span>
                )}
                {line.text.replace(/^ {2}(Planner|Developer|QA|DevOps) →/, '  $1 →')}
              </span>
            )}
          </div>
        ))}
        {/* Cursor */}
        <span
          className={`inline-block w-2 h-4 bg-indigo-400 align-middle transition-opacity ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}

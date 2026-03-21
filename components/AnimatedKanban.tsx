'use client';

import { useState, useEffect } from 'react';
import { Brain, Code2, Shield, Rocket } from 'lucide-react';

type CardStatus = 'backlog' | 'progress' | 'review' | 'done';

interface KanbanCard {
  id: number;
  title: string;
  agent: 'planner' | 'developer' | 'qa' | 'devops';
  status: CardStatus;
}

const agentConfig = {
  planner: { icon: Brain, color: 'text-indigo-400', bg: 'bg-indigo-500/15', border: 'border-indigo-500/20', label: 'Planner' },
  developer: { icon: Code2, color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/20', label: 'Dev' },
  qa: { icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/20', label: 'QA' },
  devops: { icon: Rocket, color: 'text-rose-400', bg: 'bg-rose-500/15', border: 'border-rose-500/20', label: 'DevOps' },
};

const columns: { key: CardStatus; label: string }[] = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
];

// Animation sequence: cards move through the board over time
const animationSteps: KanbanCard[][] = [
  // Step 0: Initial state
  [
    { id: 1, title: 'Auth module', agent: 'developer', status: 'progress' },
    { id: 2, title: 'API endpoints', agent: 'developer', status: 'backlog' },
    { id: 3, title: 'Dashboard UI', agent: 'planner', status: 'backlog' },
    { id: 4, title: 'Unit tests', agent: 'qa', status: 'backlog' },
    { id: 5, title: 'Deploy staging', agent: 'devops', status: 'backlog' },
  ],
  // Step 1
  [
    { id: 1, title: 'Auth module', agent: 'developer', status: 'review' },
    { id: 2, title: 'API endpoints', agent: 'developer', status: 'progress' },
    { id: 3, title: 'Dashboard UI', agent: 'planner', status: 'backlog' },
    { id: 4, title: 'Unit tests', agent: 'qa', status: 'backlog' },
    { id: 5, title: 'Deploy staging', agent: 'devops', status: 'backlog' },
  ],
  // Step 2
  [
    { id: 1, title: 'Auth module', agent: 'qa', status: 'review' },
    { id: 2, title: 'API endpoints', agent: 'developer', status: 'review' },
    { id: 3, title: 'Dashboard UI', agent: 'developer', status: 'progress' },
    { id: 4, title: 'Unit tests', agent: 'qa', status: 'backlog' },
    { id: 5, title: 'Deploy staging', agent: 'devops', status: 'backlog' },
  ],
  // Step 3
  [
    { id: 1, title: 'Auth module', agent: 'qa', status: 'done' },
    { id: 2, title: 'API endpoints', agent: 'qa', status: 'review' },
    { id: 3, title: 'Dashboard UI', agent: 'developer', status: 'progress' },
    { id: 4, title: 'Unit tests', agent: 'qa', status: 'progress' },
    { id: 5, title: 'Deploy staging', agent: 'devops', status: 'backlog' },
  ],
  // Step 4
  [
    { id: 1, title: 'Auth module', agent: 'qa', status: 'done' },
    { id: 2, title: 'API endpoints', agent: 'qa', status: 'done' },
    { id: 3, title: 'Dashboard UI', agent: 'developer', status: 'review' },
    { id: 4, title: 'Unit tests', agent: 'qa', status: 'progress' },
    { id: 5, title: 'Deploy staging', agent: 'devops', status: 'progress' },
  ],
  // Step 5
  [
    { id: 1, title: 'Auth module', agent: 'qa', status: 'done' },
    { id: 2, title: 'API endpoints', agent: 'qa', status: 'done' },
    { id: 3, title: 'Dashboard UI', agent: 'qa', status: 'done' },
    { id: 4, title: 'Unit tests', agent: 'qa', status: 'done' },
    { id: 5, title: 'Deploy staging', agent: 'devops', status: 'review' },
  ],
  // Step 6: All done
  [
    { id: 1, title: 'Auth module', agent: 'qa', status: 'done' },
    { id: 2, title: 'API endpoints', agent: 'qa', status: 'done' },
    { id: 3, title: 'Dashboard UI', agent: 'qa', status: 'done' },
    { id: 4, title: 'Unit tests', agent: 'qa', status: 'done' },
    { id: 5, title: 'Deploy staging', agent: 'devops', status: 'done' },
  ],
];

function MiniCard({ card }: { card: KanbanCard }) {
  const config = agentConfig[card.agent];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg border ${config.border} bg-white/[0.03] p-2.5 transition-all duration-700 hover:bg-white/[0.06]`}
    >
      <p className="text-[11px] text-gray-300 font-medium mb-1.5 truncate">{card.title}</p>
      <div className="flex items-center gap-1.5">
        <div className={`h-4 w-4 rounded flex items-center justify-center ${config.bg}`}>
          <Icon className={`h-2.5 w-2.5 ${config.color}`} />
        </div>
        <span className={`text-[10px] ${config.color} font-code`}>{config.label}</span>
      </div>
    </div>
  );
}

export function AnimatedKanban() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % animationSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const cards = animationSteps[step];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c14]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-gray-500 font-code ml-2">devos — kanban board</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-600 font-code">Sprint 1</span>
          <div className="h-1.5 w-20 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-indigo-500/60 rounded-full transition-all duration-700"
              style={{ width: `${(step / (animationSteps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 gap-0 min-h-[280px]">
        {columns.map((col, colIndex) => {
          const colCards = cards.filter((c) => c.status === col.key);
          return (
            <div
              key={col.key}
              className={`p-2.5 ${colIndex < 3 ? 'border-r border-white/[0.04]' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  {col.label}
                </h4>
                <span className="text-[10px] text-gray-600 font-code">
                  {colCards.length}
                </span>
              </div>
              <div className="space-y-2">
                {colCards.map((card) => (
                  <MiniCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

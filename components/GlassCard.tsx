import { ReactNode } from 'react';

interface GlassCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  large?: boolean;
  compact?: boolean;
}

export function GlassCard({ icon, title, description, large, compact }: GlassCardProps) {
  return (
    <div
      className={`group rounded-2xl glass glass-hover transition-all duration-300 ${
        large ? 'p-7 md:p-8' : compact ? 'p-5' : 'p-6'
      }`}
    >
      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500/20 transition-colors">
        {icon}
      </div>
      <h3 className={`font-semibold text-white mb-2 ${compact ? 'text-sm' : 'text-base'}`}>
        {title}
      </h3>
      <p className={`text-gray-400 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
        {description}
      </p>
    </div>
  );
}

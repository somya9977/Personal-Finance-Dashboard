// src/components/ui/InsightCard.jsx
import clsx from 'clsx';

export default function InsightCard({ title, value, subtitle, icon: Icon, accent = 'brand', style }) {
  const colors = {
    brand:   'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    rose:    'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
    amber:   'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    violet:  'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
    cyan:    'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
  };

  const valueColors = {
    brand:   'text-brand-600 dark:text-brand-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    rose:    'text-rose-600 dark:text-rose-400',
    amber:   'text-amber-600 dark:text-amber-400',
    violet:  'text-violet-600 dark:text-violet-400',
    cyan:    'text-cyan-600 dark:text-cyan-400',
  };

  return (
    <div className="card-hover p-5" style={style}>
      <div className="flex items-start gap-4">
        <div className={clsx('w-11 h-11 rounded-2xl flex items-center justify-center shrink-0', colors[accent])}>
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p className="label mb-1">{title}</p>
          <p className={clsx('text-xl font-display font-bold truncate', valueColors[accent])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

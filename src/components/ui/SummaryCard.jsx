// src/components/ui/SummaryCard.jsx
import clsx from 'clsx';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const VARIANTS = {
  balance: {
    icon: Wallet,
    gradient: 'from-brand-400 to-brand-600',
    bg: 'bg-brand-50 dark:bg-brand-900/20',
    text: 'text-brand-600 dark:text-brand-400',
    label: 'Total Balance',
  },
  income: {
    icon: TrendingUp,
    gradient: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    label: 'Total Income',
  },
  expense: {
    icon: TrendingDown,
    gradient: 'from-rose-400 to-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-600 dark:text-rose-400',
    label: 'Total Expenses',
  },
};

export default function SummaryCard({ variant, amount, changePercent, style }) {
  const cfg = VARIANTS[variant];
  const Icon = cfg.icon;
  const isPositive = changePercent >= 0;

  return (
    <div className="card-hover p-5 flex flex-col gap-4" style={style}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className={clsx('w-11 h-11 rounded-2xl flex items-center justify-center', cfg.bg)}>
          <div className={clsx('w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center', cfg.gradient)}>
            <Icon size={16} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        {changePercent !== undefined && (
          <span className={clsx(
            'text-xs font-medium px-2 py-1 rounded-lg',
            isPositive
              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
          )}>
            {isPositive ? '↑' : '↓'} {Math.abs(changePercent)}%
          </span>
        )}
      </div>

      {/* Amount */}
      <div>
        <p className="label mb-1">{cfg.label}</p>
        <p className={clsx('text-2xl font-display font-bold', cfg.text)}>
          {formatCurrency(amount)}
        </p>
      </div>

      {/* Accent bar */}
      <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <div className={clsx('h-full rounded-full bg-gradient-to-r w-3/4', cfg.gradient)} />
      </div>
    </div>
  );
}

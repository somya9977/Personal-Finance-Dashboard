// src/components/ui/FilterBar.jsx
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import clsx from 'clsx';

export default function FilterBar() {
  const { state, setFilter, resetFilters } = useFinance();
  const { search, type } = state.filters;

  const hasActiveFilters = search || type !== 'all';

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search by description, category, or amount…"
          value={search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className="input pl-9 pr-9"
        />
        {search && (
          <button
            onClick={() => setFilter({ search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Type filter */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 shrink-0">
        {[
          { value: 'all',     label: 'All'     },
          { value: 'income',  label: '↑ Income'  },
          { value: 'expense', label: '↓ Expense' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter({ type: value })}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              type === value
                ? value === 'income'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : value === 'expense'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 
                     hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700"
        >
          <SlidersHorizontal size={13} /> Reset
        </button>
      )}
    </div>
  );
}

// src/components/ui/TransactionTable.jsx
import { useState } from 'react';
import { Pencil, Trash2, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../data/mockData';
import TransactionModal from './TransactionModal';
import clsx from 'clsx';

export default function TransactionTable({ showControls = true }) {
  const { state, filteredTransactions, deleteTransaction, setFilter } = useFinance();
  const [editing, setEditing]       = useState(null);
  const [modalOpen, setModalOpen]   = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const isAdmin = state.role === 'admin';
  const { sortBy, sortDir } = state.filters;

  const handleSort = (field) => {
    if (sortBy === field) {
      setFilter({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilter({ sortBy: field, sortDir: 'desc' });
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <ArrowUpDown size={13} className="text-slate-300 dark:text-slate-600" />;
    return sortDir === 'asc'
      ? <ChevronUp size={13} className="text-brand-500" />
      : <ChevronDown size={13} className="text-brand-500" />;
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteTransaction(id);
      setDeletingId(null);
    }, 300);
  };

  const displayList = showControls ? filteredTransactions : filteredTransactions.slice(0, 5);

  if (!displayList.length) {
    return (
      <div className="card p-12 flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
          <ArrowUpDown size={24} className="text-slate-400 dark:text-slate-500" />
        </div>
        <p className="font-display font-semibold text-slate-600 dark:text-slate-300">No transactions found</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">Try adjusting your filters or add a new transaction.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="card overflow-hidden hidden sm:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                <th className="px-4 py-3 text-left">
                  <button
                    className="label flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    onClick={() => handleSort('date')}
                  >
                    Date <SortIcon field="date" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left label">Description</th>
                <th className="px-4 py-3 text-left label">Category</th>
                <th className="px-4 py-3 text-left label">Type</th>
                <th className="px-4 py-3 text-right">
                  <button
                    className="label flex items-center gap-1 ml-auto hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    onClick={() => handleSort('amount')}
                  >
                    Amount <SortIcon field="amount" />
                  </button>
                </th>
                {isAdmin && <th className="px-4 py-3 text-right label">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayList.map((t) => (
                <tr
                  key={t.id}
                  className={clsx(
                    'border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all duration-200',
                    deletingId === t.id && 'opacity-0 scale-95'
                  )}
                >
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 dark:text-slate-200 max-w-[180px] truncate">
                    {t.description}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ background: CATEGORY_COLORS[t.category] || '#94a3b8' }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {t.type === 'income'
                      ? <span className="badge-income">↑ Income</span>
                      : <span className="badge-expense">↓ Expense</span>
                    }
                  </td>
                  <td className={clsx(
                    'px-4 py-3.5 text-right font-mono font-semibold',
                    t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  )}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setEditing(t); setModalOpen(true); }}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {displayList.map((t) => (
          <div key={t.id} className="card p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-100 text-sm leading-snug">{t.description}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-mono">{formatDate(t.date)}</p>
              </div>
              <p className={clsx(
                'font-mono font-bold text-base shrink-0',
                t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              )}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 rounded-full text-xs text-white font-medium"
                  style={{ background: CATEGORY_COLORS[t.category] || '#94a3b8' }}
                >
                  {t.category}
                </span>
                {t.type === 'income'
                  ? <span className="badge-income">↑ Income</span>
                  : <span className="badge-expense">↓ Expense</span>}
              </div>
              {isAdmin && (
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(t); setModalOpen(true); }} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-brand-500">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500">
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        editing={editing}
      />
    </>
  );
}

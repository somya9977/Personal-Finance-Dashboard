// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { getSummary } from '../utils/helpers';
import SummaryCard from '../components/ui/SummaryCard';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import SpendingDonutChart from '../components/charts/SpendingDonutChart';
import TransactionTable from '../components/ui/TransactionTable';
import TransactionModal from '../components/ui/TransactionModal';

export default function Dashboard() {
  const { state } = useFinance();
  const { income, expense, balance } = getSummary(state.transactions);
  const isAdmin = state.role === 'admin';
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Welcome back — here's your financial overview.
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary flex items-center gap-2 shrink-0"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      {/* Role Banner */}
      {state.role === 'viewer' && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 text-sm animate-fade-in">
          <span>👁️</span>
          <span>You are in <strong>Viewer mode</strong> — switch to Admin to manage transactions.</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard variant="balance" amount={balance} style={{ animationDelay: '0ms'   }} />
        <SummaryCard variant="income"  amount={income}  style={{ animationDelay: '80ms'  }} />
        <SummaryCard variant="expense" amount={expense} style={{ animationDelay: '160ms' }} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-up animate-delay-200">
          <BalanceTrendChart />
        </div>
        <div className="animate-fade-up animate-delay-300">
          <SpendingDonutChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="animate-fade-up animate-delay-400">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Recent Transactions</h2>
          <Link
            to="/transactions"
            className="flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <TransactionTable showControls={false} />
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

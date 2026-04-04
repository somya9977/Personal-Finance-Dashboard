// src/pages/Transactions.jsx
import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { exportToCSV } from '../utils/helpers';
import FilterBar from '../components/ui/FilterBar';
import TransactionTable from '../components/ui/TransactionTable';
import TransactionModal from '../components/ui/TransactionModal';

export default function Transactions() {
  const { state, filteredTransactions } = useFinance();
  const isAdmin = state.role === 'admin';
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => exportToCSV(filteredTransactions)}
            className="btn-secondary flex items-center gap-2"
            title="Export to CSV"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="animate-fade-up">
        <FilterBar />
      </div>

      {/* Table */}
      <div className="animate-fade-up animate-delay-100">
        <TransactionTable showControls />
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

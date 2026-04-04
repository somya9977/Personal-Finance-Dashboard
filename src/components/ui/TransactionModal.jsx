// src/components/ui/TransactionModal.jsx
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { CATEGORIES } from '../../data/mockData';

const defaultForm = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  amount: '',
  category: '',
  type: 'expense',
};

export default function TransactionModal({ open, onClose, editing }) {
  const { addTransaction, updateTransaction } = useFinance();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        date: editing.date,
        description: editing.description,
        amount: String(editing.amount),
        category: editing.category,
        type: editing.type,
      });
    } else {
      setForm(defaultForm);
    }
    setError('');
  }, [editing, open]);

  if (!open) return null;

  const categories = CATEGORIES[form.type] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' ? { category: '' } : {}),
    }));
  };

  const handleSubmit = () => {
    if (!form.date || !form.description.trim() || !form.amount || !form.category) {
      setError('All fields are required.');
      return;
    }
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Enter a valid positive amount.');
      return;
    }

    const payload = { ...form, amount, description: form.description.trim() };

    if (editing) {
      updateTransaction({ ...editing, ...payload });
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md card p-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{editing ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Type Toggle */}
          <div>
            <label className="label mb-2 block">Type</label>
            <div className="flex gap-2">
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: t, category: '' }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-rose-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {t === 'income' ? '↑' : '↓'} {t}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="label mb-1.5 block">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
          </div>

          {/* Description */}
          <div>
            <label className="label mb-1.5 block">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Monthly Salary"
              className="input"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="label mb-1.5 block">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="input font-mono"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label mb-1.5 block">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input">
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button onClick={handleSubmit} className="btn-primary flex-1">
              {editing ? 'Update' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/components/charts/MonthlyComparisonChart.jsx
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { getMonthlyTotals, formatCurrency } from '../../utils/helpers';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const income = payload.find(p => p.dataKey === 'income')?.value || 0;
  const expense = payload.find(p => p.dataKey === 'expense')?.value || 0;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-2">{label}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-6">
          <span className="text-emerald-500">Income</span>
          <span className="font-medium text-slate-800 dark:text-white">{formatCurrency(income)}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-rose-400">Expense</span>
          <span className="font-medium text-slate-800 dark:text-white">{formatCurrency(expense)}</span>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-1 mt-1 flex justify-between gap-6">
          <span className="text-slate-500">Savings</span>
          <span className={`font-bold ${income - expense >= 0 ? 'text-brand-500' : 'text-rose-500'}`}>
            {formatCurrency(income - expense)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function MonthlyComparisonChart() {
  const { state } = useFinance();
  const data = getMonthlyTotals(state.transactions);

  if (!data.length) return null;

  return (
    <div className="card p-6">
      <div className="mb-5">
        <h3 className="section-title">Income vs Expense</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">Monthly comparison</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-700" strokeOpacity={0.6} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} width={52} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
          <Bar dataKey="income" name="Income" fill="#34d399" radius={[6, 6, 0, 0]} maxBarSize={28} />
          <Bar dataKey="expense" name="Expense" fill="#fb7185" radius={[6, 6, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

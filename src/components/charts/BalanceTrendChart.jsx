// src/components/charts/BalanceTrendChart.jsx
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Area, AreaChart,
} from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { getMonthlyTotals, formatCurrency } from '../../utils/helpers';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-display font-semibold text-slate-700 dark:text-slate-200 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-500 dark:text-slate-400 capitalize">{entry.name}:</span>
          <span className="font-medium text-slate-800 dark:text-slate-100">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrendChart() {
  const { state } = useFinance();
  const data = getMonthlyTotals(state.transactions);

  if (!data.length) {
    return (
      <div className="card p-6 h-80 flex items-center justify-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm">No data to display</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="section-title">Balance Trend</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">Monthly income & expense overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="w-3 h-0.5 rounded bg-emerald-400 inline-block" />Income
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="w-3 h-0.5 rounded bg-rose-400 inline-block" />Expense
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#34d399" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#fb7185" stopOpacity={0.2}  />
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-100 dark:text-slate-700" strokeOpacity={0.6} />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'currentColor', className: 'text-slate-400' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'currentColor' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={52}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#34d399"
            strokeWidth={2.5}
            fill="url(#incomeGrad)"
            dot={{ r: 3, fill: '#34d399', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 5 }}
            name="Income"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#fb7185"
            strokeWidth={2.5}
            fill="url(#expenseGrad)"
            dot={{ r: 3, fill: '#fb7185', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 5 }}
            name="Expense"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

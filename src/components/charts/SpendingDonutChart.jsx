// src/components/charts/SpendingDonutChart.jsx
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { getCategoryTotals, formatCurrency, toPercent } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-medium text-slate-800 dark:text-slate-100">{d.category}</p>
      <p className="text-slate-500 dark:text-slate-400 mt-0.5">{formatCurrency(d.amount)}</p>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SpendingDonutChart() {
  const { state } = useFinance();
  const data = getCategoryTotals(state.transactions).slice(0, 8); // top 8

  if (!data.length) {
    return (
      <div className="card p-6 h-80 flex items-center justify-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm">No expense data</p>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="card p-6">
      <div className="mb-5">
        <h3 className="section-title">Spending Breakdown</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">By category</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={2}
            dataKey="amount"
            nameKey="category"
            labelLine={false}
            label={renderLabel}
          >
            {data.map((entry) => (
              <Cell
                key={entry.category}
                fill={CATEGORY_COLORS[entry.category] || '#94a3b8'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.slice(0, 5).map((d) => (
          <div key={d.category} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: CATEGORY_COLORS[d.category] || '#94a3b8' }}
              />
              <span className="text-slate-600 dark:text-slate-400">{d.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 dark:text-slate-500">{toPercent(d.amount, total)}</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 font-mono text-xs">{formatCurrency(d.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

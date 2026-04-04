// src/pages/Insights.jsx
import {
  Flame, PiggyBank, TrendingUp, TrendingDown,
  CalendarDays, BarChart3, Target, Zap,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import {
  getSummary, getMonthlyTotals, getCategoryTotals,
  getHighestSpendingCategory, formatCurrency, toPercent,
} from '../utils/helpers';
import InsightCard from '../components/ui/InsightCard';
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart';
import { CATEGORY_COLORS } from '../data/mockData';
import {
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';

export default function Insights() {
  const { state } = useFinance();
  const txns  = state.transactions;
  const { income, expense, balance } = getSummary(txns);
  const monthly   = getMonthlyTotals(txns);
  const categories = getCategoryTotals(txns);
  const topCat    = getHighestSpendingCategory(txns);

  // Average monthly savings
  const avgSavings = monthly.length
    ? Math.round(monthly.reduce((s, m) => s + m.balance, 0) / monthly.length)
    : 0;

  // Months where savings were positive
  const profitableMonths = monthly.filter((m) => m.balance > 0).length;

  // Savings rate
  const savingsRate = income ? Math.round((balance / income) * 100) : 0;

  // Largest single transaction
  const largest = [...txns].sort((a, b) => b.amount - a.amount)[0];

  // Radial chart data for savings rate
  const radialData = [{ name: 'Savings Rate', value: Math.max(0, Math.min(100, savingsRate)) }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Insights</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Smart analysis of your financial patterns
        </p>
      </div>

      {/* Key Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          title="Highest Spending"
          value={topCat ? topCat.category : '—'}
          subtitle={topCat ? `${formatCurrency(topCat.amount)} total spent` : 'No expense data yet'}
          icon={Flame}
          accent="rose"
          style={{ animationDelay: '0ms' }}
        />
        <InsightCard
          title="Total Savings"
          value={formatCurrency(balance)}
          subtitle={`${savingsRate}% of total income saved`}
          icon={PiggyBank}
          accent={balance >= 0 ? 'emerald' : 'rose'}
          style={{ animationDelay: '80ms' }}
        />
        <InsightCard
          title="Avg Monthly Savings"
          value={formatCurrency(avgSavings)}
          subtitle={`${profitableMonths} of ${monthly.length} months profitable`}
          icon={TrendingUp}
          accent="brand"
          style={{ animationDelay: '160ms' }}
        />
        <InsightCard
          title="Biggest Transaction"
          value={largest ? formatCurrency(largest.amount) : '—'}
          subtitle={largest ? `${largest.description} (${largest.type})` : 'No transactions yet'}
          icon={Zap}
          accent="amber"
          style={{ animationDelay: '240ms' }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly bar chart */}
        <div className="lg:col-span-2 animate-fade-up animate-delay-200">
          <MonthlyComparisonChart />
        </div>

        {/* Savings Rate Radial */}
        <div className="card p-6 flex flex-col animate-fade-up animate-delay-300">
          <h3 className="section-title mb-1">Savings Rate</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">Of total income</p>

          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart
                cx="50%" cy="50%"
                innerRadius="65%"
                outerRadius="85%"
                startAngle={90}
                endAngle={-270}
                data={radialData}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={8}
                  fill={savingsRate >= 20 ? '#14b8a6' : savingsRate >= 0 ? '#f59e0b' : '#ef4444'}
                  background={{ fill: 'rgba(148,163,184,0.12)' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-3xl font-display font-bold ${
                savingsRate >= 20 ? 'text-brand-500' : savingsRate >= 0 ? 'text-amber-500' : 'text-rose-500'
              }`}>
                {savingsRate}%
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">saved</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
              <p className="label mb-1">Income</p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(income)}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
              <p className="label mb-1">Expense</p>
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">{formatCurrency(expense)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="card p-6 animate-fade-up animate-delay-400">
        <h3 className="section-title mb-5">Spending by Category</h3>
        {categories.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm">No expense data available.</p>
        ) : (
          <div className="space-y-3">
            {categories.map((cat, i) => {
              const pct = expense ? (cat.amount / expense) * 100 : 0;
              const color = CATEGORY_COLORS[cat.category] || '#94a3b8';
              return (
                <div key={cat.category} className="flex items-center gap-4" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="w-28 shrink-0 text-sm text-slate-600 dark:text-slate-400 truncate">{cat.category}</div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <div className="w-24 shrink-0 flex justify-between items-center gap-2">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{pct.toFixed(1)}%</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 font-mono text-right">
                      {formatCurrency(cat.amount)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

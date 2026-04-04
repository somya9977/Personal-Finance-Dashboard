// src/utils/helpers.js
// Utility functions for the finance dashboard

/**
 * Format a number as Indian Rupee currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

/**
 * Get month-year label from a date string
 */
export const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
};

/**
 * Get month key for grouping (YYYY-MM)
 */
export const getMonthKey = (dateStr) => {
  return dateStr.slice(0, 7);
};

/**
 * Group transactions by month and compute totals
 */
export const getMonthlyTotals = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { month: getMonthYear(t.date), income: 0, expense: 0, balance: 0 };
    if (t.type === 'income')  map[key].income  += t.amount;
    if (t.type === 'expense') map[key].expense += t.amount;
  });

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ ...v, balance: v.income - v.expense }));
};

/**
 * Group expenses by category and sum amounts
 */
export const getCategoryTotals = (transactions) => {
  const map = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * Get the highest spending category
 */
export const getHighestSpendingCategory = (transactions) => {
  const totals = getCategoryTotals(transactions);
  return totals[0] || null;
};

/**
 * Compute total income, expense, and balance
 */
export const getSummary = (transactions) => {
  const income  = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
};

/**
 * Generate a unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

/**
 * Export transactions to CSV and trigger download
 */
export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (₹)'];
  const rows = transactions.map((t) => [
    formatDate(t.date),
    `"${t.description}"`,
    t.category,
    t.type.charAt(0).toUpperCase() + t.type.slice(1),
    t.amount,
  ]);

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `finflow-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Clamp a value between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Get a percentage string
 */
export const toPercent = (value, total) => {
  if (!total) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

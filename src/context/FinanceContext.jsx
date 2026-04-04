// src/context/FinanceContext.jsx
// Global state management using React Context API

import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';
import { generateId } from '../utils/helpers';

// ─── Initial State ────────────────────────────────────────────────────────────

const STORAGE_KEY = 'finflow_data';

const getStoredState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
};

const defaultState = {
  transactions: initialTransactions,
  role: 'admin',          // 'admin' | 'viewer'
  darkMode: false,
  filters: {
    search: '',
    type: 'all',          // 'all' | 'income' | 'expense'
    sortBy: 'date',       // 'date' | 'amount'
    sortDir: 'desc',      // 'asc' | 'desc'
  },
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function financeReducer(state, action) {
  switch (action.type) {

    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [
          { ...action.payload, id: generateId() },
          ...state.transactions,
        ],
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'RESET_FILTERS':
      return { ...state, filters: defaultState.filters };

    case 'HYDRATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const stored = getStoredState();
  const [state, dispatch] = useReducer(financeReducer, stored || defaultState);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  // Apply / remove dark-mode class on <html>
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // ─── Derived / filtered transactions ──────────────────────────────────────
  const filteredTransactions = (() => {
    const { search, type, sortBy, sortDir } = state.filters;
    let list = [...state.transactions];

    if (type !== 'all') list = list.filter((t) => t.type === type);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          String(t.amount).includes(q)
      );
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date')   cmp = a.date.localeCompare(b.date);
      if (sortBy === 'amount') cmp = a.amount - b.amount;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  })();

  // ─── Action helpers ───────────────────────────────────────────────────────
  const actions = {
    setRole:            (role)    => dispatch({ type: 'SET_ROLE', payload: role }),
    toggleDarkMode:     ()        => dispatch({ type: 'TOGGLE_DARK_MODE' }),
    addTransaction:     (data)    => dispatch({ type: 'ADD_TRANSACTION', payload: data }),
    updateTransaction:  (data)    => dispatch({ type: 'UPDATE_TRANSACTION', payload: data }),
    deleteTransaction:  (id)      => dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
    setFilter:          (payload) => dispatch({ type: 'SET_FILTER', payload }),
    resetFilters:       ()        => dispatch({ type: 'RESET_FILTERS' }),
  };

  return (
    <FinanceContext.Provider value={{ state, filteredTransactions, ...actions }}>
      {children}
    </FinanceContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used inside <FinanceProvider>');
  return ctx;
};

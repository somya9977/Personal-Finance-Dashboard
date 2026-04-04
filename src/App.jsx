// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

export default function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-mesh dark:bg-gradient-mesh-dark">
          <Navbar />
          <main>
            <Routes>
              <Route path="/"             element={<Dashboard />}    />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights"     element={<Insights />}     />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-8 border-t border-slate-200/60 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span className="font-display font-semibold text-slate-500 dark:text-slate-400">
                Fin<span className="text-brand-500">Flow</span>
              </span>
              <span>Personal Finance Dashboard · Built with React + Tailwind</span>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </FinanceProvider>
  );
}

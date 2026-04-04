# 💰 FinFlow — Personal Finance Dashboard

A production-ready, modern personal finance dashboard built with React (Vite), Tailwind CSS, and Recharts.

---

## ✨ Features

### Dashboard Overview
- **Summary Cards** — Total Balance, Income, and Expenses at a glance
- **Balance Trend Chart** — Area chart showing monthly income vs expense over time
- **Spending Donut Chart** — Category-based breakdown of all expenses

### Transactions
- Full transaction list with **Date, Description, Category, Type, Amount**
- **Search** by description, category, or amount
- **Filter** by type: All / Income / Expense
- **Sort** by date or amount (ascending/descending)
- **Export to CSV** — download filtered transactions instantly

### Role-Based UI (Frontend Only)
- **Admin** — Full CRUD: Add, Edit, Delete transactions
- **Viewer** — Read-only access, no modification controls
- Switch roles instantly via the Navbar toggle (no login required)

### Insights
- Highest spending category
- Total & average monthly savings
- Savings rate (radial progress chart)
- Monthly income vs expense bar comparison
- Full category spending breakdown with progress bars

### UX / DX
- 🌙 **Dark mode toggle** (persisted in localStorage)
- 💾 **localStorage persistence** — data survives page refresh
- 📱 **Fully responsive** — mobile cards + desktop table
- ⚡ **Smooth animations** — staggered fade-up on page load
- 🎨 **Modern SaaS aesthetic** — Syne + DM Sans fonts, teal brand color

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx     # Area chart (income vs expense trend)
│   │   ├── SpendingDonutChart.jsx    # Pie/donut chart for categories
│   │   └── MonthlyComparisonChart.jsx# Bar chart for monthly comparison
│   ├── layout/
│   │   └── Navbar.jsx                # Top nav with role switcher & dark mode
│   └── ui/
│       ├── SummaryCard.jsx           # Balance / Income / Expense cards
│       ├── InsightCard.jsx           # Generic insight metric card
│       ├── TransactionTable.jsx      # Responsive table + mobile cards
│       ├── TransactionModal.jsx      # Add / Edit transaction modal
│       └── FilterBar.jsx             # Search, type filter, reset
├── context/
│   └── FinanceContext.jsx            # Global state via Context API + useReducer
├── data/
│   └── mockData.js                   # 45 realistic mock transactions
├── pages/
│   ├── Dashboard.jsx                 # Overview page
│   ├── Transactions.jsx              # Full transactions page
│   └── Insights.jsx                  # Analytics & insights page
├── utils/
│   └── helpers.js                    # formatCurrency, exportToCSV, aggregators
├── App.jsx                           # Router + Provider setup
├── main.jsx                          # React entry point
└── index.css                         # Tailwind + custom design tokens
```

---

## 🚀 Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Clone or extract the project
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Lightning-fast build tool |
| Tailwind CSS 3 | Utility-first styling |
| Recharts | Charts (Area, Bar, Pie, Radial) |
| React Router 6 | Client-side routing |
| Lucide React | Icon library |
| Context API + useReducer | Global state management |
| localStorage | Data persistence |

---

## 🔑 Key Design Decisions

- **No backend** — All state lives in React Context + localStorage
- **useReducer** — Clean action-based state updates (like a mini Redux)
- **Derived state** — `filteredTransactions` computed on every render from raw state + filters
- **Role simulation** — `state.role` controls UI visibility; no authentication
- **Currency** — Formatted as Indian Rupees (₹) using `Intl.NumberFormat`

---

## 📸 Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Summary cards, trend chart, donut chart, recent transactions |
| Transactions | `/transactions` | Full table with search/filter/sort/export |
| Insights | `/insights` | KPI cards, bar chart, radial savings rate, category breakdown |

---

## 🛠 Extending

- **Add authentication** — Replace role toggle with a real auth provider
- **Connect to API** — Replace `mockData.js` with real API calls in context actions
- **Add budgets** — Add a budget per category and show over/under spending
- **Notifications** — Alert when spending exceeds a threshold

---

*Made with ❤️ using React + Tailwind*

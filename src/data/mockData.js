// src/data/mockData.js
// Initial mock transactions for the finance dashboard

export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Rental', 'Bonus', 'Other Income'],
  expense: ['Food & Dining', 'Housing', 'Transport', 'Healthcare', 'Shopping', 'Entertainment', 'Utilities', 'Education', 'Travel', 'Other'],
};

export const CATEGORY_COLORS = {
  'Salary':        '#14b8a6',
  'Freelance':     '#06b6d4',
  'Investments':   '#8b5cf6',
  'Rental':        '#f59e0b',
  'Bonus':         '#10b981',
  'Other Income':  '#64748b',
  'Food & Dining': '#f97316',
  'Housing':       '#ef4444',
  'Transport':     '#3b82f6',
  'Healthcare':    '#ec4899',
  'Shopping':      '#a855f7',
  'Entertainment': '#f59e0b',
  'Utilities':     '#6366f1',
  'Education':     '#0ea5e9',
  'Travel':        '#84cc16',
  'Other':         '#94a3b8',
};

export const initialTransactions = [
  // January
  { id: '1',  date: '2024-01-02', description: 'Monthly Salary',         amount: 75000, category: 'Salary',        type: 'income'  },
  { id: '2',  date: '2024-01-05', description: 'Apartment Rent',          amount: 18000, category: 'Housing',       type: 'expense' },
  { id: '3',  date: '2024-01-08', description: 'Grocery Shopping',        amount: 3200,  category: 'Food & Dining', type: 'expense' },
  { id: '4',  date: '2024-01-12', description: 'Netflix + Spotify',       amount: 850,   category: 'Entertainment', type: 'expense' },
  { id: '5',  date: '2024-01-15', description: 'Freelance Project',       amount: 22000, category: 'Freelance',     type: 'income'  },
  { id: '6',  date: '2024-01-18', description: 'Metro Card Recharge',     amount: 1200,  category: 'Transport',     type: 'expense' },
  { id: '7',  date: '2024-01-22', description: 'Electricity Bill',        amount: 2800,  category: 'Utilities',     type: 'expense' },
  { id: '8',  date: '2024-01-25', description: 'Restaurant Dinner',       amount: 1800,  category: 'Food & Dining', type: 'expense' },

  // February
  { id: '9',  date: '2024-02-01', description: 'Monthly Salary',         amount: 75000, category: 'Salary',        type: 'income'  },
  { id: '10', date: '2024-02-04', description: 'Apartment Rent',          amount: 18000, category: 'Housing',       type: 'expense' },
  { id: '11', date: '2024-02-07', description: 'Supermarket',             amount: 4100,  category: 'Food & Dining', type: 'expense' },
  { id: '12', date: '2024-02-10', description: 'Annual Health Checkup',   amount: 5500,  category: 'Healthcare',    type: 'expense' },
  { id: '13', date: '2024-02-14', description: 'Valentine Dinner',        amount: 3200,  category: 'Food & Dining', type: 'expense' },
  { id: '14', date: '2024-02-18', description: 'Online Course (Udemy)',   amount: 1499,  category: 'Education',     type: 'expense' },
  { id: '15', date: '2024-02-20', description: 'Stock Dividends',         amount: 8500,  category: 'Investments',   type: 'income'  },
  { id: '16', date: '2024-02-25', description: 'Internet Bill',           amount: 1200,  category: 'Utilities',     type: 'expense' },

  // March
  { id: '17', date: '2024-03-01', description: 'Monthly Salary',         amount: 75000, category: 'Salary',        type: 'income'  },
  { id: '18', date: '2024-03-03', description: 'Apartment Rent',          amount: 18000, category: 'Housing',       type: 'expense' },
  { id: '19', date: '2024-03-06', description: 'Clothing Haul',           amount: 6700,  category: 'Shopping',      type: 'expense' },
  { id: '20', date: '2024-03-10', description: 'Freelance Design Work',   amount: 35000, category: 'Freelance',     type: 'income'  },
  { id: '21', date: '2024-03-14', description: 'Weekend Trip to Goa',     amount: 12000, category: 'Travel',        type: 'expense' },
  { id: '22', date: '2024-03-18', description: 'Pharmacy',                amount: 1800,  category: 'Healthcare',    type: 'expense' },
  { id: '23', date: '2024-03-22', description: 'Movie & Popcorn',         amount: 800,   category: 'Entertainment', type: 'expense' },
  { id: '24', date: '2024-03-28', description: 'Quarterly Bonus',         amount: 25000, category: 'Bonus',         type: 'income'  },

  // April
  { id: '25', date: '2024-04-01', description: 'Monthly Salary',         amount: 75000, category: 'Salary',        type: 'income'  },
  { id: '26', date: '2024-04-03', description: 'Apartment Rent',          amount: 18000, category: 'Housing',       type: 'expense' },
  { id: '27', date: '2024-04-08', description: 'Birthday Party Dinner',   amount: 5500,  category: 'Food & Dining', type: 'expense' },
  { id: '28', date: '2024-04-12', description: 'Mutual Fund SIP',         amount: 10000, category: 'Investments',   type: 'expense' },
  { id: '29', date: '2024-04-15', description: 'Rental Income',           amount: 15000, category: 'Rental',        type: 'income'  },
  { id: '30', date: '2024-04-20', description: 'New Headphones',          amount: 8999,  category: 'Shopping',      type: 'expense' },
  { id: '31', date: '2024-04-25', description: 'Electricity + Water',     amount: 3200,  category: 'Utilities',     type: 'expense' },

  // May
  { id: '32', date: '2024-05-01', description: 'Monthly Salary',         amount: 75000, category: 'Salary',        type: 'income'  },
  { id: '33', date: '2024-05-04', description: 'Apartment Rent',          amount: 18000, category: 'Housing',       type: 'expense' },
  { id: '34', date: '2024-05-07', description: 'Swiggy & Zomato',         amount: 4200,  category: 'Food & Dining', type: 'expense' },
  { id: '35', date: '2024-05-10', description: 'Gym Membership',          amount: 2500,  category: 'Healthcare',    type: 'expense' },
  { id: '36', date: '2024-05-15', description: 'Freelance Writing',       amount: 18000, category: 'Freelance',     type: 'income'  },
  { id: '37', date: '2024-05-20', description: 'Amazon Shopping',         amount: 7200,  category: 'Shopping',      type: 'expense' },
  { id: '38', date: '2024-05-25', description: 'Concert Tickets',         amount: 3500,  category: 'Entertainment', type: 'expense' },

  // June
  { id: '39', date: '2024-06-01', description: 'Monthly Salary',         amount: 75000, category: 'Salary',        type: 'income'  },
  { id: '40', date: '2024-06-03', description: 'Apartment Rent',          amount: 18000, category: 'Housing',       type: 'expense' },
  { id: '41', date: '2024-06-08', description: 'Stock Dividends',         amount: 12000, category: 'Investments',   type: 'income'  },
  { id: '42', date: '2024-06-12', description: 'Groceries',               amount: 3800,  category: 'Food & Dining', type: 'expense' },
  { id: '43', date: '2024-06-15', description: 'Flight Tickets (Mumbai)', amount: 9500,  category: 'Travel',        type: 'expense' },
  { id: '44', date: '2024-06-20', description: 'Dining Out',              amount: 2200,  category: 'Food & Dining', type: 'expense' },
  { id: '45', date: '2024-06-28', description: 'Freelance Consulting',    amount: 28000, category: 'Freelance',     type: 'income'  },
];

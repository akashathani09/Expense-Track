import React from 'react';
import { GlobalProvider } from './Context/GlobalState';
import { BalanceSummary } from './components/BalanceSummery';
import { TransactionForm } from './components/TransactionForm';
import { ExpenseChart } from './components/ExpenseChart';
import { TransactionList } from './components/TransactionList';

export default function App() {
  return (
    <GlobalProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 border-b border-slate-800 pb-4">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              MERN Expense Tracker
            </h1>
          </header>

          <BalanceSummary />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TransactionForm />
              <ExpenseChart />
            </div>
            <div>
              <TransactionList />
            </div>
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}
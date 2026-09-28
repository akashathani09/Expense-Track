import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const BalanceSummary = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(item => item.type === 'income')
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const expenses = transactions
    .filter(item => item.type === 'expense')
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-md">
        <span className="text-sm font-medium text-slate-400">Total Balance</span>
        <h2 className={`text-3xl font-bold mt-1 ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          ${balance.toFixed(2)}
        </h2>
      </div>
      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-md">
        <span className="text-sm font-medium text-slate-400">Total Income</span>
        <h2 className="text-3xl font-bold mt-1 text-emerald-400">+${income.toFixed(2)}</h2>
      </div>
      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-md">
        <span className="text-sm font-medium text-slate-400">Total Expenses</span>
        <h2 className="text-3xl font-bold mt-1 text-rose-400">-${expenses.toFixed(2)}</h2>
      </div>
    </div>
  );
};
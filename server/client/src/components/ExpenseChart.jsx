import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { GlobalContext } from '../Context/GlobalState';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpenseChart = () => {
  const { transactions } = useContext(GlobalContext);

  const expenseItems = transactions.filter(t => t.type === 'expense');

  const categories = [...new Set(expenseItems.map(t => t.category))];
  const categoryTotals = categories.map(cat =>
    expenseItems
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const data = {
    labels: categories.length ? categories : ['No Expenses'],
    datasets: [
      {
        data: categoryTotals.length ? categoryTotals : [1],
        backgroundColor: [
          '#F87171',
          '#60A5FA',
          '#FBBF24',
          '#34D399',
          '#A78BFA',
          '#F472B6'
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-slate-100 mb-4 w-full text-left">Expense Distribution</h3>
      <div className="w-64 h-64">
        <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};
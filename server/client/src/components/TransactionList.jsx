import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { Trash2 } from 'lucide-react';

export const TransactionList = () => {
  const { transactions, deleteTransaction, loading } = useContext(GlobalContext);

  if (loading) {
    return <p className="text-slate-400">Loading transactions...</p>;
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-slate-500 text-center py-4">No transactions found.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map(transaction => (
            <li
              key={transaction._id}
              className="flex justify-between items-center bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all"
            >
              <div>
                <p className="text-slate-200 font-medium">{transaction.text}</p>
                <span className="text-xs text-slate-400">
                  {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`font-semibold ${
                    transaction.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteTransaction(transaction._id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
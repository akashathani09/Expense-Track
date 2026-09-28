import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const TransactionForm = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      text,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString()
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Add Transaction</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Title</label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. Grocery Shopping"
            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
          >
            <option value="Food">Food & Dining</option>
            <option value="Housing">Housing & Rent</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary / Income</option>
            <option value="Entertainment">Entertainment</option>
            <option value="General">General</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};
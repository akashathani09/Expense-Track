import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/transactions';

const initialState = {
  transactions: [],
  error: null,
  loading: true
};

function AppReducer(state, action) {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t._id !== action.payload)
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get(API_URL);
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  async function addTransaction(transaction) {
    try {
      const res = await axios.post(API_URL, transaction, {
        headers: { 'Content-Type': 'application/json' }
      });
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
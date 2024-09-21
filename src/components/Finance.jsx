// src/pages/Finance.js
import React from 'react';
import './Finance.css'; 
import CategoryForm from '../components/Category/CategoryForm';
import CategoryList from '../components/Category/CategoryList';
import WalletForm from '../components/Wallet/WalletForm';
import WalletList from '../components/Wallet/WalletList';
import ExpenseForm from '../components/Expense/ExpenseForm';
import ExpenseList from '../components/Expense/ExpenseList';
import WalletItem from './Wallet/WalletItem';

const Finance = () => {
  return (
    <div className="container">
      <h1>Finance Management</h1>
      <div className="flex">
        <div className="section">
          <h2>Category</h2>
          <CategoryForm />
          <CategoryList />
          
        </div>
        <div className="section">
          <h2>Wallet</h2>
          <WalletForm />
          <WalletList />
          
        </div>
        <div className="section">
          <h2>Expense</h2>
          <ExpenseForm />
          <ExpenseList />
        </div>
      </div>
    </div>
  );
};

export default Finance;

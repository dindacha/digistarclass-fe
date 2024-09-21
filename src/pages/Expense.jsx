// src/pages/ExpenseItemPage.js
import React from 'react';
import ExpenseList from '../components/Expense/ExpenseList';
import ExpenseForm from '../components/Expense/ExpenseForm';

const ExpenseItemPage = () => (
  <div>
    <h1>Expense Item Management</h1>
    <ExpenseList />
    <ExpenseForm />
  </div>
);

export default ExpenseItemPage;

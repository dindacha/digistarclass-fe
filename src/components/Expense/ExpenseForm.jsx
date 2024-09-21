// src/components/ExpenseItem/ExpenseItemForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExpenseItemById, createExpenseItem, updateExpenseItem } from '../../api/expense-items';
import { getWallets } from '../../api/wallets';
import { getCategories } from '../../api/categories';

const ExpenseItemForm = () => {
  const { expenseItemId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [flowType, setFlowType] = useState('');
  const [wallet, setWallet] = useState('');
  const [category, setCategory] = useState('');
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenseItem = async () => {
      if (expenseItemId) {
        try {
          const expense = await getExpenseItemById(expenseItemId);
          setTitle(expense.title);
          setAmount(expense.amount);
          setFlowType(expense.flowType);
          setWallet(expense.wallet); // Fetch wallet if it exists
          setCategory(expense.category); // Fetch category if it exists
        } catch (err) {
          setError('An error occurred while fetching the expense item.');
        }
      }
    };

    const fetchWallets = async () => {
      try {
        const data = await getWallets();
        if (data && Array.isArray(data.data)) {
          setWallets(data.data);
        } else {
          throw new Error("Data format is not valid");
        }
      } catch (err) {
        setError('An error occurred while fetching wallets.');
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          throw new Error("Data format is not valid");
        }
      } catch (err) {
        setError('An error occurred while fetching categories.');
      }
    };

    fetchExpenseItem();
    fetchWallets();
    fetchCategories();
    setLoading(false); // Ensure loading is false after data fetches
  }, [expenseItemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const expenseData = { title, amount, flowType, wallet, category };
      if (expenseItemId) {
        await updateExpenseItem(expenseItemId, expenseData);
      } else {
        await createExpenseItem(expenseData);
      }
      navigate('/expense-items');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Bad request. Please check your input.');
      } else if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please login and try again.');
      } else if (err.response && err.response.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('An error occurred while saving the expense item.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Expense Title"
    required
  />
  <input
    type="number"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    placeholder="Amount"
    required
  />
  <div>
    <label>
      <input
        type="radio"
        name="flowType"
        value="income"
        checked={flowType === 'income'}
        onChange={(e) => setFlowType(e.target.value)}
        required
      />
      Income
    </label>
    <label>
      <input
        type="radio"
        name="flowType"
        value="outcome"
        checked={flowType === 'outcome'}
        onChange={(e) => setFlowType(e.target.value)}
        required
      />
      Outcome
    </label>
  </div>
  <select
    value={wallet}
    onChange={(e) => setWallet(e.target.value)}
    required
  >
    <option value="" disabled>Select Wallet</option>
    {wallets.map((wallet) => (
      <option key={wallet._id} value={wallet._id}>
        {wallet.name}
      </option>
    ))}
  </select>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  >
    <option value="" disabled>Select Category</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
  <button type="submit">Save</button>
</form>

  );
};

export default ExpenseItemForm;

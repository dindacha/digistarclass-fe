import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExpenseItemById, updateExpenseItem } from '../../api/expense-items'; 

const ExpenseItem = () => {
  const { expenseItemId } = useParams(); 
  const [expenseItem, setExpenseItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseItem = async () => {
      try {
        const data = await getExpenseItemById(expenseItemId);
        setExpenseItem(data);
      } catch (err) {
        setError('An error occurred while fetching the expense item.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseItem();
  }, [expenseItemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpenseItem(expenseItemId, { expenseItem });
      navigate('/expenseItems');
    } catch (err) {
      setError('An error occurred while updating the wallet.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    
      <div>
      <h1>Edit Wallet</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={expenseItem}
          onChange={(e) => setExpenseItem(e.target.value)}
          placeholder="expense Name"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
      
  );
};

export default ExpenseItem;

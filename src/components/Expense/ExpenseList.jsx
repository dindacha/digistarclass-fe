import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { getExpenseItems, deleteExpenseItem } from '../../api/expense-items'; 

const ExpenseItemList = () => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenseItem = async () => {
      try {
        const data = await getExpenseItems();
        console.log(data);

        if (data && Array.isArray(data.data)) {
          setExpenseItems(data.data);
        } else {
          throw new Error("Data format is not valid");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseItem();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this wallet?")) {
      try {
        await deleteExpenseItem(id);
        setExpenseItems(expenseItems.filter(expense => expense._id !== id)); 
      } catch (err) {
        setError('An error occurred while deleting the wallet.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Expense Items</h2>
      <ul>
        {expenseItems.map(expense => (
          <li key={expense.id}>
            {expense.name} - {expense.amount}
            <Link to={`/expense/${expense.id}`}> Edit</Link>
            <button onClick={() => handleDelete(expense._id)}>Delete</button> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseItemList;

// src/components/Category/CategoryForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createCategory, updateCategory, getCategoryById } from '../../api/categories';
import { getWallets } from '../../api/wallets'; 

const CategoryForm = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');
  const [wallets, setWallets] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId) {
        try {
          const category = await getCategoryById(categoryId);
          setName(category.name);
          setWallet(category.wallet); // Fetch wallet if it exists
        } catch (err) {
          if (err.response && err.response.status === 404) {
            setError('Category not found');
          } else {
            setError('An error occurred while fetching the category.');
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    const fetchWallets = async () => {
      try {
        const data = await getWallets();
        if (data && Array.isArray(data.data)) {
          setWallets(data.data); // Update state with wallet data
        } else {
          throw new Error("Data format is not valid");
        }
      } catch (err) {
        setError('An error occurred while fetching wallets.');
      }
    };

    fetchCategory();
    fetchWallets();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      if (categoryId) {        
        await updateCategory(categoryId, { name, wallet }); // Ensure wallet is sent when updating
      } else {
        await createCategory({ name, wallet }); // Create category with both name and wallet
      }
      navigate('/categories'); 
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Bad request. Please check your input.');
      } else if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please login and try again.');
      } else if (err.response && err.response.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('An error occurred while saving the category.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        required
      />
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
      <button type="submit">Save</button>
    </form>
  );
};

export default CategoryForm;

// src/components/Wallet/WalletItem.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWalletById, updateWallet } from '../../api/wallets';

const WalletItem = () => {
  const { walletId } = useParams(); // Extract walletId from URL parameters
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await getWalletById(walletId);
        setName(data.name); // Initialize the form field with the wallet name
      } catch (err) {
        setError('An error occurred while fetching the wallet.');
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [walletId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWallet(walletId, { name });
      navigate('/wallets');
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Wallet Name"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WalletItem;

// src/components/Wallet/WalletForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createWallet, updateWallet, getWalletById } from '../../api/wallets'; // Import fungsi API

const WalletForm = () => {
  const { walletId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch wallet data if walletId is present
  useEffect(() => {
    const fetchWallet = async () => {
      if (walletId) {
        try {
          const wallet = await getWalletById(walletId);
          setName(wallet.name); // Set the wallet name from API response
        } catch (err) {
          setError('Error fetching wallet data. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [walletId]);

  // Handle form submission for creating or updating a wallet
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      if (walletId) {
        await updateWallet(walletId, { name }); // Update wallet
      } else {
        await createWallet({ name }); // Create new wallet
      }
      navigate('/wallets'); // Redirect after successful operation
    } catch (err) {
      setError('Failed to save wallet. Please check your input.');
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
        placeholder="Wallet Name"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default WalletForm;

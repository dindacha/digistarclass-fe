// src/components/Wallet/WalletList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWallets, deleteWallet } from '../../api/wallets';

const WalletList = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getWallets();
        if (data && Array.isArray(data.data)) {
          setWallets(data.data);
        } else {
          throw new Error("Data format is not valid");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteWallet(id);
      setWallets(wallets.filter(wallet => wallet._id !== id));
    } catch (err) {
      setError('An error occurred while deleting the wallet.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Wallets</h2>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet._id}>
            {wallet.name}
            <Link to={`/wallet/${wallet._id}`}> Edit</Link>
            <button onClick={() => handleDelete(wallet._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletList;

// src/pages/WalletPage.js
import React from 'react';
import WalletList from '../components/Wallet/WalletList';
import WalletForm from '../components/Wallet/WalletForm';

const WalletPage = () => (
  <div>
    <h1>Wallet Management</h1>
    <WalletList />
    <WalletForm />
  </div>
);

export default WalletPage;

// src/api/walletApi.js
import axios from 'axios';

const API_URL = 'https://digistar-demo-be.vercel.app/api/wallets'; // Ganti dengan URL API aslimu

// GET LIST
export const getWallets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET SHOW
export const getWalletById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POST
export const createWallet = async (walletData) => {
  try {
    const response = await axios.post(API_URL, walletData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// PUT
export const updateWallet = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// DELETE
export const deleteWallet = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

// Function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the range of 2xx
    switch (error.response.status) {
      case 400:
        console.error('Bad Request: ', error.response.data);
        break;
      case 401:
        console.error('Unauthorized: ', error.response.data);
        break;
      case 403:
        console.error('Forbidden: ', error.response.data);
        break;
      case 404:
        console.error('Not Found: ', error.response.data);
        break;
      case 429:
        console.error('Too Many Requests: ', error.response.data);
        break;
      case 500:
        console.error('Internal Server Error: ', error.response.data);
        break;
      case 503:
        console.error('Service Unavailable: ', error.response.data);
        break;
      default:
        console.error('An error occurred: ', error.response.data);
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received: ', error.request);
  } else {
    // Something happened in setting up the request
    console.error('Error in setup: ', error.message);
  }
};

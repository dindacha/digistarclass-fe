// src/api/categoryApi.js
import axios from 'axios';

const API_URL = 'https://digistar-demo-be.vercel.app/api/categories'; // Ganti dengan URL API aslimu

// GET LIST
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetching categories');
  }
};

// GET SHOW
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `fetching category with ID ${id}`);
  }
};

// POST
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'creating category');
  }
};

// UPDATE
export const updateCategory = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleApiError(error, `updating category with ID ${id}`);
  }
};

// DELETE
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    handleApiError(error, `deleting category with ID ${id}`);
  }
};

// Function to handle API errors
const handleApiError = (error, action) => {
  if (error.response) {
    // Server responded with a status code outside the range of 2xx
    switch (error.response.status) {
      case 400:
        console.error(`Bad Request while ${action}:`, error.response.data);
        break;
      case 401:
        console.error(`Unauthorized while ${action}:`, error.response.data);
        break;
      case 403:
        console.error(`Forbidden while ${action}:`, error.response.data);
        break;
      case 404:
        console.error(`Not Found while ${action}:`, error.response.data);
        break;
      case 429:
        console.error(`Too Many Requests while ${action}:`, error.response.data);
        break;
      case 500:
        console.error(`Internal Server Error while ${action}:`, error.response.data);
        break;
      case 503:
        console.error(`Service Unavailable while ${action}:`, error.response.data);
        break;
      default:
        console.error(`An error occurred while ${action}:`, error.response.data);
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error(`No response received while ${action}:`, error.request);
  } else {
    // Something happened in setting up the request
    console.error(`Error in setup while ${action}:`, error.message);
  }
};

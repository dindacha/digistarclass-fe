// src/pages/CategoryPage.js
import React from 'react';
import CategoryList from '../components/Category/CategoryList';
import CategoryForm from '../components/Category/CategoryForm';

const CategoryPage = () => (
  <div>
    <h1>Category Management</h1>
    <CategoryList />
    <CategoryForm />
  </div>
);

export default CategoryPage;

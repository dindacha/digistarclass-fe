import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../api/categories'; 

const CategoryList = () => {

  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data); 

        if (data && Array.isArray(data.data)) {
          setCategories(data.data); 
        } else {
          throw new Error("Data format is not valid");
        }
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this wallet?")) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(category => category._id !== id)); 
      } catch (err) {
        setError('An error occurred while deleting the wallet.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}> 
            {category.name}
            <Link to={`/category/${category._id}`}> Edit</Link> 
            <button onClick={() => handleDelete(category._id)}>Delete</button> 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
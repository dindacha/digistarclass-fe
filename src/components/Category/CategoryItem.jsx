import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, updateCategory} from '../../api/categories'; 

const CategoryItem = () => {
  const { categoryId } = useParams(); 
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(categoryId);
        setCategory(data);
      } catch (err) {
        setError('An error occurred while fetching the category.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(categoryId, { category });
      navigate('/categories');
    } catch (err) {
      setError('An error occurred while updating the wallet.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
   
      <div>
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category Name"
          required
        />
        <button type="submit">Save</button>
      </form>
      </div>
      
  );
};

export default CategoryItem;

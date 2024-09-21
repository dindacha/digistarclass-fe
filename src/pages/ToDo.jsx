import { useState, useEffect } from 'react';
import './Todo.css'

const ToDo = () => {
const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setList(JSON.parse(storedTodos));
    }
  }, []);

  //memperbarui di local storage
  useEffect(() => {
    if (newTodo) {
      localStorage.setItem('todos', JSON.stringify(list));
      setNewTodo('');
    }
  }, [list]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setList([...list, newTodo]);
    }
  };
  return (
    <>
      <h1>To Do List</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add new todo"
          />
          <button type="submit">Add List</button>
        </form>
      </div>
      <div className="cardList">
        {list.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </div>
    </>
  )
}

export default ToDo